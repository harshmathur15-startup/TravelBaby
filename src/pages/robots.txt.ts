import type { APIContext } from 'astro';
import { SITE_CONFIG } from '@config';

export function GET(context: APIContext) {
  const siteUrl = (context.site?.toString() ?? SITE_CONFIG.url).replace(/\/$/, '');
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${siteUrl}sitemap-index.xml`,
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
