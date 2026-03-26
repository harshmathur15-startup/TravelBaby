---
paths:
  - "server/**/*.ts"
  - "shared/**/*.ts"
  - "prisma/**/*"
---

# Product-specific rules (globals inherited from ~/.claude/rules/)
<!-- Last reviewed: 2026-03-26 (S29) -->

## Architecture
- One responsibility per service — no cross-service direct imports (communicate via events)
- Async/await everywhere — no `.then()` chains

## API Design
- Pagination required on all list endpoints — never return unbounded arrays
- HTTP status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Validation Error, 500 Server Error
- Never mutate request or response objects directly

## Database
- Prisma is the only way to touch the DB — no raw queries except for migrations
- All monetary values stored as integers in the smallest currency unit (e.g. cents, not dollars) — avoid floating-point errors
- Wrap multi-step writes in a Prisma `$transaction` — never partial-write across tables
- Add DB indexes for every foreign key and frequently filtered column

## Background Jobs
- All job failures logged with full context for retry/debug
- Jobs must be idempotent — safe to retry without side effects
