import type { RequestHandler } from 'express'
import { prisma } from '../lib/prisma'
import { logger } from '../lib/logger'
import { getClientIp } from '../lib/utils'

const SKIP_PATHS = ['/api/v1/health']
const SKIP_METHODS = ['OPTIONS']

/**
 * Auto-log API requests to the database (fire-and-forget).
 * Requires an `AuditLog` model in your Prisma schema (see schemas/audit-log.md).
 * If the model doesn't exist yet, detection happens on the first request
 * and audit logging is silently disabled for the rest of the process.
 */
let auditModelAvailable: boolean | null = null

export const auditLog: RequestHandler = (req, res, next) => {
  if (SKIP_METHODS.includes(req.method) || SKIP_PATHS.includes(req.path)) {
    next()
    return
  }

  res.on('finish', () => {
    if (auditModelAvailable === false) return

    const pathParts = req.path.split('/').filter(Boolean)
    const resourceType = pathParts[2] ?? 'unknown'
    const resourceId = pathParts[3] ?? ''

    void (async () => {
      try {
        await prisma.auditLog.create({
          data: {
            userId: req.user?.userId ?? null,
            action: req.method,
            resourceType,
            resourceId,
            ip: getClientIp(req),
            metadata: {
              statusCode: res.statusCode,
              userAgent: req.get('user-agent') ?? '',
            },
          },
        })
        if (auditModelAvailable !== true) auditModelAvailable = true
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err)
        if (message.includes('does not exist') || message.includes('not found')) {
          auditModelAvailable = false
          logger.info('AuditLog model not in Prisma schema — audit logging disabled')
        } else {
          logger.error({ err }, 'Failed to write audit log')
        }
      }
    })()
  })

  next()
}
