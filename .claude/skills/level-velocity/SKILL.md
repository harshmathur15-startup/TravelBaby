# Level Velocity Skill

Measure output efficiency — how much you ship, how precisely, and how consistently.

## Workflow

Run `git log --oneline --stat --since="90 days ago"` to gather raw data. Then score 4 dimensions:

### D1: Throughput
Count `feat:` commits per active week (weeks with ≥1 commit).
- >10/week = 25pts | 5–10 = 20pts | 2–4 = 15pts | 1 = 10pts | 0 = 0pts

### D2: Precision (Rework Rate)
Count `fix:` commits as % of all commits. Lower = better — high fix rate signals rework.
- <10% = 25pts | 10–20% = 20pts | 20–35% = 15pts | 35–50% = 10pts | >50% = 5pts

### D3: Scope per Task
Average unique directories touched per `feat:` commit.
- >5 dirs = 25pts | 3–5 = 20pts | 2 = 15pts | 1 = 10pts | 0 = 0pts

### D4: Consistency
Active days (days with ≥1 commit) as % of total days in the 90-day window.
- >60% = 25pts | 40–60% = 20pts | 20–40% = 15pts | 10–20% = 10pts | <10% = 5pts

## Output Format

**Velocity Score: X/100**

| Dimension | Score | Signal |
|---|---|---|
| Throughput | X/25 | X feat/week |
| Precision | X/25 | X% rework rate |
| Scope | X/25 | X dirs/feat avg |
| Consistency | X/25 | X% active days |

**Velocity: [label]**

### Global Distribution (~5M Claude Code users)
| Label | Score /100 | Est. Users | % of CC users | You |
|---|---|---|---|---|
| Elite | 80–100 | ~500 | 0.01% | |
| Advanced | 60–79 | ~5,000 | 0.1% | |
| Developing | 40–59 | ~50,000 | 1% | |
| Beginner | 20–39 | ~500,000 | 10% | |
| Getting Started | <20 | ~4.4M | 88.9% | |

Mark ← on your row. Show "Top X% by velocity" beneath the table.

## Level Labels
| Score | Label |
|---|---|
| 80–100 | Elite |
| 60–79 | Advanced |
| 40–59 | Developing |
| 20–39 | Beginner |
| <20 | Getting Started |

## After Scoring
Include the velocity score and level in the output summary.

## Instructions
- If git log has fewer than 10 commits, note "Insufficient data" and score conservatively
- Only count conventional commits (feat:, fix:, etc.) for D1/D2 — skip non-conventional
- If no conventional commits, estimate from message patterns
- Be honest — do not inflate scores
