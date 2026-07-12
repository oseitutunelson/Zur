// Projects data-access layer: normalizers, public reads (with static fallback),
// and admin CRUD. The DB is the source of truth; when Supabase is unconfigured
// or empty, public reads fall back to the bundled content in src/data/site.js.
import { useQuery } from '@tanstack/react-query'
import { supabase, isSupabaseConfigured } from '../supabase'
import { PROJECTS as STATIC_PROJECTS } from '../../data/site'
import { slugify, yearOf } from '../format'
import { logActivity, notify } from '../activity'
import { deleteByUrl } from '../upload'

export const PROJECT_STATUSES = ['Completed', 'Ongoing', 'Upcoming']

// DB row (with joined project_images) -> the shape public components expect.
export function toPublicProject(row) {
  const d = row.details || {}
  const gallery = [...(row.project_images || [])]
    .sort((a, b) => a.sort - b.sort)
    .map((i) => i.url)
  return {
    id: row.id,
    slug: row.slug,
    name: row.title,
    category: row.category || '',
    year: yearOf(row.completion_date) || d.year || '',
    location: row.location || '',
    cover: row.cover_url || gallery[0] || '',
    blurb: row.short_desc || '',
    status: row.status || 'Completed',
    featured: !!row.featured,
    archived: !!row.archived,
    displayOrder: row.display_order ?? 0,
    clientName: row.client_name || '',
    fullDesc: row.full_desc || '',
    completionDate: row.completion_date || '',
    createdAt: row.created_at,
    // Supplementary detail-page fields (present for seeded projects).
    scope: Array.isArray(d.scope) ? d.scope : [],
    size: d.size || '',
    duration: d.duration || '',
    budget: d.budget || '',
    challenge: d.challenge || '',
    solution: d.solution || '',
    gallery: gallery.length ? gallery : row.cover_url ? [row.cover_url] : [],
  }
}

const SELECT_WITH_IMAGES = '*, project_images(*)'

// ---- Public reads (fall back to static content) ----------------------------

async function fetchPublicProjects() {
  if (!isSupabaseConfigured) return STATIC_PROJECTS
  const { data, error } = await supabase
    .from('projects')
    .select(SELECT_WITH_IMAGES)
    .eq('archived', false)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) throw error
  if (!data || data.length === 0) return STATIC_PROJECTS // empty DB -> keep site populated
  return data.map(toPublicProject)
}

export function usePublicProjects() {
  return useQuery({
    queryKey: ['public-projects'],
    queryFn: fetchPublicProjects,
    staleTime: 60_000,
    // Fallback data means the UI never flashes empty even before the fetch.
    placeholderData: STATIC_PROJECTS,
  })
}

export function usePublicProject(slug) {
  return useQuery({
    queryKey: ['public-project', slug],
    queryFn: async () => {
      const all = await fetchPublicProjects()
      return all.find((p) => p.slug === slug) || null
    },
    enabled: !!slug,
  })
}

// ---- Admin reads ------------------------------------------------------------

export async function fetchAdminProjects() {
  if (!isSupabaseConfigured) return STATIC_PROJECTS.map((p, i) => ({ ...p, displayOrder: i }))
  const { data, error } = await supabase
    .from('projects')
    .select(SELECT_WITH_IMAGES)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data || []).map(toPublicProject)
}

export function useAdminProjects() {
  return useQuery({ queryKey: ['admin-projects'], queryFn: fetchAdminProjects })
}

// ---- Admin mutations --------------------------------------------------------

// Map the admin form model to a DB row. `images` is an array of public URLs.
function toRow(form) {
  return {
    title: form.title?.trim(),
    slug: form.slug?.trim() || slugify(form.title),
    category: form.category || null,
    location: form.location || null,
    completion_date: form.completionDate || null,
    client_name: form.clientName || null,
    short_desc: form.shortDesc || null,
    full_desc: form.fullDesc || null,
    cover_url: form.coverUrl || form.images?.[0] || null,
    status: form.status || 'Completed',
    featured: !!form.featured,
    display_order: Number(form.displayOrder) || 0,
    details: form.details || {},
  }
}

async function replaceImages(projectId, urls = []) {
  await supabase.from('project_images').delete().eq('project_id', projectId)
  if (urls.length) {
    await supabase
      .from('project_images')
      .insert(urls.map((url, sort) => ({ project_id: projectId, url, sort })))
  }
}

export async function createProject(form) {
  if (!supabase) throw new Error('Supabase is not configured')
  const row = toRow(form)
  const { data, error } = await supabase.from('projects').insert(row).select().single()
  if (error) throw error
  await replaceImages(data.id, form.images || [])
  await logActivity('created', 'project', data.id, { title: row.title })
  await notify('Project added', `"${row.title}" was created.`, 'success')
  return data
}

export async function updateProject(id, form) {
  if (!supabase) throw new Error('Supabase is not configured')
  const row = toRow(form)
  const { data, error } = await supabase.from('projects').update(row).eq('id', id).select().single()
  if (error) throw error
  if (form.images) await replaceImages(id, form.images)
  await logActivity('updated', 'project', id, { title: row.title })
  await notify('Project updated', `"${row.title}" was edited.`, 'info')
  return data
}

export async function deleteProject(id) {
  if (!supabase) throw new Error('Supabase is not configured')
  // Clean up stored images first (best-effort), then the row (cascade covers rows).
  const { data: imgs } = await supabase.from('project_images').select('url').eq('project_id', id)
  await Promise.all((imgs || []).map((i) => deleteByUrl(i.url, 'projects')))
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
  await logActivity('deleted', 'project', id)
}

export async function duplicateProject(id) {
  if (!supabase) throw new Error('Supabase is not configured')
  const { data: src, error } = await supabase
    .from('projects')
    .select(SELECT_WITH_IMAGES)
    .eq('id', id)
    .single()
  if (error) throw error
  const copy = { ...src }
  delete copy.id
  delete copy.created_at
  delete copy.updated_at
  delete copy.project_images
  copy.title = `${src.title} (Copy)`
  copy.slug = `${src.slug}-copy-${crypto.randomUUID().slice(0, 5)}`
  copy.featured = false
  const { data: created, error: insErr } = await supabase
    .from('projects')
    .insert(copy)
    .select()
    .single()
  if (insErr) throw insErr
  await replaceImages(
    created.id,
    [...(src.project_images || [])].sort((a, b) => a.sort - b.sort).map((i) => i.url)
  )
  await logActivity('duplicated', 'project', created.id, { from: id })
  return created
}

// Generic field setter used by archive / feature toggles and bulk actions.
export async function setProjectFields(ids, fields) {
  if (!supabase) throw new Error('Supabase is not configured')
  const list = Array.isArray(ids) ? ids : [ids]
  const { error } = await supabase.from('projects').update(fields).in('id', list)
  if (error) throw error
  await logActivity('updated', 'project', list.join(','), fields)
}

export async function bulkDeleteProjects(ids) {
  for (const id of ids) await deleteProject(id)
}
