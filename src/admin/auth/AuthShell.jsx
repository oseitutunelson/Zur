// Split-screen shell for the admin auth pages (login / forgot / reset).
// Left: brand panel with the ZUR Construction identity. Right: the form.
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../../components/Logo'

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-screen bg-bone lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-ink text-white lg:block">
        <div className="blueprint-grid absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-ink-700" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link to="/" className="text-white"><Logo /></Link>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="display max-w-md text-5xl leading-[0.95]"
            >
              Admin <span className="text-accent">Control</span> Center
            </motion.h1>
            <p className="mt-5 max-w-sm text-white/60">
              Manage projects, services, content and enquiries — the single source of
              truth for the ZUR Construction website.
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/30">
            ZUR Construction · Secure Administration
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Link to="/"><Logo /></Link>
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-sm text-muted">{footer}</div>}
        </div>
      </div>
    </div>
  )
}
