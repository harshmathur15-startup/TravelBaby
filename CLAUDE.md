# Claude Code SaaS Template

## Why This Exists

It runs like any SaaS boilerplate. It thinks like no other.

Auth works on day one. Payments work on day one. Deploy works on day one. That's table stakes — every good boilerplate does this. What none of them do is ship agent governance from the start: contracts that prevent infinite loops, HITL gates that block irreversible actions, observability that shows what every agent did and why. Developers pick this template because the SaaS foundation is solid and the AI architecture is something they'd never build themselves.

If a developer can't go from clone to building features in under 10 minutes, the template has failed. If an agent can act without guardrails, the template has also failed.

## Quick Start

1. Clone this repo, run `npm install && docker compose up -d && npx prisma migrate dev`
2. Read [docs/getting-started.md](docs/getting-started.md) for full setup
3. Fill in the product sections below (marked with `<!-- PRODUCT -->`)
4. Delete `research/` and `agents/examples/` (template artifacts)
5. Build your own agent family using the pattern in `agents/family/`
6. Run `/kickoff` to start your first session

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Zustand
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL, Prisma ORM
- **Jobs:** BullMQ + Redis
- **AI/Agents:** Claude API (Anthropic SDK), BaseAgent framework
- **Auth:** JWT (15min) + httpOnly refresh tokens (30d, rotated)
- **Testing:** Vitest, React Testing Library

## Project Structure

```
/client          - React frontend (Vite)
/server          - Express API, services, middleware
/shared          - Shared types and utilities
/agents          - BaseAgent framework, examples, family
/prisma          - Schema, migrations, seed
/scripts         - Hook execution scripts
/docs            - Setup guides, skill tiers, inheritance
```

## Core Features

- **Auth:** JWT access + httpOnly refresh with rotation, password hashing (bcrypt 12+)
- **Multi-tenancy:** Org-scoped data isolation, tenant middleware
- **RBAC:** Role-based access control, server-side ownership checks
- **Background jobs:** BullMQ + Redis with progress tracking and timeouts
- **AI agents:** BaseAgent with iteration caps, write scopes, HITL gates, guardrails
- **Observability:** Agent run logging, session tracking, cost estimation

## What You Inherit

| Layer | Count | What It Does |
|-------|-------|-------------|
| **Core Skills** | 13 | Session lifecycle, commits, reviews, debugging, deployment |
| **Extended Skills** | 30 | Specs, diagrams, security scans, incident response (opt-in) |
| **Hooks** | 8 | Auto-format, file protection, quality gates, session tracking |
| **Scripts** | 9 | Hook execution scripts |
| **Rules** | 8 | Standards for code, security, testing, performance, agents |
| **MCP Servers** | 2 | Live library docs, extended reasoning |

See [docs/skill-tiers.md](docs/skill-tiers.md) for the full skill breakdown.

## Hooks (Run Automatically)

| When | What | Why |
|------|------|-----|
| Session starts | Load last handoff + git state | Context continuity |
| Before bash | Block destructive commands | Safety |
| Before file edit | Check protected file patterns | Prevent accidental config edits |
| Before compaction | Generate session handoff | Preserve context |
| After file edit | Run prettier + quality gate | Code quality |
| After any tool | Log to session tracker | Observability |
| Session ends | Save memory + cost estimate | Continuity |

## Rules (8 Domains)

| Rule | Covers |
|------|--------|
| general.md | Naming, file discipline, git, code quality |
| security.md | Secrets, input validation, auth, audit logging |
| backend.md | API design, error handling, logging |
| frontend.md | Components, state, performance, accessibility |
| database.md | Schema, indexing, migrations, queries |
| performance.md | Response budgets, frontend metrics, background jobs |
| testing.md | Test structure, mocking, coverage thresholds |
| agents.md | Agent contracts, HITL, retry, observability |

## Agent Family (Template's Own)

4 agents maintain the template itself. Products build their own families using the same pattern.

```
Petra (benchmark) -> Ivy (debt) -> Ada (drift + integrity) -> Lena (quality + accountability)
```

See `agents/family/registry.md` for the pattern your product should follow.

---

<!-- PRODUCT: Replace everything below with your product's specifics -->

## Product: [Your Project Name]

### Overview
[What this product does and who it's for]

### Core Features
[Your feature list]

### Agents
[Your product's agent family — built from the template pattern]

### Conventions
- TypeScript strict mode everywhere
- API routes: `/api/v1/<resource>`
- Components: PascalCase, utilities: camelCase
- All AI agent actions logged for auditability
- Environment variables in `.env` (never committed)
