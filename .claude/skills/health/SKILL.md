---
name: health
description: Project health check — scans for files over 300 lines, committed console.logs, ownerless TODOs, dead imports, and test coverage gaps.
---

# Health Skill

Code quality gatekeeper. Run before starting a session or before opening a PR.

## Workflow

Run all checks in parallel:

### 1. File Length
Glob all `**/*.ts` and `**/*.tsx` files, check line counts.
Flag any file over 300 lines (the project limit).

### 2. Console Logs
Grep `console\.(log|error|warn|info|debug)` across `server/src/`, `client/src/`, `agents/`.
Flag any hits — committed console.logs violate the no-console rule.

### 3. Ownerless TODOs
Grep `TODO|FIXME|HACK` across all source files.
Flag any TODO without an owner: `// TODO(name):` format is required.
Flag any TODO that's been in the codebase for more than 7 days (check git blame).

### 4. Dead Imports
Grep for unused imports — look for `import.*from` where the imported name doesn't appear elsewhere in the file.
Flag the top 5 worst offenders.

### 5. Any/ts-ignore violations
Grep `any\b|@ts-ignore|@ts-nocheck` across TypeScript files.
Flag all occurrences — strict mode means zero tolerance.

### 6. Test Coverage
Check if `coverage/` directory exists and has a recent `coverage-summary.json`.
If it does, read it and flag any file below 80% statement coverage.
If it doesn't exist, say "Run `/test` to generate coverage report."

### 7. Large Commits (uncommitted)
Run `git diff --stat HEAD` — flag if more than 10 files changed without a commit.
Large diffs are hard to review and hard to revert.

## Output Format

```
## Project Health Report

### Files Over 300 Lines  ✅ / ⚠️
| File | Lines | Limit |
|---|---|---|
| server/src/services/billing.service.ts | 342 | 300 |

### Console Logs  ✅ / ⚠️
- server/src/routes/auth.ts:45 — console.log('user logged in')

### Ownerless TODOs  ✅ / ⚠️
- client/src/components/InvoiceTable.tsx:23 — TODO: handle empty state

### any / ts-ignore  ✅ / ⚠️
- agents/src/BillingAgent.ts:67 — `any`

### Test Coverage  ✅ / ⚠️
- server/src/services/tax.service.ts — 62% (below 80% threshold)

### Uncommitted Diff  ✅ / ⚠️
- 3 files changed — OK

---
**Health Score: X/7 checks passed**
```

## Instructions
- Use ✅ if no issues in a category, ⚠️ if issues found
- Show max 5 examples per category — not an exhaustive dump
- If the project is greenfield (no src files yet), say "No source files yet — health check will run once coding begins"
- End with a single line: "X/7 checks passed" — gives a quick pulse reading
