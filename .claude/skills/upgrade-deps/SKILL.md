---
name: upgrade-deps
description: Safely update outdated dependencies — review breaking changes, update, test, verify.
---

# Upgrade Deps Skill

Systematic dependency update workflow. Not "run npm update and pray" — review what changed, update deliberately, test after.

## Usage

`/upgrade-deps` — check all outdated deps, update safe ones
`/upgrade-deps --major` — include major version bumps (breaking changes)
`/upgrade-deps <package>` — update a specific package

## Workflow

### Step 1 — Survey

```bash
npm outdated --json 2>/dev/null
```

Parse output into 3 categories:

| Category | Risk | Example |
|---|---|---|
| Patch updates (1.2.3 → 1.2.5) | Low — bug fixes only | Safe to batch update |
| Minor updates (1.2.3 → 1.3.0) | Medium — new features, possible deprecations | Review changelog |
| Major updates (1.2.3 → 2.0.0) | High — breaking changes | Only with `--major` flag |

### Step 2 — Security check

```bash
npm audit --json 2>/dev/null
```

Flag any outdated packages that have known vulnerabilities — these get priority regardless of category.

### Step 3 — Update plan

Present the plan before executing:

```
## Dependency Update Plan

### Security-critical (update now)
| Package | Current | Target | Vulnerability |
|---|---|---|---|
| lodash | 4.17.19 | 4.17.21 | Prototype pollution (HIGH) |

### Safe updates (patch)
| Package | Current | Target |
|---|---|---|
| typescript | 5.3.2 | 5.3.5 |

### Minor updates (review recommended)
| Package | Current | Target | Notes |
|---|---|---|---|
| astro | 6.1.0 | 6.3.0 | Check migration guide |

### Major updates (--major flag only)
| Package | Current | Target | Breaking Changes |
|---|---|---|---|
| tailwindcss | 3.4.0 | 4.0.0 | Config format changed |

Proceed with security + patch updates? (Y/n)
```

Wait for approval before proceeding.

### Step 4 — Execute updates

```bash
# Security-critical first
npm install <package>@<version> --save-exact

# Then patch updates (batch)
npm update

# Then minor updates (one at a time)
npm install <package>@<version>
```

### Step 5 — Verify

After each update batch:

```bash
npm run build 2>&1
npm run test 2>&1
```

If build or tests fail:
1. Identify which package caused the failure
2. Roll back that specific package: `npm install <package>@<previous-version>`
3. Report the failure with the error
4. Continue with remaining updates

### Step 6 — Report

```
## Update Report

**Date:** <current date>
**Updated:** X packages
**Skipped:** Y packages (major, needs --major flag)
**Failed:** Z packages (rolled back)

| Package | From | To | Status |
|---|---|---|---|
| typescript | 5.3.2 | 5.3.5 | Updated |
| astro | 6.1.0 | 6.3.0 | Updated |
| tailwindcss | 3.4.0 | 4.0.0 | Skipped (major) |

**Build:** PASS/FAIL
**Tests:** PASS/FAIL (X passing, Y failing)
```

## Edge Cases

- **No package.json:** Report "No package.json found" and stop
- **No outdated packages:** Report "All dependencies up to date" — still run npm audit
- **Monorepo:** Run in each directory with a package.json, report per package
- **Lock file conflicts:** Run `npm install` to regenerate lock file after updates
- **Peer dependency warnings:** Report but don't block — they're usually informational

## Instructions

- Never update all majors at once — one at a time, test between each
- Security-critical updates don't need the `--major` flag even if they're major bumps
- Always show the plan and wait for approval before updating
- If tests don't exist, run build only and note "No tests — manual verification recommended"
- Pin security-critical updates with `--save-exact` to prevent regression
- After all updates, run `npm audit` again to confirm vulnerabilities resolved
