import Reveal from './Reveal'

// The signature ZUR Construction heading: small uppercase eyebrow + very large display title.
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  light = false,
  className = '',
  size = 'lg',
}) {
  const sizes = {
    md: 'text-4xl sm:text-5xl',
    lg: 'text-5xl sm:text-6xl lg:text-7xl',
    xl: 'text-6xl sm:text-7xl lg:text-8xl',
  }
  return (
    <div
      className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start'} ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <span className={`eyebrow mb-5 ${light ? 'text-accent' : 'text-ink/70'}`}>
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={`display text-balance ${sizes[size]} ${light ? 'text-white' : 'text-ink'}`}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.12}>
          <p
            className={`mt-6 max-w-xl text-base leading-relaxed ${align === 'center' ? 'mx-auto' : ''} ${light ? 'text-white/65' : 'text-muted'}`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  )
}

