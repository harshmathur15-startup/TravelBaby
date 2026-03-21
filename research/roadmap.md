# Template Roadmap — Product-First Extraction

**Strategy:** Build in Reach first. Extract proven patterns to Template after. The template inherits what survived contact with reality.

**Positioning:** It runs like any SaaS boilerplate. It thinks like no other.

**Tracker:** Lena (via /mother)

---

## Sequence

Build order matters. Each phase makes the template credible at the next level.

| Phase | What | Built In | Extract To Template | Status |
|-------|------|----------|---------------------|--------|
| 1 | **Reference App** — `npm install && npm run dev` works | Reach | Runnable Express + Vite + Prisma scaffold | Not started |
| 2 | **Auth + DB** — email, OAuth, JWT refresh rotation, RBAC, multi-tenancy | Reach | Auth middleware, Prisma schema, user flows | Not started |
| 3 | **Payments** — Stripe checkout, webhooks, subscriptions, billing portal | Reach | Stripe integration pattern, credit-based AI consumption model | Not started |
| 4 | **Docker + Deploy** — Dockerfile, docker-compose, health checks, deploy guides | Reach | Deployment config, graceful shutdown handler | Not started |
| 5 | **AI Integration** — LLM runtime, streaming, tool calling, multi-provider, cost tracking | Reach | Connect BaseAgent governance to real execution layer | Not started |

---

## Phase Details

### Phase 1: Reference App
**Goal:** A developer clones the template and has a running app in under 10 minutes.
**What Reach provides:** Working Express API + React client + Prisma DB + Redis connection.
**What to extract:** The minimal scaffold — project structure, dev scripts, env validation, database connection, health check endpoint.
**Benchmark impact:** Deploy +8 (4→12), Features +5 (3→8), Prod +4 (8→12). Total: +17 points.
**Done when:** `npm install && npm run dev` starts both server and client with no errors.

### Phase 2: Auth + DB
**Goal:** Auth works on day one. No developer takes a boilerplate seriously without it.
**What Reach provides:** Battle-tested JWT auth with refresh rotation, Google OAuth, Prisma schema (User, Org, Membership, RefreshToken), RBAC middleware, tenant isolation.
**What to extract:** Auth service pattern, middleware chain, Prisma schema, registration/login flows, token rotation logic.
**Benchmark impact:** Features +4, Deploy +2, Prod +2. Total: +8 points.
**Done when:** Register, login, refresh, logout, org switching all work end-to-end.

### Phase 3: Payments
**Goal:** A SaaS that can't charge isn't a SaaS.
**What Reach provides:** Stripe integration with Reach's actual billing model — checkout, webhooks, subscription lifecycle, billing portal.
**What to extract:** Stripe service pattern, webhook handler, subscription state machine, credit-based AI consumption model (connects to existing cost tracking).
**Benchmark impact:** Features +3.
**Done when:** User can subscribe, upgrade, cancel. Webhooks update DB state correctly.

### Phase 4: Docker + Deploy
**Goal:** `docker compose up` runs the full stack. Deploy to at least one cloud provider documented.
**What Reach provides:** Production Dockerfile, compose config (app + Postgres + Redis), deploy workflow.
**What to extract:** Dockerfile, docker-compose.yml, health check endpoint, graceful shutdown handler, deploy guide for Vercel/Railway/Fly.io.
**Benchmark impact:** Prod +4, Deploy +2. Total: +6 points.
**Done when:** `docker compose up` starts the full stack. At least one cloud deploy guide tested.

### Phase 5: AI Integration
**Goal:** Agent governance meets real execution. The thing nobody else has.
**What Reach provides:** Working agents that call Claude API, stream responses, use tools, track costs — all respecting BaseAgent contracts (iteration caps, write scopes, HITL gates).
**What to extract:** LLM service (Anthropic SDK), streaming pattern (SSE), tool calling framework, multi-provider adapter, cost tracking connected to real API calls, demo agent.
**Benchmark impact:** AI +4 (16→20).
**Done when:** One agent chats, uses tools, respects contracts, streams responses, logs costs. All governance rules enforced at runtime, not just on paper.

---

## Extraction Rules

1. **Only extract what worked** — if Reach rewrote it twice, extract the final version
2. **Document why** — each extraction includes a one-line note on what was learned
3. **Keep it generic** — strip Reach-specific logic, keep the pattern
4. **Test it** — extracted code must have tests in the template (not just in Reach)
5. **Petra re-benchmarks** after each extraction — score must go up or the extraction missed the point

---

## Projected Score After All 5 Phases

| Dimension | Current | After All Phases | Change |
|-----------|---------|-----------------|--------|
| Deploy | 4 | 16 | +12 |
| Features | 3 | 15 | +12 |
| AI | 16 | 20 | +4 |
| DX | 14 | 15 | +1 |
| Prod | 8 | 16 | +8 |
| **Total** | **45** | **82** | **+37** |
| **Rank** | **#7 of 8** | **#1** | — |

---

## Progress Log

Lena updates this section each run. Format: date, phase, what changed, evidence.

*(No entries yet)*
