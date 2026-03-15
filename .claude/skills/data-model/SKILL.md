---
name: data-model
description: Convert product requirements or a feature description into a Prisma schema. Bridges PM language and DB design.
---

# Data Model Skill

Turn plain English requirements into a Prisma schema with relationships, indexes, and constraints.

## Usage
`/data-model <feature or requirement description>`

Example: `/data-model track customer orders with approval workflow`

## Workflow

1. Read `prisma/schema.prisma` if it exists — extend rather than replace
2. Read `.claude/rules/database.md` and any domain-specific rules for conventions
3. Identify entities, relationships, and constraints from the description
4. Generate Prisma model blocks

## Output Format

Show the new/updated Prisma models and explain the design choices:

```prisma
model Order {
  id          String      @id @default(cuid())
  customerId  String
  customer    Customer    @relation(fields: [customerId], references: [id])
  type        OrderType
  totalAmount Int
  currency    String      @default("USD")
  status      OrderStatus @default(PENDING)
  notes       String?
  approvedBy  String?
  approver    Customer?   @relation("OrderApprover", fields: [approvedBy], references: [id])
  approvedAt  DateTime?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index([customerId, status])
  @@index([createdAt])
}

enum OrderType {
  STANDARD
  EXPRESS
  BULK
  SUBSCRIPTION
  RETURN
}

enum OrderStatus {
  PENDING
  APPROVED
  REJECTED
  CANCELLED
}
```

**Design notes:**
- [Why this relation is structured this way]
- [Any denormalization decisions]
- [Indexes and why]

## Instructions
- Always use `cuid()` for IDs — never auto-increment integers
- Always include `createdAt` and `updatedAt` on every model
- Add `@@index` for any field used in WHERE or ORDER BY clauses
- Monetary values in **smallest currency unit** (Int), never Float — flag if requirement says otherwise
- Flag any many-to-many relationships and propose the join table explicitly
- Propose the migration name at the end: `npx prisma migrate dev --name <migration-name>`
- Never drop existing fields — propose deprecation instead
