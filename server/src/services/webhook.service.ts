import { createHmac, timingSafeEqual } from 'node:crypto'

import { env } from '../env'
import { logger } from '../lib/logger'

const DEBOUNCE_MS = 60_000

/** Document types that should trigger a site rebuild when changed in the CMS. */
const REBUILDABLE_TYPES = new Set([
  'page',
  'blogPost',
  'siteSettings',
  'author',
  // TODO(template): add your CMS document types that affect the static site
])

let lastRebuildAt = 0

/**
 * Verify a Sanity webhook HMAC-SHA256 signature using timing-safe comparison.
 */
export function verifySignature(rawBody: string, signature: string): boolean {
  if (!env.SANITY_WEBHOOK_SECRET) return false

  const expected = createHmac('sha256', env.SANITY_WEBHOOK_SECRET).update(rawBody).digest('hex')

  const sigBuffer = Buffer.from(signature, 'utf8')
  const expectedBuffer = Buffer.from(expected, 'utf8')

  if (sigBuffer.length !== expectedBuffer.length) return false
  return timingSafeEqual(sigBuffer, expectedBuffer)
}

export function shouldRebuild(documentType: string): boolean {
  return REBUILDABLE_TYPES.has(documentType)
}

export function isDebounced(): boolean {
  return Date.now() - lastRebuildAt < DEBOUNCE_MS
}

/**
 * POST to the deploy hook URL (e.g. Render, Netlify, Vercel) to trigger
 * a static-site rebuild. Debounced to avoid redundant builds.
 */
export async function triggerRebuild(reason: string): Promise<boolean> {
  const url = env.DEPLOY_HOOK_URL

  if (!url) {
    logger.warn({ reason }, 'DEPLOY_HOOK_URL not set — skipping rebuild')
    return false
  }

  try {
    const response = await fetch(url, { method: 'POST' })

    if (!response.ok) {
      logger.error({ status: response.status, reason }, 'Deploy hook failed')
      return false
    }

    lastRebuildAt = Date.now()
    logger.info({ reason }, 'Site rebuild triggered')
    return true
  } catch (err) {
    logger.error({ err, reason }, 'Failed to call deploy hook')
    return false
  }
}
