// Authentication context for the admin dashboard. Wraps Supabase Auth and
// exposes the current session, the admin's profile (incl. RBAC role), and
// sign-in/out + password helpers. Password hashing, session tokens/refresh and
// login rate-limiting are all handled server-side by Supabase Auth.
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { primeActor, clearActor, logActivity } from '../../lib/activity'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (userId) => {
    if (!userId) return setProfile(null)
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    setProfile(data || null)
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }
    // Initial session load.
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (data.session?.user) {
        loadProfile(data.session.user.id)
        primeActor()
      }
      setLoading(false)
    })

    // React to sign-in / sign-out / token refresh across tabs.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      if (next?.user) {
        loadProfile(next.user.id)
        primeActor()
      } else {
        setProfile(null)
        clearActor()
      }
    })
    return () => sub.subscription.unsubscribe()
  }, [loadProfile])

  const signIn = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    // Record login time + audit entry (best-effort).
    if (data.user) {
      await supabase
        .from('profiles')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.user.id)
      await primeActor()
      await logActivity('login', 'auth', data.user.id)
    }
    return data
  }, [])

  const signOut = useCallback(async () => {
    await logActivity('logout', 'auth', session?.user?.id)
    await supabase.auth.signOut()
    clearActor()
    setProfile(null)
  }, [session])

  // Send a password-reset email that redirects back to /admin/reset-password.
  const requestPasswordReset = useCallback(async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    })
    if (error) throw error
  }, [])

  // Set a new password (used on the reset page once the recovery link is open).
  const updatePassword = useCallback(async (password) => {
    const { error } = await supabase.auth.updateUser({ password })
    if (error) throw error
  }, [])

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      role: profile?.role ?? null,
      isSuperAdmin: profile?.role === 'super_admin',
      isAuthenticated: !!session?.user,
      loading,
      configured: isSupabaseConfigured,
      signIn,
      signOut,
      requestPasswordReset,
      updatePassword,
      reloadProfile: () => loadProfile(session?.user?.id),
    }),
    [session, profile, loading, signIn, signOut, requestPasswordReset, updatePassword, loadProfile]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
