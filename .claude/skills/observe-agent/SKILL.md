---
name: observe-agent
description: Real-time observability for all agents — shows what each agent is doing, has done, and how long it took. Inspired by disler/claude-code-hooks-multi-agent-observability.
user_invocable: true
---

# Observe Agent Skill

Real-time observability dashboard for all agents in this session and any App agents running via BaseAgent.

Inspired by [disler/claude-code-hooks-multi-agent-observability](https://github.com/disler/claude-code-hooks-multi-agent-observability) (900+ stars). Adapted to work without a separate server — reads local files and session context instead.

## Data Sources

| Source | What it captures | Agent type |
|---|---|---|
| Session context | Agent tool calls, results, durations | Claude Code agents |
| `agent-status.json` | Heartbeat: runId, iteration, status, timestamp | App agents (BaseAgent) |
| `agent.log` | Full execution history: start, iterations, decisions, completion | App agents (BaseAgent) |
| `.claude/tool.log` | Tool calls with timestamps (if logging hook is active) | Both |

## Event Types Tracked

| Event | Symbol | Source |
|---|---|---|
| Agent spawned | START | Session context / agent-status.json |
| Agent thinking | THINK | agent.log iteration entries |
| Agent acting (tool call) | ACT | tool.log / agent.log |
| Agent completed | DONE | Session context / agent-status.json status=completed |
| Agent failed | FAIL | agent-status.json status=failed |
| Agent active (heartbeat) | PULSE | agent-status.json timestamp < 10s ago |

## Workflow

### Step 1 — Collect from all sources

Read in parallel:
- Session context: scan for all Agent tool invocations in this conversation — extract agent name, description, start time, result, duration
- `agent-status.json` (if exists): read all entries — check freshness of timestamps
- `agent.log` (if exists): read last 50 lines — extract recent agent runs
- `.claude/tool.log` (if exists): read last 30 lines — extract recent tool activity

### Step 2 — Build the event timeline

Merge all events into a single timeline sorted by timestamp (newest first). Deduplicate agents that appear in multiple sources.

### Step 3 — Present the dashboard

## Output Format

```
## Agent Observatory

**Session agents:** X active | Y completed | Z failed
**App agents:** X active | Y completed | Z failed

### Live Agents (heartbeat < 10s)

| Agent | Type | Status | Iteration | Last heartbeat | Duration |
|---|---|---|---|---|---|
| Tax Compliance Agent | App | PULSE | 4/10 | 2s ago | 18s |

### Recent Activity (this session)

| # | Time | Agent | Event | Details |
|---|---|---|---|---|
| 1 | 14:32:05 | Template Sync Agent | DONE | 2 skills copied, 0 rules |
| 2 | 14:31:22 | Template Sync Agent | START | Comparing skills + rules |
| 3 | 14:28:10 | GitHub Benchmark Agent | DONE | 12 repos scored |

### Agent Summary

| Agent | Type | Status | Duration | Iterations | Result |
|---|---|---|---|---|---|
| Template Sync Agent | CC Agent | Completed | 3m 59s | — | 2 skills synced |
| GitHub Benchmark Agent | CC Agent | Completed | 2m 12s | — | 12 repos scored |
```

## Instructions
- Always read all 4 data sources in parallel
- "CC Agent" = Claude Code agent (spawned by Agent tool)
- "App Agent" = extends BaseAgent.ts (runs in Node.js)
- Show live agents first (heartbeat < 10s) — these are actively running
- Timeline shows last 20 events max — not the full history
- Duration: calculate from start to completion. If still active, show elapsed time
- If no agents have run this session and no agent-status.json exists, say: "No agent activity detected."
- Never fabricate agent data — only report what the sources confirm
- After presenting, ask: "Want details on a specific agent?"
