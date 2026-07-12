// Small shared formatting helpers used across the admin dashboard.

// URL-safe slug from an arbitrary title.
export function slugify(str = '') {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// "2025-06-14" / Date -> "Jun 14, 2025". Empty-safe.
export function formatDate(value) {
  if (!value) return '—'
  const d = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

// "Jun 14, 2025 · 3:40 PM"
export function formatDateTime(value) {
  if (!value) return '—'
  const d = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return `${formatDate(d)} · ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
}

// Human relative time, e.g. "3h ago". Falls back to a date for old values.
export function timeAgo(value) {
  if (!value) return ''
  const d = value instanceof Date ? value : new Date(value)
  const secs = Math.round((Date.now() - d.getTime()) / 1000)
  if (secs < 60) return 'just now'
  const mins = Math.round(secs / 60)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.round(hrs / 24)
  if (days < 7) return `${days}d ago`
  return formatDate(d)
}

// Is the timestamp within the current calendar month?
export function isThisMonth(value) {
  if (!value) return false
  const d = new Date(value)
  const now = new Date()
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
}

// Year string from a date-ish value (used to map completion_date -> "year").
export function yearOf(value) {
  if (!value) return ''
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? String(value).slice(0, 4) : String(d.getFullYear())
}
