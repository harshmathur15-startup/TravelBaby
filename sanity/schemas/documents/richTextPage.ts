import { defineType, defineField } from 'sanity'

/**
 * Generic rich text page — privacy policy, terms of service, refund policy,
 * or any other long-form static content. Simpler than the `page` builder:
 * just a title, slug, portable text body, and optional last-updated date.
 */
export const richTextPage = defineType({
  name: 'richTextPage',
  title: 'Rich Text Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL path (e.g., "privacy-policy", "terms")',
      options: { source: 'title', maxLength: 96 },
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      description: 'Displayed on the page — update when content changes',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: rule =>
                      rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
                  },
                ],
              },
            ],
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
    select: { title: 'title', lastUpdated: 'lastUpdated' },
    prepare: ({ title, lastUpdated }) => ({
      title: title ?? 'Untitled',
      subtitle: lastUpdated ? `Updated ${lastUpdated}` : 'No date set',
    }),
  },
})
