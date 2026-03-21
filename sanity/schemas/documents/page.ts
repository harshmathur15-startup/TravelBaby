import { defineType, defineField } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Internal title for this page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL path for this page (e.g., "features", "about")',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Build the page by adding content sections',
      of: [
        { type: 'hero' },
        { type: 'featureGrid' },
        { type: 'statsSection' },
        { type: 'ctaBlock' },
        { type: 'comparisonTable' },
        { type: 'logoCloud' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoMeta',
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare: ({ title, slug }) => ({
      title: title ?? 'Untitled Page',
      subtitle: slug ? `/${slug}` : 'No slug',
    }),
  },
});
