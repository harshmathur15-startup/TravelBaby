import { defineType, defineField } from 'sanity'

export const featuresPage = defineType({
  name: 'featuresPage',
  title: 'Features Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'modulesHeading',
      title: 'Modules Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
            defineField({
              name: 'icon',
              title: 'Icon Key',
              type: 'string',
              description: 'Icon identifier (e.g. "star", "shield", "zap")',
            }),
            defineField({
              name: 'image',
              title: 'Screenshot',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'features',
              title: 'Feature List',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        },
      ],
    }),
    defineField({
      name: 'agentsHeading',
      title: 'AI Agents Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'agentsSubtext',
      title: 'AI Agents Section Subtext',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'agents',
      title: 'AI Agents',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'hitl', title: 'Human-in-the-Loop Note', type: 'string' }),
            defineField({
              name: 'accentColor',
              title: 'Accent Color (CSS)',
              type: 'string',
              description: 'CSS color value (e.g. "var(--color-primary-500)")',
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'tagline' },
          },
        },
      ],
    }),
    defineField({
      name: 'integrations',
      title: 'Integration Names',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of integration partner names displayed in the logo cloud',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoMeta',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Features Page' }),
  },
})
