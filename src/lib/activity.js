// Audit trail + notification helpers. Every content mutation in the dashboard
// records an activity-log row and (for notable events) a notification. These
// are best-effort: a logging failure must never block the primary action.
import { supabase } from './supabase'

let cachedActor = null

// Cache the current admin's identity so each log call doesn't re-fetch it.
export async function primeActor() {
  if (!supabase) return null
  const { data } = await supabase.auth.getUser()
  if (!data?.user) return null
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, name, email')
    .eq('id', data.user.id)
    .single()
  cachedActor = {
    id: data.user.id,
    name: profile?.name || profile?.email || data.user.email,
  }
  return cachedActor
}

export function clearActor() {
  cachedActor = null
}

// Record an audit entry. `action` e.g. 'created', 'updated', 'deleted', 'login'.
export async function logActivity(action, entity, entityId, meta = {}) {
  if (!supabase) return
  try {
    const actor = cachedActor || (await primeActor())
    await supabase.from('activity_log').insert({
      actor_id: actor?.id ?? null,
      actor_name: actor?.name ?? 'System',
      action,
      entity,
      entity_id: entityId != null ? String(entityId) : null,
      meta,
    })
  } catch (err) {
    // Non-fatal — never let auditing break the user's action.
    console.warn('activity log failed', err)
  }
}

// Push a dashboard notification (shown in the bell menu / toasts).
export async function notify(title, body = '', type = 'info') {
  if (!supabase) return
  try {
    await supabase.from('notifications').insert({ title, body, type })
  } catch (err) {
    console.warn('notification failed', err)
  }
}
