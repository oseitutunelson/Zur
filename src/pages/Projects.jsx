import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import BeforeAfter from '../components/BeforeAfter'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import Icon from '../components/Icon'
import { img } from '../lib/img'
import { usePublicProjects } from '../lib/api/projects'

// Premium light-theme project card for the portfolio grid.
function PortfolioCard({ project, index }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.45, delay: (index % 3) * 0.05 }}>
      <Link to={`/projects/${project.slug}`} className="group block overflow-hidden rounded-3xl border border-ink/10 bg-white transition-all duration-500 hover:border-accent hover:shadow-[0_30px_70px_-40px_rgba(0,0,0,0.4)]">
        <div className="relative overflow-hidden">
          <img
            src={img(project.cover, { w: 900 })}
            alt={project.name}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
            {project.category}
          </span>
          <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-accent text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
            <Icon name="arrow" size={16} />
          </span>
        </div>
        <div className="p-6">
          <h3 className="font-display text-xl font-bold transition-colors group-hover:text-accent-600">{project.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{project.blurb}</p>
          <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4 text-xs font-medium uppercase tracking-[0.14em] text-ink/50">
            <span className="flex items-center gap-1.5"><Icon name="pin" size={13} /> {project.location}</span>
            <span>{project.year}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const { data: PROJECTS = [] } = usePublicProjects()
  const list = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)

  // Category chips derived from the live project data.
  const categories = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category).filter(Boolean)))]

  return (
    <>
      <Seo title="Projects — ZUR Construction Portfolio" description="Explore ZUR Construction's portfolio of residential, luxury, commercial, educational, hospitality and infrastructure projects across Ghana." />
      <PageHero
        eyebrow="— Portfolio"
        title="Projects Built Across Ghana"
        intro="A selection of the homes, villas, commercial buildings, schools and more we have designed, engineered and delivered."
        image="photo-1486325212027-8081e485255e"
      />

      {/* stat band */}
      <section className="bg-white py-12">
        <div className="container-wide grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { v: 350, s: '+', l: 'Projects' },
            { v: 10, s: '+', l: 'Sectors' },
            { v: 18, s: '+', l: 'Years' },
            { v: 100, s: '%', l: 'On-time' },
          ].map((x) => (
            <Reveal key={x.l}>
              <div className="text-center">
                <p className="font-display text-4xl font-extrabold text-ink"><Counter value={x.v} suffix={x.s} /></p>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted">{x.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Portfolio + filtering */}
      <section className="bg-bone py-16 sm:py-20">
        <div className="container-wide">
          {/* filter bar */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">Filter by category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                    filter === c ? 'border-ink bg-ink text-white' : 'border-ink/15 text-ink/70 hover:border-ink'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* result count */}
          <p className="mt-8 text-sm text-muted">
            Showing <span className="font-semibold text-ink">{list.length}</span> {list.length === 1 ? 'project' : 'projects'}
            {filter !== 'All' && <> in <span className="font-semibold text-ink">{filter}</span></>}
          </p>

          {/* grid */}
          <motion.div layout className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <PortfolioCard key={p.slug} project={p} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* before/after */}
      <section className="bg-white py-24 sm:py-28">
        <div className="container-wide">
          <SectionHeading eyebrow="— Transformations" title="Before & after" align="center" />
          <div className="mx-auto mt-12 max-w-4xl">
            <BeforeAfter before="beforeafter-before.jpeg" after="beforeafter-after.jpeg" />
          </div>
        </div>
      </section>
    </>
  )
}
