import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SectionHeading from '../SectionHeading'
import ProjectCard from '../ProjectCard'
import BeforeAfter from '../BeforeAfter'
import Reveal from '../Reveal'
import Button from '../Button'
import Icon from '../Icon'
import { usePublicProjects } from '../../lib/api/projects'

// A curated, compact set of categories for the homepage carousel.
const FEATURED_CATEGORIES = ['All', 'Luxury Villas', 'Modern Homes', 'Residential Estates', 'Ongoing Builds']

export default function FeaturedProjects() {
  const [filter, setFilter] = useState('All')
  const [activeSlide, setActiveSlide] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const carouselRef = useRef(null)
  const { data: allProjects = [] } = usePublicProjects()
  // Surface featured projects first, but keep the rest visible below them.
  const source = [
    ...allProjects.filter((p) => p.featured),
    ...allProjects.filter((p) => !p.featured),
  ]
  const list = filter === 'All' ? source : source.filter((p) => p.category === filter)

  const updateScrollState = () => {
    const carousel = carouselRef.current
    if (!carousel) return

    setCanScrollLeft(carousel.scrollLeft > 10)
    setCanScrollRight(carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 10)

    const slide = carousel.querySelector('[data-slide]')
    if (!slide) return

    const itemWidth = slide.clientWidth + 24
    const index = Math.round(carousel.scrollLeft / itemWidth)
    setActiveSlide(Math.min(Math.max(index, 0), list.length - 1))
  }

  useEffect(() => {
    updateScrollState()
    const carousel = carouselRef.current
    if (!carousel) return

    carousel.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      carousel.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [list.length])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return
    carousel.scrollTo({ left: 0, behavior: 'smooth' })
    setActiveSlide(0)
  }, [filter])

  const handleScroll = (direction) => {
    const carousel = carouselRef.current
    if (!carousel) return
    const offset = carousel.clientWidth * 0.82
    carousel.scrollBy({ left: direction * offset, behavior: 'smooth' })
  }

  const goToSlide = (index) => {
    const carousel = carouselRef.current
    const slide = carousel?.querySelector(`[data-slide='${index}']`)
    slide?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  return (
    <section id="projects" className="bg-ink py-24 text-white sm:py-32">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="— Recent Work" title={<>Take A Look At Our<br className="hidden sm:block" /> Latest Projects</>} light />
          <Reveal>
            <Button to="/projects" variant="outline-light">All Projects</Button>
          </Reveal>
        </div>

        {/* filters */}
        <div className="mt-12 flex flex-wrap gap-2">
          {FEATURED_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                filter === c
                  ? 'border-accent bg-accent text-ink'
                  : 'border-white/15 text-white/70 hover:border-white/40 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* carousel */}
        <div className="relative mt-12">
          <div
            ref={carouselRef}
            className="no-scrollbar flex gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory touch-pan-x overflow-y-hidden"
          >
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div
                  layout
                  key={p.slug}
                  data-slide={i}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="snap-center shrink-0 w-[min(100%,280px)] sm:w-[46%] lg:w-[32%]"
                >
                  <div className="rounded-3xl border border-white/10 bg-ink-800 p-3 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.8)] transition-shadow duration-500 hover:shadow-[0_38px_100px_-45px_rgba(0,0,0,0.85)]">
                    <ProjectCard project={p} index={i} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 flex h-full items-center justify-between px-3 sm:px-4">
            <button
              type="button"
              onClick={() => handleScroll(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll carousel left"
              className={`pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink/70 text-white transition hover:border-white/20 hover:bg-white/10 ${
                !canScrollLeft ? 'opacity-40 grayscale' : ''
              }`}
            >
              <Icon name="arrow" size={18} className="rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll(1)}
              disabled={!canScrollRight}
              aria-label="Scroll carousel right"
              className={`pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-ink/70 text-white transition hover:border-white/20 hover:bg-white/10 ${
                !canScrollRight ? 'opacity-40 grayscale' : ''
              }`}
            >
              <Icon name="arrow" size={18} />
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {list.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  index === activeSlide ? 'bg-accent' : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* before / after feature */}
        <div className="mt-24 grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <span className="eyebrow text-accent">— Before & After</span>
              <h3 className="display mt-5 text-4xl sm:text-5xl">
                The transformation<br /> speaks for itself
              </h3>
              <p className="mt-5 max-w-md text-white/60">
                Drag the slider to see how our renovation and remodeling teams turn
                tired structures into refined, modern spaces.
              </p>
              <Link to="/services" className="mt-7 inline-flex">
                <Button variant="accent">Explore Renovation</Button>
              </Link>
            </div>
          </Reveal>
          <Reveal direction="left">
            <BeforeAfter
              before="beforeafter-before.jpeg"
              after="beforeafter-after.jpeg"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
