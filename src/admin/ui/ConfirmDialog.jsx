// Imperative confirmation dialog. Wrap the admin app in <ConfirmProvider> and
// call `const confirm = useConfirm()` then `await confirm({ title, ... })`.
// Resolves true/false. Used before destructive actions (delete, bulk delete).
import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from './primitives'
import AdminIcon from './AdminIcon'

const ConfirmContext = createContext(null)

export function ConfirmProvider({ children }) {
  const [state, setState] = useState(null)
  const resolver = useRef(null)

  const confirm = useCallback((opts) => {
    setState({
      title: 'Are you sure?',
      message: '',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      danger: false,
      ...opts,
    })
    return new Promise((resolve) => {
      resolver.current = resolve
    })
  }, [])

  const close = (result) => {
    resolver.current?.(result)
    resolver.current = null
    setState(null)
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <AnimatePresence>
        {state && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => close(false)} />
            <motion.div
              initial={{ scale: 0.94, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              className="relative w-full max-w-md rounded-2xl border border-ink/10 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-ink-800"
              role="alertdialog"
              aria-modal="true"
            >
              <div className="flex items-start gap-4">
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${state.danger ? 'bg-red-500/15 text-red-500' : 'bg-accent/15 text-accent-600'}`}
                >
                  <AdminIcon name={state.danger ? 'trash' : 'bell'} size={22} />
                </span>
                <div className="flex-1">
                  <h2 className="font-display text-lg font-bold text-ink dark:text-bone">{state.title}</h2>
                  {state.message && (
                    <p className="mt-1.5 text-sm leading-relaxed text-ink/60 dark:text-bone/60">{state.message}</p>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={() => close(false)}>
                  {state.cancelLabel}
                </Button>
                <Button variant={state.danger ? 'danger' : 'accent'} onClick={() => close(true)}>
                  {state.confirmLabel}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ConfirmContext.Provider>
  )
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext)
  if (!ctx) throw new Error('useConfirm must be used within a ConfirmProvider')
  return ctx
}
