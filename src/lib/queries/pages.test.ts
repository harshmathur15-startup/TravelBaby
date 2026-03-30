import { describe, it, expect } from 'vitest'
import { PAGE_BY_SLUG_QUERY, ALL_PAGE_SLUGS_QUERY } from './pages'

describe('PAGE_BY_SLUG_QUERY', () => {
  it('should filter by page type and slug parameter', () => {
    expect(PAGE_BY_SLUG_QUERY).toContain('_type == "page"')
    expect(PAGE_BY_SLUG_QUERY).toContain('$slug')
  })

  it('should project sections array', () => {
    expect(PAGE_BY_SLUG_QUERY).toContain('sections[]')
  })

  it('should include SEO projection', () => {
    expect(PAGE_BY_SLUG_QUERY).toContain('seo')
    expect(PAGE_BY_SLUG_QUERY).toContain('metaTitle')
  })

  it('should select as singleton with [0]', () => {
    expect(PAGE_BY_SLUG_QUERY).toContain('[0]')
  })
})

describe('ALL_PAGE_SLUGS_QUERY', () => {
  it('should filter for pages with defined slugs', () => {
    expect(ALL_PAGE_SLUGS_QUERY).toContain('defined(slug.current)')
  })

  it('should project slug as string', () => {
    expect(ALL_PAGE_SLUGS_QUERY).toContain('"slug": slug.current')
  })
})
