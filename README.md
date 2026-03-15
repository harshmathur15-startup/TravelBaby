# [Project Name]

[Brief description of the project]

## Quick Start

```bash
cp .env.example .env   # fill in your values
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run test` | Run test suite |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Lint all files |
| `npx prisma studio` | Open DB GUI |
| `npx prisma migrate dev` | Run new migrations |

## Project Structure

```
/client      - React frontend
/server      - Node.js/Express backend
/shared      - Shared types
/agents      - AI agent workflows
/prisma      - Schema and migrations
```

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Zustand
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL, Prisma ORM
- **AI:** Claude API (Anthropic SDK)
- **Jobs:** BullMQ + Redis
- **Auth:** JWT + httpOnly refresh tokens
- **Testing:** Vitest, React Testing Library
