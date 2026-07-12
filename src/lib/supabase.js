// Supabase client — single shared instance for the whole app.
// Reads config from Vite env vars (see .env.example). When the project is not
// yet configured we export `null` so the public site can gracefully fall back
// to the static content in src/data/site.js.
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// True once real Supabase credentials are present. Components check this to
// decide between live data and the bundled fallback content.
export const isSupabaseConfigured = Boolean(
  url && anonKey && !url.includes('YOUR-PROJECT') && !anonKey.includes('YOUR-')
)

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true, // needed for password-reset / magic links
      },
    })
  : null

// Idle-logout window (minutes) — configurable via env, defaults to 20.
export const IDLE_MINUTES = Number(import.meta.env.VITE_ADMIN_IDLE_MINUTES) || 20
