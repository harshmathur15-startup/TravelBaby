import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'
import { env } from '../env'
import type { AuthUser, TokenPayload } from '../../../shared/src/types/auth'
import type { RegisterInput } from '../validators/auth.validator'

const BCRYPT_ROUNDS = 12

export class AuthService {
  async register(data: RegisterInput): Promise<{ accessToken: string; user: AuthUser }> {
    const hashedPassword = await bcrypt.hash(data.password, BCRYPT_ROUNDS)

    const result = await prisma.$transaction(async (tx) => {
      const org = await tx.organization.create({
        data: { name: `${data.firstName}'s Organization` },
      })

      const user = await tx.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          organizationId: org.id,
          role: 'OWNER',
        },
      })

      return user
    })

    const user = this.toAuthUser(result)
    const accessToken = this.generateAccessToken(user)
    return { accessToken, user }
  }

  async login(email: string, password: string): Promise<{ accessToken: string; user: AuthUser }> {
    const record = await prisma.user.findUnique({ where: { email } })

    if (!record) {
      throw new AuthError('Invalid email or password')
    }

    const valid = await bcrypt.compare(password, record.password)

    if (!valid) {
      throw new AuthError('Invalid email or password')
    }

    const user = this.toAuthUser(record)
    const accessToken = this.generateAccessToken(user)
    return { accessToken, user }
  }

  async refreshToken(token: string): Promise<{ accessToken: string; user: AuthUser }> {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload
    const record = await prisma.user.findUnique({ where: { id: decoded.userId } })

    if (!record) {
      throw new AuthError('User not found')
    }

    const user = this.toAuthUser(record)
    const accessToken = this.generateAccessToken(user)
    return { accessToken, user }
  }

  generateAccessToken(user: AuthUser): string {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      organizationId: user.organizationId,
      role: user.role,
    }

    return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: env.JWT_ACCESS_EXPIRY,
    })
  }

  generateRefreshToken(user: AuthUser): string {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      organizationId: user.organizationId,
      role: user.role,
    }

    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: `${env.JWT_REFRESH_EXPIRY_DAYS}d`,
    })
  }

  private toAuthUser(record: {
    id: string
    email: string
    firstName: string
    lastName: string
    organizationId: string
    role: string
  }): AuthUser {
    return {
      id: record.id,
      email: record.email,
      firstName: record.firstName,
      lastName: record.lastName,
      organizationId: record.organizationId,
      role: record.role as AuthUser['role'],
    }
  }
}

export class AuthError extends Error {
  readonly statusCode = 401

  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

export const authService = new AuthService()
