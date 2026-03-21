import type { Request, Response, NextFunction } from 'express'
import type { ApiResponse } from '../../../shared/src/types/api'

declare global {
  namespace Express {
    interface Request {
      organizationId?: string
    }
  }
}

export function orgScope(
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction,
): void {
  const orgId = req.user?.organizationId

  if (!orgId) {
    res.status(401).json({ success: false, error: 'Organization context required' })
    return
  }

  req.organizationId = orgId
  next()
}
