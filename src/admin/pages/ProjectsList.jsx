// Project management table: search, filter, sort, pagination, per-row actions
// (view/edit/duplicate/archive/delete) and bulk actions (delete/publish/archive).
import { useMemo, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Card, Button, IconButton, IconLink, StatusBadge, Badge, Spinner } from '../ui/primitives'
import AdminIcon from '../ui/AdminIcon'
import PageHeader from '../ui/PageHeader'
import { useConfirm } from '../ui/ConfirmDialog'
import {
  useAdminProjects, deleteProject, duplicateProject, setProjectFields, bulkDeleteProjects,
} from '../../lib/api/projects'
import { img } from '../../lib/img'
import { formatDate } from '../../lib/format'

const PAGE_SIZE = 8

// Invalidate every query that reflects project data (admin + public + stats).
function useRefreshProjects() {
  const qc = useQueryClient()
  return () => {
    qc.invalidateQueries({ queryKey: ['admin-projects'] })
    qc.invalidateQueries({ queryKey: ['public-projects'] })
    qc.invalidateQueries({ queryKey: ['dashboard-stats'] })
    qc.invalidateQueries({ queryKey: ['dashboard-charts'] })
  }
}

export default function ProjectsList() {
  const { data: projects = [], isLoading } = useAdminProjects()
  const confirm = useConfirm()
  const refresh = useRefreshProjects()
  const [params] = useSearchParams()

  const [q, setQ] = useState(params.get('q') || '')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [sort, setSort] = useState('order')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState([])
  const [busy, setBusy] = useState(false)

  useEffect(() => { setQ(params.get('q') || '') }, [params])
  useEffect(() => { setPage(1) }, [q, category, status, sort])

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))],
    [projects]
  )

  const filtered = useMemo(() => {
    let list = [...projects]
    if (q) {
      const needle = q.toLowerCase()
      list = list.filter((p) =>
        [p.name, p.category, p.location].filter(Boolean).some((v) => v.toLowerCase().includes(needle))
      )
    }
    if (category !== 'All') list = list.filter((p) => p.category === category)
    if (status !== 'All') {
      if (status === 'Archived') list = list.filter((p) => p.archived)
      else list = list.filter((p) => p.status === status && !p.archived)
    } else {
      list = list.filter((p) => !p.archived)
    }
    const sorters = {
      order: (a, b) => a.displayOrder - b.displayOrder,
      name: (a, b) => a.name.localeCompare(b.name),
      newest: (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      oldest: (a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0),
    }
    return list.sort(sorters[sort] || sorters.order)
  }, [projects, q, category, status, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const allOnPageSelected = pageItems.length > 0 && pageItems.every((p) => selected.includes(p.id))

  const toggleAll = () =>
    setSelected(allOnPageSelected ? selected.filter((id) => !pageItems.some((p) => p.id === id)) : [...new Set([...selected, ...pageItems.map((p) => p.id)])])
  const toggleOne = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  // --- Actions -------------------------------------------------------------
  const run = async (fn, successMsg) => {
    setBusy(true)
    try {
      await fn()
      refresh()
      if (successMsg) toast.success(successMsg)
    } catch (err) {
      toast.error(err.message || 'Action failed')
    } finally {
      setBusy(false)
    }
  }

  const onDelete = async (p) => {
    const ok = await confirm({ title: 'Delete project?', message: `"${p.name}" and its images will be permanently removed.`, confirmLabel: 'Delete', danger: true })
    if (ok) run(() => deleteProject(p.id), 'Project deleted')
  }
  const onDuplicate = (p) => run(() => duplicateProject(p.id), 'Project duplicated')
  const onToggleArchive = (p) => run(() => setProjectFields(p.id, { archived: !p.archived }), p.archived ? 'Project restored' : 'Project archived')
  const onToggleFeature = (p) => run(() => setProjectFields(p.id, { featured: !p.featured }))

  const bulk = async (kind) => {
    if (!selected.length) return
    if (kind === 'delete') {
      const ok = await confirm({ title: `Delete ${selected.length} projects?`, message: 'This cannot be undone.', confirmLabel: 'Delete all', danger: true })
      if (!ok) return
      await run(() => bulkDeleteProjects(selected), 'Projects deleted')
    } else if (kind === 'publish') {
      await run(() => setProjectFields(selected, { archived: false }), 'Projects published')
    } else if (kind === 'archive') {
      await run(() => setProjectFields(selected, { archived: true }), 'Projects archived')
    }
    setSelected([])
  }

  const selectCls = 'rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-accent dark:border-white/15 dark:bg-ink-900 dark:text-bone'

  return (
    <>
      <PageHeader title="Projects" subtitle={`${filtered.length} project${filtered.length === 1 ? '' : 's'}`}>
        <Link to="/admin/projects/new" className="inline-flex items-center gap-2 rounded-xl border border-accent bg-accent px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent-400">
          <AdminIcon name="plus" size={18} /> New Project
        </Link>
      </PageHeader>

      {/* Toolbar */}
      <Card className="mb-4 p-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <AdminIcon name="search" size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-bone/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, category or location…"
              className="w-full rounded-xl border border-ink/12 bg-white py-2 pl-9 pr-3 text-sm text-ink outline-none focus:border-accent dark:border-white/12 dark:bg-ink-900 dark:text-bone"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectCls}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectCls}>
              {['All', 'Completed', 'Ongoing', 'Upcoming', 'Archived'].map((s) => <option key={s}>{s}</option>)}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className={selectCls}>
              <option value="order">Display order</option>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Bulk action bar */}
      {selected.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3">
          <span className="text-sm font-semibold text-ink dark:text-bone">{selected.length} selected</span>
          <div className="ml-auto flex flex-wrap gap-2">
            <Button size="sm" variant="subtle" icon="check" onClick={() => bulk('publish')} loading={busy}>Publish</Button>
            <Button size="sm" variant="subtle" icon="archive" onClick={() => bulk('archive')} loading={busy}>Archive</Button>
            <Button size="sm" variant="danger" icon="trash" onClick={() => bulk('delete')} loading={busy}>Delete</Button>
            <Button size="sm" variant="ghost" onClick={() => setSelected([])}>Clear</Button>
          </div>
        </div>
      )}

      {/* Table */}
      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="grid place-items-center py-20"><Spinner size={28} /></div>
        ) : filtered.length === 0 ? (
          <div className="grid place-items-center px-6 py-20 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink/5 text-ink/40 dark:bg-white/10 dark:text-bone/40"><AdminIcon name="projects" size={26} /></span>
            <p className="mt-4 font-medium text-ink dark:text-bone">No projects found</p>
            <p className="mt-1 text-sm text-ink/50 dark:text-bone/45">Try adjusting your filters, or add a new project.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink/8 text-left text-xs uppercase tracking-wide text-ink/45 dark:border-white/10 dark:text-bone/40">
                  <th className="w-10 px-4 py-3">
                    <input type="checkbox" checked={allOnPageSelected} onChange={toggleAll} className="h-4 w-4 accent-accent" aria-label="Select all" />
                  </th>
                  <th className="px-2 py-3">Project</th>
                  <th className="hidden px-4 py-3 md:table-cell">Category</th>
                  <th className="hidden px-4 py-3 lg:table-cell">Location</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Added</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/6 dark:divide-white/6">
                {pageItems.map((p) => (
                  <tr key={p.id} className="group hover:bg-ink/[0.015] dark:hover:bg-white/[0.03]">
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleOne(p.id)} className="h-4 w-4 accent-accent" aria-label={`Select ${p.name}`} />
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-14 shrink-0 overflow-hidden rounded-lg bg-ink/5">
                          {p.cover ? <img src={img(p.cover, { w: 120 })} alt="" className="h-full w-full object-cover" /> : null}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="truncate font-semibold text-ink dark:text-bone">{p.name}</p>
                            {p.featured && <AdminIcon name="star" size={13} className="shrink-0 text-accent" />}
                          </div>
                          <p className="truncate text-xs text-ink/45 dark:text-bone/40 md:hidden">{p.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 text-ink/70 dark:text-bone/60 md:table-cell">{p.category || '—'}</td>
                    <td className="hidden px-4 py-3 text-ink/70 dark:text-bone/60 lg:table-cell">{p.location || '—'}</td>
                    <td className="px-4 py-3">{p.archived ? <Badge tone="neutral">Archived</Badge> : <StatusBadge status={p.status} />}</td>
                    <td className="hidden px-4 py-3 text-ink/55 dark:text-bone/50 sm:table-cell">{formatDate(p.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-0.5">
                        <IconButton icon="starOutline" label={p.featured ? 'Unfeature' : 'Feature'} size={16} onClick={() => onToggleFeature(p)} className={p.featured ? 'text-accent' : ''} />
                        <IconLink icon="eye" label="View on site" size={16} href={`/projects/${p.slug}`} target="_blank" rel="noreferrer" />
                        <IconLink icon="edit" label="Edit" size={16} to={`/admin/projects/${p.id}/edit`} LinkComponent={Link} />
                        <IconButton icon="copy" label="Duplicate" size={16} onClick={() => onDuplicate(p)} />
                        <IconButton icon="archive" label={p.archived ? 'Restore' : 'Archive'} size={16} onClick={() => onToggleArchive(p)} />
                        <IconButton icon="trash" label="Delete" size={16} onClick={() => onDelete(p)} className="hover:text-red-600" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-ink/8 px-4 py-3 dark:border-white/10">
            <p className="text-xs text-ink/50 dark:text-bone/45">Page {page} of {totalPages}</p>
            <div className="flex gap-1">
              <IconButton icon="chevronLeft" label="Previous" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} />
              <IconButton icon="chevronRight" label="Next" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
            </div>
          </div>
        )}
      </Card>
    </>
  )
}
