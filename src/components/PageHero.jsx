import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { unsplash } from '../lib/img'

// Reusable inner-page hero with breadcrumb + parallax image.
export default function PageHero({ eyebrow, title, intro, image, crumb }) {
  const words = String(title).split(' ')
  return (
    <section className="relative flex min-h-[68vh] items-end overflow-hidden bg-ink pb-16 pt-40 text-white">
      <div className="absolute inset-0">
        <motion.img
          src={unsplash(image, { w: 1600, q: 55 })}
          alt=""
          aria-hidden="true"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/50" />
        <div className="absolute inset-0 blueprint-grid opacity-30" />
      </div>

      <div className="container-wide relative">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50"
        >
          <Link to="/" className="hover:text-accent">Home</Link>
          <span>/</span>
          <span className="text-accent">{crumb || title}</span>
        </motion.nav>

        {eyebrow && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="eyebrow text-accent"
          >
            {eyebrow}
          </motion.span>
        )}

        <h1 className="display mt-5 max-w-4xl text-5xl sm:text-7xl lg:text-8xl">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block pr-[0.22em]"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-xl text-lg text-white/65"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  )
}
