import { useAuthStore } from '../stores/auth.store'

const METRICS = [
  { label: 'Total Users', value: '0' },
  { label: 'Active Projects', value: '0' },
  { label: 'Tasks Completed', value: '0' },
  { label: 'Uptime', value: '99.9%' },
] as const

export const DashboardPage = () => {
  const user = useAuthStore((s) => s.user)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome, {user?.firstName}
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        This is your product's dashboard. Replace this with your features.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl border bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
