import { defineType, defineField } from 'sanity';

export const logoCloud = defineType({
  name: 'logoCloud',
  title: 'Logo Cloud',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      description: 'Optional heading (e.g., "Trusted by", "Integrations")',
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'logo',
          fields: [
            defineField({
              name: 'name',
              title: 'Company / Integration Name',
              type: 'string',
              description: 'Used as alt text for accessibility',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Logo Image',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Link (optional)',
              type: 'url',
              description: 'Optional link when clicking the logo',
            }),
          ],
          preview: {
            select: { title: 'name', media: 'image' },
          },
        },
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }) => ({
      title: heading ?? 'Logo Cloud',
      subtitle: 'Logo Cloud Section',
    }),
  },
});
