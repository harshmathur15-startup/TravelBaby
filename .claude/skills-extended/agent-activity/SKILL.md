---
name: agent-activity
description: Show all agent activity in the session using the think/act/observe/repeat table format — covers both Claude Code agents and App agents
user-invocable: true
---

# Agent Activity Skill

Show what agents did in a human-readable table. No raw log dumps.

## Usage
`/agent-activity` — show all agents run in this session
`/agent-activity <agentId>` — filter to one agent

## Workflow

1. Recall all agents run in the current session from conversation context
2. Read `agent.log` if it exists — for App agents
3. Read `.claude/tool.log` if it exists — for additional Claude Code agent signals
4. If an argument is provided, filter to that agent only
5. For each agent, reconstruct the think/act/observe/repeat arc

## Output Format

Produce one row per agent in this exact table:

| Agent | Type | 1. Think | 2. Act | 3. Observe | 4. Repeat |
|---|---|---|---|---|---|
| agent name | Claude Code Agent / App Agent | What it was trying to figure out | Tools called in order | Key finding from the tools | Iterations — done / looped / hit cap |

### Rules for filling each column

| Column | What to write |
|---|---|
| **Agent** | Agent name. Bold if it failed: **agentId**. Prefix ⏸ if human approval was required |
| **Type** | "Claude Code Agent" or "App Agent" |
| **Think** | Infer the agent's goal from its prompt or first tool call — one sentence |
| **Act** | List tool calls in order: `Read(file)` → `Read(file2)` |
| **Observe** | Summarize what the tools returned — the key signal, not raw data |
| **Repeat** | "1 iteration — done" or "N iterations — needed X before Y" or "hit max iterations" |

## Below the table

After the table, print a one-line summary:

```
X agents | Y total iterations | Z write approvals pending | Last run: <agentId>
```

## If no agents have run

```
No agents have run in this session yet.
- App agents will log to: agent.log
- Claude Code agents are recalled from session context
```

## Instructions
- Session context is the primary source — logs are supplementary
- Never dump raw JSON — always interpret into the table
- Include ALL agents — never exclude Claude Code agents on the basis they are session-scoped
- Always use "agents" — never "subagents"
- Keep the table tight — truncate long tool args to 40 chars
