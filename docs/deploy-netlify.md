# Deploy to Netlify

## Quick Start

1. Push your repo to GitHub/GitLab/Bitbucket
2. Go to [app.netlify.com/start](https://app.netlify.com/start)
3. Connect your repository
4. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Add environment variables (Site > Settings > Environment variables)
6. Deploy

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SANITY_PROJECT_ID` | If using CMS | Sanity project ID |
| `SANITY_DATASET` | If using CMS | Dataset name |
| `PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics ID |

## Headers

The `public/_headers` file is automatically picked up by Netlify. Security headers (CSP, HSTS, X-Frame-Options) are included.

## Custom Domain

1. Site > Domain Management > Add custom domain
2. Update DNS: point to Netlify's load balancer
3. SSL is automatic via Let's Encrypt

## Build Hooks

Create a build hook in Site > Build & Deploy > Build hooks. Use this URL in Sanity webhooks to trigger rebuilds on content changes.
