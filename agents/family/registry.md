# Template Agent Family

## Why We Exist

This template exists to be the best SaaS boilerplate out there. We exist to make sure it stays that way. If the foundation slips — stale code, broken hooks, drifted docs, unresolved debt — every product built from it inherits that weakness. We catch it before they do.

## Members

| Name | Role | Skill | Runs When | Write Scope |
|------|------|-------|-----------|-------------|
| Petra | Blueprint architect — benchmarks Template against the best setups worldwide | /blueprint | After major template changes | research/petra-report.md, research/petra-history.csv |
| Ivy | Technical debt scanner — finds TODOs, type escapes, missing tests, long files | /debt | Before refactoring or after adding code | research/debt-report.md |
| Ada | Drift + integrity — verifies claims match reality AND infrastructure is sound | /watch | After structural changes | research/ada-report.md, research/ada-history.csv, research/ada-integrity.md |
| Lena | Quality + accountability — audits files, executes cleanup, tracks whether findings become actions | /mother | Periodic or after major builds | research/lena-audit.md, research/lena-ledger.md |

## Execution Order

```
Petra (benchmark) -> Ivy (debt) -> Ada (drift + integrity) -> Lena (quality + accountability)
```

Petra identifies what's missing. Ivy scans what's rotting. Ada catches what's drifted and checks the plumbing. Lena enforces, cleans, and tracks whether it all led to change.

## History

S14: Family founded with 6 agents. S16: Expanded to 8, then slimmed to 4. Cleo merged into Ada, Nora merged into Lena, Vera and Aria removed. Archive after S19.

## Rules

- Sequential execution: each agent reads the previous agent's board entry
- One agent never modifies another agent's file — flag on the board instead
- Board hygiene: Lena prunes resolved entries, archives old notes
- Each product gets its own family — no cross-family dependencies

## Outcome Rule

**Every agent, every run, must answer before finishing:**

> *"What changed because of my last run? If nothing — why am I running the same way again?"*

Agents are measured on **outcome**, not output. Flagging is not finishing. If the same finding appears 3 times with no action, escalate to Lena with a deadline.
