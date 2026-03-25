# ISR + On-Demand Revalidation

Incremental Static Regeneration lets CMS content updates go live without full site rebuilds.

## Prerequisites

- Switch `astro.config.mjs` to `output: 'hybrid'` (or `'server'`)
- Deploy to a platform that supports ISR (Vercel, Netlify, Cloudflare)

## Vercel

```ts
// astro.config.mjs
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'hybrid',
  adapter: vercel({
    isr: {
      expiration: 60, // seconds — revalidate after 1 minute
    },
  }),
});
```

On-demand revalidation via API route:

```ts
// src/pages/api/revalidate.ts
export const POST: APIRoute = async ({ request }) => {
  const { secret, path } = await request.json();
  if (secret !== import.meta.env.REVALIDATION_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }
  // Vercel handles revalidation via the x-vercel-revalidate header
  return new Response(JSON.stringify({ revalidated: true, path }));
};
```

## Netlify

```ts
// astro.config.mjs
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'hybrid',
  adapter: netlify(),
});
```

On-demand via Netlify's `purge` API or rebuild hooks from Sanity.

## Cloudflare Pages

```ts
// astro.config.mjs
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare(),
});
```

Use Cloudflare KV for caching, Workers for on-demand invalidation.

## Sanity Webhook

Point your Sanity webhook at your revalidation endpoint:

1. Go to Sanity Studio > Settings > Webhooks
2. URL: `https://yourdomain.com/api/revalidate`
3. Method: POST
4. Body: `{ "secret": "your-secret", "path": "/blog" }`
5. Trigger on: Create, Update, Delete for `blogPost`, `page`

## When to Use

- **Static (current):** Best for sites that update infrequently (< 10 updates/day)
- **ISR:** Best for sites with frequent content updates that need near-instant publishing
- **Full SSR:** Best for personalized content or real-time data

Start static. Move to ISR when content editors need faster publishing cycles.
