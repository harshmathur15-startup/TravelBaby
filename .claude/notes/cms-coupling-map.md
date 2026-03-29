# CMS Coupling Map — Website Template

Spec for Reach: "Static Website Creation Without Sanity" feature.

## What This Documents

Every point where Sanity CMS is wired into the template. A product that wants zero CMS can use this map to strip the layer cleanly.

## CMS-Dependent Files

### Core CMS Infrastructure
| File | Role | Strip? |
|------|------|--------|
| `src/lib/sanity.ts` | Client setup, `urlFor()` image helper | Yes |
| `src/lib/queries.ts` | All GROQ queries (blog, pages, pricing, testimonials, FAQ, site settings) | Yes |
| `src/lib/blog-data.ts` | Blog data abstraction — has fallback to 6 static posts when CMS unavailable | Replace with static-only version |
| `sanity/` (entire dir) | CMS schemas (8 document types, 7 object types), desk structure | Yes |

### Pages That Query Sanity
| Page | Dependency | Without CMS |
|------|-----------|-------------|
| `/blog/[slug].astro` | `getPostBySlug()` via blog-data.ts | Falls back to static posts (already works) |
| `/blog/[...page].astro` | `getAllPosts()` via blog-data.ts | Falls back to static posts (already works) |
| `/blog/category/[category].astro` | `getAllCategories()` via blog-data.ts | Falls back to static categories (already works) |
| `/preview.astro` | Direct Sanity API (client-side, needs auth token) | Remove entirely — no CMS means no preview |

### Pages That Are Already Pure Static (15+)
Home, Features, Pricing, About, Contact, Get Started, Compare, Components, Search, Privacy, Terms, 404, 500, robots.txt, RSS, manifest.json, OG images.

## Dependencies to Remove

```json
"@sanity/client": "^7.20.0",
"@sanity/image-url": "^2.0.3",
"sanity": "^5.17.1"
```

## Fallback Pattern Already in Place

`src/lib/blog-data.ts` exports a `CMS_AVAILABLE` flag:
- When `SANITY_PROJECT_ID` is missing → `sanityClient` is `null` → blog uses 6 hardcoded sample posts
- The try/catch in every query function falls through to static data on any CMS error
- This pattern is the foundation for a "static-only" mode

## What "CMS-Free Mode" Means Structurally

1. **No Sanity packages** in `package.json`
2. **No `sanity/` directory** — no schemas, no desk config
3. **No `src/lib/sanity.ts`** or `src/lib/queries.ts`
4. **`blog-data.ts` simplified** — static posts only, no CMS branch
5. **`/preview.astro` removed** — no CMS to preview
6. **Blog source options:** markdown files (MDX already in Astro config) or static data in `src/data/`
7. **`.env` simplified** — no `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_TOKEN` vars

## Recommended Approach for Reach

Build this as a CLI or skill that operates at clone time:
- Flag: `--no-cms` or interactive prompt "Do you need a CMS?"
- If no CMS: strip the files listed above, remove Sanity deps, simplify blog-data.ts, remove preview page
- If CMS: clone as-is (current behavior)

The template itself stays CMS-included. The stripping happens in Reach's creation flow.

---

*Source: Codebase analysis S37, 2026-03-29*
*For: Reach — "Static Website Creation" feature*
