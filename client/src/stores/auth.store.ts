import { create } from 'zustand'
import type { AuthUser, AuthResponse } from '@template/shared'
import { post, setAuthHeader } from '../lib/api'

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  organizationName: string
}

interface AuthState {
  user: AuthUser | null
  accessToken: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  refreshToken: () => Promise<void>
  loadUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isLoading: true,

  login: async (email, password) => {
    const response = await post<AuthResponse>('/auth/login', { email, password })
    if (!response.data) throw new Error(response.error ?? 'Login failed')
    setAuthHeader(response.data.accessToken)
    set({ user: response.data.user, accessToken: response.data.accessToken })
  },

  register: async (data) => {
    const response = await post<AuthResponse>('/auth/register', data)
    if (!response.data) throw new Error(response.error ?? 'Registration failed')
    setAuthHeader(response.data.accessToken)
    set({ user: response.data.user, accessToken: response.data.accessToken })
  },

  logout: async () => {
    try {
      await post('/auth/logout')
    } finally {
      setAuthHeader(null)
      set({ user: null, accessToken: null })
    }
  },

  refreshToken: async () => {
    const response = await post<AuthResponse>('/auth/refresh')
    if (!response.data) throw new Error('Refresh failed')
    setAuthHeader(response.data.accessToken)
    set({ user: response.data.user, accessToken: response.data.accessToken })
  },

  loadUser: async () => {
    try {
      const response = await post<AuthResponse>('/auth/refresh')
      if (response.data) {
        setAuthHeader(response.data.accessToken)
        set({ user: response.data.user, accessToken: response.data.accessToken })
      }
    } catch {
      set({ user: null, accessToken: null })
    } finally {
      set({ isLoading: false })
    }
  },
}))
