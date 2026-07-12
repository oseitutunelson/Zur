// Dashboard overview: analytics cards, charts and recent activity. Numbers are
// live from Supabase (with static fallbacks). First-run shows a seed prompt to
// import the existing site content into the database.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts'
import { Card, Badge, Button, Spinner } from '../ui/primitives'
import AdminIcon from '../ui/AdminIcon'
import PageHeader from '../ui/PageHeader'
import { useTheme } from '../ui/theme'
import { useDashboardStats, useDashboardCharts, useRecentActivity } from '../../lib/api/dashboard'
import { needsSeeding, seedAllContent } from '../../lib/api/seed'
import { formatDateTime, timeAgo } from '../../lib/format'

const PIE_COLORS = ['#3B82F6', '#0F1B30', '#66717E', '#60A5FA', '#2563EB', '#A3A3A3', '#404040', '#93C5FD']

function StatCard({ icon, label, value, sub, tone = 'accent', to }) {
  const body = (
    <Card className="p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink/45 dark:text-bone/40">{label}</p>
          <p className="mt-2 font-display text-3xl font-extrabold text-ink dark:text-bone">{value}</p>
          {sub && <p className="mt-1 text-xs text-ink/50 dark:text-bone/45">{sub}</p>}
        </div>
        <span className={`grid h-11 w-11 place-items-center rounded-xl ${tone === 'accent' ? 'bg-accent/15 text-accent-600' : 'bg-ink/8 text-ink dark:bg-white/10 dark:text-bone'}`}>
          <AdminIcon name={icon} size={22} />
        </span>
      </div>
    </Card>
  )
  return to ? <Link to={to}>{body}</Link> : body
}

function ChartCard({ title, note, children }) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base font-bold text-ink dark:text-bone">{title}</h3>
        {note && <Badge tone="neutral">{note}</Badge>}
      </div>
      <div className="h-64">{children}</div>
    </Card>
  )
}

function SeedBanner() {
  const qc = useQueryClient()
  const [seeding, setSeeding] = useState(false)
  const { data: needs } = useQuery({ queryKey: ['needs-seeding'], queryFn: needsSeeding })

  if (!needs) return null

  const run = async () => {
    setSeeding(true)
    try {
      const s = await seedAllContent()
      toast.success(`Imported ${s.projects} projects, ${s.services} services, ${s.testimonials} testimonials, ${s.partners} partners.`)
      qc.invalidateQueries()
    } catch (err) {
      toast.error(err.message || 'Seeding failed')
    } finally {
      setSeeding(false)
    }
  }

  return (
    <Card className="mb-6 flex flex-col gap-4 border-accent/30 bg-accent/5 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/20 text-accent-600">
          <AdminIcon name="spark" size={20} />
        </span>
        <div>
          <p className="font-semibold text-ink dark:text-bone">Import your existing website content</p>
          <p className="mt-0.5 text-sm text-ink/60 dark:text-bone/55">
            Your database is empty. Import the current projects, services, testimonials and partners so the dashboard is the source of truth.
          </p>
        </div>
      </div>
      <Button onClick={run} loading={seeding} icon="upload" className="shrink-0">
        Import content
      </Button>
    </Card>
  )
}

export default function Dashboard() {
  const { isDark } = useTheme()
  const { data: stats, isLoading } = useDashboardStats()
  const { data: charts } = useDashboardCharts()
  const { data: activity } = useRecentActivity(8)

  const axisColor = isDark ? '#8a8a8a' : '#9a9a9a'
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
  const tooltipStyle = {
    background: isDark ? '#13233D' : '#fff',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
    borderRadius: 12,
    fontSize: 12,
    color: isDark ? '#F4F5F7' : '#0F1B30',
  }

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Business overview and website analytics.">
        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-xl border border-accent bg-accent px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-400"
        >
          <AdminIcon name="plus" size={18} /> New Project
        </Link>
      </PageHeader>

      <SeedBanner />

      {/* Stat cards */}
      {isLoading ? (
        <div className="grid place-items-center py-20"><Spinner size={28} /></div>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon="projects" label="Total Projects" value={stats?.totalProjects ?? 0} sub={`${stats?.projectsThisMonth ?? 0} added this month`} to="/admin/projects" />
          <StatCard icon="services" label="Total Services" value={stats?.totalServices ?? 0} sub={`${stats?.servicesThisMonth ?? 0} added this month`} tone="ink" to="/admin/services" />
          <StatCard icon="star" label="Featured Projects" value={stats?.featuredProjects ?? 0} sub="Shown on homepage" />
          <StatCard icon="inbox" label="Pending Messages" value={stats?.pendingMessages ?? 0} sub="Unread enquiries" tone="ink" to="/admin/messages" />
          <StatCard icon="users" label="Website Visitors" value={(stats?.visitors ?? 0).toLocaleString()} sub="Placeholder metric" />
          <StatCard icon="calendar" label="Projects This Month" value={stats?.projectsThisMonth ?? 0} tone="ink" />
          <StatCard icon="spark" label="Services This Month" value={stats?.servicesThisMonth ?? 0} />
          <StatCard icon="clock" label="Last Login" value={stats?.lastLogin ? timeAgo(stats.lastLogin) : '—'} sub={stats?.lastLogin ? formatDateTime(stats.lastLogin) : 'This session'} tone="ink" />
        </div>
      )}

      {/* Charts */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <ChartCard title="Projects by Category">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={charts?.projectsByCategory || []}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="name" tick={{ fill: axisColor, fontSize: 11 }} tickLine={false} axisLine={false} interval={0} angle={-12} textAnchor="end" height={50} />
              <YAxis tick={{ fill: axisColor, fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(59,130,246,0.08)' }} />
              <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} maxBarSize={48} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Service Distribution">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={charts?.serviceDistribution || []}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
              >
                {(charts?.serviceDistribution || []).map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Website Traffic" note="Sample data">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={charts?.traffic || []}>
              <defs>
                <linearGradient id="traffic" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="label" tick={{ fill: axisColor, fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: axisColor, fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="visitors" stroke="#3B82F6" strokeWidth={2} fill="url(#traffic)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Contact Requests" note={(charts?.contactRequests?.length ?? 0) === 0 ? 'No data yet' : undefined}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={charts?.contactRequests || []}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="label" tick={{ fill: axisColor, fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: axisColor, fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="count" stroke="#0F1B30" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent activity */}
      <Card className="mt-6 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-bold text-ink dark:text-bone">Recent Activity</h3>
          <Link to="/admin/activity" className="text-xs font-semibold text-accent-600 hover:underline">View all</Link>
        </div>
        {(activity?.length ?? 0) === 0 ? (
          <p className="py-8 text-center text-sm text-ink/40 dark:text-bone/40">No activity recorded yet</p>
        ) : (
          <ul className="divide-y divide-ink/6 dark:divide-white/6">
            {activity.map((a) => (
              <li key={a.id} className="flex items-center gap-3 py-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink/6 text-ink/60 dark:bg-white/10 dark:text-bone/60">
                  <AdminIcon name={a.action === 'deleted' ? 'trash' : a.action === 'login' ? 'logout' : a.action === 'created' ? 'plus' : 'edit'} size={17} />
                </span>
                <div className="flex-1">
                  <p className="text-sm text-ink dark:text-bone">
                    <span className="font-semibold">{a.actor_name || 'System'}</span>{' '}
                    <span className="text-ink/60 dark:text-bone/55">{a.action} {a.entity}{a.meta?.title ? ` · ${a.meta.title}` : ''}</span>
                  </p>
                </div>
                <span className="text-xs text-ink/40 dark:text-bone/35">{timeAgo(a.created_at)}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </>
  )
}
