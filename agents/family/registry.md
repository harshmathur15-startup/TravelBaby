# Website Template Agent Family

**These agents audit the template itself.** Products should use the governance scaffold at `agents/scaffolds/governance/` instead — it provides 6 roles (4 core + 2 on-demand) with `[RENAME]` placeholders.

## Why We Exist

Every website product built from this template inherits our code — components, schemas, scripts, hooks. If our foundation drifts, every product inherits the drift. We keep the boilerplate honest: competitive, clean, accurate, and accountable.

## Members

| Name | Group | Role | Runs When | Write Scope |
|------|-------|------|-----------|-------------|
| Thea | Governance | Blueprint architect — benchmarks against best website boilerplates | After major template changes | research/thea-report.md |
| Nell | Governance | Debt scanner — finds TODOs, type escapes, missing tests, long files | Before refactoring or after adding code | research/debt-report.md |
| Mira | Governance | Drift + integrity — verifies docs match codebase reality | After structural changes | research/mira-report.md, research/mira-integrity.md |
| Anvi | Governance | Quality + accountability — audits health, tracks promises vs delivery | Periodic or after major builds | research/anvi-audit.md, research/anvi-ledger.md |
| Priya | Upstream | Upstream extractor — scans products for generic patterns | Every session (background at kickoff) | none (report only) |

## Execution Order

```
Thea (benchmark) → Nell (debt) → Mira (drift) → Anvi (quality)
```
Priya runs in background (upstream extraction at kickoff).

Thea identifies what's missing. Nell scans what's rotting. Mira catches when docs drift from reality. Anvi enforces quality and tracks accountability.

## Notes

- Blair (drift + integrity) removed S33 — replaced by hooks. Mira added S38 as dedicated agent (deeper than hooks alone)
- Esme (quality + accountability) removed S33 — `/quality-judge` standalone. Anvi added S38 for cumulative tracking hooks can't do
- `/review-pipeline` and `/what-next` removed — covered by `/review` (core) and `/report` (core)

## Rules

- Sequential execution: each agent reads the previous agent's board entry
- One agent never modifies another agent's file — flag on the board instead
- Board hygiene: first agent in a session prunes resolved entries
- Profile cap: 20 learnings max — consolidate older learnings into principles

## Outcome Rule

Every agent, every run, must answer before finishing:

> *"What changed because of my last run? If nothing — why am I running the same way again?"*
