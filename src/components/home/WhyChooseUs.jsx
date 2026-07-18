import SectionHeading from '../SectionHeading'
import Reveal from '../Reveal'
import Icon from '../Icon'
import { WHY_US } from '../../data/site'

// Simple portrait layout: concise points with small icons beside each.
export default function WhyChooseUs() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built on trust, delivered with precision"
          intro="The qualities that make ZUR Construction the partner clients rely on for their most important builds."
          align="center"
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-x-10 gap-y-2 sm:grid-cols-2">
          {WHY_US.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 0.06}>
              <div className="group flex items-start gap-4 border-b border-ink/10 py-5">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage-100 text-ink transition-colors group-hover:bg-sage">
                  <Icon name={w.icon} size={18} />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold">{w.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{w.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
