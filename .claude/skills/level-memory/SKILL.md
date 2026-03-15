# Level Memory Skill

Assess the quality of the memory system across 4 dimensions.

## Rubric

| Rating | Label | Pts |
|---|---|---|
| Strong | Consistent, complete, no drift | 4 |
| Good | Present, minor gaps | 3 |
| Developing | Exists but shallow or stale | 2 |
| Weak | Barely present | 1 |
| No evidence | Missing entirely | 0 |

Max score: 16 habits × 4 pts = **64 pts**

## 16 Habits Across 4 Dimensions

| Dimension | Habit |
|---|---|
| MEMORY.md Quality | Under 200 lines (disciplined, not bloated) |
| MEMORY.md Quality | User Preferences section exists and is specific |
| MEMORY.md Quality | Project Status is current (not stale) |
| MEMORY.md Quality | Architectural Decisions section exists |
| ADR Coverage | decisions/ folder exists |
| ADR Coverage | ADRs exist for all major tech choices |
| ADR Coverage | Each ADR has decision + reason + consequences |
| ADR Coverage | ADRs are written at decision time, not after |
| Notes Quality | knowledge.md exists and has content |
| Notes Quality | Notes are organized by topic, not chronological |
| Notes Quality | Key frameworks and patterns saved |
| Notes Quality | No stale or redundant entries |
| Memory Hygiene | Memory updated after significant changes |
| Memory Hygiene | Corrections from Claude saved immediately |
| Memory Hygiene | No important decisions left only in conversation |
| Memory Hygiene | MEMORY.md audited proactively (not just on request) |

## Output Format

| Dimension | Habit | Evidence | Rating | Pts |
|---|---|---|---|---|
| ... | ... | One concrete observation | Strong / Good / Developing / Weak / No evidence | 0–4 |

Then:

**Total: X/64 = Y% — [Level]**

**Change from last session:** +/- Z pts. [What changed.]

**Still weak:** [list gaps]

## Level Labels
| Score | % | Label |
|---|---|---|
| 58–64 | 90–100% | Elite |
| 48–57 | 75–89% | Advanced |
| 32–47 | 50–74% | Developing |
| 16–31 | 25–49% | Beginner |
| 0–15 | 0–24% | Untouched |

## After Scoring
Include the memory score and level in the output summary.

## Instructions
- Read MEMORY.md, decisions/ folder, and knowledge.md
- Be honest — do not inflate
- One concrete evidence observation per row
