import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '../SectionHeading'
import Icon from '../Icon'
import { img } from '../../lib/img'
import { TESTIMONIALS } from '../../data/site'

export default function Testimonials() {
  const [i, setI] = useState(0)
  const t = TESTIMONIALS[i]
  const go = (d) => setI((p) => (p + d + TESTIMONIALS.length) % TESTIMONIALS.length)

  return (
    <section className="bg-bone py-24 sm:py-32">
      <div className="container-wide">
        <SectionHeading eyebrow="— Testimonials" title="What Our Clients Say About Us" />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* photo */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={t.photo}
                src={img(t.photo, { w: 600 })}
                alt={t.name}
                loading="lazy"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="aspect-[4/5] w-full rounded-3xl object-cover grayscale"
              />
            </AnimatePresence>
            <div className="absolute -bottom-4 -right-4 grid h-16 w-16 place-items-center rounded-2xl bg-accent text-ink">
              <Icon name="chat" size={28} />
            </div>
          </div>

          {/* quote */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl bg-accent p-8 sm:p-12"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Icon key={k} name="star" size={20} className="text-ink" />
                  ))}
                </div>
                <p className="mt-6 font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
                  “{t.quote}”
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <img
                    src={img(t.photo, { w: 120 })}
                    alt={t.name}
                    loading="lazy"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-display text-lg font-bold text-ink">{t.name}</p>
                    <p className="text-sm text-ink/60">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* controls */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, k) => (
                  <button
                    key={k}
                    onClick={() => setI(k)}
                    aria-label={`Testimonial ${k + 1}`}
                    className={`h-2 rounded-full transition-all ${k === i ? 'w-8 bg-ink' : 'w-2 bg-ink/25 hover:bg-ink/50'}`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => go(-1)} aria-label="Previous" className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition-colors hover:bg-ink hover:text-white">
                  <Icon name="arrow" size={18} className="rotate-180" />
                </button>
                <button onClick={() => go(1)} aria-label="Next" className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-accent hover:text-ink">
                  <Icon name="arrow" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
