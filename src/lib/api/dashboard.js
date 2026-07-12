// Dashboard analytics: aggregate counts, chart series and recent activity.
// All queries degrade gracefully when Supabase is unconfigured by deriving
// numbers from the bundled static content so the dashboard is never blank.
import { useQuery } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../supabase'
import {
  PROJECTS as STATIC_PROJECTS,
  SERVICE_CATEGORIES as STATIC_SERVICES,
} from '../../data/site'
import { isThisMonth } from '../format'

async function count(table, filter) {
  let q = supabase.from(table).select('*', { count: 'exact', head: true })
  if (filter) q = filter(q)
  const { count: c } = await q
  return c || 0
}

async function fetchStats() {
  if (!isSupabaseConfigured) {
    // Static fallback numbers.
    return {
      totalProjects: STATIC_PROJECTS.length,
      totalServices: STATIC_SERVICES.length,
      featuredProjects: 0,
      pendingMessages: 0,
      projectsThisMonth: 0,
      servicesThisMonth: 0,
      visitors: 0,
      lastLogin: null,
    }
  }

  const [totalProjects, featuredProjects, totalServices, pendingMessages] = await Promise.all([
    count('projects', (q) => q.eq('archived', false)),
    count('projects', (q) => q.eq('featured', true).eq('archived', false)),
    count('services', (q) => q.eq('archived', false)),
    count('contact_messages', (q) => q.eq('is_read', false).eq('archived', false)),
  ])

  // Rows created this month (fetch timestamps, count client-side — small tables).
  const { data: recentProjects } = await supabase
    .from('projects')
    .select('created_at')
    .order('created_at', { ascending: false })
    .limit(200)
  const { data: recentServices } = await supabase
    .from('services')
    .select('created_at')
    .order('created_at', { ascending: false })
    .limit(200)

  // Last login = the current admin's previous login recorded in profiles.
  const { data: userRes } = await supabase.auth.getUser()
  let lastLogin = null
  if (userRes?.user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('last_login')
      .eq('id', userRes.user.id)
      .single()
    lastLogin = profile?.last_login || null
  }

  // Visitors = sum of placeholder traffic metric (clearly labeled in the UI).
  const { data: traffic } = await supabase.from('traffic_metrics').select('visitors')
  const visitors = (traffic || []).reduce((sum, t) => sum + (t.visitors || 0), 0)

  return {
    totalProjects,
    totalServices,
    featuredProjects,
    pendingMessages,
    projectsThisMonth: (recentProjects || []).filter((r) => isThisMonth(r.created_at)).length,
    servicesThisMonth: (recentServices || []).filter((r) => isThisMonth(r.created_at)).length,
    visitors,
    lastLogin,
  }
}

export function useDashboardStats() {
  return useQuery({ queryKey: ['dashboard-stats'], queryFn: fetchStats, staleTime: 30_000 })
}

// Charts -------------------------------------------------------------------

async function fetchCharts() {
  if (!isSupabaseConfigured) {
    const byCat = tally(STATIC_PROJECTS.map((p) => p.category))
    return {
      projectsByCategory: byCat,
      serviceDistribution: STATIC_SERVICES.map((s) => ({ name: s.short || s.title, value: s.items?.length || 1 })),
      contactRequests: [],
      traffic: sampleTraffic(),
    }
  }

  const { data: projects } = await supabase.from('projects').select('category').eq('archived', false)
  const { data: services } = await supabase.from('services').select('name').eq('archived', false)
  const { data: messages } = await supabase.from('contact_messages').select('created_at')
  const { data: traffic } = await supabase
    .from('traffic_metrics')
    .select('day, visitors, pageviews')
    .order('day', { ascending: true })

  return {
    projectsByCategory: tally((projects || []).map((p) => p.category || 'Uncategorized')),
    serviceDistribution: tally((services || []).map((s) => s.name)).map((d) => ({ name: d.name, value: d.value })),
    contactRequests: monthlyCounts((messages || []).map((m) => m.created_at)),
    traffic: (traffic || []).length
      ? traffic.map((t) => ({ label: t.day, visitors: t.visitors, pageviews: t.pageviews }))
      : sampleTraffic(),
  }
}

export function useDashboardCharts() {
  return useQuery({ queryKey: ['dashboard-charts'], queryFn: fetchCharts, staleTime: 30_000 })
}

export function useRecentActivity(limit = 8) {
  return useQuery({
    queryKey: ['recent-activity', limit],
    queryFn: async () => {
      if (!isSupabaseConfigured) return []
      const { data } = await supabase
        .from('activity_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)
      return data || []
    },
    staleTime: 15_000,
  })
}

// Helpers -------------------------------------------------------------------

function tally(items) {
  const map = new Map()
  for (const it of items) map.set(it, (map.get(it) || 0) + 1)
  return [...map.entries()].map(([name, value]) => ({ name, value }))
}

function monthlyCounts(dates) {
  const map = new Map()
  for (const d of dates) {
    const key = new Date(d).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    map.set(key, (map.get(key) || 0) + 1)
  }
  return [...map.entries()].map(([label, count]) => ({ label, count }))
}

// Deterministic placeholder traffic curve (no real analytics source yet).
function sampleTraffic() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const base = [820, 910, 1040, 990, 1180, 1320, 1410, 1360, 1500, 1620, 1580, 1740]
  return months.map((label, i) => ({ label, visitors: base[i], pageviews: Math.round(base[i] * 2.6) }))
}
