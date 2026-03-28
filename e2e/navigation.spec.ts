import { test, expect } from '@playwright/test'

/**
 * Desktop and mobile navigation smoke tests.
 * Parameterize selectors and nav links below to match your project.
 */

const NAVBAR_SELECTOR = '#navbar'
const LOGO_SELECTOR = '#navbar a[href="/"]'
const SKIP_LINK_SELECTOR = 'a.skip-link'
const SKIP_LINK_TARGET = '#main-content'
const FOOTER_SELECTOR = 'footer.footer'

const MOBILE_MENU_SELECTOR =
  '[aria-label*="menu" i], [aria-label*="nav" i], button.hamburger, [data-menu-toggle]'
const MOBILE_NAV_SELECTOR = '[data-mobile-nav], .mobile-nav, nav[aria-label*="mobile" i]'

const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

test.describe('Desktop navigation', () => {
  test('navbar is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator(NAVBAR_SELECTOR)).toBeVisible()
  })

  test('logo links to homepage', async ({ page }) => {
    await page.goto('/features')
    const logo = page.locator(LOGO_SELECTOR).first()
    await expect(logo).toBeVisible()
    await logo.click()
    await expect(page).toHaveURL('/')
  })

  test('nav links are visible', async ({ page }) => {
    await page.goto('/')
    for (const link of NAV_LINKS) {
      const navLink = page.locator(`${NAVBAR_SELECTOR} a:has-text("${link.label}")`).first()
      await expect(navLink).toBeVisible()
    }
  })

  test('skip to content link exists', async ({ page }) => {
    await page.goto('/')
    const skipLink = page.locator(SKIP_LINK_SELECTOR)
    await expect(skipLink).toHaveAttribute('href', SKIP_LINK_TARGET)
  })
})

test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test('hamburger menu opens and closes', async ({ page }) => {
    await page.goto('/')
    const menuButton = page.locator(MOBILE_MENU_SELECTOR).first()

    if (await menuButton.isVisible()) {
      await menuButton.click()
      const mobileNav = page.locator(MOBILE_NAV_SELECTOR).first()
      await expect(mobileNav).toBeVisible()
    }
  })
})

test.describe('Footer', () => {
  test('footer is visible on homepage', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator(FOOTER_SELECTOR)
    await footer.scrollIntoViewIfNeeded()
    await expect(footer).toBeVisible()
  })

  test('footer has navigation links', async ({ page }) => {
    await page.goto('/')
    const footerLinks = page.locator('footer a[href]')
    const count = await footerLinks.count()
    expect(count).toBeGreaterThanOrEqual(5)
  })
})
