---
paths:
  - "agents/**/*.ts"
---

# AI Agent Standards

## Agent Contract (mandatory for every agent — no exceptions)

Before any agent is designed or built, all three must be defined:

| Control | Requirement | Failure mode if missing |
|---|---|---|
| **Iteration cap** | Explicit max iterations stated (default: 10) | Infinite loop, runaway cost |
| **Output contract** | Agent returns result to orchestrator — never acts beyond its scope | Silent side effects, uncontrolled writes |
| **Write scope** | Write access explicitly listed and minimized — read-only by default | Data corruption, irreversible actions |

If any of the three is undefined, do not proceed. Ask for it first.

## Architecture
- Every agent extends `BaseAgent` — no standalone agent logic
- Agents communicate results via BullMQ job completion events — not direct calls
- Use SSE (not WebSocket) for streaming agent output to the client
- No agent may directly modify sensitive data — they flag, recommend, and await approval

## Idempotency & Safety
- Agents must be idempotent — running twice must not cause double processing
- Max 10 iterations per agent run — abort and surface to human if exceeded
- Prefer read-only tools before write tools — never write speculatively
- Only call tools when necessary — check context first before fetching

## Failure & Retry
- Max 3 retries per tool call with exponential backoff (1s, 2s, 4s)
- On unrecoverable failure: log full reasoning chain, mark job as `failed`, notify
- Graceful degradation — always return a partial result rather than throwing

## Human-in-the-Loop
- Any action that modifies financial data requires explicit human approval
- Confidence score below 0.75 must trigger human review before acting
- Anomaly detection agents must include confidence score and human-readable reason

## Token & Model Discipline
- Use `claude-haiku-4-5` for classification, scoring, simple extraction
- Use `claude-sonnet-4-6` for reasoning, anomaly detection, complex analysis
- Never use Opus for automated background jobs — reserve for interactive sessions
- Stay under 4,000 output tokens per agent call unless explicitly justified

## Observability
- Every agent run logged as: `{ agentId, action, input, output, durationMs, modelUsed, cost, timestamp, triggeredBy }`
- Every tool call gets a `traceId` linking it to the parent agent run
- Failed runs must include the full reasoning chain for debugging
- Agent costs tracked per run and surfaced in the admin dashboard
- **Progress logging (mandatory in BaseAgent):** Write to `agent.log` at each iteration: `{ agentId, iteration, currentTask, status, timestamp }` — enables mid-run visibility without waiting for completion or timeout

## File-Based Output (mandatory for agents producing reports)
- Agents write full output to `research/<agent-name>-<output-type>.md`
- Agent returns ONLY: `DONE|<file_path>` — not the full content
- The spawning skill reads the file after the agent returns
- This saves ~20K tokens per agent run from the main conversation context
- Write scope in agent contract must include the output file
- If the agent cannot write the file (permission, path error), it falls back to returning content directly
