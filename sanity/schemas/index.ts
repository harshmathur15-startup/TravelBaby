// Document types
import { page } from './documents/page'
import { pricingPlan } from './documents/pricingPlan'
import { blogPost } from './documents/blogPost'
import { author } from './documents/author'
import { siteSettings } from './documents/siteSettings'
import { testimonial } from './documents/testimonial'
import { faqItem } from './documents/faqItem'
import { richTextPage } from './documents/richTextPage'
import { addOn } from './documents/addOn'
import { aboutPage } from './documents/aboutPage'
import { featuresPage } from './documents/featuresPage'
import { comparePage } from './documents/comparePage'

// Object types
import { hero } from './objects/hero'
import { featureGrid } from './objects/featureGrid'
import { statsSection } from './objects/statsSection'
import { ctaBlock } from './objects/ctaBlock'
import { comparisonTable } from './objects/comparisonTable'
import { logoCloud } from './objects/logoCloud'
import { seoMeta } from './objects/seoMeta'

export const schemaTypes = [
  // Documents
  page,
  pricingPlan,
  blogPost,
  author,
  siteSettings,
  testimonial,
  faqItem,
  richTextPage,
  addOn,
  aboutPage,
  featuresPage,
  comparePage,
  // Objects
  hero,
  featureGrid,
  statsSection,
  ctaBlock,
  comparisonTable,
  logoCloud,
  seoMeta,
]
