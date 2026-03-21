import { useAuthStore } from '../stores/auth.store'

export const SettingsPage = () => {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <p className="mt-1 text-sm text-gray-500">
        Extend this page with your product's settings.
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
        <div className="mt-4 space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <Field label="First name" value={user?.firstName} />
          <Field label="Last name" value={user?.lastName} />
          <Field label="Email" value={user?.email} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900">Organization</h2>
        <div className="mt-4 space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <Field label="Organization ID" value={user?.organizationId} />
        </div>
      </section>
    </div>
  )
}

const Field = ({ label, value }: { label: string, value?: string }) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="mt-1 text-sm text-gray-900">{value ?? '—'}</p>
  </div>
)
