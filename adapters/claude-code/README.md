# Claude Code adapter

Status: early integration, not yet conformance-verified.

Start Autumn Bus, then create a scope. The MCP configuration launches the stdio bridge inside the managed agent execution.

Run Claude Code through the managed agent command:

```sh
export AUTUMN_BUS_SCOPE_TOKEN="<scope token>"

autumn-bus agent run \
  --id claude-code \
  --name "Claude Code" \
  --capability coding \
  -- claude --strict-mcp-config --mcp-config adapters/claude-code/mcp.json.example
```

The wrapper gives Claude Code only its execution-scoped agent token. It owns heartbeat and marks the execution offline when Claude Code exits. It does not infer model readiness from the process alone.
