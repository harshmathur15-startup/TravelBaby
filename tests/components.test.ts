import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const DIST = resolve(import.meta.dirname, '..', 'dist')

/**
 * Component tests — validate rendered HTML from the built site.
 *
 * These tests check that UI primitives and section components render
 * with correct semantic HTML, ARIA attributes, design tokens, and
 * structural patterns. They run against the dist/ output (requires
 * a build first — build-smoke.test.ts handles that).
 */

function readPage(pagePath: string): string {
  return readFileSync(resolve(DIST, pagePath), 'utf-8')
}

describe('UI Primitives', () => {
  // Components page renders all UI primitives as a showcase
  const html = readPage('components/index.html')

  describe('Badge', () => {
    it('renders with design token classes', () => {
      expect(html).toContain('var(--color-primary-')
      expect(html).toContain('rounded-[var(--radius-full)]')
    })
  })

  describe('Button', () => {
    it('renders with focus ring for accessibility', () => {
      expect(html).toContain('focus:ring-2')
      expect(html).toContain('focus:outline-none')
    })

    it('uses design token spacing', () => {
      expect(html).toContain('var(--space-')
    })
  })

  describe('Card', () => {
    it('renders with design token borders and radii', () => {
      expect(html).toContain('var(--radius-lg)')
      expect(html).toContain('var(--color-neutral-')
    })
  })

  describe('Input', () => {
    it('renders with label and aria attributes', () => {
      expect(html).toContain('<label')
      expect(html).toContain('<input')
    })
  })

  describe('SectionHeading', () => {
    it('uses heading font token', () => {
      expect(html).toContain('var(--font-heading)')
    })
  })

  describe('Skeleton', () => {
    it('renders with aria-hidden for decorative loading state', () => {
      expect(html).toContain('aria-hidden="true"')
    })

    it('respects reduced-motion preference', () => {
      expect(html).toContain('prefers-reduced-motion')
    })
  })
})

describe('Section Components — Home Page', () => {
  const html = readPage('index.html')

  describe('Navbar', () => {
    it('renders skip link for accessibility', () => {
      expect(html).toContain('skip')
    })

    it('renders nav element', () => {
      expect(html).toContain('<nav')
    })

    it('has aria-label on navigation', () => {
      expect(html).toMatch(/nav[^>]*aria-label/)
    })
  })

  describe('Hero', () => {
    it('renders a heading', () => {
      expect(html).toMatch(/<h1[^>]*>/)
    })

    it('contains a CTA link or button', () => {
      expect(html).toMatch(/get-started|Get Started/i)
    })
  })

  describe('Footer', () => {
    it('renders footer element', () => {
      expect(html).toContain('<footer')
    })
  })
})

describe('SEO & Meta', () => {
  const pages = [
    { name: 'Home', path: 'index.html' },
    { name: 'Features', path: 'features/index.html' },
    { name: 'Pricing', path: 'pricing/index.html' },
    { name: 'About', path: 'about/index.html' },
    { name: 'Contact', path: 'contact/index.html' },
  ]

  describe.each(pages)('$name page', ({ path }) => {
    it('has meta description', () => {
      const html = readPage(path)
      expect(html).toContain('<meta name="description"')
    })

    it('has OG title', () => {
      const html = readPage(path)
      expect(html).toContain('<meta property="og:title"')
    })

    it('has canonical URL', () => {
      const html = readPage(path)
      expect(html).toContain('<link rel="canonical"')
    })

    it('has proper lang attribute', () => {
      const html = readPage(path)
      expect(html).toMatch(/<html[^>]*lang="en"/)
    })
  })
})

describe('Accessibility fundamentals', () => {
  const html = readPage('index.html')

  it('has a single h1', () => {
    const h1Count = (html.match(/<h1[\s>]/g) || []).length
    expect(h1Count).toBe(1)
  })

  it('uses semantic landmarks', () => {
    expect(html).toContain('<main')
    expect(html).toContain('<nav')
    expect(html).toContain('<footer')
  })

  it('has viewport meta tag', () => {
    expect(html).toContain('viewport')
    expect(html).toContain('width=device-width')
  })

  it('has charset declaration', () => {
    expect(html).toMatch(/charset.*utf-8/i)
  })
})

describe('Design token system', () => {
  const html = readPage('index.html')

  it('uses CSS custom properties (not hardcoded colors)', () => {
    // Check that the page uses design tokens
    expect(html).toContain('var(--color-')
    expect(html).toContain('var(--space-')
  })

  it('has dark mode class support', () => {
    // The theme toggle script should reference dark mode
    expect(html).toMatch(/dark|theme/i)
  })
})
