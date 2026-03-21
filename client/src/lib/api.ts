import axios from 'axios'
import type { ApiResponse } from '@template/shared'

const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token!)
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`
        return api(originalRequest)
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const { data } = await axios.post<ApiResponse<{ accessToken: string }>>(
        '/api/v1/auth/refresh',
        {},
        { withCredentials: true },
      )
      const newToken = data.data?.accessToken ?? ''
      api.defaults.headers.common.Authorization = `Bearer ${newToken}`
      processQueue(null, newToken)
      originalRequest.headers.Authorization = `Bearer ${newToken}`
      return api(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)
      window.location.href = '/login'
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

export const setAuthHeader = (token: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common.Authorization
  }
}

export const get = async <T>(url: string): Promise<ApiResponse<T>> => {
  const { data } = await api.get<ApiResponse<T>>(url)
  return data
}

export const post = async <T>(url: string, body?: unknown): Promise<ApiResponse<T>> => {
  const { data } = await api.post<ApiResponse<T>>(url, body)
  return data
}

export const patch = async <T>(url: string, body?: unknown): Promise<ApiResponse<T>> => {
  const { data } = await api.patch<ApiResponse<T>>(url, body)
  return data
}

export const del = async <T>(url: string): Promise<ApiResponse<T>> => {
  const { data } = await api.delete<ApiResponse<T>>(url)
  return data
}

export { api }
