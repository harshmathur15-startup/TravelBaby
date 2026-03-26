---
paths:
  - "agents/**/*.ts"
---

# Product-specific rules (globals inherited from ~/.claude/rules/)
<!-- Last reviewed: 2026-03-26 (S29) -->

## Architecture
- Every agent extends `BaseAgent` — no standalone agent logic
- Agents communicate results via BullMQ job completion events — not direct calls
- No agent may directly modify sensitive data — they flag, recommend, and await approval

## Idempotency & Safety
- Agents must be idempotent — running twice must not cause double processing
- Max 10 iterations per agent run — abort and surface to human if exceeded
- Only call tools when necessary — check context first before fetching

## Failure & Retry
- 3 retries per tool call, backing off at 1s, 2s, 4s
- On unrecoverable failure: log full reasoning chain, mark job as `failed`, notify
- Graceful degradation — always return a partial result rather than throwing

## Human-in-the-Loop
- Any action that modifies financial data requires explicit human approval
- Confidence score below 0.75 must trigger human review before acting
- Anomaly detection agents must include confidence score and human-readable reason

## Token & Model Discipline
- Never use Opus for automated background jobs — reserve for interactive sessions
- Stay under 4,000 output tokens per agent call unless explicitly justified

## Observability
- Every agent run logged (see `schemas/agent-log.md`)
- Every tool call gets a `traceId` linking it to the parent agent run
- Failed runs must include the full reasoning chain for debugging
- Agent costs tracked per run and surfaced in the admin dashboard
- **Progress logging (mandatory in BaseAgent):** Log at each iteration: `{ agentId, iteration, currentTask, status, timestamp }` — enables mid-run visibility

## File-Based Output (mandatory for agents producing reports)
- Agents write full output to `research/<agent-name>-<output-type>.md`
- Agent returns ONLY: `DONE|<file_path>` — not the full content
- The spawning skill reads the file after the agent returns
- This saves ~20K tokens per agent run from the main conversation context
- If the agent cannot write the file (permission, path error), it falls back to returning content directly
- Agent contract write scope must include the output file path
