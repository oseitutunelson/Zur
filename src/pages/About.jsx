import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Counter from '../components/Counter'
import Icon from '../components/Icon'
import Button from '../components/Button'
import { unsplash } from '../lib/img'
import { VALUES, MILESTONES, COMMITMENTS, PROCESS, STATS } from '../data/site'

export default function About() {
  const timelineRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ms-item', {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: timelineRef.current, start: 'top 75%' },
      })
      gsap.fromTo(
        '.ms-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 1,
          },
        }
      )
    }, timelineRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <Seo title="About ZUR Construction — Premium Ghanaian Construction & Engineering" description="Our story, mission, vision, core values, construction process and our commitment to quality, safety and sustainability." />
      <PageHero
        eyebrow="— About Us"
        title="We Build What Others Imagine"
        intro="Over a decade of engineering precision, craft and trust — delivered across Ghana."
        image="photo-1541888946425-d81bb19240f5"
      />

      {/* Story / Company History split */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-wide grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal direction="right">
            <div className="relative">
              <img src={unsplash('photo-1504307651254-35680f356dfd', { w: 1000 })} alt="ZUR Construction team on site" loading="lazy" className="h-[520px] w-full rounded-3xl object-cover" />
              <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-accent p-6 sm:block">
                <p className="font-display text-4xl font-extrabold text-ink"><Counter value={350} suffix="+" /></p>
                <p className="text-sm text-ink/70">Projects delivered</p>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="— Company History" title="From a small crew to a trusted name" size="md" />
            <Reveal delay={0.1}>
              <p className="mt-6 text-muted">
                ZUR Construction began in Accra in 2008 with a single crew and an uncompromising
                standard for quality. What started as a residential builder has grown into
                a full-service construction and engineering company trusted by homeowners,
                developers, schools, churches and businesses across Ghana.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 text-muted">
                Today our in-house design studio, engineering division and construction
                teams work as one — giving every client a single, accountable partner from
                concept to completion. We have never lost the discipline we started with.
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <Reveal key={s.label}>
                  <div className="rounded-2xl border border-ink/10 p-5">
                    <p className="font-display text-3xl font-extrabold text-ink"><Counter value={s.value} suffix={s.suffix} /></p>
                    <p className="mt-1 text-xs uppercase tracking-wide text-muted">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision band */}
      <section className="bg-ink py-24 text-white sm:py-28">
        <div className="container-wide grid gap-8 md:grid-cols-2">
          {[
            { t: 'Our Mission', d: 'To deliver buildings of enduring quality through engineering precision, transparency and craft — every project, every time.', icon: 'compass' },
            { t: 'Our Vision', d: 'To be the most trusted name in Ghanaian construction, where design ambition meets flawless execution.', icon: 'bolt' },
          ].map((m, i) => (
            <Reveal key={m.t} delay={i * 0.1}>
              <div className="h-full rounded-3xl border border-white/10 p-10">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-ink"><Icon name={m.icon} size={28} /></span>
                <h3 className="mt-6 font-display text-3xl font-bold">{m.t}</h3>
                <p className="mt-4 text-white/60">{m.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-bone py-24 sm:py-32">
        <div className="container-wide">
          <SectionHeading eyebrow="— Core Values" title="What we stand on" align="center" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-3xl border border-ink/10 bg-white p-8 transition-colors hover:border-accent">
                  <span className="font-display text-5xl font-extrabold text-ink/10 transition-colors group-hover:text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 font-display text-xl font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Construction Process */}
      <section className="bg-white py-24 sm:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="— Our Process"
            title="A clear path on every project"
            intro="A disciplined, transparent process that takes your project from first idea to a turnkey handover."
            align="center"
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <Reveal key={p.n}>
                <div className="h-full bg-white p-7 transition-colors hover:bg-bone">
                  <span className="font-display text-3xl font-extrabold text-accent">{p.n}</span>
                  <h3 className="mt-3 font-display text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones timeline */}
      <section ref={timelineRef} className="bg-bone py-24 sm:py-32">
        <div className="container-wide">
          <SectionHeading eyebrow="— Our Journey" title="Milestones that shaped us" />
          <div className="relative mt-16 pl-8 sm:pl-0">
            <div className="ms-line absolute left-8 top-0 h-full w-0.5 bg-accent sm:left-1/2" />
            <div className="space-y-12">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className={`ms-item relative flex flex-col sm:flex-row ${i % 2 ? 'sm:flex-row-reverse' : ''}`}>
                  <div className="sm:w-1/2 sm:px-12">
                    <div className={`rounded-3xl border border-ink/10 bg-white p-7 ${i % 2 ? 'sm:text-left' : 'sm:text-right'}`}>
                      <span className="font-display text-4xl font-extrabold text-accent">{m.year}</span>
                      <h3 className="mt-2 font-display text-xl font-bold">{m.title}</h3>
                      <p className="mt-2 text-sm text-muted">{m.text}</p>
                    </div>
                  </div>
                  <span className="absolute left-8 top-7 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full bg-accent ring-4 ring-bone sm:left-1/2">
                    <span className="h-2 w-2 rounded-full bg-ink" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commitments: Quality, Safety, Sustainability, Client-Centered */}
      <section className="bg-ink py-24 text-white sm:py-32">
        <div className="container-wide">
          <SectionHeading
            eyebrow="— Our Commitment"
            title="Professionalism you can build on"
            intro="The standards that guide how we work — on every site, for every client."
            light
            align="center"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 0.08}>
                <div className="flex h-full gap-5 rounded-3xl border border-white/10 p-8 transition-colors hover:border-accent">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-ink"><Icon name={c.icon} size={24} /></span>
                  <div>
                    <h3 className="font-display text-xl font-bold">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{c.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-28">
        <div className="container-wide rounded-3xl bg-ink px-8 py-16 text-center text-white sm:px-16">
          <h2 className="display mx-auto max-w-2xl text-4xl sm:text-5xl">Work with a team that owns the outcome</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/contact" variant="accent">Start a Project</Button>
            <Button to="/projects" variant="outline-light">See Our Work</Button>
          </div>
        </div>
      </section>
    </>
  )
}
