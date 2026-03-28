# Governance Family

Six dedicated agents that watch the project's health. Never carry domain work. Run automatically via /kickoff (not /wrap — kickoff gives you project health before you start building).

**Note:** Template's live agents (Thea, Nell, Priya in `agents/family/`) audit the template itself. Products should use this scaffold instead.

## Why We Exist

Governance layered on domain agents gets skipped under deadline pressure. We exist as a separate family so benchmarking, debt scanning, drift detection, and accountability happen every session — not when someone remembers.

## Core Four (run every session)

| Name | Role | Trigger | Write Scope |
|------|------|---------|-------------|
| **[RENAME]** | Benchmark — keeps [Product] current with Template-website | Kickoff (parallel, background) | none (report only) |
| **[RENAME]** | Quick Debt — scans recently changed files only | Kickoff (parallel, background) | [name]/profile.md, board.md |
| **[RENAME]** | Drift + Integrity — verifies claims match reality | Kickoff (parallel, background) | [name]/profile.md, board.md, research/[name]-report.md |
| **[RENAME]** | Accountability — tracks findings, enforces quality | Kickoff (after debt+drift) | [name]/profile.md, board.md, board-archive.md, research/[name]-audit.md, research/[name]-ledger.md |

## On-Demand (run via skill invocation)

| Name | Role | Trigger | Write Scope |
|------|------|---------|-------------|
| **[RENAME]** | Deep Debt — full codebase scan with trend tracking | `/debt` skill | research/debt-report.md |
| **[RENAME]** | Deep Drift — 4-phase scored audit | `/watch` skill | research/[name]-report.md, research/[name]-history.csv |

## Execution Order

```
Kickoff:
  Step 1: [Benchmark] + [Quick Debt] + [Drift] — parallel, background
  Step 2: [Accountability] — after Step 1 completes

On-demand:
  /debt  → [Deep Debt]
  /watch → [Deep Drift]
```

## Wiring Instructions

### In your /kickoff SKILL.md

Add governance cascade. Pattern:

```
## Governance Audit (runs in background at kickoff)

### Step 1 — [Benchmark] + [Quick Debt] + [Drift] (parallel)

Spawn THREE background agents simultaneously:

**[Benchmark]:** Compare Template-website against [Product], flag gaps.
Iteration cap: 5 | Write scope: none (report only)

**[Quick Debt]:** Scan files from `git diff --name-only HEAD~5`.
Iteration cap: 3 | Write scope: [name]/profile.md, board.md

**[Drift]:** Verify CLAUDE.md accuracy, hook health, agent registries.
Iteration cap: 5 | Write scope: [name]/profile.md, board.md, research/[name]-report.md

### Step 2 — [Accountability] (after Step 1)

Read board entries from Step 1. Compare against prior findings.
Score the session. Flag items open 3+ sessions as ESCALATE.
Iteration cap: 5 | Write scope: [name]/profile.md, board.md, board-archive.md
```

### In your /wrap SKILL.md

Add governance trend section that reads the latest accountability audit score.

## Rules

- Sequential: Accountability reads Debt and Drift board entries before running
- One agent never modifies another agent's file — flag on the board instead
- Governance agents NEVER do domain work — no page building, no spec writing, no CMS work
- Board hygiene: Accountability prunes resolved entries, archives old notes (50-line cap)
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
| Quick Debt | (none — runs inline at kickoff) | Fast scan, no standalone skill |
| Drift | (none — runs inline at kickoff) | Fast check, no standalone skill |
| Accountability | /mother, /quality-judge, /review-pipeline, /what-next, /cost | Enforcing quality, tracking progress |
| Deep Debt | /debt, /cleanup, /upgrade-deps | Full scan, dependency health |
| Deep Drift | /watch, /drift, /pulse, /env-check | Full audit, scored dimensions |

**16 domain skills.** Full cross-family map: see `agents/scaffolds/SKILL-OWNERSHIP.md`.

## Outcome Rule

Every agent, every run, must answer before finishing:

> *"What changed because of my last run? If nothing — why am I running the same way again?"*
