import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Icon from './Icon'
import { img } from '../lib/img'

// Dark project card matching "Take A Look At Our Latest Projects".
export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      className="group"
    >
      <Link to={`/projects/${project.slug}`} className="block">
        <div className="relative overflow-hidden rounded-[28px]">
          <img
            src={img(project.cover, { w: 900 })}
            alt={project.name}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-75" />
          <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {project.category}
          </span>
          <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-accent text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
            <Icon name="arrow" size={16} />
          </span>
        </div>
        <div className="mt-5 space-y-4">
          <div>
            <h3 className="font-display text-2xl font-bold transition-colors group-hover:text-accent-600">
              {project.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{project.blurb}</p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors duration-300 group-hover:border-accent/30">
            <span className="text-accent">View Project</span>
            <span className="flex items-center gap-2 text-white/60">
              <Icon name="pin" size={14} /> {project.location} · {project.year}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
