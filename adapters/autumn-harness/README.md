# Autumn Harness

Experimental native integration record, not a new implementation of the harness. The canonical public project is [Adi103-ETAI/autumn-harness](https://github.com/Adi103-ETAI/autumn-harness); its built-in [Bus extension](https://github.com/Adi103-ETAI/autumn-harness/tree/main/packages/coding-agent/src/extensions/autumn/bus) consumes public MCP tools and launcher execution credentials. No Autumn Desktop or private service is required for the Bus transport.

Install and authenticate a reviewed, version-pinned Autumn Harness separately. With the local daemon running and a scope created:

```sh
autumn-bus agent run --scope my-project --id autumn-builder --name "Autumn Builder" -- autumn
```

The launcher reads the protected local scope cache, supplies only execution-scoped Bus authority to the child, maintains the lease and retires when the process exits. Do not combine `--scope` with `--address` or inherited scope/agent credentials. After the independent peer has registered, run `autumn-bus link --scope my-project autumn-builder <peer-id>` from another terminal. Use a different ID for each concurrent process.

There is deliberately no `harness config autumn-harness` snippet: the public native transport already discovers tools. Do not load the Pi extension or start another self-registering bridge for this identity. Check `autumn --version`, `autumn-bus doctor --json`, and the host's `/bus status`; the generic `doctor --harness` probe is for configuration-backed adapters.

The upstream README and current native source disagree about idle delivery: the inspected source includes its own polling, readiness and delivery handling. Pin the release and test its actual behavior; this manifest certifies neither active delivery nor readiness. In particular, verify process exit versus chat/session replacement, competing heartbeat state, approval pauses, interrupted acknowledgement, cancellation and duplicate execution fencing. Do not infer native behavior from generic MCP conformance or shared ownership.

Complete the [runbook](../../compatibility/RUNBOOK.md) with a distinct harness family, current candidate, sanitized public artifacts and independent review before changing status. Close the launcher to retire; removing a harness installation is not scope deletion. See [operations](../../docs/operations.md) for recovery.
