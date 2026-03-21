import type { Request, Response } from 'express'
import type { ApiResponse, } from '../../../shared/src/types/api'
import type { AuthResponse } from '../../../shared/src/types/auth'
import { registerSchema, loginSchema } from '../validators/auth.validator'
import { authService } from '../services/auth.service'
import { logger } from '../lib/logger'
import { env } from '../env'

const REFRESH_COOKIE = 'refresh_token'
const COOKIE_MAX_AGE_MS = env.JWT_REFRESH_EXPIRY_DAYS * 24 * 60 * 60 * 1000

function setRefreshCookie(res: Response, token: string): void {
  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: COOKIE_MAX_AGE_MS,
    path: '/',
  })
}

export async function register(req: Request, res: Response<ApiResponse<AuthResponse>>): Promise<void> {
  const parsed = registerSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(422).json({ success: false, error: parsed.error.errors[0].message })
    return
  }

  try {
    const result = await authService.register(parsed.data)
    const refreshToken = authService.generateRefreshToken(result.user)
    setRefreshCookie(res, refreshToken)
    res.status(201).json({ success: true, data: result })
  } catch (err) {
    logger.error({ err }, 'Registration failed')
    res.status(400).json({ success: false, error: 'Registration failed' })
  }
}

export async function login(req: Request, res: Response<ApiResponse<AuthResponse>>): Promise<void> {
  const parsed = loginSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(422).json({ success: false, error: parsed.error.errors[0].message })
    return
  }

  try {
    const result = await authService.login(parsed.data.email, parsed.data.password)
    const refreshToken = authService.generateRefreshToken(result.user)
    setRefreshCookie(res, refreshToken)
    res.json({ success: true, data: result })
  } catch (err) {
    logger.error({ err }, 'Login failed')
    res.status(401).json({ success: false, error: 'Invalid email or password' })
  }
}

export async function refresh(req: Request, res: Response<ApiResponse<AuthResponse>>): Promise<void> {
  const token = req.cookies?.[REFRESH_COOKIE] as string | undefined

  if (!token) {
    res.status(401).json({ success: false, error: 'No refresh token provided' })
    return
  }

  try {
    const result = await authService.refreshToken(token)
    const newRefreshToken = authService.generateRefreshToken(result.user)
    setRefreshCookie(res, newRefreshToken)
    res.json({ success: true, data: result })
  } catch (err) {
    logger.error({ err }, 'Token refresh failed')
    res.status(401).json({ success: false, error: 'Invalid refresh token' })
  }
}

export async function logout(_req: Request, res: Response<ApiResponse>): Promise<void> {
  res.clearCookie(REFRESH_COOKIE, { path: '/' })
  res.json({ success: true })
}
