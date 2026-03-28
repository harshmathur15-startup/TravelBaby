import { env } from '../env'
import { logger } from './logger'

interface AlertPayload {
  level: 'error' | 'warn'
  title: string
  message: string
  metadata?: Record<string, unknown>
}

const COOLDOWN_MS = 60_000
const recentAlerts = new Map<string, number>()

/**
 * Send an alert via webhook with cooldown dedup.
 * Requires ALERT_WEBHOOK_URL in env. Silent no-op if unset.
 */
export async function sendAlert(payload: AlertPayload): Promise<void> {
  if (!env.ALERT_WEBHOOK_URL) return

  const key = `${payload.level}:${payload.title}`
  const lastSent = recentAlerts.get(key)
  if (lastSent && Date.now() - lastSent < COOLDOWN_MS) return

  recentAlerts.set(key, Date.now())

  try {
    await fetch(env.ALERT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        service: 'api',
        timestamp: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(5_000),
    })
  } catch (err) {
    logger.warn({ err }, 'Failed to send alert webhook')
  }
}
