// Image upload pipeline: validate -> compress -> upload to Supabase Storage.
// Returns the public URL. Used by the drag-and-drop uploaders.
import imageCompression from 'browser-image-compression'
import { supabase } from './supabase'
import { slugify } from './format'

// Allowed image types for content uploads. PDFs are handled by the media
// library separately (Phase 4).
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_IMAGE_BYTES = 15 * 1024 * 1024 // 15 MB pre-compression cap

// Client-side validation mirrored by Storage bucket policies (defense in depth).
export function validateImage(file) {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return `${file.name}: unsupported type (use JPG, PNG or WebP)`
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return `${file.name}: too large (max 15 MB)`
  }
  return null
}

// Compress an image in the browser before upload for fast-loading assets.
async function compress(file) {
  try {
    return await imageCompression(file, {
      maxSizeMB: 1.2,
      maxWidthOrHeight: 2000,
      useWebWorker: true,
      fileType: 'image/webp',
    })
  } catch {
    // If compression fails, fall back to the original file.
    return file
  }
}

// Upload a single validated File to a bucket, returning { url, path }.
export async function uploadImage(file, bucket = 'projects', folder = '') {
  if (!supabase) throw new Error('Supabase is not configured')
  const err = validateImage(file)
  if (err) throw new Error(err)

  const optimized = await compress(file)
  const base = slugify(file.name.replace(/\.[^.]+$/, '')) || 'image'
  // Deterministic-ish unique name without Math.random/Date.now in module scope.
  const unique = `${base}-${crypto.randomUUID().slice(0, 8)}.webp`
  const path = folder ? `${folder}/${unique}` : unique

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, optimized, { cacheControl: '31536000', contentType: 'image/webp', upsert: false })
  if (error) throw error

  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return { url: data.publicUrl, path }
}

// Upload many files, reporting progress via optional onProgress(done, total).
export async function uploadImages(files, bucket = 'projects', folder = '', onProgress) {
  const results = []
  let done = 0
  for (const file of files) {
    results.push(await uploadImage(file, bucket, folder))
    done += 1
    onProgress?.(done, files.length)
  }
  return results
}

// Best-effort delete of a stored object by its public URL.
export async function deleteByUrl(url, bucket = 'projects') {
  if (!supabase || !url) return
  const marker = `/object/public/${bucket}/`
  const idx = url.indexOf(marker)
  if (idx === -1) return // not a storage URL (e.g. a seeded local filename)
  const path = url.slice(idx + marker.length)
  try {
    await supabase.storage.from(bucket).remove([path])
  } catch (err) {
    console.warn('storage delete failed', err)
  }
}
