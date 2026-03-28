import { prisma } from '../lib/prisma'
import { logger } from '../lib/logger'
import { maskEmail } from '../lib/utils'

/**
 * Subscribe an email to the newsletter.
 * - If already active, returns the existing record (idempotent).
 * - If previously unsubscribed, reactivates.
 * - Otherwise creates a new subscriber.
 */
export async function subscribe(email: string, ip: string) {
  const existing = await prisma.newsletterSubscriber.findUnique({
    where: { email },
  })

  if (existing) {
    if (existing.status === 'ACTIVE') {
      logger.info(
        { subscriberId: existing.id, email: maskEmail(email) },
        'Newsletter subscriber already active',
      )
      return existing
    }

    const reactivated = await prisma.newsletterSubscriber.update({
      where: { email },
      data: { status: 'ACTIVE', ip, unsubscribedAt: null },
    })

    logger.info(
      { subscriberId: reactivated.id, email: maskEmail(email) },
      'Newsletter subscriber reactivated',
    )
    return reactivated
  }

  const subscriber = await prisma.newsletterSubscriber.create({
    data: { email, ip },
  })

  logger.info({ subscriberId: subscriber.id, email: maskEmail(email) }, 'New newsletter subscriber')
  return subscriber
}
