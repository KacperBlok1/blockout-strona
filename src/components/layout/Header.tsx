import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { nav, site } from '../../content/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { useScrollState } from '../../hooks/useScrollState'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Stała referencja — inaczej IntersectionObserver przepinałby się przy każdym renderze. */
const NAV_HREFS = nav.map((item) => item.href)

const MENU_ID = 'menu-mobilne'
const FOCUSABLE = 'a[href], button:not([disabled])'

export function Header() {
  const scrolled = useScrollState(24)
  const active = useActiveSection(NAV_HREFS)
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)

  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useLockBodyScroll(open)

  const close = useCallback(() => setOpen(false), [])

  /** Zamknięcie klawiszem Escape + pułapka na Tab w obrębie menu. */
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    if (!panel) return

    const items = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE))
    items()[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (event.key !== 'Tab') return

      const focusable = items()
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const current = document.activeElement

      if (event.shiftKey && (current === first || !panel.contains(current))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && current === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  /** Menu mobilne nie ma racji bytu po powrocie na desktop. */
  useEffect(() => {
    const query = window.matchMedia('(min-width: 901px)')
    const onChange = () => {
      if (query.matches) setOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__backdrop" aria-hidden="true" />
      <div className="header__line" aria-hidden="true" />

      <div className="container header__inner">
        <a
          className="header__logo"
          href="#start"
          aria-label="Blockout — strona główna"
        >
          block<i>out</i>
        </a>

        <nav className="header__nav" aria-label="Nawigacja główna">
          <ul className="header__list">
            {nav.map((item) => {
              const isActive = active === item.href
              return (
                <li key={item.href}>
                  <a
                    className={`header__link${isActive ? ' header__link--active' : ''}`}
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <a className="btn btn--primary btn--sm header__cta" href="#kontakt">
          Zapytaj o wycenę
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={`header__burger${open ? ' header__burger--open' : ''}`}
          aria-expanded={open}
          aria-controls={MENU_ID}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="header__burger-box" aria-hidden="true">
            <span className="header__burger-line" />
            <span className="header__burger-line" />
          </span>
          <span className="visually-hidden">
            {open ? 'Zamknij menu' : 'Otwórz menu'}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <div className="header__overlay" key="menu">
            <motion.div
              className="header__scrim"
              onClick={close}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: EASE }}
            />

            <motion.div
              ref={panelRef}
              id={MENU_ID}
              className="header__panel"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={reduced ? false : { y: '-100%' }}
              animate={{ y: 0 }}
              exit={reduced ? undefined : { y: '-100%' }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }
              }
            >
              <ul className="header__panel-list">
                {nav.map((item, index) => (
                  <li key={item.href}>
                    <motion.a
                      className="header__panel-link"
                      href={item.href}
                      onClick={close}
                      aria-current={active === item.href ? 'true' : undefined}
                      initial={reduced ? false : { opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: reduced ? 0 : 0.1 + index * 0.055,
                        ease: EASE,
                      }}
                    >
                      <span className="header__panel-index">{`0${index + 1}`}</span>
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>

              <div className="header__panel-foot">
                <a
                  className="header__panel-contact"
                  href={`tel:${site.phoneHref}`}
                >
                  {site.phone}
                </a>
                <a
                  className="header__panel-contact"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
                <a
                  className="btn btn--primary header__panel-cta"
                  href="#kontakt"
                  onClick={close}
                >
                  Zapytaj o wycenę
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  )
}
