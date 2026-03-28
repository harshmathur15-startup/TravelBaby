interface StatCardProps {
  label: string
  value: number | string
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-5">
      <p className="text-sm text-neutral-500 mb-1">{label}</p>
      <p className="text-2xl font-semibold text-neutral-900">{value}</p>
    </div>
  )
}
