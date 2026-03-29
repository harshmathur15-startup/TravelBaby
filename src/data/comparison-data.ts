/**
 * Comparison table data — generic placeholder for product comparison pages.
 * Replace column headers and row data with your actual product comparisons.
 */

export type CellValue = boolean | string

export interface ComparisonRow {
  feature: string
  values: Record<string, CellValue>
}

export interface Category {
  name: string
  rows: ComparisonRow[]
}

export const COLUMN_KEYS = ['ours', 'competitorA', 'competitorB'] as const

export const DEFAULT_COLUMN_HEADERS: Record<string, string> = {
  ours: 'Our Product',
  competitorA: 'Competitor A',
  competitorB: 'Competitor B',
}

export const DEFAULT_CATEGORIES: Category[] = [
  {
    name: 'Core Features',
    rows: [
      { feature: 'Dashboard', values: { ours: true, competitorA: true, competitorB: true } },
      { feature: 'API Access', values: { ours: true, competitorA: true, competitorB: false } },
      {
        feature: 'Custom Integrations',
        values: { ours: true, competitorA: false, competitorB: false },
      },
      {
        feature: 'Multi-language Support',
        values: { ours: true, competitorA: true, competitorB: true },
      },
    ],
  },
  {
    name: 'Advanced',
    rows: [
      {
        feature: 'AI-Powered Automation',
        values: { ours: true, competitorA: false, competitorB: false },
      },
      {
        feature: 'Advanced Analytics',
        values: { ours: true, competitorA: true, competitorB: false },
      },
      {
        feature: 'Custom Workflows',
        values: { ours: true, competitorA: 'Limited', competitorB: false },
      },
    ],
  },
  {
    name: 'Support & Pricing',
    rows: [
      { feature: 'Free Tier', values: { ours: true, competitorA: true, competitorB: false } },
      {
        feature: 'Priority Support',
        values: { ours: true, competitorA: 'Paid add-on', competitorB: true },
      },
      { feature: 'SLA Guarantee', values: { ours: true, competitorA: false, competitorB: true } },
    ],
  },
]
