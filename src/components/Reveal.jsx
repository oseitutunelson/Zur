import { motion } from 'framer-motion'

// Lightweight scroll-reveal wrapper used across all sections.
const DIRS = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
  none: { x: 0, y: 0 },
}

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  once = true,
  amount = 0.25,
  as = 'div',
}) {
  const M = motion[as] || motion.div
  const d = DIRS[direction] || DIRS.up
  return (
    <M
      className={className}
      initial={{ opacity: 0, ...d }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  )
}
