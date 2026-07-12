import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Icon from '../Icon'
import heroWorker from '../../assets/projects/engineer.jpeg'
import heroRoof from '../../assets/projects/crown-ridge-1.jpeg'

// Imagery — ZUR Construction project photography.
const HERO_LEFT = heroWorker // site engineer at work
const HERO_RIGHT = heroRoof // completed stone-coated roof

// Scrolling keyword ticker shown across the bottom of the hero.
const TICKER = [
  'New Construction',
  'Architectural Design',
  'Renovation & Remodeling',
  'Project Management',
  'Interior Finishing',
  'Cost Estimation',
  'Engineering Services',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-900 text-white">
      {/* Charcoal backdrop with a soft accent glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, #10161D 0%, #131B23 55%, #0C131B 100%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 82% 30%, rgba(232, 81, 42, 0.20) 0%, transparent 60%)',
          }}
        />
        <div className="absolute inset-0 blueprint-grid opacity-[0.04]" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container-wide w-full px-6 pb-16 pt-32 sm:px-8 lg:px-12 lg:pt-36">
          {/* Top row: headline + intro/CTA */}
          <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-5xl lg:text-[4.25rem]"
            >
              <motion.span variants={itemVariants} className="block">
                Building excellence
              </motion.span>
              <motion.span
                variants={itemVariants}
                className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2"
              >
                <span>from design to</span>
                <span className="relative">
                  completion
                  <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-accent" />
                </span>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-white shadow-accent sm:h-14 sm:w-14">
                  <Icon name="bolt" size={26} />
                </span>
              </motion.span>
            </motion.h1>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:pt-3"
            >
              <motion.p
                variants={itemVariants}
                className="max-w-md text-base leading-relaxed text-white/60"
              >
                From foundation to finishing, we deliver world-class construction
                built to international standards — engineered to last, delivered
                on schedule, and finished to a premium standard.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-7 flex flex-wrap items-center gap-3"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-accent transition-all duration-300 hover:bg-accent-600 hover:-translate-y-0.5"
                >
                  Get a quote
                </Link>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10"
                >
                  <span>Contact us</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    <Icon name="arrow" size={15} />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom row: paired imagery with a central play button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            className="relative mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6"
          >
            <div className="h-64 overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl sm:h-80 lg:h-[26rem]">
              <img
                src={HERO_LEFT}
                alt="ZUR Construction site engineer at work"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-64 overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl sm:h-80 lg:h-[26rem]">
              <img
                src={HERO_RIGHT}
                alt="Completed stone-coated roof by ZUR Construction"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Central play button straddling the two images */}
            <button
              type="button"
              aria-label="Watch our work"
              className="group absolute left-1/2 top-1/2 hidden h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-white shadow-accent ring-8 ring-ink-900/70 transition-transform duration-300 hover:scale-105 sm:grid lg:h-24 lg:w-24"
            >
              <svg
                viewBox="0 0 24 24"
                width="26"
                height="26"
                aria-hidden="true"
                className="ml-1 transition-transform duration-300 group-hover:scale-110"
              >
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Accent keyword ticker */}
      <div className="relative z-10 overflow-hidden bg-accent py-4">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex shrink-0 items-center"
              aria-hidden={copy === 1}
            >
              {TICKER.map((word) => (
                <li
                  key={word}
                  className="flex items-center gap-6 whitespace-nowrap px-6 text-sm font-bold uppercase tracking-wide text-ink"
                >
                  <span>{word}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-ink/70" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
