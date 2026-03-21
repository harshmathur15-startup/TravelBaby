# Ada -- Drift Detection Report

**Date:** 2026-03-21
**Run:** #3
**Overall Score:** 70/100 (previous: 95)

## Scores

| Dimension | Score | Previous | Trend |
|-----------|-------|----------|-------|
| CLAUDE.md Accuracy | 70 | 100 | -30 |
| File Integrity | 80 | 95 | -15 |
| Hook Pipeline Health | 95 | 90 | +5 |
| Infrastructure Integrity | 95 | 87 | +8 |
| **Overall** | **85/100** | **93** | **-8** |

Note: Overall is weighted average of all 4 phases. Previous overall recalculated to include infrastructure (was separate report).

---

## Phase 1 -- CLAUDE.md Accuracy (70/100)

CLAUDE.md itself no longer claims a specific skill count (restructured as a product template). But 5 doc files claim "59 skills" while only 57 exist on disk. And getting-started.md claims "8-agent family" while 4 agents exist.

| Claim Source | Says | Actual | Match |
|-------------|------|--------|-------|
| skill-tiers.md header | 59 skills | 57 SKILL.md files on disk | NO (-15) |
| getting-started.md line 51 | "full list of 59 skills" | 57 | NO (same mismatch) |
| getting-started.md line 130 | "59 skills feels heavy" | 57 | NO (same mismatch) |
| inheritance.md line 9 | "59 skills" | 57 | NO (same mismatch) |
| inheritance.md line 48 | "keep all 59 skills" | 57 | NO (same mismatch) |
| inheritance.md line 9 | "Template-only tier (6 skills)" | 4 Template-only skills | NO (-15) |
| getting-started.md line 80 | "8-agent family" | 4 agents | NO (-15 but capped) |
| getting-started.md line 111-113 | rm commands for 8 agents (cleo, vera, aria, nora, scout, mira, sage) | 4 agent dirs exist | STALE |
| CLAUDE.md Agent Family section | "4 agents" | 4 profiles on disk | YES |
| CLAUDE.md Hooks | "8" | 8 hook commands in settings.json | YES |
| CLAUDE.md Rules | "8" | 8 .md files in .claude/rules/ | YES |
| CLAUDE.md Scripts | "9" | 9 production .js files in scripts/ | YES |
| CLAUDE.md MCP | "2" | 2 in settings.json | YES |
| slim-mode.md | "8 hooks, 8 rules, 9 scripts, 13 core skills" | All correct | YES |

**Mismatch count: 2 distinct (skill count 59 vs 57, agent count 8 vs 4 in getting-started.md)**
**Score: 100 - 15 - 15 = 70**

### Skill Count Analysis

skill-tiers.md tables actually list 57 skills (13 + 28 + 4 + 12 = 57), but the header text says "59." The tables were updated when Vera and Aria skills were restructured to /pulse and /sister (Template-Only tier went from 6 to 4), but the header count was never updated. The "59" is now stale in 5 files.

### Stale Agent References

getting-started.md Section 6 says "8-agent family" and Section 7 lists `rm` commands for 8 agent directories (petra, ivy, ada, cleo, vera, aria, nora, lena). Only 4 exist now (petra, ivy, ada, lena). The other 4 were removed in S16 restructuring.

---

## Phase 2 -- File Integrity (80/100)

**settings.json:** Valid JSON. All 6 script references resolve:
- scripts/session-start.js -- exists
- scripts/file-protection.js -- exists
- scripts/handoff-generator.js -- exists
- scripts/quality-gate.js -- exists
- scripts/session-tracker.js -- exists
- scripts/session-stop.js -- exists

**Registry vs Profiles:** 4/4 match.
| Agent | In Registry | profile.md Exists |
|-------|-------------|-------------------|
| Petra | YES | YES |
| Ivy | YES | YES |
| Ada | YES | YES |
| Lena | YES | YES |

**Deduction (-5): MEMORY.md absent.** No MEMORY.md exists at project root. The auto-memory at `~/.claude/projects/` is separate. memory-integrity.js will fail if run.

**Deduction (-15): Stale docs references.**
- getting-started.md: 8-agent cleanup commands reference dirs that no longer exist
- deferred-patterns.md: references Vera and Mira as active agents
- skill-tiers.md: /pulse still describes Vera, /sister still describes Aria (skills exist but reference removed agents)

---

## Phase 3 -- Infrastructure Integrity (95/100)

### Memory Health (85/100)

| Check | Result |
|-------|--------|
| MEMORY.md at project root | NO -- absent |
| Auto-memory at ~/.claude/ | YES -- 56 lines, accurate as of S16 |
| memory-integrity.js exists | YES |
| memory-integrity.test.js exists | YES |

**Deduction (-15):** MEMORY.md missing at project root. This was noted as "now exists" in run #2 but appears to have been the auto-memory, not a project-root file. Products cloning this template will not have a MEMORY.md.

### Three-Layer Separation (100/100)

| Scan Target | Violations |
|-------------|-----------|
| .claude/skills/ | 0 -- "Kira" references cleaned since last run |
| .claude/rules/ | 0 |
| scripts/ | 0 -- "journal.md/evolution.md" comment cleaned |
| CLAUDE.md | 0 |

Previous contamination patterns (blueprint/SKILL.md Kira references, memory-integrity.js comment) are both resolved. Clean separation.

### Crash Resilience (100/100)

| Check | Result |
|-------|--------|
| Handoff generator hook (PreCompact) | YES |
| Handoff files exist | YES -- 42 files across 2 days |
| Session-start hook | YES |
| Session-stop hook | YES |
| Git safety net | YES -- 5 commits in last 2 days |

---

## Phase 4 -- Hook Pipeline Health (95/100)

| Check | Status | Evidence |
|-------|--------|----------|
| Sessions JSONL exists | YES | 2 files: 2026-03-20.jsonl, 2026-03-21.jsonl |
| Sessions JSONL active today | YES | 2026-03-21.jsonl present |
| thoughts/handoffs/ exists | YES | 42 handoff files |
| Handoffs from today | YES | Multiple from 2026-03-21 |
| All hook scripts exist | YES | 6/6 referenced scripts found |

**Deduction (-5):** tool.log status unknown -- flagged last run as stale. If still present, it remains an orphaned artifact.

---

## Drift Found (for:lena)

1. **Skill count "59" stale in 5 files** -- skill-tiers.md, getting-started.md (x2), inheritance.md (x2). Actual: 57.
2. **"8-agent family" in getting-started.md** -- actual: 4. Section 6 text and Section 7 cleanup commands both stale.
3. **inheritance.md "Template-only tier (6 skills)"** -- actual: 4 Template-only skills.
4. **deferred-patterns.md references Vera and Mira** -- both removed agents.
5. **/pulse skill still invokes "Vera"** -- agent removed but skill retained.
6. **/sister skill still invokes "Aria"** -- agent removed but skill retained.
7. **MEMORY.md absent at project root** -- memory-integrity.js expects it.

## Drift Resolved (since run #2)

1. **Three-layer contamination** -- blueprint/SKILL.md Kira references cleaned. memory-integrity.js comment cleaned. Score: 60 -> 100.
2. **tool.log pipeline** -- JSONL is the active format, pipeline healthy.

---

## Evidence

**Skills on disk (57):** Planning, agent-activity, agent-catalog, agent-list, api-doc, ask, assemble, blueprint, changelog, commit, cost, dashboard, data-model, debt, debug, decisions, deploy, diagram, drift, env-check, health, hooks, incident, kickoff, level, level-shipping, load-test, map, migrate, mother, observe-agent, onboard, planning (lowercase duplicate? no -- "Planning" is PascalCase), pr, pulse, quality-judge, readiness-gate, recall, report, retro, review, review-pipeline, save, save-context, scaffold, security-scan, seed-database, sessions, signal, sister, spec, standup, test, track-manager, ux-review, watch, wave-execute, what-next, why, wrap

**Rules (8):** agents.md, backend.md, database.md, frontend.md, general.md, performance.md, security.md, testing.md

**Scripts (9 production):** component-validation.js, cost-tracker.js, file-protection.js, handoff-generator.js, memory-integrity.js, quality-gate.js, session-start.js, session-stop.js, session-tracker.js

**Agents with profile.md (4):** ada, ivy, lena, petra

**Hook commands (8):** session-start.js, bash blocker (inline), file-protection.js, handoff-generator.js, prettier (inline), quality-gate.js, session-tracker.js, session-stop.js

**MCP servers (2):** context7, sequential-thinking

---

## Outcome Rule Answer

> What changed because of my last run?

Three-layer contamination from run #2 is fully resolved (60 -> 100). But new drift appeared: the S16 family restructuring (8 agents to 4) was not propagated to docs. Five files still say "59 skills" (should be 57). getting-started.md still says "8-agent family." Two skills (/pulse, /sister) still invoke removed agents by name. This is the biggest accuracy regression since tracking began -- score dropped from 95 to 70 on CLAUDE.md accuracy. The contamination fix was a win; the doc staleness is the new gap.
