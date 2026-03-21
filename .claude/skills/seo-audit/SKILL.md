---
name: seo-audit
description: Deep SEO audit — keyword coverage, internal linking, broken links, redirect chains, canonical conflicts, structured data.
---

# SEO Audit Skill

Deep search engine optimization audit. Goes beyond /lighthouse (which checks meta tags and basics). This audits the SEO strategy — are the right pages ranking for the right terms?

## Usage

`/seo-audit` — audit entire site
`/seo-audit <page>` — audit a specific page
`/seo-audit --technical` — technical SEO only (no content analysis)

## Workflow

Run all checks in parallel where possible.

### 1. Meta & Head Tags [CRITICAL]

For every page in `src/pages/`:

| Check | Target | How |
|---|---|---|
| Title tag | Unique, 50-60 chars, includes primary keyword | Read page frontmatter or `<title>` |
| Meta description | Unique, 120-160 chars, includes CTA | Grep for `meta name="description"` |
| H1 tag | Exactly one per page, contains primary keyword | Grep for `<h1` or Astro heading |
| Heading hierarchy | h1 → h2 → h3, no skipped levels | Parse heading structure |
| Canonical URL | Present, self-referencing or correct target | Grep for `rel="canonical"` |
| Open Graph | og:title, og:description, og:image all present | Grep for `og:` tags |
| Twitter cards | twitter:card, twitter:title present | Grep for `twitter:` tags |

### 2. Content Quality [WARNING]

| Check | Target | How |
|---|---|---|
| Word count per page | > 300 words for indexable pages | Count text content excluding HTML/code |
| Keyword in first 100 words | Primary keyword appears early | Read opening paragraph |
| Image alt text | Every `<img>` has descriptive alt | Grep for `<img` without `alt` or with `alt=""` |
| Duplicate content | No two pages have identical title or description | Compare across all pages |
| Thin pages | No pages with < 100 words (excluding redirects) | Count words per page |

### 3. Internal Linking [WARNING]

| Check | Target | How |
|---|---|---|
| Orphan pages | Every page reachable from at least one other page | Grep for `href="/page"` across all pages |
| Dead internal links | No links to pages that don't exist | Extract all `href="/"` links, verify each target exists in `src/pages/` |
| Navigation coverage | All key pages in navbar/footer | Read Navbar and Footer components |
| Anchor text quality | Links use descriptive text, not "click here" | Grep for `>click here<`, `>read more<`, `>here<` |
| Deep linking | Important pages within 2 clicks from home | Trace link paths from index |

### 4. Technical SEO [CRITICAL]

| Check | Target | How |
|---|---|---|
| Sitemap | `sitemap.xml` or sitemap integration exists | Check `public/sitemap*.xml` or Astro sitemap config |
| robots.txt | Present, allows crawling of key pages | Read `public/robots.txt` |
| RSS feed | Present if blog exists | Check for RSS route in `src/pages/` |
| JSON-LD structured data | Organization + WebSite schema on home | Grep for `application/ld+json` |
| URL structure | Clean, kebab-case, no query params for content | Inspect page file names |
| Trailing slashes | Consistent (all with or all without) | Check Astro config `trailingSlash` |
| 404 page | Custom 404 exists | Check `src/pages/404.astro` |
| Redirect chains | No redirect pointing to another redirect | Check for redirect config |
| Page speed signals | No render-blocking CSS/JS in `<head>` | Grep for blocking `<link>` or `<script>` |

### 5. Blog SEO [WARNING] (skip if no blog)

| Check | Target | How |
|---|---|---|
| Blog post URLs | `/blog/<slug>` format, descriptive slugs | Check blog route structure |
| Published dates | Every post has a visible publish date | Check blog post template |
| Author attribution | Posts have author with name | Check schema for author field |
| Category/tag pages | Posts are categorized | Check for category routes |
| RSS feed | Blog has dedicated RSS | Check RSS route |
| Blog listing pagination | Handles > 10 posts | Check if pagination exists |

### 6. Sanity CMS SEO [WARNING] (skip if no CMS)

| Check | Target | How |
|---|---|---|
| SEO fields in schemas | Every document type has seoMeta object | Read Sanity schemas for seoMeta |
| Slug field | Every content type has a slug field | Check schema definitions |
| Preview configured | Documents have preview title/subtitle | Check desk structure |
| Draft content not indexed | Published content only serves to frontend | Check GROQ queries for draft filtering |

## Output Format

```
## SEO Audit Report

**Site:** <project name>
**Pages audited:** X
**Date:** <current date>

### Score

| Category | Score | Status |
|---|---|---|
| Meta & Head Tags | X/100 | PASS/WARN/FAIL |
| Content Quality | X/100 | PASS/WARN/FAIL |
| Internal Linking | X/100 | PASS/WARN/FAIL |
| Technical SEO | X/100 | PASS/WARN/FAIL |
| Blog SEO | X/100 or N/A | PASS/WARN/FAIL |
| CMS SEO | X/100 or N/A | PASS/WARN/FAIL |
| **Overall** | **X/100** | |

### CRITICAL Findings
<numbered list with file:line, or "None">

### WARNING Findings
<numbered list, or "None">

### Quick Wins (highest impact, lowest effort)
| # | Fix | Impact | Effort | Page |
|---|---|---|---|---|
| 1 | Add meta description to /pricing | High | 2 min | src/pages/pricing.astro |

### Summary
X issues found. Top 3 priorities: ...
```

## Scoring

- Each category starts at 100
- CRITICAL finding: -20 per issue
- WARNING finding: -10 per issue
- Floor at 0
- Overall = weighted average: Meta 25%, Technical 25%, Content 20%, Linking 15%, Blog 10%, CMS 5%

## Instructions

- Read actual page content, not just frontmatter — SEO lives in the rendered output
- Don't flag intentionally noindex pages (check for `noindex` meta)
- Blog checks only run if `src/pages/blog/` exists
- CMS checks only run if `sanity/` directory exists
- Quick wins section is the most actionable output — prioritize it
- Limit to 20 findings total — group similar issues ("5 pages missing meta descriptions" not 5 separate findings)
