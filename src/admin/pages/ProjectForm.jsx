// Add / edit a project. All brief fields plus drag-and-drop image upload with
// cover selection. Writes go through the projects API (which logs activity and
// emits a notification) and invalidate both admin and public caches.
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Card, Button, Field, Textarea, Select, Toggle, Spinner, Label } from '../ui/primitives'
import AdminIcon from '../ui/AdminIcon'
import PageHeader from '../ui/PageHeader'
import ImageDropzone from '../components/ImageDropzone'
import {
  useAdminProjects, createProject, updateProject, PROJECT_STATUSES,
} from '../../lib/api/projects'
import { slugify } from '../../lib/format'

const schema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  completionDate: z.string().optional(),
  clientName: z.string().optional(),
  shortDesc: z.string().max(280, 'Keep the short description under 280 characters').optional(),
  fullDesc: z.string().optional(),
  status: z.enum(['Completed', 'Ongoing', 'Upcoming']),
  displayOrder: z.coerce.number().int().min(0).optional(),
})

export default function ProjectForm() {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  const qc = useQueryClient()
  const { data: projects = [], isLoading } = useAdminProjects()
  const existing = useMemo(() => projects.find((p) => p.id === id), [projects, id])

  const [images, setImages] = useState([])
  const [cover, setCover] = useState('')
  const [featured, setFeatured] = useState(false)
  const [slugTouched, setSlugTouched] = useState(false)

  const { register, handleSubmit, reset, watch, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { status: 'Completed', displayOrder: 0 },
  })

  const titleValue = watch('title')

  // Auto-derive the slug from the title until the user edits it manually.
  useEffect(() => {
    if (!slugTouched && titleValue) setValue('slug', slugify(titleValue))
  }, [titleValue, slugTouched, setValue])

  // Populate the form when editing.
  useEffect(() => {
    if (isEdit && existing) {
      reset({
        title: existing.name,
        slug: existing.slug,
        category: existing.category,
        location: existing.location,
        completionDate: existing.completionDate ? String(existing.completionDate).slice(0, 10) : '',
        clientName: existing.clientName,
        shortDesc: existing.blurb,
        fullDesc: existing.fullDesc,
        status: PROJECT_STATUSES.includes(existing.status) ? existing.status : 'Completed',
        displayOrder: existing.displayOrder,
      })
      setImages(existing.gallery || [])
      setCover(existing.cover || existing.gallery?.[0] || '')
      setFeatured(!!existing.featured)
      setSlugTouched(true)
    }
  }, [isEdit, existing, reset])

  const onSubmit = async (values) => {
    if (!images.length) return toast.error('Add at least one image')
    const payload = {
      ...values,
      slug: values.slug || slugify(values.title),
      featured,
      images,
      coverUrl: cover || images[0],
      // Preserve supplementary detail fields on edit.
      details: isEdit && existing
        ? {
            year: existing.year,
            scope: existing.scope,
            size: existing.size,
            duration: existing.duration,
            budget: existing.budget,
            challenge: existing.challenge,
            solution: existing.solution,
          }
        : {},
    }
    try {
      if (isEdit) await updateProject(id, payload)
      else await createProject(payload)
      qc.invalidateQueries()
      toast.success(isEdit ? 'Project updated' : 'Project created')
      navigate('/admin/projects')
    } catch (err) {
      toast.error(err.message || 'Save failed')
    }
  }

  if (isEdit && isLoading) return <div className="grid place-items-center py-20"><Spinner size={28} /></div>
  if (isEdit && !existing && !isLoading) {
    return (
      <Card className="grid place-items-center px-6 py-20 text-center">
        <p className="font-medium text-ink dark:text-bone">Project not found</p>
        <Link to="/admin/projects" className="mt-3 text-sm font-semibold text-accent-600 hover:underline">← Back to projects</Link>
      </Card>
    )
  }

  const categories = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageHeader title={isEdit ? 'Edit Project' : 'New Project'} subtitle={isEdit ? existing?.name : 'Add a project to the portfolio.'}>
        <Button type="button" variant="outline" onClick={() => navigate('/admin/projects')}>Cancel</Button>
        <Button type="submit" icon="check" loading={isSubmitting}>{isEdit ? 'Save changes' : 'Create project'}</Button>
      </PageHeader>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-4 lg:col-span-2">
          <Card className="space-y-4 p-5">
            <Field label="Project Title" required id="title" placeholder="Aurora Pavilion" error={errors.title?.message} {...register('title')} />
            <Field
              label="URL Slug" id="slug" placeholder="aurora-pavilion" hint="Used in the public URL: /projects/your-slug"
              error={errors.slug?.message}
              {...register('slug', { onChange: () => setSlugTouched(true) })}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="category">Category</Label>
                <input list="category-options" id="category" placeholder="Modern Homes" className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-accent dark:border-white/15 dark:bg-ink-900 dark:text-bone" {...register('category')} />
                <datalist id="category-options">{categories.map((c) => <option key={c} value={c} />)}</datalist>
              </div>
              <Field label="Location" id="location" placeholder="Oyarifa, Accra" {...register('location')} />
            </div>
            <Textarea label="Short Description" id="shortDesc" rows={2} placeholder="A one or two line summary shown on cards." error={errors.shortDesc?.message} {...register('shortDesc')} />
            <Textarea label="Full Description" id="fullDesc" rows={6} placeholder="The detailed project narrative for the project page." {...register('fullDesc')} />
          </Card>

          <Card className="p-5">
            <Label>Project Images</Label>
            <p className="mb-3 text-xs text-ink/45 dark:text-bone/40">The starred image is the cover. Drag thumbnails to reorder the gallery.</p>
            <ImageDropzone images={images} onChange={setImages} cover={cover} onCoverChange={setCover} bucket="projects" folder="projects" />
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="space-y-4 p-5">
            <Select label="Status" id="status" {...register('status')}>
              {PROJECT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </Select>
            <div className="flex items-center justify-between rounded-xl bg-ink/[0.03] px-4 py-3 dark:bg-white/5">
              <div>
                <p className="text-sm font-medium text-ink dark:text-bone">Featured</p>
                <p className="text-xs text-ink/45 dark:text-bone/40">Show on the homepage</p>
              </div>
              <Toggle checked={featured} onChange={setFeatured} />
            </div>
            <Field label="Display Order" id="displayOrder" type="number" min={0} hint="Lower numbers appear first." error={errors.displayOrder?.message} {...register('displayOrder')} />
          </Card>

          <Card className="space-y-4 p-5">
            <Field label="Completion Date" id="completionDate" type="date" {...register('completionDate')} />
            <Field label="Client Name" id="clientName" placeholder="Optional" {...register('clientName')} />
          </Card>
        </div>
      </div>
    </form>
  )
}
