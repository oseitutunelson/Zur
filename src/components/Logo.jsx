import logoUrl from '../assets/zur-logo.png'

// ZUR Construction official identity — the gold badge wordmark ("zur") paired
// with the "construction" subline. Shipped as a transparent PNG so it sits
// cleanly on the site's dark surfaces (navbar, footer, admin).
//
// `className` controls sizing/positioning (e.g. `h-12`); a height default is
// provided. Legacy `mark`/`subtitle` props are accepted for compatibility but
// the artwork is a single self-contained lockup.
export default function Logo({ className = '', mark = true, subtitle = true }) {
  return (
    <img
      src={logoUrl}
      alt="ZUR Construction"
      className={`h-11 w-auto select-none ${className}`}
      draggable={false}
    />
  )
}
