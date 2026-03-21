import type { Request, Response, NextFunction } from 'express'
import type { ApiResponse } from '../../../shared/src/types/api'
import { logger } from '../lib/logger'
import { env } from '../env'

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response<ApiResponse>,
  _next: NextFunction,
): void {
  logger.error({ err, message: err.message, stack: err.stack }, 'Unhandled error')

  const status = 'statusCode' in err ? (err as { statusCode: number }).statusCode : 500
  const message = env.NODE_ENV === 'development'
    ? err.message
    : 'Internal server error'

  res.status(status).json({
    success: false,
    error: message,
  })
}
