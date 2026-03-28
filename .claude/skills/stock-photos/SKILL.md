---
name: stock-photos
description: Fetch stock photos from Pexels or Unsplash and save them to the project.
---

# Stock Photos — Fetch & Place

## Trigger
When the user asks for stock photos, images, or pictures for the site. Examples:
- "get me some team photos"
- "find hero images"
- "I need photos for the blog"
- "/stock-photos"

## Prerequisites
One of these environment variables must be set:
- `PEXELS_API_KEY` — get free at https://www.pexels.com/api/
- `UNSPLASH_ACCESS_KEY` — get free at https://unsplash.com/developers

## Workflow

1. **Understand the request** — what images, how many, what size, where to save
2. **Run the script** for each set of images needed:
   ```bash
   node scripts/fetch-stock-photos.js --query "search term" --count N --size medium --name filename-prefix --dir public/images
   ```
3. **Wire images into the site** — update components/pages to reference the downloaded files
4. **Note attribution** — the script outputs photographer credits. Add to the page or a credits file.

## Script Options

| Flag | Description | Default |
|------|-------------|---------|
| `--query` | Search term (required) | — |
| `--count` | Number of images | 1 |
| `--size` | `small` / `medium` / `large` / `original` | medium |
| `--name` | Custom filename prefix | derived from query |
| `--dir` | Output directory | public/images |

## Examples

```bash
# Single hero image
node scripts/fetch-stock-photos.js --query "abstract purple gradient" --count 1 --name hero --size large

# Team photos for about page
node scripts/fetch-stock-photos.js --query "diverse team office" --count 3 --name team --size medium

# Blog post covers
node scripts/fetch-stock-photos.js --query "web development coding" --count 6 --name blog-cover --size medium
```

## Size Guide
- `small` — ~400px wide, fast load, thumbnails
- `medium` — ~1200px wide, good for cards and sections
- `large` — ~2000px wide, hero images
- `original` — full resolution, use sparingly

## Attribution
Both Pexels and Unsplash require attribution. The script outputs credits after each download. Add them to the page footer or a `/credits` page.
