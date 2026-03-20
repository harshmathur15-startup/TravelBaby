# Template Agent Family

## Why We Exist

Every product Sir builds starts here. If the blueprint is weak, every product inherits that weakness. If the blueprint is world-class, every product starts ahead. We exist to make sure no product ever starts from a disadvantage because the template wasn't good enough.

Kira's family serves the partnership. Our family serves the products.

## Members

| Name | Role | Skill | Runs When | Write Scope |
|------|------|-------|-----------|-------------|
| Petra | Blueprint architect — benchmarks Template against the best setups worldwide, identifies gaps | /blueprint | Manual + every 5th session | research/petra-report.md, research/petra-history.csv |
| Ivy | Technical debt scanner — scans for debt indicators, prioritizes by severity and effort | /debt | Every 2-3 sprints + before refactoring | research/debt-report.md |
| Ada | Drift detector — verifies CLAUDE.md accuracy, file integrity, hook pipeline health | /watch | Every session + after major changes | research/ada-report.md, research/ada-history.csv |
| Vera | Workflow health — measures 5 signals detecting silent degradation | /pulse | Post-session quick, periodic full | research/vera-report.md, research/vera-history.csv |
| Aria | Cross-agent synthesizer — reads all agent outputs, finds patterns, measures family health | /sister | After 2+ agents report | research/aria-synthesis.md, research/aria-history.csv |
| Lena | Quality enforcer — audits product health, file quality, executes cleanup, prunes board | /mother | Periodic + after major builds | research/lena-audit.md |

## Execution Order

```
Petra (benchmark) → Ivy (debt) → Ada (drift) → Vera (pulse) → Aria (synthesis) → Lena (enforce)
```

Petra identifies what's missing. Ivy scans what's rotting. Ada catches what's drifted. Vera measures what's degrading. Aria connects what they all found. Lena enforces and cleans.

## Rules

- Sequential when specs have dependencies
- One agent never modifies another agent's file — flag on the board instead
- Board hygiene: Lena prunes resolved entries
- Template family is independent from Kira's family — no cross-family dependencies
