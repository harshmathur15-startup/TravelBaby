import type { StructureBuilder } from 'sanity/structure';

/**
 * Custom desk structure for Sanity Studio.
 * - siteSettings is a singleton (opens directly, no list)
 * - Other document types are grouped logically
 */
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Singleton: Site Settings
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        ),

      S.divider(),

      // Pages
      S.documentTypeListItem('page').title('Pages'),

      S.divider(),

      // Blog
      S.documentTypeListItem('blogPost').title('Blog Posts'),
      S.documentTypeListItem('author').title('Authors'),

      S.divider(),

      // Pricing
      S.documentTypeListItem('pricingPlan').title('Pricing Plans'),

      S.divider(),

      // Social proof & support
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('faqItem').title('FAQ Items'),
    ]);
