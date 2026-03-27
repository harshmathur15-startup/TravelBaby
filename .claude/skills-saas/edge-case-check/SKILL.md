---
name: edge-case-check
description: Structured pass after writing a feature — what breaks at boundaries, nulls, concurrency, and scale?
---

# Edge Case Check Skill

After building a feature, run this to find what breaks at boundaries. Complements /test (which verifies happy paths) and /review (which checks code quality).

## Usage

`/edge-case-check` — check the most recent git diff
`/edge-case-check <file>` — check a specific file
`/edge-case-check <feature>` — check all files related to a feature (searches by keyword)

## Workflow

1. Determine scope from argument (diff, file, or feature keyword)
2. Read all files in scope
3. For each function/endpoint/component, walk through every category below
4. Output findings as potential test cases or immediate fixes

## Categories

### 1. Input Boundaries

| Check | Examples |
|---|---|
| Empty/null/undefined inputs | Empty string, null user, undefined config |
| Type mismatches | String where number expected, array where object expected |
| Boundary values | 0, -1, MAX_SAFE_INTEGER, empty array, single-item array |
| Oversized inputs | 10MB string, 100K array items, deeply nested object |
| Special characters | Unicode, emoji, HTML in text fields, SQL in names |
| Whitespace | Leading/trailing spaces, tabs, newlines in user input |

### 2. State & Timing

| Check | Examples |
|---|---|
| Race conditions | Two users updating same resource simultaneously |
| Stale state | Component renders with data from previous page |
| Missing state | First load before any data exists |
| Order dependency | Steps executed out of expected order |
| Retry after failure | Network drops mid-operation, user retries |
| Idempotency | Same request sent twice — does it create duplicates? |

### 3. Auth & Access

| Check | Examples |
|---|---|
| Unauthenticated access | Token expired mid-session, no token at all |
| Wrong role | User role changed after page load |
| Resource ownership | User A accessing User B's data via direct ID |
| Deleted references | User accesses resource that was deleted by another user |

### 4. Data & Database

| Check | Examples |
|---|---|
| Missing relations | Foreign key points to deleted record |
| Cascade effects | Deleting parent — what happens to children? |
| Pagination edge | Page 1 with 0 results, last page with 1 result |
| Sorting with nulls | Null values in sort column — top or bottom? |
| Concurrent writes | Two transactions updating same row |

### 5. External Dependencies

| Check | Examples |
|---|---|
| API timeout | External service takes 30s to respond |
| API returns error | 500, 429 (rate limited), 403 (key revoked) |
| API returns unexpected shape | Missing fields, extra fields, different types |
| Service down | Complete outage of a dependency |
| Partial failure | Batch operation where 3 of 10 items fail |

### 6. UI/Frontend

| Check | Examples |
|---|---|
| Empty states | No data yet, search returns 0 results |
| Loading states | Slow network, large dataset |
| Error states | API fails, invalid form submission |
| Overflow | Long text, many items, small viewport |
| Keyboard navigation | Tab order, escape to close, enter to submit |
| Back button | Does browser back break state? |

## Output Format

```
## Edge Case Report

**Scope:** <what was checked>
**Files:** <list of files examined>

### Findings

| # | Category | Edge Case | Severity | File:Line | Current Behavior | Suggested Fix |
|---|---|---|---|---|---|---|
| 1 | Input | Empty name field | Medium | user.service.ts:42 | Saves empty string | Add Zod `.min(1)` validation |
| 2 | State | Race on balance update | High | wallet.service.ts:88 | Last write wins | Use Prisma transaction with optimistic lock |

### Suggested Test Cases

```ts
// 1. Empty name field
it('rejects empty name', async () => {
  const res = await request.post('/users').send({ name: '' })
  expect(res.status).toBe(400)
})

// 2. Concurrent balance update
it('handles concurrent updates safely', async () => {
  const [r1, r2] = await Promise.all([
    request.patch('/wallet').send({ amount: -50 }),
    request.patch('/wallet').send({ amount: -50 }),
  ])
  // One should succeed, one should fail or both should be serialized
})
```

**Summary:** X edge cases found — Y high, Z medium, W low.
```

## Instructions

- Focus on what COULD break, not what's already broken (that's /debug)
- High = data corruption, security bypass, or crash
- Medium = incorrect behavior, bad UX
- Low = cosmetic or unlikely scenario
- Always suggest concrete test cases, not just descriptions
- Don't flag things already validated (check for existing Zod schemas, try-catch blocks)
- Limit to 15 findings — prioritize by severity
- If scope is a full feature, read all related files (route → controller → service → validators)
