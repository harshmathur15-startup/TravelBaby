import { pinoHttp } from 'pino-http'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { logger } from '../lib/logger'

export const requestLogger = pinoHttp({
  logger,
  autoLogging: {
    ignore: (req: IncomingMessage) => req.url === '/api/v1/health',
  },
  customSuccessMessage: (req: IncomingMessage, res: ServerResponse) =>
    `${req.method} ${req.url} ${res.statusCode}`,
  customErrorMessage: (req: IncomingMessage, res: ServerResponse) =>
    `${req.method} ${req.url} ${res.statusCode}`,
})
