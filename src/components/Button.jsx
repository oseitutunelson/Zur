import { Link } from 'react-router-dom'
import Icon from './Icon'

// Variants tuned to the ZUR Construction system: accent (vermilion), ink, outline, ghost.
const VARIANTS = {
  accent:
    'bg-accent text-white shadow-accent hover:bg-accent-600 hover:-translate-y-0.5 border border-accent hover:border-accent-600',
  ink: 'bg-ink text-white hover:bg-ink-700 border border-ink hover:-translate-y-0.5',
  outline:
    'bg-transparent text-ink border border-ink/20 hover:border-ink hover:bg-ink hover:text-white',
  'outline-light':
    'bg-transparent text-white border border-white/25 hover:bg-white hover:text-ink hover:border-white',
  ghost: 'bg-transparent text-ink hover:text-accent-600 border border-transparent',
}

export default function Button({
  children,
  to,
  href,
  variant = 'accent',
  arrow = true,
  className = '',
  ...rest
}) {
  const base =
    'group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold tracking-tight transition-all duration-300 ease-out'
  const cls = `${base} ${VARIANTS[variant]} ${className}`

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="grid h-6 w-6 place-items-center rounded-full bg-ink/10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-[.bg-accent]:bg-ink/15">
          <Icon name="arrow" size={14} />
        </span>
      )}
    </>
  )

  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>
  return <button className={cls} {...rest}>{inner}</button>
}

