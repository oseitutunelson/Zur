import { useState } from 'react'
import { Link } from 'react-router-dom'
import { COMPANY, NAV, SERVICE_CATEGORIES, PROJECTS } from '../data/site'
import Logo from './Logo'
import Icon from './Icon'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
    setTimeout(() => setSent(false), 3500)
  }

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      {/* Big CTA strip */}
      <div className="container-wide border-b border-white/10 py-16 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <h2 className="display max-w-2xl text-4xl sm:text-5xl lg:text-6xl">
            Let&apos;s build something <span className="text-accent">remarkable</span>.
          </h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-white shadow-accent transition-transform hover:scale-105"
          >
            Get A Quote
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-accent transition-transform group-hover:rotate-45">
              <Icon name="arrow" size={15} />
            </span>
          </Link>
        </div>
      </div>

      <div className="container-wide grid grid-cols-2 gap-10 py-16 md:grid-cols-4 lg:grid-cols-6">
        <div className="col-span-2 lg:col-span-2">
          <Logo className="text-white" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
            Premium Ghanaian architectural design, construction and engineering —
            from first sketch to final handover.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/15 px-3.5 py-1.5 text-xs font-semibold text-accent">
            <Icon name="pin" size={13} /> {COMPANY.coverage}
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2.5 text-sm font-semibold text-white/80 transition-colors hover:text-accent">
              <Icon name="phone" size={15} /> {COMPANY.phone}
            </a>
            <a href={`tel:${COMPANY.phone2}`} className="flex items-center gap-2.5 text-sm font-semibold text-white/80 transition-colors hover:text-accent">
              <Icon name="phone" size={15} /> {COMPANY.phone2}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2.5 text-sm text-white/55 transition-colors hover:text-accent">
              <Icon name="mail" size={15} /> {COMPANY.email}
            </a>
          </div>
          <div className="mt-6 flex gap-2">
            {COMPANY.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-xs font-semibold text-white/70 transition-colors hover:border-accent hover:bg-accent hover:text-white"
              >
                {s.label[0]}
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Menu" links={NAV.map((n) => ({ label: n.label, to: n.to }))} />
        <FooterCol
          title="Services"
          links={SERVICE_CATEGORIES.slice(0, 5).map((s) => ({
            label: s.short === 'Build' ? 'Construction' : s.title.split(' ')[0],
            to: '/services',
          }))}
        />
        <FooterCol
          title="Projects"
          links={PROJECTS.slice(0, 5).map((p) => ({ label: p.name, to: `/projects/${p.slug}` }))}
        />

        <div className="col-span-2 lg:col-span-1">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Newsletter
          </h4>
          <p className="mt-4 text-sm text-white/55">Build insights, in your inbox.</p>
          <form onSubmit={submit} className="mt-4">
            <div className="flex items-center gap-2 rounded-full border border-white/15 p-1.5 focus-within:border-accent">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-transparent px-3 text-sm text-white placeholder:text-white/35 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-white"
              >
                <Icon name="arrow" size={15} />
              </button>
            </div>
            {sent && <p className="mt-2 text-xs text-accent">Thanks — you&apos;re subscribed.</p>}
          </form>
        </div>
      </div>

      <div className="container-wide flex flex-col items-start justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} {COMPANY.full}. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <Icon name="pin" size={14} />
          <span>{COMPANY.address}</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="link-underline hover:text-white">Privacy Policy</a>
          <a href="#" className="link-underline hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l, i) => (
          <li key={i}>
            <Link to={l.to} className="text-sm text-white/65 transition-colors hover:text-accent">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
