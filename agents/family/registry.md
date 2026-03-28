# Website Template Agent Family

**These agents audit the template itself.** Products should use the governance scaffold at `agents/scaffolds/governance/` instead — it provides 6 roles (4 core + 2 on-demand) with `[RENAME]` placeholders.

## Why We Exist

Every website product built from this template inherits our code — components, schemas, scripts, hooks. If our foundation drifts, every product inherits the drift. We keep the boilerplate honest: competitive, clean, accurate, and accountable.

## Members

| Name | Role | Runs When | Write Scope |
|------|------|-----------|-------------|
| Thea | Blueprint architect — benchmarks against best website boilerplates | After major template changes | research/thea-report.md |
| Nell | Debt scanner — finds TODOs, type escapes, missing tests, long files | Before refactoring or after adding code | research/debt-report.md |
| Priya | Upstream extractor — scans products for generic patterns | Every session (background at kickoff) | none (report only) |

## Execution Order

```
Thea (benchmark) → Nell (debt)
```

Thea identifies what's missing. Nell scans what's rotting. `/quality-judge` (extended skill) handles code scoring without needing a dedicated agent.

## Notes

- Blair (drift + integrity) removed S33 — replaced by SessionStart hooks: `drift-check.cjs`, `memory-integrity.cjs`, `component-validation.cjs`
- Esme (quality + accountability) removed S33 — `/quality-judge` works standalone, `/mother` was redundant with hooks
- `/review-pipeline` and `/what-next` removed — covered by `/review` (core) and `/report` (core)

## Rules

- Sequential execution: each agent reads the previous agent's board entry
- One agent never modifies another agent's file — flag on the board instead
- Board hygiene: first agent in a session prunes resolved entries
- Profile cap: 20 learnings max — consolidate older learnings into principles

## Outcome Rule

Every agent, every run, must answer before finishing:

> *"What changed because of my last run? If nothing — why am I running the same way again?"*
