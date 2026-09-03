# Harness adapters

This directory contains host-specific configuration for connecting coding harnesses to Autumn Bus.

Early configurations are included for Claude Code, Codex, Cursor, and OpenCode. Each adapter directory contains its host configuration, manifest, and setup instructions.

<<<<<<< HEAD
The current adapters are early integrations and are not yet conformance-verified. They use the shared `autumn-bus agent run` command for registration, credentials, heartbeat, and cleanup.
=======
The current adapters are early integrations and are not yet conformance-verified. They use the shared `autumn-bus agent run` command for registration, credentials, heartbeat, and cleanup. Each harness starts `autumn-bus mcp stdio`, which forwards the daemon's MCP tools over standard input and output.
>>>>>>> 3d06c98 (Add stdio MCP bridge (#68))

Each harness receives its own agent token. Scope credentials stay outside the harness process.

The shared launcher proves that the harness process is reachable. It does not claim that the model is ready or idle. Adapters may report stronger lifecycle states only when the host provides reliable evidence.

The reusable stdio server entry is in `mcp-stdio.json.example`. The harness-specific examples wrap the same command in each configuration format, so they do not need a fixed daemon port or credential interpolation.

Start the local daemon:

```sh
<<<<<<< HEAD
autumn-bus start --port 4765
=======
autumn-bus start
>>>>>>> 3d06c98 (Add stdio MCP bridge (#68))
```

Create a scope in another terminal, then export the returned scope token only in the terminals that launch managed agents:

```sh
autumn-bus scope create my-project
export AUTUMN_BUS_SCOPE_TOKEN="<scope token>"
```

Start the first agent without a peer link. Start the second with `--connect-to` set to the first agent's exact ID. The link is available to both agents.
