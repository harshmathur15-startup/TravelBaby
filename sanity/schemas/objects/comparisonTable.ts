import { defineType, defineField } from 'sanity';

export const comparisonTable = defineType({
  name: 'comparisonTable',
  title: 'Comparison Table',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Heading displayed above the comparison table',
    }),
    defineField({
      name: 'columns',
      title: 'Column Headers',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Column names (e.g., "Feature", "Your Product", "Competitor A")',
      validation: (rule) => rule.min(2),
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'comparisonRow',
          fields: [
            defineField({
              name: 'feature',
              title: 'Feature Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'values',
              title: 'Values',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'One value per column (use "true"/"false" for checkmarks)',
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
    select: { heading: 'heading' },
    prepare: ({ heading }) => ({
      title: heading ?? 'Comparison Table',
      subtitle: 'Comparison Table Section',
    }),
  },
});
