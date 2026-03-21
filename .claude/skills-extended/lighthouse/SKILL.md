---
name: lighthouse
description: Frontend audit — Lighthouse Performance, SEO, and Accessibility scores with actionable fixes.
---

# Lighthouse Skill

Audit frontend quality — performance, SEO, accessibility. Built for marketing sites and static pages where search ranking and page speed are success metrics.

## Usage

`/lighthouse` — audit the home page
`/lighthouse <page>` — audit a specific page (e.g., `/pricing`, `/blog`)
`/lighthouse --all` — audit all pages in `src/pages/`

## Workflow

### Step 1 — Build the site

```bash
npm run build 2>&1
```

If the build fails, stop and report the error. No point auditing a broken build.

### Step 2 — Serve and audit

```bash
npx serve dist/ -l 4321 &
npx lighthouse http://localhost:4321/<page> --output=json --chrome-flags="--headless --no-sandbox" 2>/dev/null
```

If lighthouse CLI is not available, fall back to manual checks (Step 3 only).

### Step 3 — Manual checks (always run, supplements Lighthouse)

Run these in parallel:

#### Performance
| Check | How | Target |
|---|---|---|
| Image sizes | Glob `public/**/*.{png,jpg,jpeg,gif,webp,svg}`, check file sizes | No image > 500KB |
| Font loading | Read BaseLayout.astro, check for `font-display: swap` or `preload` | Non-blocking fonts |
| Unused CSS | Check for Tailwind purge config in `tailwind.config.*` | Purge enabled |
| View Transitions | Check for `<ViewTransitions />` in layout | Present for SPA-feel |
| Bundle size | Check `dist/` output sizes | No single JS file > 100KB |
| Render-blocking resources | Grep for `<link rel="stylesheet"` without `media` or async strategy | None blocking |

#### SEO
| Check | How | Target |
|---|---|---|
| Title tags | Grep all pages for `<title>` or `title` prop | Every page has unique title |
| Meta descriptions | Grep for `meta name="description"` | Every page, 120-160 chars |
| Open Graph tags | Grep for `og:title`, `og:description`, `og:image` | All present |
| Twitter cards | Grep for `twitter:card`, `twitter:title` | All present |
| Canonical URLs | Grep for `<link rel="canonical"` | Every page |
| JSON-LD structured data | Grep for `application/ld+json` | Home page minimum |
| Sitemap | Check `public/sitemap*.xml` or sitemap integration exists | Present |
| robots.txt | Read `public/robots.txt` | Present, allows crawling |
| RSS feed | Check for RSS route in `src/pages/` | Present if blog exists |
| Alt text on images | Grep `.astro` files for `<img` without `alt` | All images have alt |
| Heading hierarchy | Check pages for proper h1 → h2 → h3 order | No skipped levels |

#### Accessibility
| Check | How | Target |
|---|---|---|
| Color contrast | Check CSS custom properties for text/background pairs | WCAG AA (4.5:1) |
| Focus indicators | Grep for `:focus` or `focus-visible` styles | Present |
| Aria labels | Grep interactive elements (buttons, links, inputs) for `aria-label` or visible text | All labeled |
| Skip navigation | Check for skip-to-content link | Present |
| Language attribute | Check `<html lang="...">` in layout | Present |
| Form labels | Grep `<input` for associated `<label>` or `aria-label` | All inputs labeled |
| Keyboard navigation | Check for `tabindex` usage, no `tabindex > 0` | No traps |

## Output Format

```
## Lighthouse Audit Report

**Page:** <URL or path>
**Date:** <current date>

### Scores

| Category | Score | Status |
|---|---|---|
| Performance | X/100 | PASS (≥90) / WARN (70-89) / FAIL (<70) |
| SEO | X/100 | PASS (≥90) / WARN (70-89) / FAIL (<70) |
| Accessibility | X/100 | PASS (≥90) / WARN (70-89) / FAIL (<70) |

### Performance Issues

| # | Issue | Impact | File | Fix |
|---|---|---|---|---|
| 1 | hero.png is 1.2MB | High — LCP | public/hero.png | Compress to WebP, target <200KB |

### SEO Issues

| # | Issue | Impact | Page | Fix |
|---|---|---|---|---|
| 1 | /pricing missing meta description | Medium | src/pages/pricing.astro | Add description in frontmatter |

### Accessibility Issues

| # | Issue | Impact | File | Fix |
|---|---|---|---|---|
| 1 | Button without aria-label | High | src/components/ui/ThemeToggle.astro | Add aria-label="Toggle theme" |

### Summary
**X issues found** — Y high, Z medium, W low.
All scores ≥90: **PASS** | Any score <70: **FAIL** | Otherwise: **NEEDS WORK**
```

## Edge Cases

- **No dist/ directory:** Build first, then audit
- **Lighthouse CLI not available:** Run manual checks only, note "Install lighthouse for full audit: npm i -g lighthouse"
- **SSR pages:** Skip Lighthouse for dynamic routes, run manual checks only
- **Blog pages:** Audit the listing page + one post page, not every post
- **`--all` flag:** Cap at 10 pages — audit home + highest-traffic pages first

## Instructions

- Always run manual checks even if Lighthouse CLI is available — they catch things Lighthouse misses
- Scores below 90 need specific fixes, not just "optimize images"
- If Lighthouse CLI fails silently, note it and rely on manual checks
- For `--all`, deduplicate issues that appear on every page (e.g., missing skip-nav in layout = 1 issue, not 10)
- Kill the serve process after audit: `kill %1` or equivalent
