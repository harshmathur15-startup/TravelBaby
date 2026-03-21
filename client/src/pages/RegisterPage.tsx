import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/auth.store'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const register = useAuthStore((s) => s.register)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    organizationName: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await register(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setSubmitting(false)
    }
  }

  const fields = [
    { id: 'firstName', label: 'First name', type: 'text' },
    { id: 'lastName', label: 'Last name', type: 'text' },
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'password', label: 'Password', type: 'password' },
    { id: 'organizationName', label: 'Organization name', type: 'text' },
  ] as const

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Create account</h1>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map(({ id, label, type }) => (
            <div key={id}>
              <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                id={id}
                type={type}
                required
                value={form[id]}
                onChange={update(id)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                aria-label={label}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            aria-label="Create account"
          >
            {submitting ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
