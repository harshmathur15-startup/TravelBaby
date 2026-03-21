import { createApp } from './app'
import { env } from './env'
import { logger } from './lib/logger'

const GRACEFUL_SHUTDOWN_TIMEOUT_MS = 10_000

const app = createApp()

const server = app.listen(env.PORT, () => {
  logger.info({ port: env.PORT, env: env.NODE_ENV }, 'Server started')
})

function shutdown(signal: string): void {
  logger.info({ signal }, 'Graceful shutdown initiated')

  server.close(() => {
    logger.info('Server closed')
    process.exit(0)
  })

  setTimeout(() => {
    logger.error('Forced shutdown — timeout exceeded')
    process.exit(1)
  }, GRACEFUL_SHUTDOWN_TIMEOUT_MS)
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
