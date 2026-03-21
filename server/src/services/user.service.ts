import { prisma } from '../lib/prisma'
import type { AuthUser } from '../../../shared/src/types/auth'

interface UpdateProfileData {
  firstName?: string
  lastName?: string
}

export class UserService {
  async getProfile(userId: string, organizationId: string): Promise<AuthUser> {
    const user = await prisma.user.findFirst({
      where: { id: userId, organizationId },
    })

    if (!user) {
      throw new NotFoundError('User not found')
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      organizationId: user.organizationId,
      role: user.role as AuthUser['role'],
    }
  }

  async updateProfile(
    userId: string,
    organizationId: string,
    data: UpdateProfileData,
  ): Promise<AuthUser> {
    const user = await prisma.user.update({
      where: { id: userId, organizationId },
      data,
    })

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      organizationId: user.organizationId,
      role: user.role as AuthUser['role'],
    }
  }
}

export class NotFoundError extends Error {
  readonly statusCode = 404

  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export const userService = new UserService()
