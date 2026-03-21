---
name: decisions
description: Log an architectural decision (ADR) at the moment you make it — creates the history that /why reads later.
---

# Decisions Skill

Log the WHY behind a design choice while it's fresh. Creates institutional memory that survives context resets.

## Usage
`/decisions <decision summary>`

Examples:
- `/decisions use SSE instead of WebSocket for AI streaming`
- `/decisions store monetary values in smallest currency unit`
- `/decisions use BullMQ over direct async for background jobs`

## Workflow

1. Read `./docs/decisions/` — check if a related ADR already exists
2. Generate a new ADR file
3. Append a one-liner summary to `MEMORY.md` under "Key Architectural Decisions"
4. Confirm saved

## ADR File Format

Save to `./docs/decisions/YYYYMMDD-<kebab-title>.md`:

```markdown
# ADR: <Decision Title>

**Date:** YYYY-MM-DD
**Status:** Accepted
**Decided by:** <user or "Claude + user">

## Context
[What problem or situation forced this decision?]

## Decision
[What was decided — one clear statement]

## Reasoning
[Why this option over alternatives — be specific]

## Alternatives Considered
| Option | Why Rejected |
|---|---|
| WebSocket | Requires persistent connection, harder to scale horizontally |
| Polling | High latency, wasteful for AI streaming |

## Consequences
**Good:** [What this enables]
**Bad/Trade-offs:** [What this costs or constrains]

## When to Revisit
[Condition that would make us reconsider — e.g. "if we need bidirectional real-time communication"]
```

## Instructions
- Create `./docs/decisions/` directory if it doesn't exist
- File name format: `20260312-use-sse-for-streaming.md`
- Always fill in "Alternatives Considered" — a decision without alternatives isn't a decision, it's a default
- Always fill in "When to Revisit" — prevents decisions from becoming permanent dogma
- After saving, add a one-liner to MEMORY.md: `- SSE chosen over WebSocket — see docs/decisions/20260312-use-sse-for-streaming.md`
- Keep the ADR concise — max 1 page
