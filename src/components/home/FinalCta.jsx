import { motion } from 'framer-motion'
import Button from '../Button'
import Reveal from '../Reveal'
import { img } from '../../lib/img'

// "Start Building With Confidence Today" — dark blueprint CTA from the design.
export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-white sm:py-36">
      {/* blueprint background image + grid */}
      <div className="absolute inset-0">
        <img
          src={img('photo-1503387762-592deb58ef4e', { w: 1600, q: 50 })}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 blueprint-grid opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/90" />
      </div>

      {/* site engineer accent */}
      <motion.img
        src={img('cta-engineer.jpeg')}
        alt="ZUR Construction site engineer"
        loading="lazy"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 0.95, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute bottom-0 left-0 hidden w-80 rounded-tr-3xl object-cover lg:block"
      />

      <div className="container-wide relative text-center">
        <Reveal>
          <span className="eyebrow text-accent">Let&apos;s Get Started</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="display mx-auto mt-6 max-w-4xl text-5xl sm:text-7xl lg:text-8xl">
            Ready To Build Your <span className="text-accent">Dream Project?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-xl text-white/65">
            From the first sketch to the final handover, ZUR Construction delivers world-class
            construction with engineering precision. Let&apos;s start building.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button to="/contact" variant="accent">Get Free Consultation</Button>
            <Button to="/contact" variant="outline-light">Request Estimate</Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

