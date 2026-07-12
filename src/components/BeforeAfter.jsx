import { useRef, useState, useCallback } from 'react'
import { img } from '../lib/img'

// Draggable before/after comparison slider.
export default function BeforeAfter({ before, after, beforeLabel = 'Before', afterLabel = 'After', className = '' }) {
  const [pos, setPos] = useState(50)
  const ref = useRef(null)
  const dragging = useRef(false)

  const update = useCallback((clientX) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const p = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, p)))
  }, [])

  const onDown = (e) => {
    dragging.current = true
    update(e.touches ? e.touches[0].clientX : e.clientX)
  }
  const onMove = (e) => {
    if (!dragging.current) return
    update(e.touches ? e.touches[0].clientX : e.clientX)
  }
  const onUp = () => (dragging.current = false)

  return (
    <div
      ref={ref}
      className={`relative select-none overflow-hidden rounded-2xl ${className}`}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchMove={onMove}
      onTouchEnd={onUp}
    >
      <img src={img(after, { w: 1000 })} alt={afterLabel} loading="lazy" className="block aspect-[16/10] w-full object-cover" />
      <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink">{afterLabel}</span>

      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={img(before, { w: 1000 })}
          alt={beforeLabel}
          loading="lazy"
          className="block aspect-[16/10] h-full w-full object-cover grayscale"
          style={{ width: ref.current ? ref.current.offsetWidth : '100%', maxWidth: 'none' }}
        />
        <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white">{beforeLabel}</span>
      </div>

      {/* handle */}
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-accent" />
        <button
          onMouseDown={onDown}
          onTouchStart={onDown}
          aria-label="Drag to compare"
          className="absolute top-1/2 -ml-5 -mt-5 grid h-10 w-10 cursor-ew-resize place-items-center rounded-full bg-accent text-ink shadow-lg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
