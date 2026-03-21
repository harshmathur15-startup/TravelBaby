export interface TokenPayload {
  userId: string
  email: string
  organizationId: string
  role: UserRole
}

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  organizationId: string
  role: UserRole
}

export type UserRole = 'OWNER' | 'ADMIN' | 'MEMBER'

export interface AuthResponse {
  accessToken: string
  user: AuthUser
}
