# Quick Start

Clone this template and customize it in three steps:

## 1. Brand & Navigation

Edit `src/config/site.ts`:
- `name` — your brand name (appears in Navbar, Footer, meta tags)
- `url` — your production domain
- `description` — default meta description
- `themeColor` — browser theme color
- `navLinks` — header navigation items
- `ctaButton` — header call-to-action button
- `footerColumns` — footer link groups
- `socialLinks` — social media icons and URLs
- `copyright` — copyright holder name

Also update `astro.config.mjs` → `site` to match your URL.

## 2. Content

Edit `src/config/content.ts`:
- `HERO_CONTENT` — homepage hero section (heading, subtext, CTAs)
- `FEATURES_CONTENT` — feature grid items
- `STATS_CONTENT` — key metrics
- `PRICING_CONTENT` — pricing tiers
- `TESTIMONIALS_CONTENT` — customer quotes
- `FAQ_CONTENT` — frequently asked questions
- `CTA_CONTENT` — bottom call-to-action section

## 3. Theme

Edit `src/config/theme.ts`:
- `colors.primary` — main brand color (shade map 50-950)
- `colors.secondary` — secondary color
- `colors.accent` — accent/highlight color
- `fonts` — heading, body, and mono font families
- `fontUrl` — Google Fonts URL (update if changing fonts)

Get Tailwind palettes from: https://tailwindcss.com/docs/customizing-colors

## Run

```bash
npm install
npm run dev        # → localhost:4321
npm run build      # → dist/
```

## Optional: Sanity CMS

Set `SANITY_PROJECT_ID` in `.env` to enable CMS content.
CMS content overrides config defaults when available.

## Assets

Replace these files with your brand assets:
- `public/favicon.svg`
- `public/apple-touch-icon.png`
- `public/og-default.png` (Open Graph image)
