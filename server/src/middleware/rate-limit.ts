import type { Request, Response, NextFunction } from 'express'

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()
const authStore = new Map<string, RateLimitEntry>()
const formStore = new Map<string, RateLimitEntry>()

const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS = 100 // per window per IP
const AUTH_MAX_REQUESTS = 10 // stricter for login/register
const FORM_MAX_REQUESTS = 10 // public forms (contact, newsletter)
const CLEANUP_INTERVAL = 5 * 60 * 1000 // prune expired entries every 5 min

const RATE_LIMIT_EXEMPT_PATHS = ['/api/v1/webhooks']

setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key)
  }
  for (const [key, entry] of authStore) {
    if (now > entry.resetAt) authStore.delete(key)
  }
  for (const [key, entry] of formStore) {
    if (now > entry.resetAt) formStore.delete(key)
  }
}, CLEANUP_INTERVAL).unref()

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') return forwarded.split(',')[0]?.trim() ?? 'unknown'
  return req.socket.remoteAddress ?? 'unknown'
}

/** Strict rate limiter for auth endpoints (login, register, password reset). */
export function authRateLimit(req: Request, res: Response, next: NextFunction): void {
  const ip = getClientIp(req)
  const now = Date.now()
  const key = `auth:${ip}`
  const entry = authStore.get(key)

  if (!entry || now > entry.resetAt) {
    authStore.set(key, { count: 1, resetAt: now + WINDOW_MS })
    next()
    return
  }

  entry.count++

  if (entry.count > AUTH_MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    res.setHeader('Retry-After', retryAfter)
    res.status(429).json({ success: false, error: 'Too many attempts. Please try again later.' })
    return
  }

  next()
}

/** Strict rate limiter for public form submissions (contact, newsletter). */
export function formRateLimit(req: Request, res: Response, next: NextFunction): void {
  const ip = getClientIp(req)
  const now = Date.now()
  const key = `form:${ip}`
  const entry = formStore.get(key)

  if (!entry || now > entry.resetAt) {
    formStore.set(key, { count: 1, resetAt: now + WINDOW_MS })
    next()
    return
  }

  entry.count++

  if (entry.count > FORM_MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    res.setHeader('Retry-After', retryAfter)
    res.status(429).json({ success: false, error: 'Too many submissions. Please try again later.' })
    return
  }

  next()
}

/** General rate limiter for all API requests. */
export function rateLimit(req: Request, res: Response, next: NextFunction): void {
  if (RATE_LIMIT_EXEMPT_PATHS.some(p => req.path.startsWith(p))) {
    next()
    return
  }

  const ip = getClientIp(req)
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    res.setHeader('X-RateLimit-Limit', MAX_REQUESTS)
    res.setHeader('X-RateLimit-Remaining', MAX_REQUESTS - 1)
    next()
    return
  }

  entry.count++

  if (entry.count > MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    res.setHeader('Retry-After', retryAfter)
    res.setHeader('X-RateLimit-Limit', MAX_REQUESTS)
    res.setHeader('X-RateLimit-Remaining', 0)
    res.status(429).json({ success: false, error: 'Too many requests. Please try again later.' })
    return
  }

  res.setHeader('X-RateLimit-Limit', MAX_REQUESTS)
  res.setHeader('X-RateLimit-Remaining', MAX_REQUESTS - entry.count)
  next()
}
