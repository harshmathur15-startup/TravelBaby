# Agent Log Schema

Separate audit trail for AI agent actions with full reasoning chain.

## Prisma Model

```prisma
model AgentLog {
  id           String   @id @default(cuid())
  agentName    String                    // e.g. "content-writer", "data-classifier"
  action       String                    // what the agent did
  input        Json                      // prompt/parameters sent to the agent
  output       Json?                     // agent response (truncated if large)
  reasoning    String?                   // agent's reasoning chain / explanation
  confidence   Float?                    // 0.0-1.0 confidence score
  status       String   @default("completed") // completed | failed | escalated
  durationMs   Int?                      // execution time
  tokenUsage   Json?                     // { input, output, total }
  triggeredBy  String?                   // userId or system identifier
  createdAt    DateTime @default(now())

  @@index([agentName])
  @@index([status])
  @@index([createdAt])
}
```

## Rules

- **Every agent action logged** — no silent operations
- **Full reasoning chain** — not just input/output, but why the agent chose its path
- **No secrets in logs** — strip API keys, tokens, PII before logging
- **Confidence recorded** — reject results below 70% confidence (escalate to human)
- **Immutable** — same as audit log, never update or delete

## Status Values

| Status | Meaning |
|--------|---------|
| `completed` | Agent finished successfully |
| `failed` | Agent encountered an error |
| `escalated` | Confidence below threshold or HITL gate triggered |

## Querying

```sql
-- Failed agent actions in last 24 hours
SELECT * FROM "AgentLog"
WHERE "status" = 'failed' AND "createdAt" > NOW() - INTERVAL '24 hours'
ORDER BY "createdAt" DESC;

-- Average confidence per agent
SELECT "agentName", AVG("confidence") as avg_confidence
FROM "AgentLog"
WHERE "confidence" IS NOT NULL
GROUP BY "agentName";
```
