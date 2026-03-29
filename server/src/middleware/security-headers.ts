import type { RequestHandler } from 'express'

/**
 * Server-side security headers for Express API. Complements helmet.
 * CSP is intentionally restrictive (`default-src 'none'`) for a pure JSON API.
 * If any endpoint serves HTML, loosen the policy for that route specifically.
 */
export const securityHeaders: RequestHandler = (_req, res, next) => {
  res.removeHeader('X-Powered-By')
  res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'")
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  res.setHeader('Cache-Control', 'no-store')
  next()
}
