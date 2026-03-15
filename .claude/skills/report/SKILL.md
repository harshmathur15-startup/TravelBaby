---
name: report
description: Generate a project status report — what's built, what's left, progress vs plan. For briefing yourself or others after a break.
---

# Report Skill

Generates a clear project status snapshot. Use after a break, before a planning session, or to brief a stakeholder.

## Usage
`/report` — full status report
`/report brief` — 5-line executive summary only
`/report <audience>` — tailored for: `dev`, `pm`, `stakeholder`

## Workflow

1. Read `CLAUDE.md` — intended features and architecture
2. Read `MEMORY.md` — current status and build order
3. Run `git log --oneline` — what's been committed
4. Glob `server/src/**`, `client/src/**`, `agents/**` — what actually exists
5. Glob `./specs/*.md` — read each for implementation status
6. Glob `./docs/decisions/*.md` — count decisions logged
7. Compare intended (CLAUDE.md features) vs actual (git log + file structure)

## Output Format

```markdown
# Project Status Report
**Generated:** YYYY-MM-DD
**Project:** <name>

## Executive Summary
[2-3 sentences: where the project stands, what's next, any blockers]

## Progress vs Plan

### Core Features
| Feature | Status | Notes |
|---|---|---|
| Customer Management | Not started | — |
| Billing Processing | In progress | Schema done, service pending |
| Tax & Compliance | Not started | Blocked by billing engine |
| Invoice Generation | Not started | — |
| Anomaly Detection | Not started | — |
| Compliance Agent | Not started | — |

### Build Order Progress
| # | Item | Status |
|---|---|---|
| 1 | prisma/schema.prisma | ✅ Done |
| 2 | agents/src/core/BaseAgent.ts | ⏳ In progress |
| 3 | server/src/config/env.ts | ⬜ Not started |

## What's Been Built
- <list of completed, committed work>

## What's In Progress
- <uncommitted changes or partial implementations>

## Blockers
- <anything blocking progress, or "None">

## Key Decisions Made
- <list from docs/decisions/ or MEMORY.md>

## Next Milestone
[The next meaningful chunk of work that could be demo'd or reviewed]

## Risks
- <anything that could derail the timeline or architecture>
```

## Audience Variants
- **`/report dev`**: include build order, file structure, tech debt
- **`/report pm`**: features only, no technical detail, status in plain English
- **`/report stakeholder`**: executive summary + features + next milestone only — no code

## Instructions
- Status values: ✅ Done / ⏳ In progress / ⬜ Not started / 🚫 Blocked
- If project is greenfield, say so clearly — "0% implemented, planning complete"
- Never invent progress — only report what git log and file structure confirm
- Save to `./docs/reports/YYYY-MM-DD.md` before displaying
