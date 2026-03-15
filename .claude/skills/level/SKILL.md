# Level Skill

Show current mastery level across the 6 layers of Claude Code.

## Workflow

Scan the project and score each layer:

### Layer 1: Prompting
Check for signals of deliberate prompting practice:
- `specs/` folder exists with files = +2pts each (max 10)
- `decisions/` folder exists = +5pts
- CLAUDE.md has more than 10 lines of content = +5pts
- `.claude/rules/` rules have concrete, specific instructions (not vague) = +5pts (read 2 random rules to judge)
- Max: 25pts

### Layer 2: Configuration
- CLAUDE.md exists and has content = 5pts
- `.claude/rules/` count: 8+ = 10pts | 5–7 = 7pts | 3–4 = 4pts | 1–2 = 2pts
- Path-scoped rules present (check frontmatter) = 5pts
- `settings.json` has hooks = 5pts
- `~/.claude/CLAUDE.md` exists = 5pts
- Max: 30pts → normalize to 25

### Layer 3: Skills
- 30+ skills = 25pts | 20–29 = 20pts | 10–19 = 15pts | 5–9 = 10pts | 1–4 = 5pts
- Has meta-skills (rate, health, kickoff, wrap, level) = +5pts bonus (cap at 25)
- Max: 25pts

### Layer 4: Memory
- `~/.claude/projects/.../memory/MEMORY.md` exists and has content = 10pts
- Has User Preferences section = 5pts
- Has Architectural Decisions section = 5pts
- `decisions/` folder with ADR files = 5pts
- Max: 25pts

### Layer 5: Context Management
- `tool.log` shows use of compact/fork/rewind = 5pts each (read last 50 lines)
- `/save-context` skill exists = 5pts
- MEMORY.md is under 200 lines (disciplined) = 5pts
- Max: 25pts

### Layer 6: Advanced
- MCP config present (`~/.claude/mcp.json` or `.claude/mcp.json`) = 10pts
- Headless scripts exist (`scripts/` with claude -p usage) = 5pts
- Worktree workflow documented in any rule or note = 5pts
- Subagent usage in any skill (Agent tool) = 5pts
- Max: 25pts

## Behavioral Assessments (parallel agents)

After proxy scoring, spawn all 4 behavioral assessments IN PARALLEL using the Agent tool — do not run them sequentially:

- **Agent 1 — L1 Prompting:** Read `.claude/skills/level-prompting/SKILL.md`. Observe current session behavior + MEMORY.md corrections. Return the full 22-habit score table + total X/88.
- **Agent 2 — L4 Memory:** Read `.claude/skills/level-memory/SKILL.md`. Read MEMORY.md + decisions/ folder. Return full score table + total X/64.
- **Agent 3 — L5 Context:** Read `.claude/skills/level-context/SKILL.md`. Observe session start/end/mid-session/token discipline. Return full score table + total X/64.
- **Agent 4 — Collaboration:** Read `.claude/skills/level-collaboration/SKILL.md`. Observe relationship quality from current session. Return full score table + total X/60.

Wait for all 4 agents to complete, then combine their results into the output table.

## Output Format

```
## Claude Code Mastery Level

| Layer | Area | Proxy Score | Behavioral Score | Level |
|---|---|---|---|---|
| 1 | Prompting | X/25 | X/88 = Y% | ... |
| 2 | Configuration | X/25 | — | ... |
| 3 | Skills | X/25 | — | ... |
| 4 | Memory | X/25 | X/64 = Y% | ... |
| 5 | Context Management | X/25 | X/64 = Y% | ... |
| 6 | Advanced | X/25 | — | ... |
| Collaboration | — | — | X/60 = Y% | ... |

- Proxy total: X/150
- Behavioral average: (L1% + L4% + L5% + Collab%) / 4 = Y%

**Overall: X/150 proxy — [label]**

---

### Global Distribution (~5M Claude Code users)

**By Setup (Proxy Score)**
| Label | Score /150 | Est. Users | % of CC users | You |
|---|---|---|---|---|
| Grand Master | 130–150 | ~250 | 0.005% | |
| Expert | 100–129 | ~2,500 | 0.05% | |
| Practitioner | 70–99 | ~25,000 | 0.5% | |
| Apprentice | 40–69 | ~250,000 | 5% | |
| Getting Started | <40 | ~4.7M | 94.5% | |

**By Behavior (Habit Average %)**
| Label | Avg % | Est. Users | % of CC users | You |
|---|---|---|---|---|
| Grand Master | >85% | ~100 | 0.002% | |
| Expert | 70–85% | ~1,000 | 0.02% | |
| Practitioner | 50–70% | ~15,000 | 0.3% | |
| Apprentice | 30–50% | ~200,000 | 4% | |
| Getting Started | <30% | ~4.8M | 95.7% | |

- Mark ← in Proxy table on row matching proxy total (X/150)
- Mark ← in Behavior table on row matching behavioral average %
- Show "Top X% by setup | Top Y% by behavior" beneath both tables.
```

## Level Labels (per layer)
| Score | Label |
|---|---|
| 20–25 | Elite |
| 15–19 | Advanced |
| 10–14 | Intermediate |
| 5–9 | Beginner |
| 0–4 | Untouched |

## Overall Labels
| Total | Label |
|---|---|
| 130–150 | Grand Master |
| 100–129 | Expert |
| 70–99 | Practitioner |
| 40–69 | Apprentice |
| < 40 | Getting Started |

## After Scoring
Include all scores and levels in the output summary — proxy totals, behavioral percentages, and per-layer breakdowns.

## Instructions
- Read files in parallel where possible
- Be honest — do not inflate scores
- The "weakest layer" recommendation must be specific and actionable, not generic
- Keep total output under 30 lines
