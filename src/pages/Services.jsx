import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import Button from '../components/Button'
import { unsplash } from '../lib/img'
import { SERVICE_CATEGORIES, PROCESS } from '../data/site'

// Hero image per category (cycled from a curated set).
const IMAGES = [
  'photo-1503387762-592deb58ef4e',
  'photo-1486406146926-c627a92ad1ab',
  'photo-1600585154340-be6161a56a0c',
  'photo-1581094794329-c8112a89af12',
  'photo-1454165804606-c3d57bc86b40',
  'photo-1556909212-d5b604d0c90d',
  'photo-1416879595882-3373a0480b5b',
  'photo-1621905251918-48416bd8575a',
  'photo-1497366216548-37526070297c',
]

const BENEFITS = ['Fixed, transparent pricing', 'Certified expert team', 'On-time delivery guarantee', 'Quality assured at every stage']

export default function Services() {
  return (
    <>
      <Seo title="Services — ZUR Construction & Engineering" description="Architecture, construction, renovation, engineering, project management, cost estimation, finishing and more." />
      <PageHero
        eyebrow="— Our Services"
        title="Every Discipline Under One Roof"
        intro="Nine integrated service lines, delivered by one accountable partner — from design to handover."
        image="photo-1486406146926-c627a92ad1ab"
      />

      {/* Quick index */}
      <section className="border-b border-ink/10 bg-white py-10">
        <div className="container-wide flex flex-wrap gap-3">
          {SERVICE_CATEGORIES.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:border-ink hover:bg-ink hover:text-white">
              {s.title}
            </a>
          ))}
        </div>
      </section>

      {/* Detailed category sections */}
      {SERVICE_CATEGORIES.map((s, i) => (
        <section key={s.slug} id={s.slug} className={`scroll-mt-24 py-24 sm:py-28 ${i % 2 ? 'bg-bone' : 'bg-white'}`}>
          <div className="container-wide grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal direction={i % 2 ? 'left' : 'right'} className={i % 2 ? 'lg:order-2' : ''}>
              <div className="relative overflow-hidden rounded-3xl">
                <img src={unsplash(IMAGES[i % IMAGES.length], { w: 1000 })} alt={s.title} loading="lazy" className="h-[460px] w-full object-cover" />
                <span className="absolute left-5 top-5 grid h-14 w-14 place-items-center rounded-2xl bg-accent text-ink">
                  <Icon name={s.icon} size={28} />
                </span>
              </div>
            </Reveal>

            <div className={i % 2 ? 'lg:order-1' : ''}>
              <span className="eyebrow text-ink/60">— 0{i + 1}</span>
              <h2 className="display mt-4 text-4xl sm:text-5xl">{s.title}</h2>
              <p className="mt-5 text-muted">{s.blurb}</p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {s.items.map((it) => (
                  <div key={it} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-accent">
                      <Icon name="check" size={14} />
                    </span>
                    <span className="text-sm font-medium">{it}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {BENEFITS.map((b) => (
                  <span key={b} className="text-xs font-semibold uppercase tracking-wide text-ink/45">• {b}</span>
                ))}
              </div>

              <div className="mt-8">
                <Button to="/contact" variant="ink">Request This Service</Button>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Process recap */}
      <section className="bg-ink py-24 text-white sm:py-32">
        <div className="container-wide">
          <SectionHeading eyebrow="— Our Process" title="A clear path on every engagement" light align="center" />
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <Reveal key={p.n}>
                <div className="h-full bg-ink/40 p-7">
                  <span className="font-display text-3xl font-extrabold text-accent">{p.n}</span>
                  <h3 className="mt-3 font-display text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/55">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button to="/contact" variant="accent">Get a Free Consultation</Button>
          </div>
        </div>
      </section>
    </>
  )
}

