// Drag-and-drop multi-image uploader. Files are validated, compressed and
// uploaded to Supabase Storage on drop; previews render immediately. Supports
// reordering (drag), removal, and choosing the cover image.
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  DndContext, closestCenter, PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core'
import {
  SortableContext, useSortable, arrayMove, rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { toast } from 'sonner'
import AdminIcon from '../ui/AdminIcon'
import { Spinner } from '../ui/primitives'
import { uploadImages, validateImage, ACCEPTED_IMAGE_TYPES } from '../../lib/upload'
import { img } from '../../lib/img'

function SortableThumb({ url, isCover, onRemove, onCover }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: url })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative aspect-square overflow-hidden rounded-xl border-2 ${isCover ? 'border-accent' : 'border-transparent'}`}
    >
      <img src={img(url, { w: 300 })} alt="" className="h-full w-full object-cover" />
      {/* Drag handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="absolute left-1.5 top-1.5 grid h-7 w-7 cursor-grab place-items-center rounded-lg bg-ink/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Drag to reorder"
      >
        <AdminIcon name="grip" size={15} />
      </button>
      {isCover && (
        <span className="absolute left-1.5 bottom-1.5 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-ink">Cover</span>
      )}
      <div className="absolute right-1.5 top-1.5 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        {!isCover && (
          <button type="button" onClick={onCover} className="grid h-7 w-7 place-items-center rounded-lg bg-ink/60 text-white hover:bg-accent hover:text-ink" aria-label="Set as cover" title="Set as cover">
            <AdminIcon name="starOutline" size={15} />
          </button>
        )}
        <button type="button" onClick={onRemove} className="grid h-7 w-7 place-items-center rounded-lg bg-ink/60 text-white hover:bg-red-600" aria-label="Remove image" title="Remove">
          <AdminIcon name="trash" size={15} />
        </button>
      </div>
    </div>
  )
}

export default function ImageDropzone({ images = [], onChange, cover, onCoverChange, bucket = 'projects', folder = 'projects' }) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState({ done: 0, total: 0 })
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const onDrop = useCallback(
    async (accepted, rejected) => {
      if (rejected?.length) {
        rejected.forEach((r) => toast.error(`${r.file.name}: not a supported image`))
      }
      // Validate first so we surface issues before uploading.
      const errors = accepted.map(validateImage).filter(Boolean)
      if (errors.length) { errors.forEach((e) => toast.error(e)); return }
      if (!accepted.length) return

      setUploading(true)
      setProgress({ done: 0, total: accepted.length })
      try {
        const uploaded = await uploadImages(accepted, bucket, folder, (done, total) => setProgress({ done, total }))
        const urls = uploaded.map((u) => u.url)
        const next = [...images, ...urls]
        onChange(next)
        // Default the cover to the first image if none is set yet.
        if (!cover && next.length) onCoverChange?.(next[0])
        toast.success(`${urls.length} image${urls.length > 1 ? 's' : ''} uploaded`)
      } catch (err) {
        toast.error(err.message || 'Upload failed')
      } finally {
        setUploading(false)
      }
    },
    [images, onChange, cover, onCoverChange, bucket, folder]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    disabled: uploading,
  })

  const handleDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id) {
      const oldIdx = images.indexOf(active.id)
      const newIdx = images.indexOf(over.id)
      onChange(arrayMove(images, oldIdx, newIdx))
    }
  }

  const remove = (url) => {
    const next = images.filter((u) => u !== url)
    onChange(next)
    if (cover === url) onCoverChange?.(next[0] || '')
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          isDragActive ? 'border-accent bg-accent/5' : 'border-ink/15 hover:border-accent/50 dark:border-white/15'
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Spinner size={26} />
            <p className="text-sm text-ink/60 dark:text-bone/60">Uploading {progress.done}/{progress.total}…</p>
          </div>
        ) : (
          <>
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent-600">
              <AdminIcon name="upload" size={24} />
            </span>
            <p className="mt-3 text-sm font-medium text-ink dark:text-bone">
              {isDragActive ? 'Drop images here' : 'Drag & drop images, or click to browse'}
            </p>
            <p className="mt-1 text-xs text-ink/45 dark:text-bone/40">JPG, PNG or WebP · optimized automatically</p>
          </>
        )}
      </div>

      {images.length > 0 && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={images} strategy={rectSortingStrategy}>
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {images.map((url) => (
                <SortableThumb
                  key={url}
                  url={url}
                  isCover={cover ? cover === url : images[0] === url}
                  onRemove={() => remove(url)}
                  onCover={() => onCoverChange?.(url)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
