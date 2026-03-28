import { test, expect } from '@playwright/test'

/**
 * Generic contact form E2E tests.
 * Parameterize selectors below to match your project's form markup.
 */

const CONTACT_PAGE = '/contact'
const FORM_SELECTOR = 'form[aria-label="Contact form"]'
const NAME_INPUT = 'input[name="name"]'
const EMAIL_INPUT = 'input[name="email"]'
const SUBMIT_BUTTON = 'button[type="submit"]'

const NEWSLETTER_FORM = 'form.footer__newsletter-form'
const NEWSLETTER_EMAIL = 'input[type="email"]'
const NEWSLETTER_SUBMIT = 'button[type="submit"]'

test.describe('Contact form', () => {
  test('form is visible on contact page', async ({ page }) => {
    await page.goto(CONTACT_PAGE)
    const form = page.locator(FORM_SELECTOR)
    await expect(form).toBeVisible()
  })

  test('form has required fields', async ({ page }) => {
    await page.goto(CONTACT_PAGE)
    const form = page.locator(FORM_SELECTOR)
    await expect(form.locator(NAME_INPUT)).toBeVisible()
    await expect(form.locator(EMAIL_INPUT)).toBeVisible()
  })

  test('form validates required fields', async ({ page }) => {
    await page.goto(CONTACT_PAGE)
    const submitButton = page.locator(`${FORM_SELECTOR} ${SUBMIT_BUTTON}`)
    await submitButton.click()

    // HTML5 validation should prevent submission — check we're still on contact
    await expect(page).toHaveURL(new RegExp(CONTACT_PAGE))
  })

  test('email field rejects invalid email', async ({ page }) => {
    await page.goto(CONTACT_PAGE)
    const form = page.locator(FORM_SELECTOR)
    const emailInput = form.locator(EMAIL_INPUT)
    await emailInput.fill('not-an-email')
    const submitButton = form.locator(SUBMIT_BUTTON)
    await submitButton.click()

    // Should stay on page due to HTML5 validation
    await expect(page).toHaveURL(new RegExp(CONTACT_PAGE))
  })
})

test.describe('Newsletter form', () => {
  test('newsletter form is visible in footer', async ({ page }) => {
    await page.goto('/')
    const form = page.locator(NEWSLETTER_FORM)
    await expect(form).toBeVisible()
  })

  test('newsletter form has email input', async ({ page }) => {
    await page.goto('/')
    const emailInput = page.locator(`${NEWSLETTER_FORM} ${NEWSLETTER_EMAIL}`)
    await expect(emailInput).toBeVisible()
  })

  test('newsletter form has subscribe button', async ({ page }) => {
    await page.goto('/')
    const button = page.locator(`${NEWSLETTER_FORM} ${NEWSLETTER_SUBMIT}`)
    await expect(button).toBeVisible()
    await expect(button).toContainText(/subscribe/i)
  })
})
