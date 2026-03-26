# Website Boilerplate (AI-Ready)

## Why This Exists

Clone to website in 10 minutes. AI-governed from day one.

Static marketing site with CMS, design system, SEO, and responsive components — ready to customize. Optionally activate a full SaaS backend (auth, API, database, background jobs). What makes it different: agent governance ships from the start — contracts that prevent infinite loops, HITL gates that block irreversible actions, observability that shows what every agent did and why.

If a developer can't go from clone to building features in under 10 minutes, the template has failed.

## Quick Start

```bash
git clone <template-repo-url> my-website
cd my-website
npm install
npm run dev          # Astro dev server starts
```

Read [docs/getting-started.md](docs/getting-started.md) for full setup including Sanity CMS.

## Tech Stack

**Default (Static Site):**
- **Frontend:** Astro 6, TypeScript, Tailwind CSS 4
- **CMS:** Sanity (headless, page builder, blog, schemas)
- **Design:** CSS custom properties design token system
- **SEO:** Open Graph, Twitter cards, JSON-LD, sitemap, robots.txt

**SaaS Upgrade (planned):**
See [docs/saas-upgrade.md](docs/saas-upgrade.md) for the activation guide when you need auth, API, database, or background jobs.

## Project Structure

```
/src              - Astro frontend (pages, components, styles, lib)
/sanity           - CMS schemas, desk structure
/public           - Static assets, robots.txt, favicon
/agents           - Agent family (governance)
/scripts          - Hook execution scripts
/docs             - Setup guides, skill tiers, inheritance
```

## What's Included

### Website Layer
- **7 UI primitives:** Badge, Button, Card, Container, Input, SectionHeading, ThemeToggle
- **9 section components:** Navbar, Hero, Features, Stats, Testimonials, PricingCards, FAQ, CtaSection, Footer
- **11 pages:** Home, Features, Pricing, About, Contact, Get Started, Blog listing, Blog posts, Components, 404, 500
- **Design tokens:** Full color, typography, spacing, shadow, radius, transition system (dark mode ready)
- **CMS schemas:** 7 document types + 7 object types (page builder, blog, pricing, testimonials, FAQ)
- **SEO:** BaseLayout with OG, Twitter, canonical, JSON-LD, RSS feed, sitemap
- **Performance:** Non-blocking font loading, View Transitions, Lighthouse CI, path aliases

### AI Harness
| Layer | Count | What It Does |
|-------|-------|-------------|
| **Core Skills** | 13 | Session lifecycle, commits, reviews, debugging, deployment, planning, context management |
| **Extended Skills** | 53 | In `.claude/skills-extended/` — opt-in. Move any skill back to `.claude/skills/` to activate |
| **Hooks** | 8 | Auto-format, file protection, quality gates, session tracking |
| **Scripts** | 9 | Hook execution scripts |
| **Rules** | 8 | Standards for code, security, testing, performance, agents |

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
| frontend.md | Astro + React components, state, performance, a11y |
| database.md | Schema, indexing, migrations, queries |
| performance.md | Response budgets, frontend metrics, background jobs |
| testing.md | Test structure, mocking, coverage thresholds |
| agents.md | Agent contracts, HITL, retry, observability |

---

<!-- PRODUCT: Replace everything below with your product's specifics -->

## Product: [Your Project Name]

### Overview
[What this product does and who it's for]

### Core Features
[Your feature list]

### Agents
[Your product's agent family — built from the template pattern]

