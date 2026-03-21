---
name: cleanup
description: Scan for dead code, unused imports, orphaned files, and unreachable exports across the project.
---

# Cleanup Skill

Find and remove dead weight — unused imports, dead exports, orphaned files, unreachable code. Different from /debt (which finds TODOs and type escapes) and /review (which checks diffs). This scans the whole project.

## Usage

`/cleanup` — full project scan
`/cleanup <directory>` — scan a specific directory
`/cleanup --dry-run` — report only, don't fix anything

## Workflow

### Step 1 — Scan for dead code

Run all checks in parallel:

#### Unused imports
Grep all `.ts`, `.tsx`, `.astro`, `.js`, `.jsx` files (exclude `node_modules/`, `dist/`):
- Find `import { X } from` where `X` is never referenced after the import line
- Find `import X from` where `X` is never referenced
- Find `import type { X }` where `X` is never used as a type annotation

#### Unused exports
For each `export function`, `export const`, `export type`, `export interface`:
- Grep the entire project for references to that export name
- If only referenced in its own file (the export declaration itself), it's dead
- Exclude: barrel files (`index.ts`), entry points (`app.ts`, `main.ts`), route files, config files

#### Orphaned files
- Files in `src/` not imported by any other file
- Test files without a corresponding source file
- Components not used in any page or layout
- Exclude: entry points, config files, pages (Astro/Next auto-routes), public assets

#### Unreachable code
- Code after `return`, `throw`, `break`, `continue` statements
- Conditions that are always true/false (e.g., `if (false)`, `if (true)`)
- Empty catch blocks (swallowed errors)
- Commented-out code blocks (> 3 lines)

### Step 2 — Classify findings

| Severity | What | Action |
|---|---|---|
| Safe to remove | Unused imports, commented-out code | Auto-fix unless --dry-run |
| Likely dead | Exports with no references, orphaned files | Report, confirm before removing |
| Needs review | Empty catch blocks, always-true conditions | Report only |

### Step 3 — Auto-fix (unless --dry-run)

For "Safe to remove" items:
- Remove unused imports
- Remove commented-out code blocks (> 3 lines)

For "Likely dead" items:
- List them and ask: "Remove these? (Y/n)"
- Only remove after confirmation

Never auto-fix "Needs review" items.

### Step 4 — Report

```
## Cleanup Report

**Scope:** <project or directory>
**Date:** <current date>
**Files scanned:** X

### Auto-fixed
| # | Type | File:Line | What was removed |
|---|---|---|---|
| 1 | Unused import | components/Hero.astro:3 | `import { Badge } from './Badge'` |
| 2 | Dead code | lib/utils.ts:45-52 | Commented-out function block |

### Likely dead (needs confirmation)
| # | Type | File | Details |
|---|---|---|---|
| 1 | Unused export | lib/helpers.ts:12 | `export function formatCurrency()` — 0 references |
| 2 | Orphaned file | components/OldNav.astro | Not imported anywhere |

### Needs review
| # | Type | File:Line | Why |
|---|---|---|---|
| 1 | Empty catch | services/api.ts:34 | Swallowed error — intentional? |
| 2 | Always-true condition | middleware/auth.ts:18 | `if (true)` — debug leftover? |

### Summary
**X items found** — Y auto-fixed, Z need confirmation, W need review.
**Estimated reduction:** ~X lines removed.
```

## Edge Cases

- **Barrel files (index.ts):** Don't flag re-exports as unused — they exist for DX
- **Dynamic imports:** `import()` and `require()` make static analysis incomplete — note this
- **Framework magic:** Astro pages auto-route, Next.js pages auto-route — don't flag pages as orphaned
- **CSS modules:** `.module.css` imports may look unused if destructured
- **Type-only imports:** `import type` is only used at compile time — check `tsconfig` for `verbatimModuleSyntax`
- **Test utilities:** Shared test helpers may only be imported by test files — not orphaned

## Instructions

- Always exclude `node_modules/`, `dist/`, `build/`, `.astro/`, lock files
- Never remove exports from entry points, route files, or config files
- Limit auto-fix to safe removals only — unused imports and commented blocks
- If > 20 "likely dead" items, group by directory and summarize
- Run `npm run build` after auto-fixes to verify nothing broke
- If build fails after cleanup, revert the last change and report which removal caused it
