---
name: wave-execute
description: Dependency-aware parallel execution. Tasks declare dependencies, orchestrator launches in waves.
---

# Wave Execution

Borrowed from am-will/swarms + barkain (#12). Organizes tasks into dependency-aware waves for parallel execution.

## When It Runs
- During multi-agent build phases
- When a plan has 3+ independent tasks that could run in parallel
- Manually via `/wave-execute`

## Concepts

**Wave** — a group of tasks with no dependencies on each other. All tasks in a wave can execute in parallel.

**Dependency** — a task declares `depends_on: [task-id]`. It won't start until all dependencies are complete.

**File conflict detection** — before launching a wave, check if any tasks in the wave modify the same files. Same-file writes move to the next wave (sequential).

## Workflow

1. **Plan phase**: list all tasks with their dependencies and target files
2. **Wave scheduling**: topological sort → group into waves by dependency level
3. **Conflict check**: within each wave, verify no file overlaps
4. **Execute**: launch wave N agents in parallel (background), wait for all to complete
5. **Checkpoint**: verify outputs, resolve any issues, launch wave N+1

## Example

```
Task A: implement auth middleware → depends_on: []     → Wave 1
Task B: implement user model     → depends_on: []     → Wave 1
Task C: implement login endpoint → depends_on: [A, B]  → Wave 2
Task D: implement tests          → depends_on: [C]     → Wave 3
```

Wave 1: A + B run in parallel (different files)
Wave 2: C runs after both complete
Wave 3: D runs after C

## Instructions
- Minimum 2 tasks per wave to justify parallel execution
- Each agent in a wave gets `isolation: "worktree"` to prevent file conflicts
- After each wave, merge worktree results and verify no conflicts
- If a task in a wave fails, the entire wave pauses — don't proceed to the next wave
