import type { RequestHandler } from 'express'
import type { ApiResponse } from '../../../shared/src/types/api'

/** Typed 404 catch-all for unmatched routes. */
export const notFound: RequestHandler = (_req, res) => {
  const body: ApiResponse = {
    success: false,
    error: 'Route not found',
  }
  res.status(404).json(body)
}
