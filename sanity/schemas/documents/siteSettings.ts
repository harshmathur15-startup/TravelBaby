import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      initialValue: 'Your Company',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Main company logo',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (Dark Mode)',
      type: 'image',
      description: 'Logo variant for dark backgrounds',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short company tagline used in footer and meta',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      description: 'Main navigation menu items',
      of: [
        {
          type: 'object',
          name: 'navLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'string',
              description: 'Relative path (e.g., "/features") or external URL',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({ name: 'twitter', title: 'Twitter / X', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
        defineField({ name: 'github', title: 'GitHub', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'text',
      rows: 2,
      description: 'Copyright or legal text in the footer',
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seoMeta',
      description: 'Fallback SEO values used when pages do not specify their own',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});
