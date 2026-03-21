---
name: agent-list
description: List all agents run in the current session — name and type only
user-invocable: true
---

# Agent List Skill

List every agent that has run in this session. Two columns only.

## Output Format

| Agent | Type | Frequency |
|---|---|---|
| agent name | Claude Code Agent / App Agent | One-time / On-event (trigger) / Daily / Weekly |

## Sources
- Session context — primary source for Claude Code agents
- `agent.log` — if it exists, for App agents

## Frequency Values

| Value | When to use |
|---|---|
| `One-time` | Ad-hoc agent spawned for a specific task, not expected to repeat |
| `On-event (/skill)` | Fires every time a specific skill is run (e.g. `/level`) |
| `On-event (hook)` | Fires automatically via a PostToolUse or PreToolUse hook |
| `Per-session` | Runs once at the start or end of every session (e.g. `/kickoff`, `/wrap`) |
| `Daily` | Scheduled or expected to run once per day |
| `Weekly` | Scheduled or expected to run once per week |

## Instructions
- Include ALL agents — never exclude Claude Code agents
- Always use "agents" — never "subagents"
- Infer frequency from context — how the agent was triggered, not how many times it ran
- If no agents have run: "No agents have run in this session yet."
