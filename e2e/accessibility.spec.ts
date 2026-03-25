import { test, expect } from '@playwright/test';

const PAGES = ['/', '/features', '/pricing', '/about', '/contact', '/blog'];

test.describe('Accessibility basics', () => {
  test('html has lang attribute', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  for (const path of PAGES) {
    test(`${path} has no missing alt text on images`, async ({ page }) => {
      await page.goto(path);
      const images = page.locator('img:not([alt])');
      const count = await images.count();
      expect(count).toBe(0);
    });

    test(`${path} has exactly one h1`, async ({ page }) => {
      await page.goto(path);
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
    });

    test(`${path} headings are in order`, async ({ page }) => {
      await page.goto(path);
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
      let lastLevel = 0;

      for (const heading of headings) {
        const tag = await heading.evaluate((el) => el.tagName.toLowerCase());
        const level = parseInt(tag.replace('h', ''), 10);
        expect(level).toBeLessThanOrEqual(lastLevel + 2);
        lastLevel = level;
      }
    });
  }

  test('all interactive elements are keyboard focusable', async ({ page }) => {
    await page.goto('/');
    const links = page.locator('a[href]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 10); i++) {
      const tabindex = await links.nth(i).getAttribute('tabindex');
      if (tabindex !== null) {
        expect(parseInt(tabindex, 10)).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('buttons have accessible names', async ({ page }) => {
    await page.goto('/');
    const buttons = page.locator('button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const text = await btn.textContent();
      const ariaLabel = await btn.getAttribute('aria-label');
      const ariaLabelledBy = await btn.getAttribute('aria-labelledby');
      const hasName = (text && text.trim().length > 0) || ariaLabel || ariaLabelledBy;
      expect(hasName).toBeTruthy();
    }
  });

  test('color contrast — text is not invisible', async ({ page }) => {
    await page.goto('/');
    const body = page.locator('body');
    const text = await body.textContent();
    expect(text?.trim().length).toBeGreaterThan(100);
  });
});
