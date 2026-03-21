export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  meta?: PaginatedMeta
}

export interface PaginationParams {
  page: number
  limit: number
  sort?: string
  order?: 'asc' | 'desc'
}

export interface PaginatedMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export const DEFAULT_PAGE = 1
export const DEFAULT_LIMIT = 20
export const MAX_LIMIT = 100
