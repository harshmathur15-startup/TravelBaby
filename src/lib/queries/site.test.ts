import { describe, it, expect } from 'vitest'
import { SITE_SETTINGS_QUERY } from './site'

describe('SITE_SETTINGS_QUERY', () => {
  it('should be a non-empty string', () => {
    expect(typeof SITE_SETTINGS_QUERY).toBe('string')
    expect(SITE_SETTINGS_QUERY.trim().length).toBeGreaterThan(0)
  })

  it('should filter by siteSettings type', () => {
    expect(SITE_SETTINGS_QUERY).toContain('_type == "siteSettings"')
  })

  it('should select as singleton with [0]', () => {
    expect(SITE_SETTINGS_QUERY).toContain('[0]')
  })

  it('should project expected fields', () => {
    const expectedFields = [
      'companyName',
      'tagline',
      'logo',
      'navLinks',
      'socialLinks',
      'defaultSeo',
    ]
    for (const field of expectedFields) {
      expect(SITE_SETTINGS_QUERY).toContain(field)
    }
  })
})
