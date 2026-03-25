# Deploy to Vercel

## Quick Start

1. Push your repo to GitHub/GitLab/Bitbucket
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Vercel auto-detects Astro — no config needed
5. Add environment variables:
   - `SANITY_PROJECT_ID` — your Sanity project ID
   - `SANITY_DATASET` — usually `production`
6. Deploy

## Environment Variables

Set these in Vercel Dashboard > Settings > Environment Variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `SANITY_PROJECT_ID` | If using CMS | Sanity project ID |
| `SANITY_DATASET` | If using CMS | Dataset name (default: production) |
| `PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics ID |

## Build Settings

Vercel should auto-detect these, but verify:

- **Framework:** Astro
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** 22.x

## Custom Domain

1. Vercel Dashboard > Settings > Domains
2. Add your domain
3. Update DNS: CNAME → `cname.vercel-dns.com`
4. SSL is automatic

## Preview Deployments

Every push to a non-production branch creates a preview URL. Share with stakeholders for review before merging.
