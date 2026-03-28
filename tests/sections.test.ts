import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const DIST = resolve(import.meta.dirname, '..', 'dist')

function readPage(pagePath: string): string {
  return readFileSync(resolve(DIST, pagePath), 'utf-8')
}

describe('Features section', () => {
  const html = readPage('index.html')

  it('renders section with aria-labelledby', () => {
    expect(html).toMatch(/section[^>]*aria-labelledby="features-heading"/)
  })

  it('renders heading with correct id', () => {
    expect(html).toContain('id="features-heading"')
  })

  it('uses role="list" for feature grid', () => {
    expect(html).toMatch(/features__grid[^>]*role="list"/)
  })

  it('renders feature items as listitems', () => {
    expect(html).toMatch(/features__card[^>]*role="listitem"/)
  })

  it('has decorative icons with aria-hidden', () => {
    expect(html).toMatch(/features__icon[^>]*aria-hidden="true"/)
  })

  it('uses data-animate for scroll animations', () => {
    expect(html).toMatch(/features__card[^>]*data-animate="fade-up"/)
  })

  it('uses design tokens for spacing', () => {
    expect(html).toContain('var(--space-')
  })
})

describe('Stats section', () => {
  const html = readPage('index.html')

  it('renders with aria-label', () => {
    expect(html).toMatch(/section[^>]*class="stats"[^>]*aria-label/)
  })

  it('uses role="list" for stats grid', () => {
    expect(html).toMatch(/stats__grid[^>]*role="list"/)
  })

  it('renders stat items as listitems', () => {
    expect(html).toMatch(/stats__item[^>]*role="listitem"/)
  })

  it('contains value and label elements', () => {
    expect(html).toContain('stats__value')
    expect(html).toContain('stats__label')
  })
})

describe('Testimonials section', () => {
  const html = readPage('index.html')

  it('renders with aria-labelledby', () => {
    expect(html).toMatch(
      /section[^>]*class="testimonials"[^>]*aria-labelledby="testimonials-heading"/,
    )
  })

  it('uses blockquote for testimonials', () => {
    expect(html).toContain('<blockquote')
  })

  it('uses role="list" for testimonial grid', () => {
    expect(html).toMatch(/testimonials__grid[^>]*role="list"/)
  })

  it('renders testimonial cards as listitems', () => {
    expect(html).toMatch(/testimonials__card[^>]*role="listitem"/)
  })

  it('has author footer element', () => {
    expect(html).toContain('testimonials__author')
  })
})

describe('Pricing section', () => {
  const html = readPage('pricing/index.html')

  it('renders with aria-labelledby', () => {
    expect(html).toMatch(/section[^>]*class="pricing"[^>]*aria-labelledby="pricing-heading"/)
  })

  it('has billing toggle with radiogroup role', () => {
    expect(html).toMatch(/pricing__toggle[^>]*role="radiogroup"/)
  })

  it('has radio buttons with aria-checked', () => {
    expect(html).toMatch(/role="radio"[^>]*aria-checked="true"/)
  })

  it('uses role="list" for pricing grid', () => {
    expect(html).toMatch(/pricing__grid[^>]*role="list"/)
  })

  it('highlights popular tier', () => {
    expect(html).toContain('pricing__card--popular')
  })
})

describe('FAQ section', () => {
  const html = readPage('pricing/index.html')

  it('renders FAQ questions', () => {
    expect(html).toContain('faq__question')
  })

  it('has FAQ JSON-LD structured data', () => {
    expect(html).toContain('"@type":"FAQPage"')
  })

  it('uses details/summary for expandable answers', () => {
    expect(html).toContain('<details')
    expect(html).toContain('<summary')
  })
})

describe('CTA section', () => {
  const html = readPage('index.html')

  it('renders with aria-labelledby', () => {
    expect(html).toMatch(/section[^>]*class="cta-section"[^>]*aria-labelledby="cta-heading"/)
  })

  it('has a CTA link with aria-label', () => {
    expect(html).toMatch(/cta-section__btn[^>]*aria-label/)
  })

  it('uses design tokens for styling', () => {
    expect(html).toContain('var(--color-primary-')
  })
})

describe('Comparison table', () => {
  const html = readPage('compare/index.html')

  it('renders a table element', () => {
    expect(html).toContain('<table')
  })

  it('has table headers for competitors', () => {
    expect(html).toContain('<th')
  })

  it('uses accessible check/cross marks', () => {
    // Should have aria-label or sr-only text for boolean values
    expect(html).toMatch(/aria-label|sr-only|screen-reader/)
  })
})

describe('Page-level section composition', () => {
  describe('Home page', () => {
    const html = readPage('index.html')

    it('contains hero + features + stats + testimonials + CTA', () => {
      expect(html).toContain('id="features"')
      expect(html).toContain('class="stats"')
      expect(html).toContain('class="testimonials"')
      expect(html).toContain('class="cta-section"')
    })

    it('sections appear in logical order', () => {
      const heroIdx = html.indexOf('<h1')
      const featuresIdx = html.indexOf('id="features"')
      const statsIdx = html.indexOf('class="stats"')
      const testimonialsIdx = html.indexOf('class="testimonials"')
      const ctaIdx = html.indexOf('class="cta-section"')

      expect(heroIdx).toBeLessThan(featuresIdx)
      expect(featuresIdx).toBeLessThan(statsIdx)
      expect(statsIdx).toBeLessThan(testimonialsIdx)
      expect(testimonialsIdx).toBeLessThan(ctaIdx)
    })
  })

  describe('Pricing page', () => {
    const html = readPage('pricing/index.html')

    it('contains pricing + FAQ + CTA sections', () => {
      expect(html).toContain('id="pricing"')
      expect(html).toContain('faq__question')
      expect(html).toContain('class="cta-section"')
    })
  })

  describe('Features page', () => {
    const html = readPage('features/index.html')

    it('contains features + stats + CTA', () => {
      expect(html).toContain('id="features"')
      expect(html).toContain('class="stats"')
      expect(html).toContain('class="cta-section"')
    })
  })
})

describe('Blog page sections', () => {
  const html = readPage('blog/index.html')

  it('renders blog listing with blog cards', () => {
    expect(html).toContain('blog-card')
  })

  it('has CTA section', () => {
    expect(html).toContain('class="cta-section"')
  })
})

describe('Contact page', () => {
  const html = readPage('contact/index.html')

  it('renders a form', () => {
    expect(html).toContain('<form')
  })

  it('form has accessible labels', () => {
    expect(html).toContain('<label')
  })

  it('has required field indicators', () => {
    expect(html).toContain('required')
  })
})
