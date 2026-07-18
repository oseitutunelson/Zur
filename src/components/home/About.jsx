import { motion } from 'framer-motion'
import SectionHeading from '../SectionHeading'
import Reveal from '../Reveal'
import Button from '../Button'
import Icon from '../Icon'
import aboutEngineer from '../../assets/hero/about-engineer.jpeg'

const PILLARS = [
  { icon: 'shield', title: 'Quality & Safety', text: 'Premium materials, rigorous quality control and a zero-compromise safety culture on every site.' },
  { icon: 'star', title: 'Commitment to Clients', text: 'One accountable partner, honest costing and clear communication from first sketch to final handover.' },
]

export default function About() {
  return (
    <section id="about" className="bg-white py-24 sm:py-32">
      <div className="container-wide grid gap-14 lg:grid-cols-2 lg:items-center">
        {/* Image collage */}
        <div className="relative">
          <Reveal direction="right">
            <div className="overflow-hidden rounded-3xl">
              <motion.img
                src={aboutEngineer}
                alt="ZUR Construction engineer reviewing project details on site"
                loading="lazy"
                className="h-[460px] w-full object-cover sm:h-[560px]"
                initial={{ scale: 1.15 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="absolute -bottom-8 -left-4 hidden w-56 rounded-2xl bg-ink p-6 text-white shadow-2xl sm:block">
              <p className="font-display text-4xl font-extrabold text-accent">12+</p>
              <p className="mt-1 text-sm text-white/60">Years of engineering excellence across Ghana.</p>
            </div>
          </Reveal>

          <div className="absolute -right-4 -top-4 hidden h-24 w-24 rounded-2xl border-4 border-accent sm:block" />
        </div>

        {/* Copy */}
        <div>
          <SectionHeading
            eyebrow="About Us"
            title={<>Sustainable And Innovative Development</>}
            size="md"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-muted">
              ZUR Construction is a premium Ghanaian construction and engineering company built on a
              simple belief: great buildings come from great discipline. For over a
              decade we have partnered with homeowners, developers, schools, churches and
              businesses across Ghana to deliver projects that are as sound as they are
              striking.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-muted">
              Our work is grounded in quality workmanship, honest pricing and an
              uncompromising commitment to safety. From the first concept sketch to the
              final handover, we own every detail of design, engineering, costing,
              construction and finishing, so you have a single, accountable partner
              devoted to excellence at every stage.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={0.2 + i * 0.08}>
                <div className="rounded-2xl border border-ink/10 p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-ink">
                    <Icon name={p.icon} size={22} />
                  </span>
                  <h4 className="mt-4 font-display text-lg font-bold">{p.title}</h4>
                  <p className="mt-2 text-sm text-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.35}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button to="/about" variant="ink">More About ZUR Construction</Button>
              <div className="flex items-center gap-3 text-sm text-muted">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ink/5 text-ink">
                  <Icon name="check" size={18} />
                </span>
                Licensed & certified
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

