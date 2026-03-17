---
name: level
description: Full project setup assessment — proxy scoring across 6 layers + behavioral habits audit.
---

# Level Skill

Full project assessment — proxy scoring and behavioral habits. Measures how well the Claude Code setup is configured, not AI personality.

## Part 1: Proxy Scoring (scan files)

Read in parallel, score each layer:

### L1: Prompting (max 25)
- `specs/` folder with files = +2pts each (max 10)
- `decisions/` folder exists = +5pts
- CLAUDE.md >10 lines = +5pts
- Rules are concrete/specific = +5pts

### L2: Configuration (max 25)
- CLAUDE.md exists = 5 | rules count: 8+=10, 5-7=7, 3-4=4, 1-2=2 | path-scoped=5 | hooks=5 | global CLAUDE.md=5
- Raw max 30 → normalize to 25

### L3: Skills (max 25)
- 30+=25 | 20-29=20 | 10-19=15 | 5-9=10 | 1-4=5
- Meta-skills (kickoff, wrap, level) = +5pts bonus (cap 25)

### L4: Memory (max 25)
- MEMORY.md exists with content=10 | User Preferences=5 | Arch Decisions=5 | decisions/ folder=5

### L5: Context (max 25)
- tool.log shows compact/fork/rewind = 5pts each | /save-context exists=5 | MEMORY.md <200 lines=5

### L6: Advanced (max 25)
- MCP config=10 | headless scripts=5 | worktree docs=5 | subagent usage=5

## Part 2: Behavioral Assessment (one agent)

Spawn ONE agent to assess behavioral dimensions. Agent scores each habit 0-4:

| Rating | Pts |
|---|---|
| Strong — consistent, natural | 4 |
| Good — present, not always | 3 |
| Developing — emerging | 2 |
| Weak — rarely | 1 |
| No evidence | 0 |

### Dimension A — Prompting (10 habits, max 40)
1. Specify output format
2. Specify depth (brief / go deep)
3. Name specific file/function/area
4. Reference prior context explicitly
5. Load docs/specs before asking
6. Build on prior output
7. Refine incrementally
8. Correct errors immediately and explain WHY
9. Keep tasks focused — avoid scope creep
10. Break large tasks down

### Dimension B — Context Management (8 habits, max 32)
1. Uses /kickoff at session start
2. States goal and "done" criteria upfront
3. Uses /compact proactively before context fills
4. Signals topic switches explicitly
5. Uses /wrap intentionally before closing
6. Saves important insights to memory mid-session
7. Keeps prompts tight — no filler
8. Corrects wrong outputs before they compound

### Dimension C — Project Quality (10 habits, max 40)
1. Correction precision — "wrong because X, do Y"
2. Corrections persist across sessions via memory
3. Specs written before code
4. Architecture decisions documented
5. Test discipline — tests accompany features
6. Code review before merge
7. Delegation quality — clear scope, clear constraints
8. System thinking — rules + memory + skills together
9. Challenges AI reasoning — doesn't accept blindly
10. Consistent standards across sessions

## Output Format

```
## Level Assessment

| Layer | Area | Proxy | Behavioral | Level |
|---|---|---|---|---|
| 1 | Prompting | X/25 | X/40 = Y% | ... |
| 2 | Configuration | X/25 | — | ... |
| 3 | Skills | X/25 | — | ... |
| 4 | Memory | X/25 | — | ... |
| 5 | Context | X/25 | X/32 = Y% | ... |
| 6 | Advanced | X/25 | — | ... |
| — | Project Quality | — | X/40 = Y% | ... |

Proxy: X/150 | Behavioral: X/112 = Y%
Red flags: [any metric <50%]
```

### Global Distribution
**By Setup:** Grand Master 130-150 | Expert 100-129 | Practitioner 70-99 | Apprentice 40-69 | Getting Started <40
**By Behavior:** Grand Master >85% | Expert 70-85% | Practitioner 50-70% | Apprentice 30-50% | Getting Started <30%

Mark ← on matching rows. Show "Top X% by setup | Top Y% by behavior."

## Instructions
- Run proxy scan and behavioral agent in parallel
- Be honest — do not inflate
- One concrete observation per behavioral habit
- Keep output under 40 lines
- Weakest layer recommendation must be specific and actionable
