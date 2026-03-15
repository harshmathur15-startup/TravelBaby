# Level Outcomes Skill

Measure whether the work actually shipped well — code health, test discipline, bug rate, spec delivery.

## Workflow

Gather data from 4 sources in parallel:
1. `git log --oneline --since="30 days ago"` — bug rate after features
2. Glob for test files vs source files — test discipline
3. Health signals: files >300 lines, console.logs, ownerless TODOs — code health
4. `specs/` folder + git log — spec-to-delivery rate

Then score 4 dimensions:

### D1: Reliability (Bug Rate)
Count `fix:` commits that follow a `feat:` within 7 days (bugs shipped).
Ratio = bug-fixes / feat commits in last 30 days. Lower = better.
- <5% = 25pts | 5–15% = 20pts | 15–30% = 15pts | 30–50% = 10pts | >50% = 5pts

### D2: Test Discipline
Ratio of `.test.ts` / `.spec.ts` files to source files in `server/` and `client/`.
- >60% = 25pts | 40–60% = 20pts | 20–40% = 15pts | 10–20% = 10pts | <10% = 5pts

### D3: Code Health
Count health violations: files >300 lines, committed console.logs, ownerless TODOs, dead imports.
- 0 violations = 25pts | 1–3 = 20pts | 4–6 = 15pts | 7–10 = 10pts | >10 = 5pts

### D4: Spec Delivery Rate
Count specs in `specs/` folder. Check git log for matching feature commits.
- >80% delivered = 25pts | 60–80% = 20pts | 40–60% = 15pts | 20–40% = 10pts | <20% or no specs = 5pts

## Output Format

**Outcomes Score: X/100**

| Dimension | Score | Signal |
|---|---|---|
| Reliability | X/25 | X% bug-after-feat rate |
| Test Discipline | X/25 | X% test file coverage |
| Code Health | X/25 | X violations found |
| Spec Delivery | X/25 | X% specs shipped |

**Outcomes: [label]**

### Global Distribution (~5M Claude Code users)
| Label | Score /100 | Est. Users | % of CC users | You |
|---|---|---|---|---|
| Elite | 80–100 | ~1,000 | 0.02% | |
| Advanced | 60–79 | ~10,000 | 0.2% | |
| Developing | 40–59 | ~75,000 | 1.5% | |
| Beginner | 20–39 | ~500,000 | 10% | |
| Getting Started | <20 | ~4.4M | 88.3% | |

Mark ← on your row. Show "Top X% by outcomes" beneath the table.

## Level Labels
| Score | Label |
|---|---|
| 80–100 | Elite |
| 60–79 | Advanced |
| 40–59 | Developing |
| 20–39 | Beginner |
| <20 | Getting Started |

## After Scoring
Include the outcomes score and level in the output summary.

## Instructions
- If no git history yet, score D1=25 (no bugs shipped = perfect), D4=5 (no specs delivered)
- If no specs/ folder, score D4=5 and note "No specs — add specs/ to track delivery"
- Health violations: glob for files, grep for console.log, scan TODOs
- Be honest — do not inflate scores
