/**
 * Comparison table utilities — parse CMS data into typed comparison structures.
 * Used by ComparisonTable, DetailedComparison, and ComparisonCell components.
 */

import type { Category, ComparisonRow } from '@data/comparison-data'

export type CellValue = boolean | string

export interface CmsRow {
  feature: string
  values: CellValue[]
}

export interface CmsCategory {
  name: string
  rows: CmsRow[]
}

/**
 * Convert CMS comparison data (positional arrays) into keyed Category objects.
 * @param cmsCats - categories from CMS with positional value arrays
 * @param columnKeys - ordered column keys matching the value positions
 */
export function cmsToCategories(cmsCats: CmsCategory[], columnKeys: string[]): Category[] {
  return cmsCats.map(cat => ({
    name: cat.name,
    rows: cat.rows.map((row): ComparisonRow => {
      const values: Record<string, CellValue> = {}
      columnKeys.forEach((key, i) => {
        values[key] = row.values[i] ?? false
      })
      return { feature: row.feature, values }
    }),
  }))
}

export function parseCellValue(raw: unknown): CellValue {
  if (typeof raw === 'boolean') return raw
  if (typeof raw === 'string') return raw
  if (raw === null || raw === undefined) return false
  return String(raw)
}
