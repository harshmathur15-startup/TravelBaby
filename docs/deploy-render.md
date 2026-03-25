# Deploy to Render

## Quick Start

The template includes a `render.yaml` blueprint. If your project has one:

1. Go to [render.com/deploy](https://render.com/deploy)
2. Connect your repository
3. Render reads `render.yaml` and configures the service automatically

### Manual Setup

1. Dashboard > New > Static Site
2. Connect your repository
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Add environment variables
5. Deploy

## Environment Variables

Set in Dashboard > Environment:

| Variable | Required | Description |
|----------|----------|-------------|
| `SANITY_PROJECT_ID` | If using CMS | Sanity project ID |
| `SANITY_DATASET` | If using CMS | Dataset name |
| `PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics ID |

## Headers

Render supports a `_headers` file for static sites. The template's `public/_headers` is included.

## Custom Domain

1. Dashboard > Settings > Custom Domains
2. Add your domain
3. Update DNS: CNAME → `your-site.onrender.com`
4. SSL is automatic

## Deploy Hooks

Create a deploy hook in Dashboard > Settings > Deploy Hook. Use the URL in Sanity webhooks to trigger rebuilds.
