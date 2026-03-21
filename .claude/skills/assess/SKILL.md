---
name: assess
description: Mid-session skill recommender — reads what you just built and suggests which skills to run now.
---

# Assess Skill

Reads the current session's work and recommends which skills to run right now. Not a review — a routing decision.

## Usage

`/assess` — assess based on current git diff
`/assess --full` — include time-based checks (what hasn't run recently)

## Workflow

### Step 1 — Read session state

Run in parallel:
```bash
git diff --stat HEAD
git diff --name-only HEAD
git log --oneline -5
```

Categorize changed files:

| Pattern | Category |
|---|---|
| `src/pages/`, `src/components/`, `*.astro` | Frontend / Pages |
| `server/`, `*.controller.ts`, `*.service.ts`, `*.routes.ts` | Backend / API |
| `sanity/schemas/`, `src/lib/queries.ts` | CMS |
| `agents/`, `*Agent*` | Agent code |
| `prisma/`, `*.migration.*` | Database |
| `*.test.*`, `*.spec.*` | Tests |
| `.claude/`, `scripts/`, `*.hook.*` | Harness / Infrastructure |
| `package.json`, `*.lock` | Dependencies |
| `src/styles/`, `tailwind.*`, `*.css` | Styling |
| `public/`, `*.png`, `*.jpg`, `*.svg` | Assets |
| `specs/`, `docs/` | Documentation |

### Step 2 — Map to skills

| What Changed | Run These | Why |
|---|---|---|
| Frontend / Pages | /test, /lighthouse, /seo-audit, /a11y-audit | New pages need quality verification |
| Backend / API | /test, /security-scan, /edge-case-check, /review | API code needs security + edge case coverage |
| CMS | /cms-sync | Schema changes must align with frontend queries |
| Agent code | /test, /edge-case-check, /observe-agent | Agent code needs iteration cap + contract verification |
| Database | /test, /data-model | Schema changes need validation |
| Tests | /test (just run them) | Verify tests pass |
| Dependencies | /test, /upgrade-deps | Verify nothing broke |
| Styling | /lighthouse | Performance impact check |
| Assets | /lighthouse | Image size + loading impact |
| Harness | /watch, /drift | Infrastructure changes need integrity verification |
| Documentation | /drift | Verify docs still match reality |
| Nothing changed | "No changes detected — what are we working on?" | |

### Step 3 — Time-based checks (--full flag only)

Read `.claude/tool.log` or git log to estimate when skills last ran:

| Condition | Recommend |
|---|---|
| No /security-scan in last 5 sessions | /security-scan — overdue |
| No /upgrade-deps in last 7 days | /upgrade-deps — check for outdated packages |
| No /lighthouse since pages were added | /lighthouse — frontend quality unknown |
| No /cleanup in last 10 sessions | /cleanup — dead code accumulates |
| Approaching roadmap milestone | /readiness-gate, /prod-ready |
| No /a11y-audit since components were added | /a11y-audit — accessibility unknown |

### Step 4 — Output

```
## Session Assessment

**Changes this session:** X files changed (Y insertions, Z deletions)

### Run Now (based on what you changed)

| # | Skill | Why | Priority |
|---|---|---|---|
| 1 | /test | 3 new service files — verify they work | High |
| 2 | /security-scan | New API endpoint at auth.routes.ts | High |
| 3 | /edge-case-check | processOrder() has no input validation | Medium |

### Overdue (--full only)

| # | Skill | Last Run | Recommendation |
|---|---|---|---|
| 1 | /upgrade-deps | 12 days ago | 8 outdated packages |
| 2 | /lighthouse | Never (3 pages added since) | Run on home + pricing |

### Not Needed Right Now
<list skills that don't apply to this session's changes>
```

## Instructions

- Keep output concise — 5-7 recommendations max, not the full skill catalog
- Priority: High = run before continuing. Medium = run before wrapping. Low = run next session.
- Don't recommend skills the user just ran (check git log for recent /assess, /test, etc.)
- If no changes detected, say so — don't fabricate recommendations
- --full adds time-based checks but takes longer (reads logs)
- This skill RECOMMENDS — it never auto-runs other skills
