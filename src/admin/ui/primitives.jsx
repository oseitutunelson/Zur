// Reusable admin UI primitives: Button, Card, Badge, Field, Textarea, Select,
// Toggle, Spinner. All are dark-mode aware via Tailwind `dark:` variants.
import { forwardRef } from 'react'
import AdminIcon from './AdminIcon'

// ---- Button ---------------------------------------------------------------
const BTN_VARIANTS = {
  accent: 'bg-accent text-ink hover:bg-accent-400 border border-accent disabled:opacity-50',
  ink: 'bg-ink text-white hover:bg-ink-700 border border-ink dark:bg-white dark:text-ink dark:hover:bg-white/90 dark:border-white',
  outline:
    'bg-transparent text-ink border border-ink/20 hover:border-ink hover:bg-ink/5 dark:text-bone dark:border-white/20 dark:hover:bg-white/10 dark:hover:border-white/40',
  ghost: 'bg-transparent text-ink/70 hover:text-ink hover:bg-ink/5 border border-transparent dark:text-bone/70 dark:hover:text-white dark:hover:bg-white/10',
  danger: 'bg-red-600 text-white hover:bg-red-700 border border-red-600 disabled:opacity-50',
  subtle: 'bg-ink/5 text-ink hover:bg-ink/10 border border-transparent dark:bg-white/10 dark:text-bone dark:hover:bg-white/15',
}

export function Button({ children, variant = 'accent', icon, size = 'md', className = '', loading, ...rest }) {
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2.5 text-sm', lg: 'px-6 py-3 text-base' }
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight transition-all duration-200 disabled:cursor-not-allowed ${sizes[size]} ${BTN_VARIANTS[variant]} ${className}`}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? <Spinner size={16} /> : icon ? <AdminIcon name={icon} size={size === 'sm' ? 15 : 18} /> : null}
      {children && <span>{children}</span>}
    </button>
  )
}

const ICON_BTN_CLS =
  'grid h-9 w-9 place-items-center rounded-lg text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink disabled:opacity-30 disabled:pointer-events-none dark:text-bone/60 dark:hover:bg-white/10 dark:hover:text-white'

// Icon-only square button (table row actions, toolbar).
export function IconButton({ icon, label, size = 18, className = '', ...rest }) {
  return (
    <button aria-label={label} title={label} className={`${ICON_BTN_CLS} ${className}`} {...rest}>
      <AdminIcon name={icon} size={size} />
    </button>
  )
}

// Icon-only link with the same look as IconButton (avoids nesting a <button>
// inside an <a>/<Link>). Pass `to` for a router Link or `href` for an anchor.
export function IconLink({ icon, label, size = 18, to, href, className = '', LinkComponent, ...rest }) {
  const cls = `${ICON_BTN_CLS} ${className}`
  const inner = <AdminIcon name={icon} size={size} />
  if (href) return <a href={href} aria-label={label} title={label} className={cls} {...rest}>{inner}</a>
  const L = LinkComponent
  return <L to={to} aria-label={label} title={label} className={cls} {...rest}>{inner}</L>
}

// ---- Card -----------------------------------------------------------------
export function Card({ children, className = '', ...rest }) {
  return (
    <div
      className={`rounded-2xl border border-ink/8 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-ink-800 ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}

// ---- Badge ----------------------------------------------------------------
const BADGE_TONES = {
  neutral: 'bg-ink/8 text-ink/70 dark:bg-white/10 dark:text-bone/70',
  accent: 'bg-accent/15 text-accent-600 dark:text-accent-400',
  green: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  blue: 'bg-steel/15 text-steel-600 dark:text-steel-200',
  amber: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  red: 'bg-red-500/15 text-red-600 dark:text-red-400',
}

export function Badge({ children, tone = 'neutral', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${BADGE_TONES[tone]} ${className}`}>
      {children}
    </span>
  )
}

// Map a project status to a colored badge.
export function StatusBadge({ status }) {
  const tone = /complete/i.test(status) ? 'green' : /upcoming/i.test(status) ? 'blue' : 'amber'
  return <Badge tone={tone}>{status}</Badge>
}

// ---- Form fields ----------------------------------------------------------
const INPUT_CLS =
  'w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-white/15 dark:bg-ink-900 dark:text-bone dark:placeholder:text-bone/30'

export function Label({ children, htmlFor, required }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink/80 dark:text-bone/80">
      {children} {required && <span className="text-accent">*</span>}
    </label>
  )
}

export function FieldError({ children }) {
  if (!children) return null
  return <p className="mt-1 text-xs font-medium text-red-500">{children}</p>
}

// forwardRef so react-hook-form's register() ref reaches the actual <input>.
export const Field = forwardRef(function Field({ label, error, required, hint, className = '', ...rest }, ref) {
  return (
    <div className={className}>
      {label && <Label htmlFor={rest.id} required={required}>{label}</Label>}
      <input ref={ref} className={INPUT_CLS} {...rest} />
      {hint && !error && <p className="mt-1 text-xs text-ink/45 dark:text-bone/40">{hint}</p>}
      <FieldError>{error}</FieldError>
    </div>
  )
})

export const Textarea = forwardRef(function Textarea({ label, error, required, rows = 4, className = '', ...rest }, ref) {
  return (
    <div className={className}>
      {label && <Label htmlFor={rest.id} required={required}>{label}</Label>}
      <textarea ref={ref} rows={rows} className={INPUT_CLS} {...rest} />
      <FieldError>{error}</FieldError>
    </div>
  )
})

export const Select = forwardRef(function Select({ label, error, required, children, className = '', ...rest }, ref) {
  return (
    <div className={className}>
      {label && <Label htmlFor={rest.id} required={required}>{label}</Label>}
      <select ref={ref} className={`${INPUT_CLS} appearance-none`} {...rest}>
        {children}
      </select>
      <FieldError>{error}</FieldError>
    </div>
  )
})

// ---- Toggle ---------------------------------------------------------------
export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-3"
    >
      <span
        className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-accent' : 'bg-ink/20 dark:bg-white/20'}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-[22px]' : 'translate-x-0.5'}`}
        />
      </span>
      {label && <span className="text-sm font-medium text-ink/80 dark:text-bone/80">{label}</span>}
    </button>
  )
}

// ---- Spinner --------------------------------------------------------------
export function Spinner({ size = 20, className = '' }) {
  return (
    <span
      className={`inline-block animate-spin rounded-full border-2 border-current/20 border-t-current ${className}`}
      style={{ width: size, height: size }}
    />
  )
}
