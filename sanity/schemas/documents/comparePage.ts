import { defineType, defineField } from 'sanity'

export const comparePage = defineType({
  name: 'comparePage',
  title: 'Compare Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
    }),
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
      name: 'competitors',
      title: 'Competitor Summary Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'positioning', title: 'Positioning', type: 'string' }),
            defineField({ name: 'price', title: 'Price', type: 'string' }),
            defineField({ name: 'strength', title: 'Strength', type: 'text', rows: 2 }),
            defineField({ name: 'weakness', title: 'Weakness', type: 'text', rows: 2 }),
            defineField({
              name: 'highlight',
              title: 'Highlight (featured)',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'positioning' },
          },
        },
      ],
    }),
    defineField({
      name: 'columnHeaders',
      title: 'Comparison Table Column Headers',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Column headers for the comparison table (e.g. "Feature", "Us", "Competitor A", "Competitor B")',
    }),
    defineField({
      name: 'comparisonCategories',
      title: 'Comparison Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Category Name', type: 'string' }),
            defineField({
              name: 'rows',
              title: 'Rows',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'feature', title: 'Feature', type: 'string' }),
                    defineField({
                      name: 'values',
                      title: 'Values',
                      type: 'array',
                      of: [{ type: 'string' }],
                      description:
                        'One value per competitor column. Use "true" for checkmark, "false" for X, or text like "Add-on".',
                    }),
                  ],
                  preview: {
                    select: { title: 'feature' },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'name' },
          },
        },
      ],
    }),
    defineField({
      name: 'differentiators',
      title: 'Differentiators',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoMeta',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Compare Page' }),
  },
})
