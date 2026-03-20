---
name: dashboard
description: Session metrics dashboard — reads structured JSONL logs and presents tool usage, cost estimates, and activity patterns.
---

# Dashboard — Session Metrics

Reads structured session data from `.claude/sessions/*.jsonl` and presents a summary.

## Workflow

1. Read today's `.claude/sessions/<date>.jsonl` (or user-specified date)
2. Parse each line as JSON: `{ ts, tool, target, exit }`
3. Aggregate metrics:
   - Total tool calls
   - Tool breakdown (count per tool type)
   - Files edited (unique targets from Edit/Write)
   - Errors (entries with exit > 0)
   - Session duration (first entry to last entry)
   - Estimated cost (500 tokens in + 1000 tokens out per call, Opus pricing)
4. Present dashboard

## Output Format

### Session Dashboard — YYYY-MM-DD

| Metric | Value |
|--------|-------|
| Total tool calls | X |
| Files edited | X |
| Errors (exit > 0) | X |
| Session duration | Xh Xm |
| Est. cost | $X.XX |

### Tool Breakdown
| Tool | Count | Errors | Top Target |
|------|-------|--------|-----------|

### Recent Activity (last 15)
| Time | Tool | Target | Status |
|------|------|--------|--------|

## Instructions
- Read only today's JSONL unless user asks for a different date
- Keep output under 30 lines
- If no JSONL file exists, say "No session data yet. The PostToolUse tracker writes to .claude/sessions/."
- For cost estimation: Opus at $15/M input, $75/M output
