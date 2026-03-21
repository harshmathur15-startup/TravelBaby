import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { env } from './env'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import { errorHandler } from './middleware/error-handler'
import type { ApiResponse } from '../../shared/src/types/api'

const JSON_LIMIT = '10mb'

export function createApp(): express.Application {
  const app = express()

  app.use(helmet())
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }))
  app.use(express.json({ limit: JSON_LIMIT }))
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())

  app.get('/api/v1/health', (_req, res) => {
    const response: ApiResponse<{ status: string }> = {
      success: true,
      data: { status: 'ok' },
    }
    res.json(response)
  })

  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/users', userRoutes)

  app.use(errorHandler)

  return app
}
