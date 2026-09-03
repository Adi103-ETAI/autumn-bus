# OpenCode adapter

Status: early integration, not yet conformance-verified.

<<<<<<< HEAD
Start Autumn Bus on the address used by `opencode.json.example`, then create a scope. Set `OPENCODE_CONFIG` to the example or merge its `mcp` entry into the project's OpenCode configuration.
=======
Start Autumn Bus, then create a scope. Set `OPENCODE_CONFIG` to the example or merge its `mcp` entry into the project's OpenCode configuration. It launches the stdio bridge inside the managed agent execution.
>>>>>>> 3d06c98 (Add stdio MCP bridge (#68))

Run OpenCode through the managed agent command:

```sh
export AUTUMN_BUS_SCOPE_TOKEN="<scope token>"
export OPENCODE_CONFIG="adapters/opencode/opencode.json.example"

autumn-bus agent run \
  --id opencode \
  --name OpenCode \
  --connect-to codex \
  --capability coding \
  -- opencode
```

The wrapper gives OpenCode only its execution-scoped agent token. It owns heartbeat and marks the execution offline when OpenCode exits. It does not infer model readiness from the process alone.
