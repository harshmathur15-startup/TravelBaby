/**
 * Minimal frontend logger for Astro (SSG/SSR context).
 * Wraps console to satisfy the no-bare-console convention.
 * Replace method bodies with a structured sink (Sentry, LogRocket)
 * when observability is needed.
 */
export const logger = {
  warn(message: string, context?: unknown): void {
    // eslint-disable-next-line no-console
    console.warn('[app]', message, context ?? '')
  },
  error(message: string, context?: unknown): void {
    // eslint-disable-next-line no-console
    console.error('[app]', message, context ?? '')
  },
}
