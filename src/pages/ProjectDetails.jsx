import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Seo from '../components/Seo'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import Button from '../components/Button'
import { img } from '../lib/img'
import { usePublicProjects } from '../lib/api/projects'
import { TESTIMONIALS } from '../data/site'

export default function ProjectDetails() {
  const { slug } = useParams()
  const { data: PROJECTS = [], isLoading } = usePublicProjects()
  const project = PROJECTS.find((p) => p.slug === slug)
  const t = TESTIMONIALS[0]

  if (isLoading && !project) {
    return (
      <div className="grid min-h-[70vh] place-items-center bg-white pt-32">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-ink/15 border-t-accent" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="grid min-h-[70vh] place-items-center bg-white pt-32 text-center">
        <div>
          <h1 className="display text-5xl">Project not found</h1>
          <div className="mt-6"><Button to="/projects" variant="ink">Back to Projects</Button></div>
        </div>
      </div>
    )
  }

  const idx = PROJECTS.findIndex((p) => p.slug === slug)
  const next = PROJECTS[(idx + 1) % PROJECTS.length] || project

  // Only surface facts that have a value (admin-created projects may omit the
  // supplementary size/duration/budget fields).
  const facts = [
    { label: 'Location', value: project.location },
    { label: 'Year', value: project.year },
    { label: 'Size', value: project.size },
    { label: 'Duration', value: project.duration },
    { label: 'Budget', value: project.budget },
    { label: 'Category', value: project.category },
  ].filter((f) => f.value)

  const costBreakdown = [
    { label: 'Design & Engineering', pct: 14 },
    { label: 'Structure & Foundation', pct: 32 },
    { label: 'MEP & Systems', pct: 22 },
    { label: 'Finishing', pct: 20 },
    { label: 'Management & Contingency', pct: 12 },
  ]

  return (
    <>
      <Seo title={`${project.name} — ZUR Construction Project`} description={project.blurb} />

      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-end overflow-hidden bg-ink pb-16 pt-40 text-white">
        <motion.img
          src={img(project.cover, { w: 1800, q: 60 })}
          alt={project.name}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
        <div className="container-wide relative">
          <nav className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
            <Link to="/" className="hover:text-accent">Home</Link><span>/</span>
            <Link to="/projects" className="hover:text-accent">Projects</Link><span>/</span>
            <span className="text-accent">{project.name}</span>
          </nav>
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink">{project.category}</span>
          <h1 className="display mt-5 max-w-4xl text-6xl sm:text-7xl lg:text-8xl">{project.name}</h1>
          <p className="mt-5 max-w-xl text-lg text-white/70">{project.blurb}</p>
        </div>
      </section>

      {/* Facts bar */}
      <section className="bg-ink-800 py-px">
        <div className="container-wide grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-6">
          {facts.map((f) => (
            <div key={f.label} className="bg-ink px-6 py-7 text-white">
              <p className="text-xs uppercase tracking-wide text-white/40">{f.label}</p>
              <p className="mt-2 font-display text-xl font-bold text-accent">{f.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Overview + scope */}
      <section className="bg-white py-24 sm:py-28">
        <div className="container-wide grid gap-14 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <SectionHeading eyebrow="— Overview" title="Project overview" size="md" />
            <Reveal delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-muted">
                {project.fullDesc ||
                  `${project.name} is a ${(project.category || 'construction').toLowerCase()} project${project.location ? ` in ${project.location}` : ''}${project.duration ? `, delivered over ${project.duration}` : ''}. ZUR Construction led the engagement end-to-end — from design and engineering through construction and finishing — to a turnkey handover.`}
              </p>
            </Reveal>

            {(project.challenge || project.solution) && (
              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                {project.challenge && (
                  <Reveal>
                    <div className="rounded-3xl border border-ink/10 p-7">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-accent"><Icon name="bolt" size={22} /></span>
                      <h3 className="mt-4 font-display text-xl font-bold">The Challenge</h3>
                      <p className="mt-3 text-sm text-muted">{project.challenge}</p>
                    </div>
                  </Reveal>
                )}
                {project.solution && (
                  <Reveal delay={0.08}>
                    <div className="rounded-3xl border border-ink/10 bg-accent p-7">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-accent"><Icon name="check" size={22} /></span>
                      <h3 className="mt-4 font-display text-xl font-bold">Our Solution</h3>
                      <p className="mt-3 text-sm text-ink/75">{project.solution}</p>
                    </div>
                  </Reveal>
                )}
              </div>
            )}
          </div>

          {/* scope */}
          <aside>
            <div className="sticky top-28 rounded-3xl bg-ink p-8 text-white">
              <h3 className="font-display text-xl font-bold">{project.scope?.length ? 'Scope of Work' : 'Project'}</h3>
              {project.scope?.length > 0 && (
                <ul className="mt-5 space-y-3">
                  {project.scope.map((s) => (
                    <li key={s} className="flex items-center gap-3 text-sm">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-ink"><Icon name="check" size={13} /></span>
                      {s}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm text-white/55">Planning a similar project?</p>
                <div className="mt-4"><Button to="/contact" variant="accent" className="w-full">Request a Quote</Button></div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Cost breakdown visual */}
      <section className="bg-bone py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading eyebrow="— Cost Breakdown" title="Where the budget went" size="md" />
          <div className="space-y-5">
            {costBreakdown.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.06}>
                <div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>{c.label}</span><span className="text-ink/50">{c.pct}%</span>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-ink/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${c.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-accent"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-white py-24">
        <div className="container-wide">
          <SectionHeading eyebrow="— Gallery" title="Inside the build" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((g, i) => (
              <Reveal key={g} delay={(i % 3) * 0.08}>
                <div className={`overflow-hidden rounded-2xl ${i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}`}>
                  <img src={img(g, { w: 1000 })} alt={`${project.name} ${i + 1}`} loading="lazy" className="h-full min-h-[240px] w-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Client testimonial */}
      <section className="bg-ink py-24 text-white">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, k) => <Icon key={k} name="star" size={22} className="text-accent" />)}
            </div>
            <p className="display text-3xl leading-snug sm:text-4xl">“{t.quote}”</p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <img src={img(t.photo, { w: 120 })} alt={t.name} loading="lazy" className="h-14 w-14 rounded-full object-cover" />
              <div className="text-left">
                <p className="font-display text-lg font-bold">{t.name}</p>
                <p className="text-sm text-accent">{t.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next project */}
      <section className="bg-white py-20">
        <div className="container-wide">
          <Link to={`/projects/${next.slug}`} className="group flex flex-col items-center justify-between gap-6 rounded-3xl border border-ink/10 p-8 transition-colors hover:border-ink sm:flex-row">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-ink/40">Next Project</p>
              <h3 className="mt-2 font-display text-3xl font-bold group-hover:text-accent-600">{next.name}</h3>
            </div>
            <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-white transition-transform group-hover:translate-x-1 group-hover:bg-accent group-hover:text-ink">
              <Icon name="arrow" size={22} />
            </span>
          </Link>
        </div>
      </section>
    </>
  )
}

