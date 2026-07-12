// Image helpers for the ZUR Construction site.

// Helper to build optimized Unsplash URLs from a photo id.
export function unsplash(id, { w = 1200, q = 70 } = {}) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`
}

// Eagerly bundle every real project photo so we can resolve them by filename.
// Vite rewrites each import to a hashed, cache-friendly asset URL.
const projectAssets = import.meta.glob('../assets/projects/*.{jpeg,jpg,png,webp}', {
  eager: true,
  import: 'default',
})

const localByFile = {}
for (const path in projectAssets) {
  const file = path.split('/').pop()
  localByFile[file] = projectAssets[path]
}

// Resolve any image reference used in site data:
//  - a real local project photo (e.g. "slate-court-1.jpeg")
//  - a full URL (returned as-is)
//  - an Unsplash photo id (e.g. "photo-1564013799919-...")
export function img(ref, opts = {}) {
  if (!ref) return ''
  if (localByFile[ref]) return localByFile[ref]
  if (ref.startsWith('http')) return ref
  return unsplash(ref, opts)
}
