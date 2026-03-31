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
- **13 UI primitives:** Badge, Button, Card, CommandLauncher, Container, Input, LanguagePicker, Pagination, PortableTextRenderer, PreferenceToggles, SectionHeading, Skeleton, ThemeToggle
- **37 section components:** Navbar, NavbarMega, NavMobile, Hero, HeroSplit, HeroMinimal, HeroTrustBar, Features, Stats, Testimonials, PricingCards, FAQ, CtaSection, Footer, FooterNewsletter, BentoGrid, ComparisonTable, ComparisonCell, CompetitorCards, CompetitorSummary, AIAgents, ContactInfo, HowItWorks, Industries, Integrations, TeamGrid, ModuleShowcase, AddOns, DetailedComparison, PricingCard, PricingAddons, ProductHero, ProductFeatures, ProductModules, ProductBenefits, ProductUseCases, ProductFAQ
- **20 pages:** Home, Features, Pricing, About, Contact, Get Started, Blog (listing, posts, categories), Components, Compare, Preview, Search, Privacy, Terms, Products (listing, detail), i18n (es), 404, 500
- **4 route generators:** robots.txt, RSS feed, manifest.json, OG images
- **Design tokens:** Full color, typography, spacing, shadow, radius, transition system (dark mode ready)
- **CMS schemas:** 13 document types + 7 object types (page builder, rich text pages, blog, pricing, testimonials, FAQ, products, about, compare, features)
- **SEO:** BaseLayout with OG, Twitter, canonical, JSON-LD (Organization, WebSite, BreadcrumbList), RSS feed, sitemap, dynamic OG images
- **Performance:** Non-blocking font loading, View Transitions, Lighthouse CI, Pagefind search, path aliases

### AI Harness
| Layer | Count | What It Does |
|-------|-------|-------------|
| **Core Skills** | 22 | Session lifecycle, reviews, retrospectives, search, reporting, recycle bin, task prioritization, decisions, diagrams, changelog |
| **Extended Skills** | 24 | In `.claude/skills-extended/` — opt-in. Move to `.claude/skills/` to activate |
| **SaaS Skills** | 20 | In `.claude/skills-saas/` — activate when adding backend (auth, API, database) |
| **Hooks** | 28 | Health checks, file protection, recycle guard, formatting, quality gates, session tracking, drift baseline |
| **Scripts** | 31 | Hook execution, skill utilities, seed data, tests, delivery check |
| **Rules** | 8 | Standards for code, security, frontend, performance, testing + 3 SaaS |
| **Agents** | 5 | Thea (benchmark), Nell (debt), Mira (drift), Anvi (quality), Priya (upstream extraction) |

## Hooks (Run Automatically)

| When | What | Why |
|------|------|-----|
| Session starts | Verify memory integrity | Catch stale/broken memory files |
| Session starts | Check protected file drift | Detect unauthorized changes |
| Session starts | Validate skills/agents structure | Catch missing frontmatter |
| Before bash | Back up files before deletion | Recycle bin — nothing hard-deleted |
| Before bash | Block destructive commands | Safety |
| Before file edit | Check protected file patterns | Prevent accidental config edits |
| Before compaction | Generate session handoff | Preserve context |
| After file edit | Run prettier | Auto-format code |
| After file edit | Console.log detection | Code quality |
| After any tool | Log to session tracker | Observability |
| Session ends | Cost estimate | Token usage tracking |
| Session ends | Capture drift baseline | Snapshot protected file hashes |

## Rules (5 Active + 3 SaaS)

| Rule | Covers | Stack |
|------|--------|-------|
| general.md | Naming, file discipline, git, code quality | All |
| security.md | Secrets, input validation, audit logging | All |
| frontend.md | Astro components, performance, a11y | Static site |
| performance.md | Frontend metrics, bundle size, caching | All |
| testing.md | Test structure, mocking, coverage thresholds | All |
| backend.md | API design, error handling, logging | SaaS upgrade |
| database.md | Schema, indexing, migrations, queries | SaaS upgrade |
| agents.md | Agent contracts, HITL, retry, observability | SaaS upgrade |

---

<!-- PRODUCT: Replace everything below with your product's specifics -->

## Product: [Your Project Name]

**Built from:** `_template-website`

### Overview
[What this product does and who it's for]

### Core Features
[Your feature list]

### Agents
[Your product's agent family — built from the template pattern]
