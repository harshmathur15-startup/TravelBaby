# Level Collaboration Skill

Assess the quality of the working relationship with Claude across 15 parameters.

## Rubric

| Rating | Label | Pts |
|---|---|---|
| Strong | Consistent, natural, unprompted | 4 |
| Good | Present but not always consistent | 3 |
| Developing | Emerging — sometimes done | 2 |
| Weak | Rarely done | 1 |
| No evidence | Not observed | 0 |

Max score: 15 parameters × 4 pts = **60 pts**

## 15 Parameters

| # | Parameter | What it measures |
|---|---|---|
| 1 | Correction precision | "Wrong because X, do Y" — not just "wrong" |
| 2 | Correction persistence | Corrections hold across sessions |
| 3 | Meta-awareness | Knows how they work, not just what they want |
| 4 | Relationship design | Explicitly negotiated how Claude should behave |
| 5 | Catches Claude overreach | Flags when Claude acts beyond scope |
| 6 | Iteration pattern | Deliberate refinement, not random |
| 7 | Tolerates honest feedback | Doesn't shut down criticism — invites it |
| 8 | Scope control | Stops drift before it compounds |
| 9 | Delegation quality | Trusts without micromanaging |
| 10 | System thinking | Builds rules + memory + skills together, not in isolation |
| 11 | Curiosity about the mechanism | Asks why things work, not just what to do |
| 12 | Separates learning from executing | Clear mode switching |
| 13 | Proactive memory hygiene | Ensures important things get written down |
| 14 | Challenges Claude's reasoning | Doesn't accept output blindly |
| 15 | Consistent identity across sessions | Same style, corrections, standards — not erratic |

## Output Format

| # | Parameter | Behavior Observed | Rating | Pts |
|---|---|---|---|---|
| 1 | Correction precision | One concrete observation | Strong / Good / Developing / Weak / No evidence | 0–4 |
| ... | | | | |

Then:

**Total: X/60 = Y% — [Level]**

**Change from last session:** +/- Z pts. [What changed.]

**Top gaps:** [list the 2–3 lowest scoring parameters]

## Level Labels
| Score | % | Label |
|---|---|---|
| 54–60 | 90–100% | Elite |
| 45–53 | 75–89% | Advanced |
| 30–44 | 50–74% | Developing |
| 15–29 | 25–49% | Beginner |
| 0–14 | 0–24% | Untouched |

## After Scoring
Include the collaboration score and level in the output summary.

## Instructions
- Observe behavior from current session + MEMORY.md corrections
- Be honest — do not inflate to make the user feel good
- One concrete behavior observed per row — never vague
- This rubric is unique — it measures relationship quality, not tool usage
