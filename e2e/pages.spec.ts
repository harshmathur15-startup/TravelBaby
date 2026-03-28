import { test, expect } from '@playwright/test'

/**
 * Page-load smoke tests with configurable page list.
 * Add or remove entries from PAGES to match your project's routes.
 */

const PAGES = [
  { path: '/', title: 'Home' },
  { path: '/features', title: 'Features' },
  { path: '/pricing', title: 'Pricing' },
  { path: '/blog', title: 'Blog' },
  { path: '/about', title: 'About' },
  { path: '/contact', title: 'Contact' },
]

test.describe('Page loads', () => {
  for (const pg of PAGES) {
    test(`${pg.path} loads successfully`, async ({ page }) => {
      const response = await page.goto(pg.path)
      expect(response?.status()).toBe(200)
    })

    test(`${pg.path} has correct title`, async ({ page }) => {
      await page.goto(pg.path)
      await expect(page).toHaveTitle(new RegExp(pg.title, 'i'))
    })

    test(`${pg.path} has an h1`, async ({ page }) => {
      await page.goto(pg.path)
      const h1 = page.locator('h1').first()
      await expect(h1).toBeVisible()
    })
  }
})

test.describe('SEO meta tags', () => {
  for (const pg of PAGES) {
    test(`${pg.path} has meta description`, async ({ page }) => {
      await page.goto(pg.path)
      const description = page.locator('meta[name="description"]')
      await expect(description).toHaveAttribute('content', /.{20,}/)
    })

    test(`${pg.path} has canonical URL`, async ({ page }) => {
      await page.goto(pg.path)
      const canonical = page.locator('link[rel="canonical"]')
      await expect(canonical).toHaveAttribute('href', /.+/)
    })

    test(`${pg.path} has OG tags`, async ({ page }) => {
      await page.goto(pg.path)
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /.+/)
      await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/)
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /.+/)
    })
  }

  test('homepage has structured data', async ({ page }) => {
    await page.goto('/')
    const ldJsonScripts = page.locator('script[type="application/ld+json"]')
    const count = await ldJsonScripts.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })
})

test.describe('Error pages', () => {
  test('404 page renders for unknown routes', async ({ page }) => {
    const response = await page.goto('/nonexistent-page-xyz')
    expect(response?.status()).toBe(404)
    await expect(page.locator('body')).toContainText(/not found|404/i)
  })
})
