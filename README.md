# Claude Code SaaS Template

Production-ready SaaS boilerplate with built-in AI agent governance.

## Quick Start

```bash
git clone <template-repo-url> my-project
cd my-project
cp .env.example .env          # fill in your values
npm install
docker compose up -d           # PostgreSQL + Redis
npx prisma migrate dev
npx prisma db seed
npm run dev
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start frontend + backend in dev mode |
| `npm run build` | Build for production |
| `npm run test` | Run test suite |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Lint all files |
| `npx prisma studio` | Open database GUI |
| `npx prisma migrate dev` | Run pending migrations |

## Project Structure

```
/client          - React frontend (Vite + Tailwind)
/server          - Express API, services, middleware
/shared          - Shared types and utilities
/agents          - BaseAgent framework, examples, family
/prisma          - Schema, migrations, seed
/scripts         - Hook execution scripts
/docs            - Setup guides and reference
```

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Zustand
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL, Prisma ORM
- **Jobs:** BullMQ + Redis
- **AI:** Claude API (Anthropic SDK), BaseAgent framework
- **Auth:** JWT (15min access) + httpOnly refresh tokens (30d, rotated)
- **Testing:** Vitest, React Testing Library

## What's Included

- **Auth** — JWT + refresh token rotation, bcrypt password hashing, CSRF protection
- **Multi-tenancy** — org-scoped data isolation with tenant middleware
- **RBAC** — role-based access control, server-side ownership verification
- **Background jobs** — BullMQ workers with progress tracking and timeouts
- **AI agents** — BaseAgent with iteration caps, write scopes, HITL gates, guardrails
- **8 hooks** — auto-format, file protection, quality gates, session tracking
- **57 skills** — session lifecycle, deployment, debugging, reviews, specs, and more
- **8 rule files** — code, security, testing, performance, database, frontend, backend, agents

## Documentation

- [Getting Started](docs/getting-started.md) — full setup walkthrough
- [Skill Tiers](docs/skill-tiers.md) — all 57 skills by category
- [Inheritance](docs/inheritance.md) — what products inherit from the template
