---
name: migrate
description: Prisma database migration workflow — create, review, and deploy migrations safely.
disable-model-invocation: true
---

# Migrate Skill

## Creating a Migration
1. Make schema changes in `prisma/schema.prisma`
2. Preview the SQL: `npx prisma migrate dev --create-only --name <descriptive-name>`
3. Review the generated SQL in `prisma/migrations/` before applying
4. Apply: `npx prisma migrate dev`
5. Regenerate client: `npx prisma generate`

## Migration Naming Convention
`<timestamp>_<action>_<entity>` — e.g. `add_tax_column_to_users`, `create_billing_cycles_table`

## Safety Rules
- Never edit an already-applied migration file
- Never delete a column directly — add nullable first, migrate data, then drop in a later migration
- Always wrap data migrations in a transaction
- Test migration on dev DB before deploying to production

## Deploying to Production
1. `npx prisma migrate deploy` — applies pending migrations only
2. Verify with: `npx prisma migrate status`
3. Rollback plan: `npx prisma migrate resolve --rolled-back <migration-name>`
