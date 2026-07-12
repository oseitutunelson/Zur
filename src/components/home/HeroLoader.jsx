import { motion } from 'framer-motion'

/*
 * Premium loading overlay shown while the 3D hero scene initialises.
 * An architectural "structure" assembles bar-by-bar, then the whole
 * overlay wipes upward to reveal the hero. Parent controls mount/unmount
 * via <AnimatePresence>, so this component only defines its own motion.
 */
export default function HeroLoader() {
  // Bars rise like a building being stacked, tallest in the centre.
  const bars = [0.45, 0.7, 1, 0.7, 0.45]

  return (
    <motion.div
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-ink"
      initial={{ opacity: 1 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* faint blueprint texture behind the mark */}
      <div className="absolute inset-0 blueprint-grid opacity-[0.07]" />

      <div className="relative flex flex-col items-center">
        {/* Assembling structure */}
        <div className="flex h-20 items-end gap-1.5">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className="w-2.5 rounded-sm bg-accent"
              style={{ transformOrigin: 'bottom' }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: h, opacity: 1 }}
              transition={{
                delay: i * 0.12,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                repeat: Infinity,
                repeatType: 'reverse',
                repeatDelay: 0.6,
              }}
            />
          ))}
        </div>

        {/* Wordmark */}
        <motion.div
          className="mt-8 font-display text-2xl font-extrabold tracking-tight text-white"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Ark<span className="text-accent">Nova</span>
        </motion.div>

        {/* Indeterminate progress track */}
        <div className="mt-5 h-px w-40 overflow-hidden bg-white/10">
          <motion.div
            className="h-full w-1/2 bg-accent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
          />
        </div>

        <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-white/40">
          Preparing Experience
        </p>
      </div>
    </motion.div>
  )
}
