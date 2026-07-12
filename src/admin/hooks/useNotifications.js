// Dashboard notifications: fetch recent items, expose unread count, and mark
// all as read. Polls periodically (react-query refetch) — light enough for an
// admin tool without wiring realtime channels in Phase 1.
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

export function useNotifications() {
  const qc = useQueryClient()

  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      if (!isSupabaseConfigured) return []
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)
      return data || []
    },
    refetchInterval: 60_000,
    staleTime: 30_000,
  })

  const items = data || []
  const unread = items.filter((n) => !n.is_read).length

  const markAllRead = async () => {
    if (!isSupabaseConfigured || unread === 0) return
    await supabase.from('notifications').update({ is_read: true }).eq('is_read', false)
    qc.invalidateQueries({ queryKey: ['notifications'] })
  }

  return { items, unread, markAllRead }
}
