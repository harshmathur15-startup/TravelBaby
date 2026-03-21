---
name: cms-sync
description: Verify Sanity CMS schema↔frontend alignment — unused schemas, missing queries, content completeness.
---

# CMS Sync Skill

Audit the connection between Sanity CMS schemas and the frontend. Catches drift: schemas that exist but aren't queried, fields defined but never rendered, queries referencing fields that don't exist in the schema.

## Usage

`/cms-sync` — full audit
`/cms-sync <schema>` — audit a specific document type
`/cms-sync --content` — check content completeness (requires Sanity MCP)

## Workflow

### Step 1 — Inventory schemas

Read all files in `sanity/schemas/documents/` and `sanity/schemas/objects/`:
- List every document type and its fields
- List every object type and its fields
- Note which fields are required vs optional

### Step 2 — Inventory queries

Read `src/lib/queries.ts` (or wherever GROQ queries live):
- Extract every GROQ query
- List which document types each query fetches
- List which fields each query projects

### Step 3 — Inventory frontend usage

Grep `src/pages/` and `src/components/` for data access patterns:
- Which queried fields are actually rendered in templates?
- Which components expect which props?

### Step 4 — Cross-reference

#### Schema → Query alignment

| Check | Severity | What It Catches |
|---|---|---|
| Schema type with no query | WARNING | Defined in CMS but never fetched — dead schema |
| Query references non-existent type | CRITICAL | Fetching a type that doesn't exist — will return empty |
| Query projects non-existent field | WARNING | Fetching a field that was renamed or removed |
| Schema field not in any query | INFO | Field exists in CMS but never queried — may be intentional |

#### Query → Frontend alignment

| Check | Severity | What It Catches |
|---|---|---|
| Queried field never rendered | WARNING | Fetching data that's thrown away — wasted bandwidth |
| Component expects field not in query | CRITICAL | Frontend references data that's never fetched — runtime error |
| Query returns array, component expects single | WARNING | Type mismatch between CMS and frontend |

#### Schema integrity

| Check | Severity | What It Catches |
|---|---|---|
| Schema references non-existent type | CRITICAL | `{type: 'reference', to: [{type: 'author'}]}` but `author` schema doesn't exist |
| Object type not used in any document | WARNING | Orphaned object schema |
| Duplicate field names across schemas | INFO | Potential confusion, not a bug |
| Missing `title` or `name` in document type | WARNING | Studio won't display properly |

### Step 5 — Content completeness (--content flag only)

If Sanity MCP is available, query for:
- Document types with 0 published documents
- Documents missing required fields
- References pointing to deleted documents
- Draft documents that were never published

## Output Format

```
## CMS Sync Report

**Schemas:** X document types, Y object types
**Queries:** X GROQ queries
**Date:** <current date>

### Schema ↔ Query Alignment

| Schema Type | Queries Using It | Status |
|---|---|---|
| blogPost | getBlogPosts, getBlogPost | OK |
| testimonial | getTestimonials | OK |
| author | -- | WARNING: no query |

### Query ↔ Frontend Alignment

| Query | Fields Fetched | Fields Rendered | Unused Fields |
|---|---|---|---|
| getBlogPosts | title, slug, excerpt, author, publishedAt, image | title, slug, excerpt, image | author, publishedAt |

### Issues

| # | Severity | Type | Details | Fix |
|---|---|---|---|---|
| 1 | CRITICAL | Missing query | `faqItem` schema has no GROQ query | Add query in queries.ts |
| 2 | WARNING | Unused fetch | `getBlogPosts` fetches `author` but never renders it | Remove from projection or render it |
| 3 | INFO | Unused field | `blogPost.subtitle` not in any query | Intentional? Remove from schema if unused |

### Summary
X schemas, Y queries, Z issues (A critical, B warning, C info).
```

## Edge Cases

- **No Sanity directory:** Report "No CMS detected — skipping" and exit
- **Multiple query files:** Search all `.ts` files for GROQ patterns (`groq\``, `*[_type ==`)
- **Dynamic queries:** Queries built with string interpolation — flag as "unverifiable, manual review needed"
- **Portable Text fields:** Don't flag these as "unused" if they're rendered via `<PortableText>` component
- **Image fields:** Check for Sanity image URL builder usage, not just direct field access
- **References:** Follow reference chains — `author._ref` → check `author` schema exists

## Instructions

- Read schemas first, then queries, then frontend — this order catches the most issues
- Don't flag optional fields as critical when they're not queried — they may be intentionally optional
- Schema files define the CMS structure; GROQ queries define what's fetched; components define what's rendered. All three must align.
- If `--content` flag is used but Sanity MCP is not configured, skip content checks and note "Sanity MCP not available"
- Group similar issues — "3 schemas with no queries" not 3 separate findings
