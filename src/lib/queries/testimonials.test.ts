import { describe, it, expect } from 'vitest'
import { ALL_TESTIMONIALS_QUERY } from './testimonials'

describe('ALL_TESTIMONIALS_QUERY', () => {
  it('should filter by testimonial type', () => {
    expect(ALL_TESTIMONIALS_QUERY).toContain('_type == "testimonial"')
  })

  it('should order by sortOrder ascending', () => {
    expect(ALL_TESTIMONIALS_QUERY).toContain('order(sortOrder asc)')
  })

  it('should project testimonial fields', () => {
    const fields = ['quote', 'name', 'role', 'company', 'avatar']
    for (const field of fields) {
      expect(ALL_TESTIMONIALS_QUERY).toContain(field)
    }
  })

  it('should dereference avatar asset', () => {
    expect(ALL_TESTIMONIALS_QUERY).toContain('asset->')
  })
})
