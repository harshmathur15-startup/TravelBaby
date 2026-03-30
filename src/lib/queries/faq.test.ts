import { describe, it, expect } from 'vitest'
import { ALL_FAQ_ITEMS_QUERY, FAQ_BY_CATEGORY_QUERY } from './faq'

describe('ALL_FAQ_ITEMS_QUERY', () => {
  it('should filter by faqItem type', () => {
    expect(ALL_FAQ_ITEMS_QUERY).toContain('_type == "faqItem"')
  })

  it('should order by sortOrder ascending', () => {
    expect(ALL_FAQ_ITEMS_QUERY).toContain('order(sortOrder asc)')
  })

  it('should project FAQ fields', () => {
    const fields = ['question', 'answer', 'category']
    for (const field of fields) {
      expect(ALL_FAQ_ITEMS_QUERY).toContain(field)
    }
  })
})

describe('FAQ_BY_CATEGORY_QUERY', () => {
  it('should filter by faqItem type and category parameter', () => {
    expect(FAQ_BY_CATEGORY_QUERY).toContain('_type == "faqItem"')
    expect(FAQ_BY_CATEGORY_QUERY).toContain('$category')
  })

  it('should project FAQ fields', () => {
    const fields = ['question', 'answer', 'category']
    for (const field of fields) {
      expect(FAQ_BY_CATEGORY_QUERY).toContain(field)
    }
  })
})
