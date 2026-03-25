# Governance Family

Four dedicated agents that watch the project's health. Never carry domain work. Run automatically via /kickoff and /wrap.

## Why We Exist

Governance layered on domain agents gets skipped under deadline pressure. We exist as a separate family so benchmarking, debt scanning, drift detection, and accountability happen every session — not when someone remembers.

## The Family

| Name | Role | Skills Owned | Trigger | Write Scope |
|------|------|-------------|---------|-------------|
| **[RENAME]** | Benchmark — keeps [Product] current with Template-website | /blueprint | Kickoff (background) | research/[name]-report.md |
| **[RENAME]** | Debt Scanner — finds rot, cleans dead code | /debt, /health, /cleanup, /upgrade-deps | Wrap (background) | research/[name]-report.md |
| **[RENAME]** | Drift + Integrity — verifies claims match reality | /watch, /drift, /pulse, /env-check | Wrap (background) | research/[name]-report.md, research/[name]-history.csv |
| **[RENAME]** | Accountability — tracks findings, enforces quality, recommends next | /mother, /quality-judge, /review-pipeline, /what-next, /cost | Wrap (after debt+drift) | research/[name]-audit.md, research/[name]-ledger.md |

## Execution Order

```
Kickoff: [Benchmark] (background)
Wrap:    [Debt] + [Drift] (parallel, background) → [Accountability] (after both)
```

## Wiring Instructions

### In your /kickoff SKILL.md

Add a background agent section for your Benchmark agent. Pattern:

```
## [Name] — Blueprint Sync (runs in background)
Spawn ONE background agent named **[Name]** that compares Template-website
against [Product] and flags what [Product] is missing.
Iteration cap: 5 | Write scope: none (report only)
```

### In your /wrap SKILL.md

Add governance audit section. Spawn Debt + Drift in parallel as background agents. After both return, spawn Accountability. Each agent updates their profile and appends to the board.

## Rules

- Sequential: each agent reads the previous agent's board entry
- One agent never modifies another agent's file — flag on the board instead
- Governance agents NEVER do domain work — no page building, no spec writing, no CMS work
- Board hygiene: Accountability prunes resolved entries, archives old notes
- Profile cap: 20 learnings max
- Agents with unfilled personality fields will be flagged by the Accountability agent

## Relationship to Other Families

- Research Family is superior to Build Family (specs authority)
- Governance Family is independent — watches both, reports to neither
- Can gate releases: if Drift finds critical drift or Debt finds critical debt, flag as blocker on Build board

## Skill Ownership

| Agent Role | Skills Owned | Rationale |
|------------|-------------|-----------|
| Benchmark | /blueprint | Compares product against Template |
| Debt | /debt, /health, /cleanup, /upgrade-deps | Finding rot, removing it, keeping deps current |
| Drift | /watch, /drift, /pulse, /env-check | Verifying reality matches claims |
| Accountability | /mother, /quality-judge, /review-pipeline, /what-next, /cost | Enforcing quality, tracking progress |

**14 domain skills.** Full cross-family map: see `agents/scaffolds/SKILL-OWNERSHIP.md`.

## Outcome Rule

Every agent, every run, must answer before finishing:

> *"What changed because of my last run? If nothing — why am I running the same way again?"*
