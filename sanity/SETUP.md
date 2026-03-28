# Sanity CMS Setup

## Quick Start

1. Create a Sanity project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy `.env.example` to `.env` and fill in:
   - `SANITY_PROJECT_ID` — from your Sanity dashboard
   - `SANITY_DATASET` — usually `production`
3. Run `npm run dev` — the site works without Sanity (static fallback content)

## Schemas

The template ships 14 Sanity schemas:

**Document types (7):** blogPost, page, pricing, testimonial, faq, author, siteSettings
**Object types (7):** blockContent, hero, feature, stat, ctaBlock, seoMeta, socialLink

Schemas are in `sanity/schemas/documents/` and `sanity/schemas/objects/`.

## Content Editing

- **Without Sanity:** Edit content in `src/config/content.ts` (static defaults)
- **With Sanity:** CMS content overrides static defaults automatically
- **Preview:** Visit `/preview?type=blogPost&slug=<slug>&token=<token>` for draft previews

## Desk Structure

Custom desk layout in `sanity/desk/`. Groups documents by type with sensible defaults.
