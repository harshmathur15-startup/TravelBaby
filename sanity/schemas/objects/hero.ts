import { defineType, defineField } from 'sanity';

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Primary headline text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'text',
      rows: 3,
      description: 'Supporting text below the headline',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Label for the call-to-action button',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'url',
      description: 'URL the CTA button links to',
      validation: (rule) =>
        rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      description: 'Optional hero background image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'headline' },
    prepare: ({ title }) => ({ title: title ?? 'Hero', subtitle: 'Hero Section' }),
  },
});
