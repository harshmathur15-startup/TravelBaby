---
paths:
  - "prisma/**/*"
  - "server/**/*.ts"
---

# Product-specific rules (globals inherited from ~/.claude/rules/)
<!-- Last reviewed: 2026-03-26 (S29) -->

## Schema Rules
- Every table has `id`, `createdAt`, `updatedAt` — no exceptions
- Foreign keys always have an explicit `@relation` name
- Add `@@index` for every foreign key and every column used in `WHERE` clauses
- Enum values in UPPER_SNAKE_CASE
- Boolean columns default to `false` explicitly

## Migration Rules
- Migration names are descriptive: `add_status_column_to_orders`, not `migration_001`
- Never edit an already-applied migration file
- Never drop a column directly — deprecate first, migrate data, drop in a later PR
- Always wrap data migrations in `$transaction`
- Every migration reviewed before applying to production

## Query Rules
- Never `findMany` without a `where` clause on large tables — always paginate
- Use `select` to fetch only needed fields — never `findMany` with full models on list endpoints
- Wrap multi-step writes in `Prisma.$transaction()`
- No N+1 queries — use Prisma `include` or batch queries

## Seeding
- Seed data lives in `prisma/seed.ts`
- Seed is idempotent — running twice produces the same result (`upsert` over `create`)
- Use realistic but fake data — no real PII, no production data
