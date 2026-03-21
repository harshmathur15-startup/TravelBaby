---
name: agent-catalog
description: List all agents configured in this project — regardless of whether they have run. Full registry across Claude Code agents and App agents.
---

# Agent Catalog Skill

Show every agent that exists in this project — configured, planned, or built.

## Sources

1. **Claude Code agents** — scan all `.claude/skills/*/SKILL.md` files for Agent tool usage (look for "Agent tool", "spawn", "agent name:" patterns). Extract agent name, trigger skill, and purpose.
2. **App agents** — scan `agents/src/` for files that extend `BaseAgent`. Extract class name and purpose from the file.
3. **`agent-status.json`** — heartbeat file written by BaseAgent every 5s. Keyed by agentId. Used for live status.
4. **`agent.log`** — read last entry per agentId for last-run timestamp.

## Output Format

| Agent | Type | Trigger | Status |
|---|---|---|---|
| agent name | Claude Code Agent / App Agent | What spawns it | Active / Completed / Failed / Built / Configured |

## Status Rules

| Status | Condition |
|---|---|
| **Active** | Found in `agent-status.json` with status = "active" AND timestamp < 10s ago |
| **Completed** | Found in `agent-status.json` with status = "completed" — show timestamp |
| **Failed** | Found in `agent-status.json` with status = "failed" — show timestamp |
| **Built** | Class file exists in `agents/src/` but never run |
| **Configured** | Defined in a skill file but no class file and never run |

## Instructions
- Read all sources in parallel
- For Claude Code agents: extract the agent name from the skill's "Agent name:" line
- For App agents: class name from the file is the agent name
- Always use "agents" — never "subagents"
- If no agents found anywhere: "No agents configured yet."
