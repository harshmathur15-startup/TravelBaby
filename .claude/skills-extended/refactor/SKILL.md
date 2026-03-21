---
name: refactor
description: Restructure working code without changing behavior — extract, split, rename, simplify.
---

# Refactor Skill

Take working but messy code and make it clean. No behavior changes — same inputs, same outputs, same tests pass. Different from /cleanup (removes dead code) and /review (checks quality on diffs). This restructures live code.

## Usage

`/refactor <file>` — refactor a specific file
`/refactor <function>` — refactor a specific function (searches by name)
`/refactor <directory>` — refactor all files in a directory

## Workflow

### Step 1 — Understand before touching

Read the target code. Before any changes, document:
- What does this code do? (one sentence)
- What are the inputs and outputs?
- What tests cover it? (run `grep -r "<function-name>" **/*.test.*`)
- What depends on it? (grep for imports/references)

If no tests cover this code, **warn before proceeding**: "No test coverage — refactoring without tests risks silent breakage. Write tests first or accept the risk?"

### Step 2 — Identify smells

| Smell | Signal | Threshold |
|---|---|---|
| Long file | File > 300 lines | Split into modules |
| Long function | Function > 50 lines | Extract sub-functions |
| Deep nesting | > 3 levels of if/for/try | Flatten with early returns or guard clauses |
| Repeated code | Same logic in 3+ places | Extract to shared utility |
| God object | Class/module doing > 3 unrelated things | Split by responsibility |
| Unclear naming | Variable names like `data`, `temp`, `result`, `x` | Rename to intent |
| Mixed concerns | Business logic in controller, UI logic in service | Move to correct layer |
| Primitive obsession | Passing 5+ raw params instead of an object | Create a type/interface |
| Boolean params | `doThing(true, false, true)` | Use options object or split into named functions |
| Comment explaining "what" | `// increment counter` above `count++` | Delete — code is self-evident |

### Step 3 — Plan the refactor

Present the plan before executing:

```
## Refactor Plan

**Target:** <file or function>
**Smells found:** X

| # | Smell | Location | Proposed Fix |
|---|---|---|---|
| 1 | Long function (87 lines) | processOrder():12-99 | Extract: validateOrder(), calculateTotals(), applyDiscounts() |
| 2 | Deep nesting (4 levels) | processOrder():34-67 | Guard clause: early return on invalid input |
| 3 | Repeated code | formatPrice() in 3 files | Extract to shared/utils/format.ts |

**Tests covering this code:** X tests
**Risk:** Low / Medium / High

Proceed? (Y/n)
```

Wait for approval.

### Step 4 — Execute

Apply changes one smell at a time, in this order:
1. **Rename** first — clearest, lowest risk
2. **Extract** functions — isolate responsibilities
3. **Flatten** nesting — guard clauses, early returns
4. **Move** code to correct layer — controllers, services, utils
5. **Split** files — only after extractions are done

After each change:
```bash
npm run build 2>&1
npm run test 2>&1
```

If build or tests fail, **revert that specific change** and report why it broke.

### Step 5 — Verify

After all changes:
- Run full test suite
- Run build
- Diff the before/after: same exports, same public API
- Check file sizes: target files should be shorter

### Step 6 — Report

```
## Refactor Report

**Target:** <file or function>
**Changes:** X refactoring operations

| # | Operation | What Changed | Lines Before → After |
|---|---|---|---|
| 1 | Extract function | validateOrder() from processOrder() | 87 → 42 + 28 (new file) |
| 2 | Guard clause | Early return on null input | 4 nesting levels → 2 |
| 3 | Rename | `data` → `orderItems`, `res` → `pricingResult` | -- |

**Build:** PASS
**Tests:** PASS (X passing, 0 failing)
**Net line change:** -X lines (cleaner, not just shorter)
```

## Refactoring Patterns

| Pattern | When to Use | Example |
|---|---|---|
| Extract function | Chunk of code does one sub-task | `calculateSubtotal()` from order processing |
| Extract file | File has 2+ unrelated responsibilities | `validation.ts` from `order.service.ts` |
| Inline | Wrapper adds no value | Remove `getUser()` that just calls `prisma.user.findUnique()` |
| Guard clause | Deep nesting from validation | `if (!user) return null;` instead of wrapping entire body |
| Replace conditional with map | Long if/else or switch | `const handlers = { create: handleCreate, update: handleUpdate }` |
| Compose over inherit | Class hierarchy for shared behavior | Utility functions instead of base class |
| Options object | 3+ boolean/config params | `processOrder({ validate: true, applyDiscounts: true })` |

## Instructions

- Never change behavior — same inputs must produce same outputs
- One smell at a time — don't batch 5 changes into one edit
- Build and test after every change — catch breakage immediately
- If no tests exist, suggest writing them first — refactoring blind is risky
- Don't refactor for style preference — refactor for readability and maintainability
- Don't over-extract — a 10-line function used once doesn't need its own file
- Keep the public API stable — internal restructuring only
- If a refactor requires changing callers, list all affected files before proceeding
