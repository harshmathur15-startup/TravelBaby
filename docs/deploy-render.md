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

## Prisma Migration Baseline (SaaS only)

If your product started with `prisma db push` during development and later switched to `prisma migrate`, the first production deploy will fail with **P3005** ("database schema is not empty").

Fix: add a baseline step to your API build command in `render.yaml`:

```yaml
buildCommand: >
  npm ci &&
  npm run db:generate &&
  npx prisma migrate resolve --applied <your_init_migration_name> &&
  npm run db:migrate:deploy &&
  npm run build:server
```

This tells Prisma the init migration is already applied. After the first successful deploy, the resolve step becomes a no-op. Safe to leave in permanently.

> The `db:generate` and `db:migrate:deploy` scripts are defined during the SaaS upgrade setup. See [saas-upgrade.md](saas-upgrade.md).

## Deploy Hooks

Create a deploy hook in Dashboard > Settings > Deploy Hook. Use the URL in Sanity webhooks to trigger rebuilds.
