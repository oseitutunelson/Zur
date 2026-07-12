// Route guards for the admin area. `ProtectedRoute` blocks unauthenticated
// users; `RequireRole` additionally restricts a subtree to a given role.
// These are the client-side half of authorization — Postgres RLS enforces the
// same rules at the database, so a bypassed guard still cannot read/write data.
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider'

function FullScreenLoader() {
  return (
    <div className="grid min-h-screen place-items-center bg-ink">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-accent" />
    </div>
  )
}

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, configured } = useAuth()
  const location = useLocation()

  // If Supabase isn't set up yet, send admins to a setup notice on the login page.
  if (!configured) return <Navigate to="/admin/login" replace state={{ setup: true }} />
  if (loading) return <FullScreenLoader />
  if (!isAuthenticated) return <Navigate to="/admin/login" replace state={{ from: location }} />
  return children
}

export function RequireRole({ role = 'super_admin', children }) {
  const { profile, loading } = useAuth()
  if (loading) return <FullScreenLoader />
  const allowed = role === 'super_admin' ? profile?.role === 'super_admin' : !!profile?.role
  if (!allowed) return <Navigate to="/admin" replace />
  return children
}
