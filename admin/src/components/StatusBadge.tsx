/**
 * Default color map for common statuses. Extend this record
 * with your application-specific statuses.
 */
const DEFAULT_COLORS: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-700',
  ACTIVE: 'bg-green-100 text-green-700',
  INACTIVE: 'bg-neutral-100 text-neutral-500',
  PENDING: 'bg-yellow-100 text-yellow-700',
  ERROR: 'bg-red-100 text-red-700',
}

interface StatusBadgeProps {
  status: string
  colorMap?: Record<string, string>
}

export function StatusBadge({ status, colorMap }: StatusBadgeProps) {
  const colors = { ...DEFAULT_COLORS, ...colorMap }
  const color = colors[status] ?? 'bg-neutral-100 text-neutral-600'

  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${color}`}>
      {status}
    </span>
  )
}
