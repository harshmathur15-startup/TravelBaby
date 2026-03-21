import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const DIST = resolve(import.meta.dirname, '..', 'dist');

describe('Build smoke test', () => {
  beforeAll(() => {
    execSync('npm run build', { cwd: resolve(import.meta.dirname, '..'), timeout: 60_000 });
  }, 90_000);

  const EXPECTED_PAGES = [
    'index.html',
    '404.html',
    '500.html',
    'about/index.html',
    'contact/index.html',
    'features/index.html',
    'pricing/index.html',
    'get-started/index.html',
    'components/index.html',
    'blog/index.html',
    'blog/building-design-system/index.html',
    'blog/seo-best-practices-2025/index.html',
    'blog/getting-started-with-astro/index.html',
    'blog/responsive-layouts-guide/index.html',
    'blog/cms-integration-tips/index.html',
    'blog/web-performance-checklist/index.html',
  ];

  it.each(EXPECTED_PAGES)('generates %s', (page) => {
    expect(existsSync(resolve(DIST, page))).toBe(true);
  });

  it('generates sitemap', () => {
    expect(existsSync(resolve(DIST, 'sitemap-index.xml'))).toBe(true);
  });

  it('generates RSS feed', () => {
    expect(existsSync(resolve(DIST, 'rss.xml'))).toBe(true);
  });

  it('includes meta tags in home page', () => {
    const html = readFileSync(resolve(DIST, 'index.html'), 'utf-8');
    expect(html).toContain('<meta property="og:title"');
    expect(html).toContain('<meta name="description"');
    expect(html).toContain('</html>');
  });

  it('blog posts contain article content', () => {
    const html = readFileSync(resolve(DIST, 'blog/building-design-system/index.html'), 'utf-8');
    expect(html).toContain('Design System');
    expect(html).toContain('<article');
  });
});
