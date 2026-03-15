---
name: seed-database
description: Generate realistic test data and seed scripts for the PostgreSQL database. Use when setting up dev/test environments.
disable-model-invocation: true
---

# Seed Database Skill

Generate Prisma seed scripts with realistic test data for the application.

## Data to Seed

| Entity | Count (default) | Notes |
|---|---|---|
| Users | 5 | Admin, manager, operator, 2 standard users |
| Organizations | 5 | Acme Corp, Globex, Initech, Umbrella, Wonka |
| Users | 30 | Spread across organizations with different roles |
| Pricing Tiers | 5 | Different bands (starter, basic, standard, premium, enterprise) |
| Billing Cycles | 3 | Last 3 months, all in approved/processed state |
| Invoices | 90 | One per customer per billing cycle |
| Audit Logs | 50 | Mix of actions across users and resources |
| AI Agent Logs | 40 | Simulated anomaly detection and compliance checks |

## Instructions
1. Generate a `prisma/seed.ts` file using `@prisma/client`
2. Use realistic names and emails (no real PII)
3. Price and amount figures should reflect realistic ranges per tier
4. Include applicable tax and compliance line items in invoices
5. Spread audit entries across different action types and statuses
6. Set `createdAt` dates spread over the last 90 days
7. Run with: `npx prisma db seed`

## Example Seed Structure
```ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // seed departments, users, pricing tiers, billing cycles, invoices
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```
