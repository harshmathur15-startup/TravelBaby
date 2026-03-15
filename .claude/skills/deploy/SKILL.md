---
name: deploy
description: Production deployment workflow — pre-deploy checks, migrations, rollback plan
disable-model-invocation: true
---

# Deploy Skill

Step-by-step production deployment workflow.

## Pre-Deploy Checklist

| Step | Command | Required |
|---|---|---|
| Run tests | `npm run test` | Yes |
| TypeScript check | `npx tsc --noEmit` | Yes |
| Lint check | `npm run lint` | Yes |
| Build client | `npm run build` | Yes |
| Check .env vars | Verify all required vars set | Yes |
| Prisma migrations | `npx prisma migrate deploy` | If schema changed |

## Deployment Steps

1. Run pre-deploy checklist — stop if any step fails
2. Build the production bundle: `npm run build`
3. Run database migrations: `npx prisma migrate deploy`
4. Restart the server process
5. Verify health check endpoint: `GET /api/v1/health`
6. Confirm AI agents are running and logging correctly

## Rollback Plan

| Trigger | Action |
|---|---|
| Health check fails | Revert to previous build |
| DB migration fails | Run `npx prisma migrate resolve --rolled-back` |
| Agent errors spike | Disable agent automation, notify team |

## Instructions
- Always run tests before deploying
- Never skip TypeScript checks
- All deployments must be logged with timestamp and deployer
- Notify team after successful deploy
