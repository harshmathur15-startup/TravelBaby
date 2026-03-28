import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY_DAYS: z.coerce.number().int().positive().default(30),
  ANTHROPIC_API_KEY: z.string().startsWith('sk-ant-'),
  CORS_ORIGIN: z.string(),
  ALERT_WEBHOOK_URL: z.string().url().optional(),
  SANITY_WEBHOOK_SECRET: z.string().optional(),
  DEPLOY_HOOK_URL: z.string().url().optional(),
})

export type Env = z.infer<typeof envSchema>

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  const formatted = parsed.error.format()
  const message = Object.entries(formatted)
    .filter(([key]) => key !== '_errors')
    .map(([key, val]) => {
      const errors = (val as { _errors: string[] })._errors
      return `  ${key}: ${errors.join(', ')}`
    })
    .join('\n')

  process.stderr.write(`Environment validation failed:\n${message}\n`)
  process.exit(1)
}

export const env: Env = Object.freeze(parsed.data)
