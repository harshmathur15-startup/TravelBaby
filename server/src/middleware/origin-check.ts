import type { Request, Response, NextFunction } from 'express'
import { env } from '../env'

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])

const allowedOrigins = new Set(env.CORS_ORIGIN.split(',').map(o => o.trim()))

/**
 * Origin header check for state-changing requests.
 * Rejects non-GET/HEAD/OPTIONS requests where the Origin header
 * is present but does not match allowed CORS origins.
 * This mitigates CSRF for JSON APIs alongside SameSite cookies.
 */
export function originCheck(req: Request, res: Response, next: NextFunction): void {
  if (SAFE_METHODS.has(req.method)) {
    next()
    return
  }

  const origin = req.headers.origin

  // No Origin header = same-origin request or non-browser client — allow
  if (!origin) {
    next()
    return
  }

  if (allowedOrigins.has(origin)) {
    next()
    return
  }

  res.status(403).json({ success: false, error: 'Origin not allowed' })
}
