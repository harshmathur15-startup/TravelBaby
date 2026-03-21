import { defineType, defineField } from 'sanity';

export const statsSection = defineType({
  name: 'statsSection',
  title: 'Stats Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Optional heading above the stats',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({
              name: 'number',
              title: 'Number',
              type: 'string',
              description: 'The stat value (e.g., "99%", "10K+", "$2M")',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'What the number represents',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { number: 'number', label: 'label' },
            prepare: ({ number, label }) => ({
              title: `${number} — ${label}`,
            }),
          },
        },
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }) => ({
      title: heading ?? 'Stats Section',
      subtitle: 'Stats Section',
    }),
  },
});
