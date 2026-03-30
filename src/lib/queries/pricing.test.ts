import { describe, it, expect } from 'vitest'
import { ALL_PRICING_PLANS_QUERY } from './pricing'

describe('ALL_PRICING_PLANS_QUERY', () => {
  it('should filter by pricingPlan type', () => {
    expect(ALL_PRICING_PLANS_QUERY).toContain('_type == "pricingPlan"')
  })

  it('should order by sortOrder ascending', () => {
    expect(ALL_PRICING_PLANS_QUERY).toContain('order(sortOrder asc)')
  })

  it('should project pricing fields', () => {
    const fields = ['name', 'monthlyPrice', 'annualPrice', 'features', 'isPopular']
    for (const field of fields) {
      expect(ALL_PRICING_PLANS_QUERY).toContain(field)
    }
  })
})
