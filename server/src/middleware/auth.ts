import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import type { TokenPayload } from '../../../shared/src/types/auth'
import type { ApiResponse } from '../../../shared/src/types/api'
import { env } from '../env'

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload
    }
  }
}

export function authenticate(
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction,
): void {
  const header = req.headers.authorization

  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Missing authentication token' })
    return
  }

  const token = header.slice(7)

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ success: false, error: 'Invalid or expired token' })
  }
}
