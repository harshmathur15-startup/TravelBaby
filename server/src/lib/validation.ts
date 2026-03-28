import { z } from 'zod'

/** Generic contact form submission. */
export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Invalid email address'),
  company: z.string().max(200).optional(),
  message: z.string().min(1, 'Message is required').max(5000),
})

export type ContactInput = z.infer<typeof contactSchema>

/** Newsletter signup — email only. */
export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export type NewsletterInput = z.infer<typeof newsletterSchema>

/** Cursor/offset pagination for list endpoints. */
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
})

export type PaginationInput = z.infer<typeof paginationSchema>
