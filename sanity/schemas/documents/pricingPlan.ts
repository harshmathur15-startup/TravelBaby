import { defineType, defineField } from 'sanity';

export const pricingPlan = defineType({
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      description: 'Display name (e.g., "Starter", "Growth", "Enterprise")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'monthlyPrice',
      title: 'Monthly Price',
      type: 'number',
      description: 'Monthly price in USD (use 0 for free, -1 for "Contact us")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'annualPrice',
      title: 'Annual Price',
      type: 'number',
      description: 'Monthly price when billed annually',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      description: 'One-line plan summary shown below the price',
    }),
    defineField({
      name: 'features',
      title: 'Included Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of features included in this plan',
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'isPopular',
      title: 'Popular Badge',
      type: 'boolean',
      description: 'Show a "Most Popular" badge on this plan',
      initialValue: false,
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Button label (e.g., "Start Free Trial", "Contact Sales")',
      initialValue: 'Get Started',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'url',
      validation: (rule) =>
        rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto'] }),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', price: 'monthlyPrice', popular: 'isPopular' },
    prepare: ({ title, price, popular }) => ({
      title: `${title}${popular ? ' (Popular)' : ''}`,
      subtitle: price === -1 ? 'Contact us' : `$${price}/mo`,
    }),
  },
});
