import { test, expect } from '@playwright/test';

const VISUAL_PAGES = [
  { path: '/', name: 'home' },
  { path: '/features', name: 'features' },
  { path: '/pricing', name: 'pricing' },
  { path: '/blog', name: 'blog' },
  { path: '/about', name: 'about' },
];

test.describe('Visual regression', () => {
  for (const { path, name } of VISUAL_PAGES) {
    test(`${name} page matches screenshot`, async ({ page }) => {
      await page.goto(path);
      // Wait for fonts and animations to settle
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => {
        document.querySelectorAll('[data-animate]').forEach((el) => {
          el.classList.add('is-visible');
        });
      });
      await expect(page).toHaveScreenshot(`${name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.01,
      });
    });
  }
});
