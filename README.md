# Website Boilerplate (AI-Ready)

A complete static website boilerplate with Astro, Sanity CMS, Tailwind CSS 4, and built-in AI agent governance.

## Quick Start

```bash
git clone <template-repo-url> my-website
cd my-website
npm install
npm run dev                    # localhost:4321
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Astro dev server |
| `npm run build` | Build static site to `dist/` |
| `npm run preview` | Preview production build locally |

## Project Structure

```
/src              - Astro frontend (pages, components, styles, lib)
/sanity           - CMS schemas, desk structure
/public           - Static assets, robots.txt, favicon
/agents           - Agent family (governance)
/scripts          - Hook execution scripts
/docs             - Setup guides and reference
```

## Tech Stack

- **Frontend:** Astro 6, TypeScript, Tailwind CSS 4
- **CMS:** Sanity (headless, page builder, blog, schemas)
- **Design:** CSS custom properties design token system
- **SEO:** Open Graph, Twitter cards, JSON-LD, sitemap

## What's Included

- **10 UI primitives** — Badge, Button, Card, Container, Input, Pagination, PortableTextRenderer, SectionHeading, Skeleton, ThemeToggle
- **14 section components** — Navbar, NavMobile, Hero, Features, Stats, Testimonials, PricingCards, FAQ, CtaSection, Footer, BentoGrid, ComparisonTable, HowItWorks, Integrations
- **18 pages + 4 route generators** — Home, Features, Pricing, About, Contact, Get Started, Blog (listing, posts, categories), Components, Compare, Preview, Search, Privacy, Terms, i18n, 404, 500
- **14 CMS schemas** — page builder, blog, pricing, testimonials, FAQ, site settings
- **Design token system** — colors, typography, spacing, shadows, radii, transitions
- **SEO foundation** — BaseLayout with OG, Twitter, canonical, JSON-LD

## Documentation

- [Getting Started](docs/getting-started.md) — full setup walkthrough
- [Skill Tiers](docs/skill-tiers.md) — 13 core + 53 extended skills, organized by need
- [SaaS Upgrade](docs/saas-upgrade.md) — planned guide for adding auth, API, and database
