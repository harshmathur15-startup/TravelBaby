import { defineType, defineField } from 'sanity';

export const seoMeta = defineType({
  name: 'seoMeta',
  title: 'SEO Meta',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Override the default page title for search engines (max 60 chars)',
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Short description shown in search results (max 160 chars)',
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image displayed when shared on social media (1200x630 recommended)',
      options: { hotspot: true },
    }),
  ],
});
