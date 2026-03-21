# Template Roadmap — Path to #1

**Goal:** Be the best SaaS boilerplate out there.
**Current score:** 45/100 (Petra Run 5, 2026-03-21)
**Target:** 90+ / #1

All tools are free or pay-as-you-earn. $0/month until you have paying customers.

---

## Phase 1 — Security (don't ship without these)

| # | What | Tool (Free) | Status |
|---|------|-------------|--------|
| 1 | Rate limiting on auth endpoints | express-rate-limit | Pending |
| 2 | CSRF protection | csrf-csrf | Pending |
| 3 | Request logging | pino-http | Pending |
| 4 | Token revocation on logout | Prisma (already have) | Pending |

## Phase 2 — Ship It (make it deployable)

| # | What | Tool (Free) | Status |
|---|------|-------------|--------|
| 5 | Dockerfile (multi-stage production) | Docker | Pending |
| 6 | Production docker-compose | Docker Compose | Pending |
| 7 | Health check (DB + Redis) | Express (already have) | Pending |
| 8 | Deployment guide | Railway (free $5/mo credit) | Pending |

## Phase 3 — Background Work (AI agents need this)

| # | What | Tool (Free) | Status |
|---|------|-------------|--------|
| 9 | BullMQ example job with error handling | BullMQ + Redis | Pending |
| 10 | Agent-to-BullMQ integration | BullMQ + BaseAgent | Pending |
| 11 | SSE streaming for agent output | Express + EventSource | Pending |
| 12 | Graceful worker shutdown | Node.js built-in | Pending |

## Phase 4 — Money + Communication

| # | What | Tool | Cost |
|---|------|------|------|
| 13 | Payments (subscriptions, checkout, webhooks) | Stripe | Free until transactions (2.9% + 30c each) |
| 14 | Transactional email (welcome, reset, invoice) | Resend | Free (100/day, 3000/month). Alt: Nodemailer + Gmail SMTP (500/day) |

## Phase 5 — Polish (good to best)

| # | What | Tool (Free) | Status |
|---|------|-------------|--------|
| 15 | Admin routes (users, orgs, jobs) | Express + React | Pending |
| 16 | File uploads | multer + Cloudflare R2 (10GB free) | Pending |
| 17 | Pre-commit hooks | Husky + lint-staged | Pending |
| 18 | OpenAPI/Swagger docs | swagger-jsdoc + swagger-ui-express | Pending |
| 19 | React component tests | Vitest + React Testing Library | Pending |
| 20 | Architecture diagram + ERD | Mermaid (/diagram skill) | Pending |

---

## Tool Cost Summary

| Tool | Monthly Cost |
|------|-------------|
| Docker | Free |
| Redis | Free (local) or $0 (Upstash free tier) |
| PostgreSQL | Free (local) or $0 (Neon/Supabase free tier) |
| Stripe | $0 until transactions |
| Resend | Free (3000 emails/month) |
| Cloudflare R2 | Free (10GB storage) |
| Railway | Free ($5/month credit) |
| All npm packages | Free (open source) |

**Total: $0/month until paying customers.**

---

## Competitive Context (Petra Run 5)

| Rank | Template | Score | Price |
|------|----------|-------|-------|
| 1 | Supastarter | 78 | $349 |
| 2 | MakerKit | 75 | $299 |
| 3 | Wasp Open SaaS | 72 | Free |
| 4 | next-forge | 72 | Free |
| ... | | | |
| 12 | **This Template** | 45 | Free |

**Our edge:** AI/Agent governance (16/20, best in field). No competitor has agent contracts, HITL gates, cost tracking, or a self-auditing family.

**The gap:** They have payments, email, admin panels, deployment guides, 400+ pages of docs. We have the AI foundation they don't.

---

## Learning Path (for non-coders)

| Tool | What It Is | Why You Need It |
|------|-----------|----------------|
| Docker | Packages apps into portable containers | Ship anywhere without "works on my machine" |
| Stripe | Payment processor | Accept money (subscriptions, one-time, usage) |
| Redis | Fast in-memory database | Background jobs, caching, real-time |
| BullMQ | Job queue on Redis | Run tasks without making users wait |
| Prisma | Database toolkit | Talk to PostgreSQL without raw SQL |
| SSE | Server-Sent Events | Stream AI output to browser in real-time |
| Zustand | React state manager | Track logged-in user, app state |
| Vite | Build tool | Turns code into what browsers understand |
| Tailwind | CSS utility framework | Style UI without writing CSS files |
| Resend | Email API | Send transactional emails |
| Cloudflare R2 | Object storage | Store uploaded files (S3 alternative, free) |
| Husky | Git hooks | Auto-check quality before every commit |
