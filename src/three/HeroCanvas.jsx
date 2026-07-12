import { Suspense, lazy, useEffect, useRef, useState } from 'react'

const ConstructionScene = lazy(() => import('./ConstructionScene'))

// Detect WebGL support once.
function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

export default function HeroCanvas({ scrollRef, mouseRef, onReady }) {
  const [enabled, setEnabled] = useState(false)
  const [mount, setMount] = useState(false)
  const holder = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ok = hasWebGL() && !reduced
    setEnabled(ok)
    // Defer mounting heavy canvas slightly so first paint is fast.
    const id = requestAnimationFrame(() => setMount(true))
    // No 3D scene means nothing to wait for — release the loader immediately.
    if (!ok) onReady?.()
    return () => cancelAnimationFrame(id)
  }, [onReady])

  if (!enabled) {
    // Static blueprint fallback for no-WebGL / reduced-motion users.
    return (
      <div className="absolute inset-0 blueprint-grid bg-ink">
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      </div>
    )
  }

  return (
    <div ref={holder} className="absolute inset-0">
      {mount && (
        <Suspense
          fallback={<div className="absolute inset-0 blueprint-grid bg-ink" />}
        >
          <ConstructionScene scrollRef={scrollRef} mouseRef={mouseRef} onReady={onReady} />
        </Suspense>
      )}
    </div>
  )
}
