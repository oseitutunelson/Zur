import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SectionHeading from '../SectionHeading'
import Icon from '../Icon'
import Reveal from '../Reveal'
import Button from '../Button'
import { HOME_SERVICE_CARDS } from '../../data/site'

// Clean, compact portrait service cards with elegant line icons.
export default function Services() {
  return (
    <section id="services" className="bg-sage-50 py-24 sm:py-32">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Our Services"
          title={<>A Comprehensive Set<br className="hidden sm:block" /> Of Services</>}
          intro="Everything you need to design, build and finish, delivered by one accountable partner."
          align="center"
        />

        {/* Compact portrait cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HOME_SERVICE_CARDS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 transition-colors hover:border-accent"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-accent transition-colors group-hover:bg-accent group-hover:text-ink">
                  <Icon name={c.icon} size={24} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold leading-snug">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.text}</p>
                <Link
                  to="/services"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink/70 transition-colors group-hover:text-ink"
                >
                  Learn more
                  <Icon name="arrow" size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button to="/services" variant="ink">Explore All Services</Button>
        </div>
      </div>
    </section>
  )
}
