/**
 * Product page fallback data — lean defaults for when Sanity CMS is empty.
 * Real content lives in Sanity; these ensure pages render without CMS.
 *
 * Replace placeholder products with your own before launch.
 */

export interface ProductFeature {
  title: string
  description: string
  icon?: string
}

export interface ProductModule {
  title: string
  description: string
  icon?: string
}

export interface ProductBenefit {
  stat: string
  label: string
  description: string
  icon?: string
}

export interface ProductUseCase {
  title: string
  problem: string
  solution: string
}

export interface ProductFaqItem {
  question: string
  answer: string
}

export interface ProductData {
  slug: string
  name: string
  tagline: string
  heroDescription: string
  metaTitle?: string
  metaDescription?: string
  features: ProductFeature[]
  modules: ProductModule[]
  benefits: ProductBenefit[]
  useCases: ProductUseCase[]
  faq: ProductFaqItem[]
  sortOrder: number
}

export const PRODUCTS: ProductData[] = [
  {
    slug: 'product-alpha',
    name: 'Product Alpha',
    tagline: 'A short tagline describing Product Alpha',
    heroDescription:
      'Product Alpha helps teams accomplish their primary goal faster. Replace this with a real description of your first product.',
    features: [
      {
        title: 'Feature One',
        description: 'A brief explanation of what feature one does and why it matters.',
      },
      {
        title: 'Feature Two',
        description: 'A brief explanation of what feature two does and why it matters.',
      },
      {
        title: 'Feature Three',
        description: 'A brief explanation of what feature three does and why it matters.',
      },
    ],
    modules: [
      {
        title: 'Module A',
        description: 'The first capability within Product Alpha.',
      },
      {
        title: 'Module B',
        description: 'The second capability within Product Alpha.',
      },
    ],
    benefits: [
      {
        stat: '50%',
        label: 'Time Saved',
        description: 'Placeholder benefit — replace with a real metric.',
      },
      {
        stat: '3x',
        label: 'Faster Results',
        description: 'Placeholder benefit — replace with a real metric.',
      },
      {
        stat: '99%',
        label: 'Reliability',
        description: 'Placeholder benefit — replace with a real metric.',
      },
      {
        stat: '24/7',
        label: 'Availability',
        description: 'Placeholder benefit — replace with a real metric.',
      },
    ],
    useCases: [
      {
        title: 'Use Case One',
        problem: 'Describe the problem your customer faces.',
        solution: 'Explain how Product Alpha solves it.',
      },
      {
        title: 'Use Case Two',
        problem: 'Describe another common problem.',
        solution: 'Explain the solution Product Alpha provides.',
      },
    ],
    faq: [
      {
        question: 'How do I get started with Product Alpha?',
        answer: 'Sign up for a free trial and follow the onboarding guide.',
      },
      {
        question: 'Is there a free plan?',
        answer: 'Yes — a free tier is available with core functionality.',
      },
    ],
    sortOrder: 1,
  },
  {
    slug: 'product-beta',
    name: 'Product Beta',
    tagline: 'A short tagline describing Product Beta',
    heroDescription:
      'Product Beta extends your capabilities with advanced tooling. Replace this with a real description of your second product.',
    features: [
      {
        title: 'Feature One',
        description: 'A brief explanation of what this feature does for Product Beta.',
      },
      {
        title: 'Feature Two',
        description: 'A brief explanation of what this feature does for Product Beta.',
      },
      {
        title: 'Feature Three',
        description: 'A brief explanation of what this feature does for Product Beta.',
      },
    ],
    modules: [
      {
        title: 'Module A',
        description: 'The first capability within Product Beta.',
      },
      {
        title: 'Module B',
        description: 'The second capability within Product Beta.',
      },
    ],
    benefits: [
      {
        stat: '80%',
        label: 'Efficiency Gain',
        description: 'Placeholder benefit — replace with a real metric.',
      },
      {
        stat: '2x',
        label: 'Throughput',
        description: 'Placeholder benefit — replace with a real metric.',
      },
      {
        stat: '100%',
        label: 'Coverage',
        description: 'Placeholder benefit — replace with a real metric.',
      },
      {
        stat: '$0',
        label: 'Hidden Fees',
        description: 'Placeholder benefit — replace with a real metric.',
      },
    ],
    useCases: [
      {
        title: 'Use Case One',
        problem: 'Describe the problem your customer faces.',
        solution: 'Explain how Product Beta solves it.',
      },
      {
        title: 'Use Case Two',
        problem: 'Describe another common problem.',
        solution: 'Explain the solution Product Beta provides.',
      },
    ],
    faq: [
      {
        question: 'How does Product Beta differ from Product Alpha?',
        answer: 'Product Beta focuses on advanced use cases while Alpha covers the essentials.',
      },
      {
        question: 'Can I use both products together?',
        answer: 'Yes — they integrate seamlessly and share a unified dashboard.',
      },
    ],
    sortOrder: 2,
  },
]
