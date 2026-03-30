# Website Template Roadmap

**Goal:** The best free static-site boilerplate with AI governance built in.
Clone, customize, ship. SaaS upgrade when you need it.

---

## Phase 1 — Core Static Site [Complete]

Everything needed for a production marketing site.

| Area | What Ships | Count |
|------|-----------|-------|
| UI primitives | Badge, Button, Card, Container, Input, Pagination, Skeleton, etc. | 13 |
| Section components | Navbar (3), Hero (4), Features, Stats, Testimonials, Pricing, FAQ, Footer (2), BentoGrid, Comparison, etc. | 28 |
| Pages | Home, Features, Pricing, About, Contact, Get Started, Blog (listing/posts/categories), Compare, Preview, Search, Privacy, Terms, i18n (es), 404, 500 | 18 |
| Route generators | robots.txt, RSS, manifest.json, OG images | 4 |
| Design tokens | Colors, typography, spacing, shadows, radii, transitions (dark mode ready) | Full system |
| CMS schemas | 8 document types + 7 object types (page builder, blog, pricing, testimonials, FAQ) | 15 |
| SEO | OG, Twitter cards, canonical, JSON-LD, sitemap, RSS, dynamic OG images | Complete |
| Performance | Non-blocking fonts, View Transitions, Pagefind search, path aliases | Complete |

## Phase 2 — AI Governance Harness [Complete]

The differentiator: agent contracts, HITL gates, observability from day one.

| Area | What Ships | Count |
|------|-----------|-------|
| Core skills | Session lifecycle, reviews, retros, search, reporting, recycle bin, decisions, diagrams, changelog | 22 |
| Extended skills | Opt-in (.claude/skills-extended/) | 24 |
| SaaS skills | Activate with backend (.claude/skills-saas/) | 20 |
| Hooks | Health checks, file protection, recycle guard, formatting, quality gates, session tracking | 13 (via settings.json) |
| Scripts | Hook execution + skill utilities | 24 |
| Rules | general, security, frontend, performance, testing (+3 SaaS rules) | 5 + 3 |
| Agents | Thea (benchmark), Nell (debt), Mira (drift), Anvi (quality), Priya (upstream) | 5 |
| Docs | Getting started, deployment (4 hosts), skill tiers, inheritance, spawning, security headers, accessibility | 16 |

## Phase 3 — Polish and Completeness [In Progress]

| # | Item | Status |
|---|------|--------|
| 1 | E2e tests (pages, navigation, forms, accessibility, visual, axe) | Done (6 specs) |
| 2 | Agent unit tests (BaseAgent, logger, types) | Done (3 specs) |
| 3 | Component unit tests (UI primitives, sections) | Not started |
| 4 | Lighthouse CI score > 90 on all pages | Needs verification |
| 5 | CMS seed data (demo content for all schema types) | Not started |
| 6 | Deployment smoke test on all 4 hosts | Not started |
| 7 | Accessibility audit (WCAG 2.1 AA) | Partial (axe spec exists) |
| 8 | Image optimization (WebP, lazy loading audit) | Needs verification |

## Phase 4 — SaaS Upgrade Path [Planned]

Activate when you need auth, API, database, or background jobs.
See [saas-upgrade.md](saas-upgrade.md) for the activation guide.

| # | Item | Tool | Status |
|---|------|------|--------|
| 1 | Auth (JWT + refresh tokens) | Prisma + bcrypt | Planned |
| 2 | API layer (/api/v1/) | Astro API routes | Planned |
| 3 | Database (PostgreSQL) | Prisma ORM | Planned |
| 4 | Background jobs | BullMQ + Redis | Planned |
| 5 | SSE streaming for AI agents | EventSource | Planned |
| 6 | Payments | Stripe | Planned |
| 7 | Transactional email | Resend | Planned |
| 8 | Admin panel | TBD | Planned |
| 9 | Dockerfile + docker-compose | Docker | Planned |
| 10 | Rate limiting + CSRF | express-rate-limit, csrf-csrf | Planned |

---

**All tools are free or pay-as-you-earn. $0/month until you have paying customers.**
