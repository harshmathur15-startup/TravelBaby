# Deploy to Cloudflare Pages

## Quick Start

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) > Pages
2. Create a project > Connect to Git
3. Select your repository
4. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 22 (set `NODE_VERSION=22` in environment variables)
5. Add environment variables
6. Deploy

## Environment Variables

Set in Pages > Settings > Environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `SANITY_PROJECT_ID` | If using CMS | Sanity project ID |
| `SANITY_DATASET` | If using CMS | Dataset name |
| `PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics ID |
| `NODE_VERSION` | Yes | Set to `22` |

## Custom Domain

1. Pages > Custom domains > Set up a custom domain
2. Add DNS record (Cloudflare manages this if your domain uses Cloudflare DNS)
3. SSL is automatic

## Headers

Cloudflare Pages supports `_headers` files in the output directory. The template's `public/_headers` is copied to `dist/_headers` at build time.

## Deploy Hooks

Create a deploy hook in Pages > Settings > Builds & deployments > Deploy hooks. Use in Sanity webhooks.
