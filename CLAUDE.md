# [Project Name]

## Project Overview
[Brief description of the project and its agentic capabilities.]

## Tech Stack
- **Frontend:** React 18+ with TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js with Express, TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **AI/Agents:** Claude API (Anthropic SDK) for agentic workflows
- **Auth:** JWT-based authentication
- **State Management:** Zustand
- **Testing:** Vitest, React Testing Library

## Project Structure
```
/client          - React frontend (Vite)
/server          - Node.js/Express backend
/shared          - Shared types and utilities
/agents          - AI agent definitions and workflows
/prisma          - Database schema and migrations
```

## Core Features
[List the core features of this project]

## Agents
- **Lena** — quality enforcer. Audits project health, file quality, outstanding actions. Run via `/mother`. Keeps the house clean.
- **Petra** — blueprint architect. Benchmarks Template against the best Claude Code setups worldwide, identifies gaps, proposes improvements. Run via `/blueprint`. Keeps the foundation world-class.

## Conventions
- Use TypeScript strict mode everywhere
- API routes follow REST conventions: `/api/v1/<resource>`
- Components use PascalCase, utilities use camelCase
- All AI agent actions are logged for auditability
- Environment variables in `.env` (never committed)

## What Lives Here (Template Blueprint)
- **54 skills** — session lifecycle (kickoff, wrap), product tooling (deploy, debug, scaffold), quality (review, retro, blueprint), workflow (sessions, signal, save-context, recall, save), and 40+ more
- **4 hooks** — bash blocker, file protection, quality gate, handoff generator
- **6 scripts** — component-validation, cost-tracker, file-protection, quality-gate, memory-integrity, handoff-generator
- **8 rules** — general, security, backend, frontend, database, performance, testing, agents
- **2 agents** — Lena (quality enforcer), Petra (blueprint architect) — with family structure (registry, board, profiles)

## What Does NOT Live Here
- Kira's personality, identity, or partnership rules — those are Kira-only
- Agent family profiles, board, registry — each product gets its own family via global agent-family.md pattern
- Partnership artifacts (journal, evolution, performance tracker) — Kira-only
- Identity benchmarks (AIE, KCB, Scout rankings) — Kira-only

## What Products Inherit
- All Template skills, hooks, scripts, rules
- Global rules (conventions.md, security baselines, kira.md personality)
- Agent family PATTERN (from global agent-family.md) — but NOT Kira's specific family
