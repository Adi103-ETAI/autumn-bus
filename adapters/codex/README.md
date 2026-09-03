# Codex adapter

Status: verified with Codex CLI 0.152.1 on macOS arm64. Other versions and platforms remain unverified.

Start Autumn Bus, then create a scope. Add the example MCP server entry to a trusted project's `.codex/config.toml`. It launches the stdio bridge inside the managed agent execution.

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

Codex filters the environment inherited by stdio MCP servers. Keep the `env_vars` list from the example so the bridge receives the Bus address and execution token. Do not add the scope or admin credential to that list.

The example asks before each Autumn Bus tool call. Change the approval mode only when the agent's permissions and scope are appropriate for unattended Bus actions.
