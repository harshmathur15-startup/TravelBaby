import type { Request } from 'express'

/** Mask an email address for safe display: "j***@example.com" */
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!local || !domain) return '***'
  return `${local[0]}***@${domain}`
}

/**
 * Resolve client IP using Express's `req.ip`, which respects the `trust proxy` setting.
 * IMPORTANT: Configure `app.set('trust proxy', ...)` in your Express setup
 * to match your deployment (e.g. 1 for a single reverse proxy like Render/Nginx).
 * Without this, `req.ip` falls back to the socket address.
 */
export function getClientIp(req: Request): string {
  return req.ip ?? req.socket.remoteAddress ?? 'unknown'
}
