# Petra — Blueprint Report (2026-03-20)

**Template Score: 62/100 | Rank: #4 of 6 setups**

| Dimension | Score | Max | Strongest | Weakest |
|-----------|-------|-----|-----------|---------|
| Volume | 23/30 | 30 | 55 skills (15), 8 rules (8), 2 agents (0 — need 3+) | Only 2 agents registered |
| Integration | 17/25 | 25 | Skills call agents: blueprint+mother spawn agents (8). Meta-skills exist: blueprint, mother, observe-agent (5) | wrap/kickoff don't update memory automatically via hooks (4/7). Hooks enforce standards but only format+typecheck (3/5) |
| Automation | 14/25 | 25 | PreToolUse: bash blocker + file protection (5/7). PostToolUse: prettier + quality-gate + tool logger (6/8) | No background scripts triggered by hooks (0/5). No MCP servers (0/5) |
| Depth | 8/20 | 20 | Agent contracts documented in agents.md rule (5/8 — contracts exist but only 2 agents use them) | No structured observability pipeline (2/6 — tool.log exists but no dashboard). Memory is unstructured beyond MEMORY.md pattern (1/6) |

---

## Competitive Table

| # | Setup | Vol /30 | Integ /25 | Auto /25 | Depth /20 | Total |
|---|-------|---------|-----------|----------|-----------|-------|
| 1 | ECC (82K stars) | 28 | 22 | 23 | 14 | 87 |
| 2 | wshobson (31.5K stars) | 27 | 20 | 16 | 12 | 75 |
| 3 | barkain (35 stars) | 14 | 18 | 24 | 16 | 72 |
| **4** | **This Template** | **23** | **17** | **14** | **8** | **62** |
| 5 | BMAD (41K stars) | 18 | 19 | 8 | 14 | 59 |
| 6 | davila7 (23K stars) | 26 | 10 | 12 | 5 | 53 |

### Scoring Rationale

**ECC (87):** 108 skills, 25 agents, 14 MCP configs, 17 hooks across 6 lifecycle events, continuous learning system with confidence scoring, AgentShield security scanner, orchestration pipelines, cost tracking. Loses points on depth: agents are stateless, no contracts, no accountability. Volume and automation are dominant.

**wshobson (75):** 129 skills, 115 agents, 67 plugins, per-agent model routing, Conductor project management, multi-phase review pipeline with checkpoints, team presets. Plugin isolation is strong integration. Loses on automation: fewer hook scripts than ECC/barkain. Depth weakened by stateless agents.

**barkain (72):** Only 8 agents and ~10 skills, but the deepest hook system: 15 scripts across 6 lifecycle events, tool allowlist enforcement, task graph validation, token rewriting, workflow continuation. Integration is strong: hooks enforce delegation, agents return file paths not content. Low volume, high automation+depth.

**BMAD (59):** 9 named agents, 34 workflows, 4-phase methodology, implementation readiness gates, adversarial review. Strong integration (document handoffs between phases) and depth (structured methodology). Weak automation: no hooks, no scripts, human-driven workflow. Low volume.

**davila7 (53):** 600+ agents, 200+ commands in a marketplace. Massive volume but thin integration (components don't know about each other), minimal automation (component validation only), almost no depth (stateless templates).

**This Template (62):** 55 skills, 8 rules, 2 agents, 6 scripts, 4 hook configurations. Good volume for a curated setup. Integration is above average — skills call agents, meta-skills exist. Automation is held back by zero MCP servers and no background hook scripts. Depth is the weakest dimension: agent contracts are documented but only 2 agents exist to use them, observability is minimal (tool.log only), memory is pattern-based not structured.

---

## Gaps That Matter for Products

| # | Gap | Dimension | Points | Effort | Why Products Need It |
|---|-----|-----------|--------|--------|---------------------|
| 1 | **PostToolUse TypeScript type-check runs full tsc on every edit** — barkain/ECC scope checks to the edited file only via targeted tsc flags | Automation | +2 | Low | Products with 500+ TS files will suffer 15s hook delays on every edit. Scoped typecheck keeps the feedback loop fast |
| 2 | **No SessionStart hook to load project context automatically** — ECC/barkain inject context at session start via hooks | Automation | +3 | Medium | Products inherit the template but still need manual /kickoff. An automated SessionStart hook that loads CLAUDE.md + recent handoff + git status eliminates "catch me up" overhead |
| 3 | **No Stop hook for session-end persistence** — ECC saves session summary + cost tracking automatically on stop | Automation | +2 | Medium | Products lose context when sessions end without /wrap. A Stop hook that auto-saves session state prevents knowledge loss |
| 4 | **Only 2 agents — below the 3+ threshold** — template needs at least one more agent to earn the volume points | Volume | +7 | Low | A third agent (e.g., a code reviewer or security auditor) gives products a baseline review capability out of the box |
| 5 | **No structured observability beyond tool.log** — barkain has statusline + turn duration tracking; ECC has cost tracking per session | Depth | +4 | Medium | Products need visibility into agent runs, session costs, and context usage to debug slow sessions and control spend |
| 6 | **No file-based inter-agent communication** — barkain's DONE\|{path} pattern saves ~20K tokens per agent return | Depth | +3 | Low | Products with multi-agent workflows will exhaust context windows if agents dump full results into the main conversation |
| 7 | **No implementation readiness gate** — BMAD's 6-step validation before coding starts catches spec drift | Integration | +2 | Medium | Products that follow the roadmap (PRD -> Architecture -> Build) need a formal checkpoint before development starts. Without it, drift between specs and code goes undetected |
| 8 | **No MCP server configurations** — ECC has 14 MCP configs for context7, firecrawl, exa, etc. | Automation | +3 | Low | Products need access to live documentation, web search, and external APIs. MCP configs are one-time setup that every product benefits from |
| 9 | **No adversarial review mandate** — BMAD's "must find issues" review principle forces thoroughness | Integration | +1 | Low | Product code reviews that say "looks good" provide zero value. An adversarial mandate in the review skill forces genuine analysis |

---

## Gaps That Don't Matter (Skip)

| # | Gap | Why Skip |
|---|-----|---------|
| 1 | 600+ agents (davila7) / 115 agents (wshobson) / 25 agents (ECC) | Quantity of stateless prompt templates has zero correlation with product quality. 2 agents with contracts and memory beat 100 without |
| 2 | Multi-platform support (Cursor, Codex, OpenCode) | Template serves one platform (Claude Code). Cross-platform adds complexity without product value |
| 3 | Plugin marketplace / distribution model | Template is private. Distribution infrastructure solves a problem that doesn't exist |
| 4 | Continuous learning / instinct system (ECC) | Automated pattern extraction sounds good but adds significant complexity. Manual feedback-to-personality is more reliable and simpler. Products don't need their AI to self-evolve |
| 5 | Agent Teams / parallel execution (wshobson) | Experimental Claude Code feature. Not stable enough for product templates. Sequential with good contracts is more reliable |
| 6 | Personality per agent (BMAD's named personas) | Template agents need competence, not personality. Personality is Kira's domain, not the template's |
| 7 | Token rewriting hook (barkain) | Clever optimization but adds a fragile layer. The tokens saved don't justify the debugging cost when a rewrite breaks a command |
| 8 | Tool allowlist / forced delegation (barkain) | Appropriate for orchestration-heavy setups. Overkill for a template — products should be able to use tools directly when simple tasks don't need agent decomposition |
| 9 | Distillator / document compression (BMAD) | Interesting concept but solves a problem that rarely surfaces. Context windows are large enough. Build only when a product actually hits context limits |
| 10 | SEO agents, blockchain agents, gaming agents (wshobson) | Domain-specific agents belong in products, not in the template |

---

## Single Highest-ROI Action

**Add a SessionStart hook that auto-loads project context.**

Build a `scripts/session-start.js` that fires on SessionStart and injects: (1) last handoff file from `thoughts/handoffs/`, (2) last 5 git log entries, (3) git status. This replaces the need for manual `/kickoff` in every session, prevents the "blank slate" problem for every product that inherits the template, and costs about 30 minutes to build. Estimated score impact: +3 points on Automation, moving Template to 65/100.

This is higher ROI than adding a third agent (which adds volume points but no daily workflow improvement) because it runs automatically on every session start across every product — zero discipline required.
