import { defineType, defineField } from 'sanity'

export const addOn = defineType({
  name: 'addOn',
  title: 'Add-On',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Display price (e.g. "$25/mo", "$3/user/mo")',
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      description: 'Billing unit (e.g. "per user", "per seat", "flat rate")',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      description: 'Which plans include this (e.g. "Basic only", "All tiers")',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: 'Sort Order', name: 'sortOrder', by: [{ field: 'sortOrder', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'price' },
  },
})
