---
name: debug
description: Structured debugging workflow — reproduce, isolate, and fix bugs systematically.
disable-model-invocation: true
---

# Debug Skill

## Workflow
1. **Reproduce** — confirm the bug is reproducible with exact steps
2. **Read logs** — check server logs, browser console, and network tab
3. **Isolate** — narrow down to the smallest failing unit (component, function, query)
4. **Hypothesize** — state what you think is wrong before changing anything
5. **Fix** — make the minimal change to resolve the issue
6. **Verify** — confirm the bug is gone and no regressions introduced

## Common Starting Points
| Symptom | Where to look first |
|---|---|
| API returns 500 | Server logs, service layer, DB query |
| Wrong data returned | Prisma query, service logic, response mapping |
| UI not updating | Zustand store, component re-render, stale cache |
| Agent not triggering | BullMQ queue, job registration, worker logs |
| Auth failing | JWT expiry, cookie presence, middleware order |

## Instructions
- Never add `console.log` to prod code for debugging — use the logger utility
- If you can't reproduce it, ask for more context before guessing
- Document the root cause in the commit message, not just the fix
