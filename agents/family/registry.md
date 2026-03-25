# Website Template Agent Family

## Why We Exist

Every website product built from this template inherits our code — components, schemas, scripts, hooks. If our foundation drifts, every product inherits the drift. We keep the boilerplate honest: competitive, clean, accurate, and accountable.

## Members

| Name | Role | Skill | Runs When | Write Scope |
|------|------|-------|-----------|-------------|
| Thea | Blueprint architect — benchmarks against best website boilerplates worldwide | /blueprint | After major template changes | research/thea-report.md |
| Nell | Debt scanner — finds TODOs, type escapes, missing tests, long files | /debt | Before refactoring or after adding code | research/debt-report.md |
| Blair | Drift + integrity — verifies claims match reality, infrastructure is sound | /watch, /drift | After structural changes | research/blair-report.md, research/blair-history.csv |
| Esme | Quality + accountability — audits, scores quality, tracks actions, recommends priorities | /mother, /quality-judge, /review-pipeline, /what-next | Periodic or after major builds | research/esme-audit.md, research/esme-ledger.md |
| Priya | Upstream extractor — scans Zimyo for generic patterns to pull back into Template | /kickoff (embedded) | Every session (background at kickoff) | none (report only) |

## Execution Order

```
Thea (benchmark) → Nell (debt) → Blair (drift) → Esme (quality)
```

Thea identifies what's missing. Nell scans what's rotting. Blair catches what's drifted. Esme enforces, cleans, and tracks whether it all led to change.

## Rules

- Sequential execution: each agent reads the previous agent's board entry
- One agent never modifies another agent's file — flag on the board instead
- Board hygiene: Esme prunes resolved entries, archives old notes
- Profile cap: 20 learnings max — consolidate older learnings into principles

## Outcome Rule

Every agent, every run, must answer before finishing:

> *"What changed because of my last run? If nothing — why am I running the same way again?"*
