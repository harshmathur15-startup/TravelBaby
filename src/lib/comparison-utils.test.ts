import { describe, it, expect } from 'vitest'
import { cmsToCategories, parseCellValue } from './comparison-utils'
import type { CmsCategory } from './comparison-utils'

describe('cmsToCategories', () => {
  describe('happy path', () => {
    it('should convert CMS data with multiple categories and rows', () => {
      const cmsCats: CmsCategory[] = [
        {
          name: 'Core',
          rows: [
            { feature: 'Dashboard', values: [true, false, 'Limited'] },
            { feature: 'API', values: [true, true, false] },
          ],
        },
        {
          name: 'Support',
          rows: [{ feature: 'Priority', values: [true, 'Paid', false] }],
        },
      ]
      const columnKeys = ['ours', 'competitorA', 'competitorB']

      const result = cmsToCategories(cmsCats, columnKeys)

      expect(result).toEqual([
        {
          name: 'Core',
          rows: [
            {
              feature: 'Dashboard',
              values: { ours: true, competitorA: false, competitorB: 'Limited' },
            },
            {
              feature: 'API',
              values: { ours: true, competitorA: true, competitorB: false },
            },
          ],
        },
        {
          name: 'Support',
          rows: [
            {
              feature: 'Priority',
              values: { ours: true, competitorA: 'Paid', competitorB: false },
            },
          ],
        },
      ])
    })
  })

  describe('empty input', () => {
    it('should return empty array when categories array is empty', () => {
      const result = cmsToCategories([], ['ours', 'competitorA'])

      expect(result).toEqual([])
    })
  })

  describe('row values shorter than columnKeys', () => {
    it('should fill missing values with false', () => {
      const cmsCats: CmsCategory[] = [
        {
          name: 'Features',
          rows: [{ feature: 'Partial', values: [true] }],
        },
      ]
      const columnKeys = ['ours', 'competitorA', 'competitorB']

      const result = cmsToCategories(cmsCats, columnKeys)

      expect(result[0].rows[0].values).toEqual({
        ours: true,
        competitorA: false,
        competitorB: false,
      })
    })
  })

  describe('row values longer than columnKeys', () => {
    it('should ignore extra values beyond columnKeys length', () => {
      const cmsCats: CmsCategory[] = [
        {
          name: 'Features',
          rows: [{ feature: 'Extra', values: [true, false, 'Yes', 'Ignored'] }],
        },
      ]
      const columnKeys = ['ours', 'competitorA']

      const result = cmsToCategories(cmsCats, columnKeys)

      expect(result[0].rows[0].values).toEqual({
        ours: true,
        competitorA: false,
      })
    })
  })
})

describe('parseCellValue', () => {
  describe('boolean input', () => {
    it('should return true as-is', () => {
      expect(parseCellValue(true)).toBe(true)
    })

    it('should return false as-is', () => {
      expect(parseCellValue(false)).toBe(false)
    })
  })

  describe('string input', () => {
    it('should return string as-is', () => {
      expect(parseCellValue('Limited')).toBe('Limited')
    })
  })

  describe('nullish input', () => {
    it('should return false for null', () => {
      expect(parseCellValue(null)).toBe(false)
    })

    it('should return false for undefined', () => {
      expect(parseCellValue(undefined)).toBe(false)
    })
  })

  describe('other types', () => {
    it('should convert number to string via String()', () => {
      expect(parseCellValue(42)).toBe('42')
    })
  })
})
