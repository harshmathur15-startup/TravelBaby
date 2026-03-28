import { prisma } from '../lib/prisma'
import { logger } from '../lib/logger'
import { maskEmail } from '../lib/utils'
import type { ContactInput } from '../lib/validation'

/**
 * Persist a contact form submission and log with PII masked.
 */
export async function createSubmission(data: ContactInput, ip: string) {
  const submission = await prisma.contactSubmission.create({
    data: {
      name: data.name,
      email: data.email,
      company: data.company ?? null,
      message: data.message,
      ip,
    },
  })

  logger.info(
    { submissionId: submission.id, email: maskEmail(data.email) },
    'Contact form submission received',
  )

  return submission
}
