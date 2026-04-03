export { SITE_CONFIG } from './site'
export type { NavLink, FooterColumn, SocialLink } from './site'

export {
  HERO_CONTENT,
  FEATURES_CONTENT,
  STATS_CONTENT,
  PRICING_CONTENT,
  TESTIMONIALS_CONTENT,
  FAQ_CONTENT,
  CTA_CONTENT,
} from './content'

export { ABOUT_PAGE, CONTACT_PAGE, FEATURES_PAGE, PRICING_PAGE, COMPARE_PAGE, SERVICES_PAGE } from './pages'

export { PRODUCTS } from './products'
export type {
  ProductData,
  ProductFeature,
  ProductModule,
  ProductBenefit,
  ProductUseCase,
  ProductFaqItem,
} from './products'

export { THEME_CONFIG } from './theme'
export type { ColorScale } from './theme'

// i18n (import directly from @lib/i18n for full API)
export { getLocale, t } from '../lib/i18n'
export type { Locale } from '../lib/i18n'
