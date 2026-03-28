import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../lib/auth-context'

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-neutral-500">Loading...</div>
    )
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />
}
