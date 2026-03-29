import type { Request, Response, NextFunction } from 'express'

import { getClientIp } from '../lib/utils'

interface RateLimitEntry {
  count: number
  resetAt: number
}

interface LimiterConfig {
  store: Map<string, RateLimitEntry>
  keyPrefix: string
  max: number
  errorMessage: string
  /** Emit X-RateLimit-* headers (only for the general limiter). */
  exposeHeaders?: boolean
  /** Paths to skip entirely. */
  exemptPaths?: string[]
}

/**
 * In-memory rate limit stores. Single-instance only — behind a load balancer,
 * each process maintains its own counters. Replace with Redis-backed stores
 * (e.g. `ioredis` + sliding window) before running multiple instances.
 */
const stores = [
  new Map<string, RateLimitEntry>(),
  new Map<string, RateLimitEntry>(),
  new Map<string, RateLimitEntry>(),
] as const

const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000

setInterval(() => {
  const now = Date.now()
  for (const s of stores) {
    for (const [key, entry] of s) {
      if (now > entry.resetAt) s.delete(key)
    }
  }
}, CLEANUP_INTERVAL).unref()

function createLimiter(config: LimiterConfig) {
  const { store, keyPrefix, max, errorMessage, exposeHeaders = false, exemptPaths } = config

  return (req: Request, res: Response, next: NextFunction): void => {
    if (exemptPaths?.some(p => req.path.startsWith(p))) {
      next()
      return
    }

    const ip = getClientIp(req)
    const now = Date.now()
    const key = keyPrefix ? `${keyPrefix}:${ip}` : ip
    const entry = store.get(key)

    if (!entry || now > entry.resetAt) {
      store.set(key, { count: 1, resetAt: now + WINDOW_MS })
      if (exposeHeaders) {
        res.setHeader('X-RateLimit-Limit', max)
        res.setHeader('X-RateLimit-Remaining', max - 1)
      }
      next()
      return
    }

    entry.count++

    if (entry.count > max) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
      res.setHeader('Retry-After', retryAfter)
      if (exposeHeaders) {
        res.setHeader('X-RateLimit-Limit', max)
        res.setHeader('X-RateLimit-Remaining', 0)
      }
      res.status(429).json({ success: false, error: errorMessage })
      return
    }

    if (exposeHeaders) {
      res.setHeader('X-RateLimit-Limit', max)
      res.setHeader('X-RateLimit-Remaining', max - entry.count)
    }
    next()
  }
}

/** Strict rate limiter for auth endpoints (login, register, password reset). */
export const authRateLimit = createLimiter({
  store: stores[0],
  keyPrefix: 'auth',
  max: 10,
  errorMessage: 'Too many attempts. Please try again later.',
})

/** Strict rate limiter for public form submissions (contact, newsletter). */
export const formRateLimit = createLimiter({
  store: stores[1],
  keyPrefix: 'form',
  max: 10,
  errorMessage: 'Too many submissions. Please try again later.',
})

/** General rate limiter for all API requests. */
export const rateLimit = createLimiter({
  store: stores[2],
  keyPrefix: '',
  max: 100,
  errorMessage: 'Too many requests. Please try again later.',
  exposeHeaders: true,
  exemptPaths: ['/api/v1/webhooks'],
})
