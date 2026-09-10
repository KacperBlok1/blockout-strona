import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { site } from '../../content/site'
import { useScrollState } from '../../hooks/useScrollState'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/**
 * Pasek akcji na małych ekranach. Pojawia się dopiero poza hero,
 * żeby nie konkurować z głównym CTA w nagłówku.
 */
export function MobileBar() {
  const visible = useScrollState(600)
  const reduced = useReducedMotion()

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="mobilebar"
          className="mobilebar"
          aria-label="Szybki kontakt"
          initial={reduced ? false : { y: '130%' }}
          animate={{ y: 0 }}
          exit={reduced ? undefined : { y: '130%' }}
          transition={{ duration: reduced ? 0 : 0.42, ease: EASE }}
        >
          <a
            className="btn btn--outline mobilebar__action"
            href={`tel:${site.phoneHref}`}
          >
            Zadzwoń
          </a>
          <a className="btn btn--primary mobilebar__action" href="#kontakt">
            Zapytaj o wycenę
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
