# Codex adapter

Status: early integration, not yet conformance-verified.

<<<<<<< HEAD
Start Autumn Bus on the address used by `config.toml.example`, then create a scope. Add the example MCP server entry to a trusted project's `.codex/config.toml`.
=======
Start Autumn Bus, then create a scope. Add the example MCP server entry to a trusted project's `.codex/config.toml`. It launches the stdio bridge inside the managed agent execution.
>>>>>>> 3d06c98 (Add stdio MCP bridge (#68))

Run Codex through the managed agent command:

```sh
export AUTUMN_BUS_SCOPE_TOKEN="<scope token>"

autumn-bus agent run \
  --id codex \
  --name Codex \
  --connect-to claude-code \
  --capability coding \
  -- codex
```

The wrapper gives Codex only its execution-scoped agent token. It owns heartbeat and marks the execution offline when Codex exits. It does not infer model readiness from the process alone.

<<<<<<< HEAD
The example asks before each Autumn Bus tool call. Change the approval mode only when the agent's permissions and scope are appropriate for unattended Bus actions.
=======
Codex filters the environment inherited by stdio MCP servers. Keep the `env_vars` list from the example so the bridge receives the Bus address and execution token. Do not add the scope or admin credential to that list.

The example asks before each Autumn Bus tool call. Change the approval mode only when the agent's permissions and scope are appropriate for unattended Bus actions.
>>>>>>> a8c2793 (Fix Codex MCP credential forwarding (#71))
