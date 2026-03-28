interface Column<T> {
  key: keyof T & string
  header: string
  render?: (row: T) => React.ReactNode
}

interface PaginationMeta {
  page: number
  totalPages: number
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  meta?: PaginationMeta
  onPageChange?: (page: number) => void
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  meta,
  onPageChange,
}: DataTableProps<T>) {
  return (
    <div>
      <div className="overflow-x-auto border border-neutral-200 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-600">
            <tr>
              {columns.map(col => (
                <th key={col.key} className="px-4 py-3 text-left font-medium">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-neutral-400">
                  No records found
                </td>
              </tr>
            ) : (
              data.map(row => (
                <tr key={row.id} className="hover:bg-neutral-50">
                  {columns.map(col => (
                    <td key={col.key} className="px-4 py-3 text-neutral-800">
                      {col.render ? col.render(row) : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {meta && meta.totalPages > 1 && onPageChange && (
        <div className="flex items-center justify-between mt-4 text-sm text-neutral-500">
          <span>
            Page {meta.page} of {meta.totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={meta.page <= 1}
              onClick={() => onPageChange(meta.page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-neutral-50"
              aria-label="Previous page"
            >
              Prev
            </button>
            <button
              disabled={meta.page >= meta.totalPages}
              onClick={() => onPageChange(meta.page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-neutral-50"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
