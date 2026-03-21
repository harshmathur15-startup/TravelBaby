import type { Request, Response } from 'express'
import type { ApiResponse } from '../../../shared/src/types/api'
import type { AuthUser } from '../../../shared/src/types/auth'
import { userService } from '../services/user.service'
import { logger } from '../lib/logger'

export async function getMe(req: Request, res: Response<ApiResponse<AuthUser>>): Promise<void> {
  try {
    const user = await userService.getProfile(req.user!.userId, req.user!.organizationId)
    res.json({ success: true, data: user })
  } catch (err) {
    logger.error({ err }, 'Failed to get profile')
    res.status(404).json({ success: false, error: 'User not found' })
  }
}

export async function updateMe(req: Request, res: Response<ApiResponse<AuthUser>>): Promise<void> {
  const { firstName, lastName } = req.body as { firstName?: string; lastName?: string }

  try {
    const user = await userService.updateProfile(
      req.user!.userId,
      req.user!.organizationId,
      { firstName, lastName },
    )
    res.json({ success: true, data: user })
  } catch (err) {
    logger.error({ err }, 'Failed to update profile')
    res.status(400).json({ success: false, error: 'Update failed' })
  }
}
