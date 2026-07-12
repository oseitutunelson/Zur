// Automatically signs an admin out after a period of inactivity, with a
// one-minute warning toast. Activity = mouse / keyboard / scroll / touch.
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { useAuth } from './AuthProvider'
import { IDLE_MINUTES } from '../../lib/supabase'

export function useIdleLogout(minutes = IDLE_MINUTES) {
  const { isAuthenticated, signOut } = useAuth()
  const logoutTimer = useRef(null)
  const warnTimer = useRef(null)

  useEffect(() => {
    if (!isAuthenticated) return
    const ms = Math.max(1, minutes) * 60 * 1000
    const warnMs = Math.max(ms - 60_000, ms * 0.75)

    const reset = () => {
      clearTimeout(logoutTimer.current)
      clearTimeout(warnTimer.current)
      warnTimer.current = setTimeout(() => {
        toast.warning('You will be signed out soon due to inactivity.')
      }, warnMs)
      logoutTimer.current = setTimeout(async () => {
        toast.error('Signed out due to inactivity.')
        await signOut()
      }, ms)
    }

    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart']
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }))
    reset()

    return () => {
      clearTimeout(logoutTimer.current)
      clearTimeout(warnTimer.current)
      events.forEach((e) => window.removeEventListener(e, reset))
    }
  }, [isAuthenticated, minutes, signOut])
}
