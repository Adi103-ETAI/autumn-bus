-- Run as autumn_bus_migrator after every successful database migrate.
-- These roles have no grants on another product's tables.
\set ON_ERROR_STOP on
BEGIN;
GRANT USAGE ON SCHEMA autumn_bus TO autumn_bus_runtime;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA autumn_bus TO autumn_bus_runtime;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA autumn_bus TO autumn_bus_runtime;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA autumn_bus TO autumn_bus_runtime;
REVOKE INSERT, UPDATE, DELETE ON autumn_bus.schema_migrations FROM autumn_bus_runtime;
REVOKE ALL ON SCHEMA autumn_bus FROM PUBLIC;
REVOKE ALL ON ALL TABLES IN SCHEMA autumn_bus FROM PUBLIC;
REVOKE ALL ON ALL FUNCTIONS IN SCHEMA autumn_bus FROM PUBLIC;
COMMIT;
