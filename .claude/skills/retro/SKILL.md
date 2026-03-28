---
name: retro
description: Weekly retrospective — what went well, what didn't, what to change. Reads git log and notes to generate a structured reflection.
---

# Retro Skill

Weekly reflection. Compounds learning over time — what you learn this week makes next week better.

## Usage
`/retro` — last 7 days (default)
`/retro 2w` — last 2 weeks
`/retro sprint` — since last retro (reads previous retro file for date)

## Workflow

1. Run `git log --oneline --since="7 days ago"` — what was shipped
2. Run `git log --oneline --since="7 days ago" --diff-filter=R` — what was reverted or renamed (signals rework)
3. Check `./docs/retros/` for last retro (create dir if missing) — note what was flagged to improve
4. Read `MEMORY.md` — compare project status to where it was
5. Glob `./specs/*.md` — how many specs written vs implemented?
6. Compose the retro

## Output Format

Save to `./docs/retros/YYYY-MM-DD.md` (create directory if it doesn't exist) and display:

```markdown
# Retro: Week of YYYY-MM-DD

## Shipped
- <what was completed and merged>

## Metrics
| Metric | This Week |
|---|---|
| Commits | X |
| Specs written | X |
| Specs implemented | X |
| Reverts / rework | X |

## What Went Well
- <specific thing that worked — not generic>
- <specific thing that worked>

## What Didn't
- <specific friction point or mistake>
- <specific friction point or mistake>

## Carry-Forward from Last Retro
- [x] <item from last retro that was fixed>
- [ ] <item from last retro still unresolved>

## Changes for Next Week
- [ ] <concrete action — not vague intent>
- [ ] <concrete action>

## One Insight
[Single most important learning from this week — one sentence]
```

## Instructions
- "What Went Well" and "What Didn't" must be specific — "Claude helped" is useless, "spec-first approach prevented 2 reworks" is useful
- "Changes for Next Week" must be actionable and verifiable — not "be more careful"
- Always check carry-forwards from last retro — accountability matters
- If no previous retro exists, skip the carry-forward section
- Save before displaying — the file is the record
- After saving, update MEMORY.md "Project Status" if the retro reveals a status change
