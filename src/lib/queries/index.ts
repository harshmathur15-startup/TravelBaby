/**
 * GROQ query barrel — re-exports all domain queries.
 * Import from '@lib/queries' or './queries' to get everything.
 */
export { SITE_SETTINGS_QUERY } from './site'
export { PAGE_BY_SLUG_QUERY, ALL_PAGE_SLUGS_QUERY } from './pages'
export { ALL_PRICING_PLANS_QUERY } from './pricing'
export {
  ALL_BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  ALL_BLOG_SLUGS_QUERY,
  RELATED_BLOG_POSTS_QUERY,
} from './blog'
export { ALL_TESTIMONIALS_QUERY } from './testimonials'
export { ALL_FAQ_ITEMS_QUERY, FAQ_BY_CATEGORY_QUERY } from './faq'
export { ALL_PRODUCT_PAGES_QUERY, PRODUCT_PAGE_BY_SLUG_QUERY } from './products'
