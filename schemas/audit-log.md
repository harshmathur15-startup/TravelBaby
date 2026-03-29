# Audit Log Schema

Immutable log of all user actions. Never delete, only append.

## Prisma Model

```prisma
model AuditLog {
  id           String   @id @default(cuid())
  userId       String?
  action       String                    // HTTP method or custom action name
  resourceType String                    // e.g. "contacts", "users", "settings"
  resourceId   String   @default("")     // ID of the affected resource
  ip           String
  metadata     Json?                     // { statusCode, userAgent, ... }
  createdAt    DateTime @default(now())

  @@index([userId])
  @@index([resourceType])
  @@index([createdAt])
}
```

## Rules

- **Immutable** — rows are never updated or deleted
- **No PII in metadata** — log resource IDs, not resource content
- **Fire-and-forget** — audit writes must not block the request (see `server/src/middleware/audit.ts`)
- **Retention** — archive entries older than 90 days to cold storage (product decision)

## What Gets Logged

| Action | Resource Type | Logged By |
|--------|--------------|-----------|
| All API requests | Derived from URL path | `audit.ts` middleware |
| Login attempts | `auth` | Auth service |
| Agent actions | `agent` | See `agent-log.md` |

## Querying

```sql
-- Recent activity for a user
SELECT * FROM "AuditLog"
WHERE "userId" = ? ORDER BY "createdAt" DESC LIMIT 50;

-- All actions on a resource
SELECT * FROM "AuditLog"
WHERE "resourceType" = ? AND "resourceId" = ?
ORDER BY "createdAt" DESC;
```
