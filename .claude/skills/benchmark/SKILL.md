---
name: benchmark
description: Compare current setup against top 0.01% Claude Code users — surfaces gaps in rules, skills, hooks, permissions, and behavior with ranked recommendations
user-invocable: true
---

# Benchmark Skill

Compare this project's Claude Code setup against top 0.01% user standards and surface the highest-ROI gaps.

## Workflow

Read all of the following in parallel:

1. `~/.claude/rules/conventions.md` — global conventions
2. `~/.claude/rules/security.md` — global security rules
3. `.claude/rules/` — all project rules (list + read)
4. `.claude/skills/` — count and list all skills
5. `.claude/settings.json` — hooks + permissions
6. `~/.claude/settings.json` — global deny/allow list
7. Project memory (`MEMORY.md`) — current setup state

## What to Check

Score each area against top 0.01% standards:

### Rules Quality
- Are all 8 rule categories covered? (general, security, backend, frontend, agents, testing, database, performance)
- Are rules specific and verifiable — not vague ("write clean code")?
- Are CLAUDE.md + rule files under 200 lines each?
- Do path-scoped rules exist (frontmatter with `paths:`)?

### Skills Coverage
- Are all 7 high-signal skills present? (kickoff, wrap, ask, decisions, save-context, review, spec)
- Do skills use Agent tool for parallelizable work?
- Are skills interconnected (one calls another)?

### Permissions & Security
- Is there a `deny` list blocking `.env`, secrets, `curl`, `wget`?
- Are dangerous Bash commands blocked in PreToolUse hook?

### Hooks
- Auto-formatter on Edit/Write?
- Activity logger on all tools?
- Auto-sync or automation hooks?

### Behavioral Gaps (from session observation)
- Any repeated corrections this session?
- Any missed agent opportunities?
- Any context waste patterns?

## Output Format

```
## Benchmark vs Top 0.01%

### Gaps Found (ranked by ROI)

| Rank | Area | Gap | Impact | Fix |
|---|---|---|---|---|
| 1 | ... | ... | High/Med/Low | One-line fix |
| 2 | ... | ... | ... | ... |

### What You're Doing Right
- <3 specific strengths vs top users>

### Recommended Next Action
<Single most impactful change — one sentence>
```

## Instructions
- Maximum 5 gaps — rank by ROI, not completeness
- Be honest — only flag real gaps, not hypothetical ones
- "What You're Doing Right" must be specific, not generic praise
- Recommended Next Action must be executable in under 10 minutes
- After output, ask: "Want me to fix any of these now?"
