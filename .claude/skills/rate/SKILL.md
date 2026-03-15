---
name: rate
description: Rate the current project's Claude Code setup quality against top-tier standards.
---

# Rate Skill

Audit the current project's Claude Code setup and produce a scored rating.

## Workflow

1. Scan the project using Glob and Bash — do not ask the user for input
2. Score each category below
3. Output a rating table + overall score + gap list

## Categories to Check

### 1. Rules (max 20pts)
- Check `.claude/rules/` for files
- 8+ files = 20pts | 5–7 = 15pts | 3–4 = 10pts | 1–2 = 5pts | none = 0pts
- Bonus: path-scoped rules (frontmatter `paths:`) = +2pts (cap at 20)
- Check for: general.md, security.md, backend.md, frontend.md, agents.md, testing.md, database.md, performance.md

### 2. Skills (max 20pts)
- Check `.claude/skills/` for directories
- 16+ skills = 20pts | 10–15 = 15pts | 5–9 = 10pts | 1–4 = 5pts | none = 0pts
- Must-have: commit, show, save, Planning, test, pr, scaffold, review, debug, deploy

### 3. Hooks (max 15pts)
- Read `.claude/settings.json`
- Auto-format hook (Prettier/ESLint) = 5pts
- Dangerous-command blocker = 5pts
- Activity logger = 5pts

### 4. Project Config (max 15pts)
- `CLAUDE.md` exists and has content = 5pts
- `.env.example` exists = 3pts
- `tsconfig.json` with strict mode = 3pts
- `.prettierrc` exists = 2pts
- `.gitignore` exists = 2pts

### 5. CI/CD (max 10pts)
- `.github/workflows/` with a CI file = 10pts
- Has lint + test + typecheck steps = full marks | missing any = -3pts each

### 6. Infrastructure (max 10pts)
- `docker-compose.yml` with postgres = 5pts
- `docker-compose.yml` with redis = 3pts
- `eslint.config.js` exists = 2pts

### 7. Global Setup (max 10pts)
- `~/.claude/CLAUDE.md` exists = 5pts
- `~/.claude/rules/` has files = 3pts
- Global rules cover security + conventions = 2pts (check for both files)

## Scoring

| Score | Rating |
|---|---|
| 90–100 | Elite (top 5%) |
| 80–89 | Advanced (top 15%) |
| 70–79 | Solid (above average) |
| 50–69 | Getting there |
| < 50 | Needs work |

## Output Format

Print three sections:

### 1. Scorecard table
| Category | Score | Max | Notes |
|---|---|---|---|
| Rules | X | 20 | ... |
...
| **Total** | **X** | **100** | |

### 2. Overall rating
One line: `Setup Rating: X/100 — [label]`

### 3. Top gaps
Bullet list of the highest-impact missing items (max 5).
If score is 90+, say "No critical gaps."

## Instructions
- Use Glob to list files — do not run find or ls
- Read `.claude/settings.json` to check hooks
- Read `~/.claude/CLAUDE.md` to check global setup
- Be honest — do not inflate scores
- Keep gap descriptions short and actionable
