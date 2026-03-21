# SaaS Upgrade Guide

The template ships as a static marketing site (Astro + Sanity). If your product needs a backend (auth, API, database, background jobs), activate the SaaS stack.

## What's Included

The SaaS upgrade adds:
- **Express API** (`server/`) — REST endpoints, JWT auth, middleware
- **React client** (`client/`) — SPA with Vite, Zustand, auth pages
- **PostgreSQL + Prisma** (`prisma/`) — schema, migrations, seed
- **BullMQ + Redis** — background job processing
- **Shared types** (`shared/`) — cross-workspace type definitions

## Activation Steps

### 1. Enable Workspaces

Add the `workspaces` field to `package.json`:

```json
{
  "workspaces": ["shared", "server", "client"]
}
```

Then add the SaaS scripts:

```json
{
  "scripts": {
    "dev:server": "npm run dev --workspace=server",
    "dev:client": "npm run dev --workspace=client",
    "build:saas": "npm run build --workspace=shared && npm run build --workspace=server && npm run build --workspace=client",
    "typecheck": "tsc --build",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest",
    "db:generate": "prisma generate --schema=prisma/schema.prisma",
    "db:migrate": "prisma migrate dev --schema=prisma/schema.prisma",
    "db:migrate:deploy": "prisma migrate deploy --schema=prisma/schema.prisma",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio --schema=prisma/schema.prisma"
  }
}
```

Then install all workspace dependencies:

```bash
npm install
```

### 2. Start Infrastructure

```bash
docker compose up -d           # PostgreSQL + Redis
npx prisma migrate dev         # run migrations
npx prisma db seed             # seed data
```

### 3. Configure Environment

Add these to your `.env`:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mydb
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
```

### 4. Run the Full Stack

```bash
# Run Astro site + Express API + React client
npm run dev                    # Astro (default)
npm run dev:server             # Express API on :3000
npm run dev:client             # React client on :5173
```

### 5. Update tsconfig

If you need TypeScript project references across workspaces, use `tsconfig.saas.json`:

```bash
# For workspace-aware type checking
npx tsc --build --project tsconfig.saas.json
```

## Architecture

```
Astro site (static)  ──>  Public pages, blog, marketing
React client (SPA)   ──>  App dashboard, settings, auth flows
Express API          ──>  REST endpoints, auth, RBAC
PostgreSQL           ──>  Persistent storage
Redis + BullMQ       ──>  Background jobs, queues
```

The Astro site and React client can coexist. Use Astro for public pages and the React client for authenticated app features.
