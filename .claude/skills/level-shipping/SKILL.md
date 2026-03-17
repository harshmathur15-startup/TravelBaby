---
name: level-shipping
description: Level Shipping Skill
---

# Level Shipping Skill

Measure what was shipped — speed, quality, and reliability. Only meaningful in product projects with git history.

Consolidates: level-velocity + level-outcomes.

## Workflow

Run `git log --oneline --stat --since="90 days ago"` to gather raw data. Score 8 dimensions:

### Velocity (max 100)

**V1: Throughput** — `feat:` commits per active week
- >10/week=25 | 5-10=20 | 2-4=15 | 1=10 | 0=0

**V2: Precision** — `fix:` commits as % of all commits (lower = better)
- <10%=25 | 10-20%=20 | 20-35%=15 | 35-50%=10 | >50%=5

**V3: Scope per Task** — avg unique dirs touched per `feat:` commit
- >5=25 | 3-5=20 | 2=15 | 1=10 | 0=0

**V4: Consistency** — active days as % of 90-day window
- >60%=25 | 40-60%=20 | 20-40%=15 | 10-20%=10 | <10%=5

### Outcomes (max 100)

**O1: Reliability** — `fix:` within 7 days of `feat:` / total feats (lower = better)
- <5%=25 | 5-15%=20 | 15-30%=15 | 30-50%=10 | >50%=5

**O2: Test Discipline** — test files / source files ratio
- >60%=25 | 40-60%=20 | 20-40%=15 | 10-20%=10 | <10%=5

**O3: Code Health** — violations (files >300 lines, console.logs, ownerless TODOs)
- 0=25 | 1-3=20 | 4-6=15 | 7-10=10 | >10=5

**O4: Spec Delivery** — specs shipped / specs written
- >80%=25 | 60-80%=20 | 40-60%=15 | 20-40%=10 | <20%=5

## Output Format

```
## Shipping Assessment

| Dimension | Score | Signal |
|---|---|---|
| Throughput | X/25 | X feat/week |
| Precision | X/25 | X% rework rate |
| Scope | X/25 | X dirs/feat avg |
| Consistency | X/25 | X% active days |
| **Velocity** | **X/100** | |
| Reliability | X/25 | X% bug-after-feat |
| Test Discipline | X/25 | X% coverage |
| Code Health | X/25 | X violations |
| Spec Delivery | X/25 | X% shipped |
| **Outcomes** | **X/100** | |

**Shipping: Velocity X/100 + Outcomes X/100 = X/200 — [label]**
```

## Level Labels
| Score /200 | Label |
|---|---|
| 160-200 | Elite |
| 120-159 | Advanced |
| 80-119 | Developing |
| 40-79 | Beginner |
| <40 | Getting Started |

## Instructions
- If <10 commits, note "Insufficient data" and score conservatively
- Only count conventional commits for velocity dimensions
- If no specs/ folder, score O4=5
- If no test files, score O2=5
- Be honest — do not inflate
- This skill requires git history with conventional commits — if <10 commits exist, note insufficient data
