# Soft-Delete Pattern

All data deletions go through a recycle bin. Database records are never hard-deleted — they get a `deletedAt` timestamp.

## Schema Convention

Every model that holds business data includes:

```prisma
deletedAt DateTime?

@@index([deletedAt])
```

**Excluded:** RefreshToken (ephemeral, cascade-deleted with User).

## How It Works

The Prisma client extension in `server/src/lib/prisma-soft-delete.ts` intercepts:

| Operation | Behavior |
|-----------|----------|
| `delete` | Sets `deletedAt = now()` instead of removing |
| `deleteMany` | Sets `deletedAt = now()` on matching rows |
| `findMany` / `findFirst` / `count` | Auto-filters `WHERE deletedAt IS NULL` |
| `findUnique` | Returns `null` if record has `deletedAt` set |

## Querying Soft-Deleted Records

To include deleted records (e.g., admin recycle bin view), use raw queries:

```typescript
const deleted = await prisma.$queryRaw`
  SELECT * FROM "User" WHERE "deletedAt" IS NOT NULL
  ORDER BY "deletedAt" DESC
`
```

## Restoring Records

```typescript
await prisma.$executeRaw`
  UPDATE "User" SET "deletedAt" = NULL WHERE "id" = ${id}
`
```

Or use the `/recycle restore` skill for guided recovery.

## Hard Delete (Purge)

The only legitimate hard-delete path is `/recycle purge --older-than 30d`:
- Minimum 30-day retention
- Requires explicit human confirmation
- Logged in the audit trail

## Cascade Behavior

| Relation | On Delete |
|----------|-----------|
| User → Membership | `Restrict` — soft-delete memberships in application code |
| User → RefreshToken | `Cascade` — tokens are ephemeral |
| Org → Membership | `Restrict` — soft-delete memberships in application code |
