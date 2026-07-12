// Admin dashboard chrome: responsive sidebar + topbar + breadcrumbs, with the
// routed page rendered into <Outlet>. Handles dark mode, idle-logout, the
// notifications bell and the profile menu.
import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from '../components/Logo'
import AdminIcon from './ui/AdminIcon'
import { IconButton, Button, Badge } from './ui/primitives'
import { useTheme } from './ui/theme'
import { useAuth } from './auth/AuthProvider'
import { useIdleLogout } from './auth/useIdleLogout'
import { useNotifications } from './hooks/useNotifications'
import { timeAgo } from '../lib/format'

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/admin/projects', label: 'Projects', icon: 'projects' },
  { to: '/admin/services', label: 'Services', icon: 'services', soon: true },
  { to: '/admin/homepage', label: 'Homepage', icon: 'home', soon: true },
  { to: '/admin/gallery', label: 'Gallery', icon: 'gallery', soon: true },
  { to: '/admin/messages', label: 'Messages', icon: 'inbox', soon: true },
  { to: '/admin/testimonials', label: 'Testimonials', icon: 'quote', soon: true },
  { to: '/admin/partners', label: 'Partners', icon: 'partners', soon: true },
  { to: '/admin/files', label: 'Files', icon: 'files', soon: true },
  { to: '/admin/activity', label: 'Activity Log', icon: 'activity', soon: true },
  { to: '/admin/settings', label: 'Settings', icon: 'settings', soon: true },
]

const LABELS = Object.fromEntries(NAV.map((n) => [n.to, n.label]))

function NavItem({ item, onClick }) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onClick}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-accent text-ink'
            : 'text-bone/70 hover:bg-white/10 hover:text-white'
        }`
      }
    >
      <AdminIcon name={item.icon} size={19} />
      <span className="flex-1">{item.label}</span>
      {item.soon && (
        <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-bone/50 group-[.text-ink]:bg-ink/10 group-[.text-ink]:text-ink/60">
          Soon
        </span>
      )}
    </NavLink>
  )
}

function Sidebar({ onNavigate }) {
  return (
    <div className="flex h-full flex-col bg-ink text-white">
      <div className="flex h-16 items-center px-6">
        <Link to="/admin" className="text-white"><Logo /></Link>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV.map((item) => <NavItem key={item.to} item={item} onClick={onNavigate} />)}
      </nav>
      <div className="border-t border-white/10 p-3">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-bone/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <AdminIcon name="eye" size={19} />
          View live site
        </Link>
      </div>
    </div>
  )
}

function NotificationsMenu() {
  const { items, unread, markAllRead } = useNotifications()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => { setOpen((o) => !o); if (!open && unread) markAllRead() }}
        className="relative grid h-9 w-9 place-items-center rounded-lg text-ink/60 hover:bg-ink/5 hover:text-ink dark:text-bone/60 dark:hover:bg-white/10 dark:hover:text-white"
        aria-label="Notifications"
      >
        <AdminIcon name="bell" size={19} />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent ring-2 ring-white dark:ring-ink-900" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border border-ink/10 bg-white shadow-xl dark:border-white/10 dark:bg-ink-800"
          >
            <div className="flex items-center justify-between border-b border-ink/8 px-4 py-3 dark:border-white/10">
              <p className="font-semibold text-ink dark:text-bone">Notifications</p>
              {unread > 0 && <Badge tone="accent">{unread} new</Badge>}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {items.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-ink/40 dark:text-bone/40">No notifications yet</p>
              ) : (
                items.map((n) => (
                  <div key={n.id} className="border-b border-ink/5 px-4 py-3 last:border-0 dark:border-white/5">
                    <p className="text-sm font-medium text-ink dark:text-bone">{n.title}</p>
                    {n.body && <p className="mt-0.5 text-xs text-ink/55 dark:text-bone/50">{n.body}</p>}
                    <p className="mt-1 text-[11px] text-ink/35 dark:text-bone/35">{timeAgo(n.created_at)}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ProfileMenu() {
  const { profile, user, signOut, isSuperAdmin } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const name = profile?.name || user?.email || 'Admin'
  const initials = name.split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase()

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-ink/5 dark:hover:bg-white/10">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-xs font-bold text-ink">{initials}</span>
        <span className="hidden text-sm font-medium text-ink dark:text-bone sm:block">{name.split(' ')[0]}</span>
        <AdminIcon name="chevronDown" size={16} className="hidden text-ink/40 dark:text-bone/40 sm:block" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-ink/10 bg-white shadow-xl dark:border-white/10 dark:bg-ink-800"
          >
            <div className="border-b border-ink/8 px-4 py-3 dark:border-white/10">
              <p className="text-sm font-semibold text-ink dark:text-bone">{name}</p>
              <p className="truncate text-xs text-ink/50 dark:text-bone/50">{user?.email}</p>
              <div className="mt-2">
                <Badge tone={isSuperAdmin ? 'accent' : 'neutral'}>
                  {isSuperAdmin ? 'Super Admin' : 'Admin'}
                </Badge>
              </div>
            </div>
            <button
              onClick={signOut}
              className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
            >
              <AdminIcon name="logout" size={18} /> Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Breadcrumbs() {
  const { pathname } = useLocation()
  const crumbs = []
  if (pathname.startsWith('/admin')) {
    crumbs.push({ label: 'Dashboard', to: '/admin' })
    if (pathname !== '/admin') {
      const seg = '/' + pathname.split('/').slice(1, 3).join('/')
      crumbs.push({ label: LABELS[seg] || seg.split('/').pop(), to: seg })
      if (pathname.split('/').length > 3) {
        const last = pathname.split('/').pop()
        crumbs.push({ label: /^new$/i.test(last) ? 'New' : /^\w{8}-/.test(last) ? 'Edit' : last })
      }
    }
  }
  return (
    <nav className="flex items-center gap-1.5 text-sm">
      {crumbs.map((c, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <AdminIcon name="chevronRight" size={14} className="text-ink/30 dark:text-bone/30" />}
          {c.to && i < crumbs.length - 1 ? (
            <Link to={c.to} className="text-ink/50 hover:text-accent-600 dark:text-bone/50">{c.label}</Link>
          ) : (
            <span className="font-medium capitalize text-ink dark:text-bone">{c.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

export default function AdminLayout() {
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState('')
  useIdleLogout()

  const onSearch = (e) => {
    e.preventDefault()
    if (search.trim()) navigate(`/admin/projects?q=${encodeURIComponent(search.trim())}`)
  }

  return (
    <div className="min-h-screen bg-bone text-ink dark:bg-ink-900 dark:text-bone">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block">
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/60 lg:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden"
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              <Sidebar onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main column */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-ink/8 bg-bone/80 px-4 backdrop-blur-md dark:border-white/10 dark:bg-ink-900/80 sm:px-6">
          <button
            className="grid h-9 w-9 place-items-center rounded-lg text-ink/60 hover:bg-ink/5 lg:hidden dark:text-bone/60 dark:hover:bg-white/10"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <AdminIcon name="menu" size={20} />
          </button>

          <form onSubmit={onSearch} className="relative hidden max-w-xs flex-1 sm:block">
            <AdminIcon name="search" size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-bone/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects…"
              className="w-full rounded-xl border border-ink/12 bg-white/70 py-2 pl-9 pr-3 text-sm text-ink outline-none focus:border-accent dark:border-white/12 dark:bg-white/5 dark:text-bone"
            />
          </form>

          <div className="ml-auto flex items-center gap-1.5">
            <Button variant="accent" size="sm" icon="plus" onClick={() => navigate('/admin/projects/new')} className="hidden sm:inline-flex">
              New Project
            </Button>
            <IconButton icon={theme === 'dark' ? 'sun' : 'moon'} label="Toggle theme" onClick={toggle} />
            <NotificationsMenu />
            <ProfileMenu />
          </div>
        </header>

        {/* Breadcrumb bar */}
        <div className="border-b border-ink/6 bg-white/40 px-4 py-3 dark:border-white/5 dark:bg-ink-800/30 sm:px-6">
          <Breadcrumbs />
        </div>

        {/* Routed content */}
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
