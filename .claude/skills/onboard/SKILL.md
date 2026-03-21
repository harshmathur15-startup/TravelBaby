---
name: onboard
description: New developer setup checklist for the project. Use when onboarding a new team member.
disable-model-invocation: true
---

# Onboard Skill

Walk a new developer through setting up the project from scratch.

## Prerequisites Checklist
- [ ] Node.js 20+ installed
- [ ] PostgreSQL running locally (or Docker)
- [ ] Redis running locally (or Docker)
- [ ] Git configured with SSH key

## Setup Steps
1. Clone the repo
2. `cp .env.example .env` — fill in all required values
3. `npm install` — install dependencies
4. `npx prisma migrate dev` — run migrations
5. `npx prisma db seed` — seed test data
6. `npm run dev` — start the dev server
7. Visit `http://localhost:3000` and verify the app loads

## Verify Everything Works
- [ ] App loads without errors
- [ ] Can log in with seeded test user
- [ ] API health check passes: `GET /api/v1/health`
- [ ] Run tests: `npm run test` — all pass

## Key Files to Read First
- `CLAUDE.md` — project overview and conventions
- `.claude/rules/` — coding standards
- `prisma/schema.prisma` — data model
- `agents/src/core/BaseAgent.ts` — agent architecture

## Instructions
- Go through checklist step by step — don't skip steps
- If any step fails, debug before moving on
- Surface blockers clearly with the exact error message
