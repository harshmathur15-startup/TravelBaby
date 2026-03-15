---
name: glevel
description: Global benchmark — search GitHub for public Claude Code setups, score them on a 4-dimension quality rubric (volume + integration + automation + depth), and rank this project against the best public setups worldwide.
---

# Global Level Skill

Compare this project's Claude Code setup against the best public setups on GitHub.
Scores quality, not just quantity — volume alone doesn't win.

## The 4-Dimension Rubric (max 100)

### Dimension 1 — Volume (max 30)
What exists in the setup.

| Signal | Points |
|---|---|
| Skills: 40+ = 15, 20–39 = 10, 10–19 = 7, 5–9 = 4, 1–4 = 2 | 15 |
| Rules: 8+ = 8, 5–7 = 6, 3–4 = 4, 1–2 = 2 | 8 |
| Agents configured (skills or src/): 10+ = 7, 3–9 = 5, 1–2 = 3 | 7 |

### Dimension 2 — Integration (max 25)
Do the pieces work together as a system, not just a collection?

| Signal | Points |
|---|---|
| Skills call agents (Agent tool usage inside a skill) | 8 |
| Wrap/kickoff update MEMORY.md automatically | 7 |
| Hooks protect memory or enforce standards (not just format) | 5 |
| Skills reference other skills (meta-skills exist) | 5 |

### Dimension 3 — Automation (max 25)
What runs without the user asking?

| Signal | Points |
|---|---|
| PreToolUse hooks (block dangerous commands) | 7 |
| PostToolUse hooks (auto-format, auto-log, auto-sync) | 8 |
| Background agents (scripts/ or cron-triggered) | 5 |
| MCP servers configured | 5 |

### Dimension 4 — Depth (max 20)
Quality of the single most sophisticated artifact.

| Signal | Points |
|---|---|
| Agent has: iteration cap + output contract + write scope defined | 8 |
| Agent has: heartbeat / status tracking / observability | 6 |
| MEMORY.md has: preferences + decisions + build order (not just notes) | 6 |

**Max total: 100**

---

## Workflow

### Step 1 — Score This Project

Read in parallel:
- `.claude/skills/*/SKILL.md` — count skills, check for Agent tool usage
- `.claude/rules/` — count rules
- `.claude/settings.json` — hooks: PreToolUse? PostToolUse? what do they do?
- `~/.claude/projects/.../memory/MEMORY.md` — structure quality
- `agents/src/` — agents built? check for iteration cap, write scope, heartbeat
- `.claude/skills/wrap/SKILL.md` + `.claude/skills/kickoff/SKILL.md` — do they update memory?
- `scripts/` — background agent scripts?
- `~/.claude/mcp.json` or `.claude/mcp.json` — MCP configured?

Score across all 4 dimensions. Show dimension breakdown, not just total.

### Step 2 — Search GitHub (Agent)

Spawn a **GitHub Benchmark Agent** using the Agent tool:
- Agent name: GitHub Benchmark Agent
- What it does: searches GitHub and the web for public Claude Code setups
- What it reads: web search results only — no local files
- What it returns: scored table using the 4-dimension rubric
- Iteration cap: 8 | Write scope: none (read-only)

Agent instructions:
```
Search GitHub and the web for public repositories with Claude Code setups.

Use these search queries:
1. site:github.com ".claude/skills" SKILL.md
2. site:github.com "CLAUDE.md" ".claude/rules"
3. "claude code" custom skills agents hooks github
4. site:github.com ".claude/skills" BaseAgent OR "Agent tool"
5. "claude code" setup rules memory hooks github

For each repo found, extract signals for all 4 dimensions:

VOLUME:
- Skills count (count SKILL.md files or estimate from README)
- Rules count (.claude/rules/ files)
- Agents count (Agent tool usage OR BaseAgent subclasses)

INTEGRATION:
- Do any skills use the Agent tool? (skills call agents)
- Does wrap/kickoff update memory automatically?
- Do hooks do more than just format (protect, sync, block)?
- Do meta-skills exist (level, health, wrap, kickoff together)?

AUTOMATION:
- PreToolUse hooks present?
- PostToolUse hooks present? What do they do?
- Background scripts or cron agents?
- MCP servers configured?

DEPTH:
- Any agent with iteration cap + write scope + output contract defined?
- Any agent with heartbeat or status tracking?
- MEMORY.md with structured sections (not just notes)?

Score each dimension per the rubric. Return full table sorted by total score descending.
Always include rohitg00/awesome-claude-code-toolkit and affaan-m/everything-claude-code as baseline comparisons.
```

### Step 3 — Combine and Rank

Insert this project into the table at its scored position. Mark with ←.

### Step 4 — Gap Analysis

For every repo scoring higher on any dimension:
- Name the specific signal this project is missing
- State points available
- Estimate effort (Low / Medium / High)

---

## Output Format

```
## Global Claude Code Benchmark

| # | Repo | Vol /30 | Integ /25 | Auto /25 | Depth /20 | Total /100 |
|---|---|---|---|---|---|---|
| 1 | repo/name | 28 | 20 | 18 | 14 | 80 |
| → | **This project** | 26 | 22 | 18 | 18 | 84 |
| 2 | repo/name | 30 | 15 | 10 | 6 | 61 |

**Rank: #X of Y public setups scored**

---

### Dimension Breakdown — This Project

| Dimension | Score | Strongest signal | Weakest signal |
|---|---|---|---|
| Volume | X/30 | ... | ... |
| Integration | X/25 | ... | ... |
| Automation | X/25 | ... | ... |
| Depth | X/20 | ... | ... |

---

### Gap Analysis

| Gap | Dimension | Points | Effort | Concrete action |
|---|---|---|---|---|
| MCP servers | Automation | +5 | Low | Add ~/.claude/mcp.json with 1–2 servers |
| ... | ... | ... | ... | ... |

---

### Verdict
[2–3 lines: rank, what separates top setup from this one, single highest-ROI next action]
```

## Instructions
- Always run Step 1 and Step 2 in parallel
- Never score volume alone — all 4 dimensions must be assessed for every repo
- A repo with 135 shallow agents scores lower on Depth than one with 4 well-architected agents
- Insert this project into the ranked table — never show it separately
- Gap analysis: name the exact missing signal, not the category
- Verdict must name one concrete next action with effort estimate
- If GitHub search returns no results: score against cached repos (rohitg00, affaan-m, trailofbits)
- After output, include the glevel score and rank in the output summary
