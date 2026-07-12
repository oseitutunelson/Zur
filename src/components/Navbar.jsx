import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV, COMPANY } from '../data/site'
import Logo from './Logo'
import Button from './Button'
import Icon from './Icon'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4 lg:px-6">
      {/* Floating glass pill navbar */}
      <div
        className={`mx-auto flex max-w-wide items-center justify-between gap-4 rounded-2xl border py-2.5 pl-4 pr-3 shadow-lift transition-all duration-300 ${
          scrolled
            ? 'border-white/10 bg-ink/85 backdrop-blur-xl'
            : 'border-white/10 bg-ink/50 backdrop-blur-lg'
        }`}
      >
        <Link to="/" aria-label="ZUR Construction home" className="shrink-0 pr-2">
          <Logo className="text-white" />
        </Link>

        {/* Right cluster: primary navigation + CTA */}
        <nav className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `group relative py-1 text-[0.9rem] font-medium tracking-tight transition-colors ${
                      isActive ? 'text-white' : 'text-white/65 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-accent transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <Button to="/contact" variant="accent" arrow={false} className="!rounded-xl !py-2.5 !px-5">
            Contact us
          </Button>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-white lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            />

            {/* Compact slide-out panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
              className="absolute right-0 top-0 flex h-full w-[78%] max-w-xs flex-col border-l border-white/10 bg-ink shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <Logo className="text-white" />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-accent hover:text-accent"
                >
                  <span className="relative block h-4 w-4">
                    <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rotate-45 bg-current" />
                    <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 -rotate-45 bg-current" />
                  </span>
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="flex flex-col">
                  {NAV.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `block rounded-xl px-3 py-3 text-base font-medium transition-colors ${
                            isActive
                              ? 'bg-white/5 text-accent'
                              : 'text-white/80 hover:bg-white/5 hover:text-white'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-white/10 px-6 py-5">
                <Button to="/contact" variant="accent" arrow={false} className="w-full !py-3 !text-sm">
                  Contact us
                </Button>
                <div className="mt-4 flex flex-col gap-2.5">
                  <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2.5 text-sm text-white/75 transition-colors hover:text-accent">
                    <Icon name="phone" size={15} />
                    <span className="font-medium">{COMPANY.phone}</span>
                  </a>
                  <a href={`tel:${COMPANY.phone2}`} className="flex items-center gap-2.5 text-sm text-white/75 transition-colors hover:text-accent">
                    <Icon name="phone" size={15} />
                    <span className="font-medium">{COMPANY.phone2}</span>
                  </a>
                  <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2.5 text-sm text-white/55 transition-colors hover:text-accent">
                    <Icon name="mail" size={15} />
                    <span>{COMPANY.email}</span>
                  </a>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </header>
  )
}

