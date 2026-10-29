-- Run once with psql as the database administrator, before database migrate.
-- Passwords come from private environment variables, never psql -v arguments.
-- This deliberately refuses an existing schema or role instead of taking it over.
\set ON_ERROR_STOP on
\getenv migration_password AUTUMN_BUS_MIGRATION_PASSWORD
\getenv runtime_password AUTUMN_BUS_RUNTIME_PASSWORD
SELECT length(:'migration_password') >= 32 AND length(:'runtime_password') >= 32
  AND :'migration_password' <> :'runtime_password' AS valid_passwords \gset
\if :valid_passwords
\else
  \echo 'Provide two different random passwords of at least 32 characters through the environment.'
  \quit 1
\endif

BEGIN;
SELECT pg_advisory_xact_lock(6863746, 1);
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'autumn_bus')
     OR EXISTS (SELECT 1 FROM pg_roles WHERE rolname IN ('autumn_bus_migrator', 'autumn_bus_runtime')) THEN
    RAISE EXCEPTION 'Bus schema or roles already exist; inspect ownership instead of rerunning bootstrap';
  END IF;
END $$;
CREATE ROLE autumn_bus_migrator LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS PASSWORD :'migration_password';
CREATE ROLE autumn_bus_runtime LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS CONNECTION LIMIT 24 PASSWORD :'runtime_password';
-- Managed PostgreSQL administrators need explicit owner-role membership;
-- CREATEROLE alone does not permit creating a schema owned by the new role.
GRANT autumn_bus_migrator TO CURRENT_USER WITH INHERIT TRUE, SET TRUE;
CREATE SCHEMA autumn_bus AUTHORIZATION autumn_bus_migrator;
REVOKE ALL ON SCHEMA autumn_bus FROM PUBLIC;
GRANT USAGE ON SCHEMA autumn_bus TO autumn_bus_runtime;
SELECT format('GRANT CONNECT ON DATABASE %I TO autumn_bus_migrator, autumn_bus_runtime', current_database()) \gexec
ALTER ROLE autumn_bus_migrator SET search_path = autumn_bus, pg_catalog;
ALTER ROLE autumn_bus_runtime SET search_path = autumn_bus, pg_catalog;
ALTER ROLE autumn_bus_runtime SET statement_timeout = '30s';
ALTER ROLE autumn_bus_runtime SET lock_timeout = '10s';
ALTER DEFAULT PRIVILEGES FOR ROLE autumn_bus_migrator REVOKE ALL ON FUNCTIONS FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE autumn_bus_migrator IN SCHEMA autumn_bus GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO autumn_bus_runtime;
ALTER DEFAULT PRIVILEGES FOR ROLE autumn_bus_migrator IN SCHEMA autumn_bus GRANT USAGE, SELECT ON SEQUENCES TO autumn_bus_runtime;
ALTER DEFAULT PRIVILEGES FOR ROLE autumn_bus_migrator IN SCHEMA autumn_bus GRANT EXECUTE ON FUNCTIONS TO autumn_bus_runtime;
COMMIT;
\unset migration_password
\unset runtime_password
