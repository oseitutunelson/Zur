import Counter from '../Counter'
import Reveal from '../Reveal'
import { STATS } from '../../data/site'

// "Sustainable And Innovative Development Infrastructure" stat band from the design.
export default function TrustBar() {
  return (
    <section className="relative bg-ink py-20 text-white">
      <div className="absolute inset-0 blueprint-grid opacity-40" />
      <div className="container-wide relative">
        <Reveal>
          <p className="eyebrow text-accent">By The Numbers</p>
          <h2 className="display mt-4 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
            Sustainable and innovative development infrastructure
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="group bg-ink/40 px-7 py-10 transition-colors hover:bg-terracotta">
                <div className="font-display text-5xl font-extrabold text-accent transition-colors group-hover:text-white lg:text-6xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-3 text-sm text-white/55 transition-colors group-hover:text-white/85">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
