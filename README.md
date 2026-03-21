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
/server           - Express API (opt-in SaaS upgrade)
/client           - React SPA (opt-in SaaS upgrade)
/agents           - BaseAgent framework
/docs             - Setup guides and reference
```

## Tech Stack

- **Frontend:** Astro 6, TypeScript, Tailwind CSS 4
- **CMS:** Sanity (headless, page builder, blog, schemas)
- **Design:** CSS custom properties design token system
- **SEO:** Open Graph, Twitter cards, JSON-LD, sitemap

## What's Included

- **6 UI primitives** — Badge, Button, Card, Container, Input, SectionHeading
- **9 section components** — Navbar, Hero, Features, Stats, Testimonials, PricingCards, FAQ, CTA, Footer
- **8 pages** — Home, Features, Pricing, About, Contact, Get Started, Blog listing, Blog posts
- **14 CMS schemas** — page builder, blog, pricing, testimonials, FAQ, site settings
- **Design token system** — colors, typography, spacing, shadows, radii, transitions
- **SEO foundation** — BaseLayout with OG, Twitter, canonical, JSON-LD

## Documentation

- [Getting Started](docs/getting-started.md) — full setup walkthrough
- [SaaS Upgrade](docs/saas-upgrade.md) — activate Express + Prisma + React backend
