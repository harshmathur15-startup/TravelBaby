---
name: what-next
description: AI project manager — reads git log, specs, todos, and PRs to recommend the highest-priority next task.
---

# What-Next Skill

Never wonder what to work on. Claude reads the full project state and recommends the best next task with reasoning.

## Workflow

1. Read `MEMORY.md` for project status and build order
2. Run `git log --oneline -20` — understand what's been built
3. Run `git status` — any in-progress work?
4. Glob `./specs/*.md` — list unimplemented specs (read each to check for implementation status)
5. Grep `TODO|FIXME|HACK` across `server/`, `client/`, `agents/` — find flagged debt
6. Run `gh pr list --state=open` if available — any PRs needing review?
7. Check `MEMORY.md` Critical Build Order — what's next in sequence?

## Reasoning Framework

Prioritize in this order:
1. **Blockers** — anything blocking other work (missing env.ts, BaseAgent, shared types)
2. **In-progress** — uncommitted changes or stashed work that should be finished first
3. **Critical build order** — next item in the defined sequence from MEMORY.md
4. **Open specs** — specs written but not implemented
5. **Tech debt** — TODOs flagged in code
6. **Nice to have** — anything else

## Output Format

```
## Recommended Next Task

**Task:** <specific, actionable task name>
**Why:** <1-2 sentence reasoning — what it unblocks, why now>
**Start here:** `<file path or command to begin>`

---

### Full Priority Queue
| # | Task | Type | Reason |
|---|---|---|---|
| 1 | <task> | Blocker/Build Order/Spec/Debt | <why> |
| 2 | ... | | |
| 3 | ... | | |
```

## Instructions
- Be decisive — recommend ONE task, not a list of options
- The "Start here" line tells Claude exactly where to begin
- Never recommend tasks that are already done (check git log first)
- If the project is greenfield with no commits, recommend the first item from Critical Build Order
- Keep the priority queue to max 5 items
