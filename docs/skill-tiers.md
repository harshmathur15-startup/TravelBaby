# Skill Tiers

47 skills organized by when you need them.

**Core skills** live in `.claude/skills/` and work out of the box.
**Extended skills** live in `.claude/skills-extended/`. To activate one, move its folder into `.claude/skills/`.
**SaaS skills** live in `.claude/skills-saas/`. Activate when adding backend (auth, API, database).

## Core (9) — Every project, from day 1

| Skill | What It Does |
|-------|-------------|
| `/kickoff` | Start-of-session — loads memory, commits, specs, primes context |
| `/wrap` | End-of-session — summarizes work, updates memory, sets next context |
| `/test` | Run tests, check coverage, fix failures |
| `/review` | Review code for quality, bugs, security, conventions |
| `/recall` | Search all past conversations across sessions |
| `/report` | Project status report — what's built, what's left, progress |
| `/retro` | Weekly retrospective from git log and notes |
| `/signal` | Cross-session communication — messages, inbox |
| `/stock-photos` | Fetch stock photos from Pexels/Unsplash |

## Extended (20) — Opt-in, based on project needs

### Auditing & Quality
| Skill | What It Does |
|-------|-------------|
| `/a11y-audit` | Deep WCAG AA accessibility audit |
| `/lighthouse` | Lighthouse performance, SEO, and accessibility scores |
| `/seo-audit` | Deep SEO audit — keywords, linking, structured data |
| `/cleanup` | Scan for dead code, unused imports, orphaned files |
| `/upgrade-deps` | Safely update outdated dependencies |
| `/quality-judge` | 8-dimension code quality scoring with remediation tasks |

### Planning & Research
| Skill | What It Does |
|-------|-------------|
| `/ask` | Surface ambiguities before building |
| `/assess` | Mid-session skill recommender |
| `/decisions` | Log architectural decisions (ADR) |
| `/why` | Explain why a file/function was built the way it was |
| `/map` | Codebase exploration — architecture, patterns, dependencies |
| `/public-ready` | Open-source readiness audit — secrets, PII, git history |

### CMS & Content
| Skill | What It Does |
|-------|-------------|
| `/cms-sync` | Verify Sanity schema ↔ frontend alignment |
| `/changelog` | Generate CHANGELOG.md from git history |

### Agents & Observability
| Skill | What It Does |
|-------|-------------|
| `/agent-activity` | All agent activity in think/act/observe format |
| `/agent-catalog` | All agents configured in project |
| `/agent-list` | Agents run in current session |
| `/cost` | Analyze tool.log for token costs and efficiency |
| `/pulse` | Workflow health — memory, hooks, velocity signals |

### Template Governance
| Skill | What It Does |
|-------|-------------|
| `/blueprint` | Benchmark template against best setups (via Thea) |
| `/debt` | Technical debt scan and prioritization (via Nell) |

## SaaS Upgrade (18) — Activate when adding backend

Skills for Express, Prisma, PostgreSQL, Redis, BullMQ, JWT auth. See [saas-upgrade.md](saas-upgrade.md).

| Skill | What It Does |
|-------|-------------|
| `/api-doc` | Express routes → OpenAPI 3.0 spec |
| `/data-model` | Requirements → Prisma schema |
| `/debug` | Structured debugging (Prisma, BullMQ, auth) |
| `/deploy` | Production deployment with migrations |
| `/diagram` | Mermaid architecture diagrams |
| `/drift` | Codebase vs architecture plan comparison |
| `/edge-case-check` | Boundary, null, concurrency checks |
| `/env-check` | Verify required environment variables |
| `/incident` | Structured incident response |
| `/load-test` | API route → k6 load test script |
| `/migrate` | Prisma migration workflow |
| `/observe-agent` | Real-time agent observability |
| `/onboard` | New developer setup checklist |
| `/prod-ready` | Pre-deployment checklist |
| `/scaffold` | Generate route + controller + service + test |
| `/security-scan` | Deep security audit (auth, SQL, XSS) |
| `/seed-database` | Generate test data for PostgreSQL |
| `/ux-review` | React component accessibility review |
