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
- **Petra** — blueprint architect. Benchmarks Template against the best Claude Code setups worldwide, identifies gaps. Run via `/blueprint`.
- **Ivy** — technical debt scanner. Scans for debt indicators, prioritizes by severity and effort, tracks trends. Run via `/debt`.
- **Ada** — drift detector. Verifies CLAUDE.md accuracy, file integrity, hook pipeline health. Run via `/watch`.
- **Vera** — workflow health monitor. Measures 5 signals detecting silent degradation. Run via `/pulse`.
- **Aria** — cross-agent synthesizer. Reads all agent outputs, finds patterns, measures family coordination. Run via `/sister`.
- **Lena** — quality enforcer. Audits product health, file quality, outstanding actions, prunes board. Run via `/mother`.

## Conventions
- Use TypeScript strict mode everywhere
- API routes follow REST conventions: `/api/v1/<resource>`
- Components use PascalCase, utilities use camelCase
- All AI agent actions are logged for auditability
- Environment variables in `.env` (never committed)

## What Lives Here (Template Blueprint)
- **59 skills** — session lifecycle (kickoff, wrap, dashboard), product tooling (deploy, debug, scaffold), quality (review, retro, blueprint, debt, watch, pulse, sister), workflow (sessions, signal, save-context, recall, save), and 40+ more
- **8 hooks** — bash blocker, file protection, quality gate, handoff generator, session-start (auto-context), session-stop (auto-save), prettier formatter (inline), session-tracker (inline)
- **9 scripts** — component-validation, cost-tracker, file-protection, quality-gate, memory-integrity, handoff-generator, session-start, session-stop, session-tracker
- **8 rules** — general, security, backend, frontend, database, performance, testing, agents
- **6 agents** — Petra (benchmark), Ivy (debt), Ada (drift), Vera (pulse), Aria (synthesis), Lena (enforce) — with family structure (registry, board, profiles)
- **2 MCP servers** — context7 (live library docs), sequential-thinking (extended reasoning)

## What Does NOT Live Here
- Kira's personality, identity, or partnership rules — those are Kira-only
- Agent family profiles, board, registry — each product gets its own family via global agent-family.md pattern
- Partnership artifacts (journal, evolution, performance tracker) — Kira-only
- Identity benchmarks (AIE, KCB, Scout rankings) — Kira-only

## What Products Inherit
- All Template skills, hooks, scripts, rules
- Global rules (conventions.md, security baselines, kira.md personality)
- Agent family PATTERN (from global agent-family.md) — but NOT Kira's specific family
