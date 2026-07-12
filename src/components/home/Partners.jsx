import { PARTNERS } from '../../data/site'

// Clean branded placeholder chips in an infinite marquee.
function BrandChip({ name }) {
  const monogram = name
    .replace(/[^A-Za-z ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <span className="flex shrink-0 items-center gap-3 rounded-2xl border border-ink/10 bg-white px-5 py-3 grayscale transition-all duration-300 hover:grayscale-0 hover:border-accent">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-xs font-extrabold tracking-tight text-accent">
        {monogram}
      </span>
      <span className="font-display text-lg font-bold text-ink/70">{name}</span>
    </span>
  )
}

export default function Partners() {
  const row = [...PARTNERS, ...PARTNERS]
  return (
    <section className="border-y border-ink/10 bg-bone py-14">
      <div className="container-wide">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-ink/40">
          Trusted brands & institutions we work with across Ghana
        </p>
      </div>
      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-6 pr-6">
          {row.map((p, i) => (
            <BrandChip key={i} name={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
