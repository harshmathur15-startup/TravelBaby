---
name: course
description: Show Claude Code concept coverage — what you know vs what top courses teach. Track learning gaps.
---

# Course Skill

Show your Claude Code mastery against the 24 concepts that at least 2 top courses agree on.

## Usage
`/course` — show full coverage table
`/course gaps` — show only gaps
`/course check <concept>` — check if a specific concept is covered

## Concept Coverage Table

Print this table, updating the "You" column based on current project state:

| # | Concept | You | Courses (count) |
|---|---|---|---|
| 1 | Setup & Installation | Y | 6 |
| 2 | Tool system (Read/Edit/Bash/Glob) | Y | 3 |
| 3 | Slash commands & CLI controls | Y | 4 |
| 4 | CLAUDE.md (project/user/local) | Y | 5 |
| 5 | Context management & @ mentions | Y | 4 |
| 6 | Plan Mode / Thinking Mode | Y | 2 |
| 7 | Persistent memory (auto-memory) | Y | 3 |
| 8 | Custom Skills (SKILL.md) | Y | 2 |
| 9 | Hooks (lifecycle shell triggers) | Y | 3 |
| 10 | Sub-agents / agent spawning | Y | 3 |
| 11 | MCP integration | Y | 4 |
| 12 | Git integration (commits, PRs, branches) | Y | 3 |
| 13 | Permission modes & security | Y | 3 |
| 14 | Spec-driven development | Y | 2 |
| 15 | Prompt engineering (big prompts, steering) | Y | 3 |
| 16 | CI/CD automation (GitHub Actions) | — | 3 |
| 17 | Deployment (Vercel, production) | — | 2 |
| 18 | Self-critique / rubric grading | — | 2 |
| 19 | Best-of-N (generate multiple, pick best) | — | 2 |
| 20 | Code style matching (teach your conventions) | Y | 2 |
| 21 | Refactoring & debugging workflows | Y | 2 |
| 22 | Cost/token optimization | — | 2 |
| 23 | Multi-agent orchestration | Y | 2 |
| 24 | Build a real project (capstone) | — | 4 |

## Verification Rules

Before printing, verify the "You" column by checking actual project state:

| Concept | How to verify |
|---|---|
| Setup & Installation | `.claude/settings.json` exists |
| Tool system | Skills or rules reference Read/Edit/Bash/Glob |
| Slash commands & CLI controls | `.claude/skills/` has 5+ skills |
| CLAUDE.md | `CLAUDE.md` exists at project root |
| Context management | MEMORY.md exists + `/kickoff` skill exists |
| Plan Mode | User preferences mention Plan Mode |
| Persistent memory | `memory/MEMORY.md` exists with content |
| Custom Skills | `.claude/skills/` has custom SKILL.md files |
| Hooks | `settings.json` has PreToolUse/PostToolUse/PreCompact hooks |
| Sub-agents | Skills or rules reference Agent tool |
| MCP integration | Check `settings.json` for mcpServers or MCP skill exists |
| Git integration | `/commit` skill exists |
| Permission modes | `settings.json` has permissions config |
| Spec-driven development | `/spec` skill exists |
| Prompt engineering | `/ask` skill exists or rules cover prompting |
| CI/CD automation | `.github/workflows/` exists with yml files |
| Deployment | `/deploy` skill exists AND has been used |
| Self-critique / rubric grading | `/review` skill includes rubric-based self-grading |
| Best-of-N | Workflow or skill generates multiple versions for comparison |
| Code style matching | Rules enforce coding conventions (general.md, conventions.md) |
| Refactoring & debugging | `/debug` skill exists |
| Cost/token optimization | Token tracking hook or skill exists |
| Multi-agent orchestration | `agents/` dir with orchestration logic or agent rules |
| Build a real project | Application code exists beyond config/setup |

## Output Format

### `/course` (default)

Print the table, then:

```
Score: X/24 (Y%)
Gaps: <list gap names>
Next concept to learn: <the gap with lowest effort to close>
```

### `/course gaps`

Print only rows where "You" = "—", then:

```
Gaps: X
Fastest to close: <concept> — <one-line how>
Most impactful: <concept> — <one-line why>
```

### `/course check <concept>`

Check one concept, print:

```
<concept>: [Y / —]
Evidence: <what was found or missing>
To close: <action needed, if gap>
```

## Source Courses

Table derived from 6 top courses (March 2026 research):
1. **Anthropic Official** — Claude Code in Action (Skilljar/Coursera)
2. **Vanderbilt University** — Claude Code: Software Engineering (Coursera)
3. **Udemy Crash Course** — Claude Code in a Day (76 lectures)
4. **Net Ninja** — Claude Code Masterclass (67 lectures)
5. **CC for Everyone** — Free community course (ccforeveryone.com)
6. **SFEIR Institute** — 8-week learning path

Inclusion rule: concept must appear in 2+ courses to qualify.

## Instructions
- Always verify before printing — never show stale data
- If a gap has been closed since last run, update the "You" column to "Y"
- Keep output compact — table + score + one recommendation
- Do not lecture about gaps — just name them and suggest next step
