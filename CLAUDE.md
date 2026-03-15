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

## Conventions
- Use TypeScript strict mode everywhere
- API routes follow REST conventions: `/api/v1/<resource>`
- Components use PascalCase, utilities use camelCase
- All AI agent actions are logged for auditability
- Environment variables in `.env` (never committed)
