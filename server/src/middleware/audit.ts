import type { RequestHandler } from 'express'
import { prisma } from '../lib/prisma'
import { logger } from '../lib/logger'

const SKIP_PATHS = ['/api/v1/health']
const SKIP_METHODS = ['OPTIONS']

/**
 * Auto-log API requests to the database (fire-and-forget).
 * Requires an `AuditLog` model in your Prisma schema:
 *
 *   model AuditLog {
 *     id           String   @id @default(cuid())
 *     userId       String?
 *     action       String
 *     resourceType String
 *     resourceId   String   @default("")
 *     ip           String
 *     metadata     Json?
 *     createdAt    DateTime @default(now())
 *   }
 */
export const auditLog: RequestHandler = (req, res, next) => {
  if (SKIP_METHODS.includes(req.method) || SKIP_PATHS.includes(req.path)) {
    next()
    return
  }

  res.on('finish', () => {
    const pathParts = req.path.split('/').filter(Boolean)
    const resourceType = pathParts[2] ?? 'unknown'
    const resourceId = pathParts[3] ?? ''

    try {
      prisma.auditLog
        .create({
          data: {
            userId: req.user?.userId ?? null,
            action: req.method,
            resourceType,
            resourceId,
            ip: req.ip ?? req.socket.remoteAddress ?? 'unknown',
            metadata: {
              statusCode: res.statusCode,
              userAgent: req.get('user-agent') ?? '',
            },
          },
        })
        .catch((err: unknown) => {
          logger.error({ err }, 'Failed to write audit log')
        })
    } catch {
      // AuditLog model not in Prisma schema yet — skip silently
    }
  })

  next()
}
