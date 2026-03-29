import { NavLink } from 'react-router-dom'

import { useAuth } from '../lib/auth-context'

interface NavItem {
  to: string
  label: string
  end?: boolean
}

/** TODO(template): Add your admin navigation items here. */
const NAV_ITEMS: NavItem[] = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/contacts', label: 'Contacts' },
  { to: '/admin/subscribers', label: 'Subscribers' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/audit-log', label: 'Audit Log' },
]

/** TODO(template): Replace with your application name. */
const APP_NAME = 'Admin'

export function Sidebar() {
  const { logout } = useAuth()

  return (
    <aside className="w-56 shrink-0 bg-neutral-900 text-neutral-200 flex flex-col min-h-screen">
      <div className="px-5 py-6 text-lg font-semibold tracking-tight text-white">{APP_NAME}</div>
      <nav className="flex-1 px-3 space-y-1" aria-label="Admin navigation">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `block px-3 py-2 rounded text-sm ${isActive ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-800'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 pb-6">
        <button
          onClick={() => logout()}
          className="w-full px-3 py-2 text-sm text-left rounded hover:bg-neutral-800 text-neutral-400"
          aria-label="Log out"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}
