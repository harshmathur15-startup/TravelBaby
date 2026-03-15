# Level Prompting Skill

Run a behavioral assessment of Layer 1 (Prompting) across 22 habits in 8 categories.

## Rubric

Score each habit by observing behavior in the current session and prior session context (MEMORY.md, corrections, message patterns).

| Rating | Label | Pts |
|---|---|---|
| Strong | Consistent, natural, unprompted | 4 |
| Good | Present but not always consistent | 3 |
| Developing | Emerging — sometimes done | 2 |
| Weak | Rarely done, needs attention | 1 |
| No evidence | Not observed | 0 |

Max score: 22 habits × 4 pts = **88 pts**

## 22 Habits Across 8 Categories

| Category | Habit |
|---|---|
| Precision | Specify output format |
| Precision | Specify depth (brief / go deep) |
| Precision | Name specific file/function/area |
| Context Loading | Reference prior context explicitly |
| Context Loading | Use @file references |
| Context Loading | Load docs/specs before asking |
| Iteration | Build on prior output |
| Iteration | Refine incrementally |
| Iteration | Chain tasks logically |
| Correction | Correct errors immediately |
| Correction | Explain WHY it was wrong |
| Correction | Persist corrections across messages |
| Scope Control | Keep tasks focused |
| Scope Control | Say stop/wait when needed |
| Scope Control | Avoid scope creep |
| Pre-task Thinking | Ask before executing |
| Pre-task Thinking | Signal Plan Mode need |
| Pre-task Thinking | Break large tasks down |
| Session Hygiene | Use /kickoff at session start |
| Session Hygiene | Use /compact proactively |
| Session Hygiene | Use /wrap intentionally |
| Trust Calibration | Delegate appropriately |

## Output Format

Produce a table with these exact columns:

| Category | Habit | Behavior Observed | Rating | Pts |
|---|---|---|---|---|
| ... | ... | One concrete observation from session | Strong / Good / Developing / Weak / No evidence | 0–4 |

Then below the table:

**Total: X/88 = Y% — [Level]**

**Change from last session:** +/- Z pts. [What changed.]

**Still weak:** [list the Weak / No evidence habits]

## Level Labels
| Score | % | Label |
|---|---|---|
| 79–88 | 90–100% | Elite |
| 66–78 | 75–89% | Advanced |
| 44–65 | 50–74% | Developing |
| 22–43 | 25–49% | Beginner |
| 0–21 | 0–24% | Untouched |

## After Scoring
Include the prompting score and level in the output summary.

## Instructions
- Observe behavior from the **current session** — do not fabricate
- If a habit is not observable in this session, check MEMORY.md for prior corrections
- Be honest — do not inflate scores to make the user feel good
- One concrete behavior observed per row — never leave it vague
- Total output: table + 3 summary lines only
