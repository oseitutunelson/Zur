import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '../SectionHeading'
import Button from '../Button'
import Icon from '../Icon'
import { FAQS } from '../../data/site'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="bg-sage-50 py-24 sm:py-32">
      <div className="container-wide grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading eyebrow="FAQ" title={<>Questions,<br /> answered</>} />
          <p className="mt-6 max-w-sm text-muted">
            Everything you need to know about working with ZUR Construction. Still curious?
            Our team is one message away.
          </p>
          <div className="mt-8">
            <Button to="/contact" variant="ink">Ask a question</Button>
          </div>
        </div>

        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg font-semibold sm:text-xl">{f.q}</span>
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${isOpen ? 'bg-accent text-ink' : 'bg-ink/5 text-ink'}`}>
                    <Icon name={isOpen ? 'minus' : 'plus'} size={18} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

