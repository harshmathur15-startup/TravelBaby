import type { Request, Response, NextFunction } from 'express'
import type { UserRole } from '../../../shared/src/types/auth'
import type { ApiResponse } from '../../../shared/src/types/api'

const ROLE_HIERARCHY: Record<UserRole, number> = {
  OWNER: 3,
  ADMIN: 2,
  MEMBER: 1,
}

export function authorize(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    const userRole = req.user?.role

    if (!userRole) {
      res.status(401).json({ success: false, error: 'Authentication required' })
      return
    }

    const userLevel = ROLE_HIERARCHY[userRole]
    const minRequired = Math.min(...allowedRoles.map((r) => ROLE_HIERARCHY[r]))

    if (userLevel >= minRequired) {
      next()
      return
    }

    res.status(403).json({ success: false, error: 'Insufficient permissions' })
  }
}
