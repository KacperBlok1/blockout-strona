import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Reveal } from '../ui/Reveal'
import { ProjectPlaceholder } from '../ui/ProjectPlaceholder'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { packRows, useGridColumns } from '../../hooks/useGridColumns'
import { categories, projects } from '../../content/projects'
import type { Category, Project } from '../../content/projects'

type Filter = Category | 'all'

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Realizacje — filtrowana, nieregularna siatka z podglądem w lightboxie.
 * Dopóki `project.image` jest puste, kafel pokazuje wzór typograficzny
 * i uczciwą etykietę „Materiał poglądowy”.
 */
export function Projects() {
  const reduced = useReducedMotion()
  const [filter, setFilter] = useState<Filter>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const columns = useGridColumns()

  const visible = useMemo(
    () =>
      filter === 'all'
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  )

  /* Rozpiętości liczone po filtrowaniu — każdy wiersz jest pełny. */
  const cells = useMemo(
    () =>
      packRows(
        visible.map((p) => p.size),
        columns,
      ),
    [visible, columns],
  )

  const triggers = useRef(new Map<string, HTMLButtonElement | null>())
  const dialogRef = useRef<HTMLDivElement>(null)
  const wasOpen = useRef(false)

  const openIndex = openId ? visible.findIndex((p) => p.id === openId) : -1
  const current: Project | null = openIndex >= 0 ? visible[openIndex] : null

  useLockBodyScroll(current !== null)

  /** `restoreFocus` wyłączamy, gdy zamknięciu towarzyszy przejście do kontaktu. */
  const close = useCallback(
    (restoreFocus = true) => {
      const id = openId
      setOpenId(null)
      if (id && restoreFocus) {
        requestAnimationFrame(() => triggers.current.get(id)?.focus())
      }
    },
    [openId],
  )

  /** Zamknięcie + przejście do formularza: najpierw zdejmujemy blokadę scrolla. */
  const goToContact = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      close(false)
      requestAnimationFrame(() => {
        document.getElementById('kontakt')?.scrollIntoView({ block: 'start' })
      })
    },
    [close],
  )

  const step = useCallback(
    (dir: 1 | -1) => {
      setOpenId((prev) => {
        if (!prev || visible.length === 0) return prev
        const i = visible.findIndex((p) => p.id === prev)
        if (i < 0) return prev
        return visible[(i + dir + visible.length) % visible.length].id
      })
    },
    [visible],
  )

  const changeFilter = (next: Filter) => {
    setOpenId(null)
    setFilter(next)
  }

  /* Klawiatura: Escape, strzałki, pułapka na Tab wewnątrz modala. */
  useEffect(() => {
    if (!current) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        step(1)
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        step(-1)
        return
      }
      if (event.key !== 'Tab') return

      const node = dialogRef.current
      if (!node) return
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || !node.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [current, close, step])

  /* Focus wchodzi do modala tylko przy otwarciu — nawigacja strzałkami go nie przerzuca. */
  useEffect(() => {
    if (!current) {
      wasOpen.current = false
      return
    }
    if (wasOpen.current) return
    wasOpen.current = true
    const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)
    first?.focus()
  }, [current])

  return (
    <section id="realizacje" className="section projects">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">Realizacje</p>
          <h2>
            Reklama, która pracuje <em>w terenie</em>
          </h2>
          <p className="lead">
            Typy realizacji, które wykonujemy najczęściej — od banerów na halę
            po komplet materiałów firmowych.
          </p>
        </header>

        {/* Filtry */}
        <Reveal direction="none" amount={0.4}>
          <div
            className="projects__filters"
            role="group"
            aria-label="Filtruj realizacje"
          >
            {categories.map((category) => {
              const isActive = category.id === filter
              return (
                <button
                  key={category.id}
                  type="button"
                  className={`projects__filter${isActive ? ' projects__filter--active' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => changeFilter(category.id)}
                >
                  {isActive && (
                    <motion.span
                      className="projects__filter-bg"
                      layoutId={reduced ? undefined : 'projects-filter'}
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 38,
                      }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="projects__filter-label">
                    {category.label}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Uczciwa notka o materiale poglądowym */}
        <Reveal direction="none" amount={0.6}>
          <p className="projects__note">
            <span className="projects__note-tag">Materiał poglądowy</span>
            <span>
              Kafle bez zdjęcia to wzory typograficzne w miejscu, w którym
              pojawią się fotografie naszych realizacji.
            </span>
          </p>
        </Reveal>

        <motion.ul layout={!reduced} className="projects__grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, i) => (
              <motion.li
                key={project.id}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="projects__item"
                style={{
                  gridColumn: `span ${cells[i]?.span ?? 1}`,
                  aspectRatio: cells[i]?.aspectRatio ?? '4 / 3',
                }}
              >
                <article className="projects__card">
                  <div className="projects__media">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.alt}
                        loading="lazy"
                        decoding="async"
                        className="projects__img"
                      />
                    ) : (
                      <ProjectPlaceholder
                        theme={project.theme}
                        label={project.title}
                      />
                    )}
                  </div>

                  {!project.image && (
                    <span className="projects__tag" aria-hidden="true">
                      Materiał poglądowy
                    </span>
                  )}

                  <div className="projects__panel">
                    <p className="projects__cat">{project.categoryLabel}</p>
                    <h3 className="projects__title">
                      <button
                        type="button"
                        className="projects__trigger"
                        aria-haspopup="dialog"
                        onClick={() => setOpenId(project.id)}
                        ref={(el) => {
                          triggers.current.set(project.id, el)
                        }}
                      >
                        {project.title}
                        <span className="visually-hidden">
                          {' '}
                          — otwórz podgląd
                        </span>
                      </button>
                    </h3>
                    <p className="projects__summary">{project.summary}</p>
                    {project.result && (
                      <p className="projects__result">{project.result}</p>
                    )}
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <Reveal className="projects__cta" direction="none" amount={0.4}>
          <p className="projects__cta-text">Chcesz zobaczyć więcej?</p>
          <a className="btn btn--primary" href="#kontakt">
            Napisz do nas
            <span className="btn__arrow" aria-hidden="true">
              →
            </span>
          </a>
        </Reveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            className="projects__overlay"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div
              className="projects__backdrop"
              aria-hidden="true"
              onClick={() => close()}
            />

            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="projects-dialog-title"
              className="projects__dialog"
              initial={reduced ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                className="projects__close"
                onClick={() => close()}
              >
                <span aria-hidden="true">✕</span>
                <span className="visually-hidden">Zamknij podgląd</span>
              </button>

              <div className="projects__dialog-media">
                {current.image ? (
                  <img
                    src={current.image}
                    alt={current.alt}
                    decoding="async"
                    className="projects__img"
                  />
                ) : (
                  <ProjectPlaceholder
                    theme={current.theme}
                    label={current.title}
                  />
                )}
              </div>

              <div className="projects__dialog-body">
                <p className="projects__cat">{current.categoryLabel}</p>
                <h3
                  id="projects-dialog-title"
                  className="projects__dialog-title"
                >
                  {current.title}
                </h3>
                <p className="projects__dialog-summary">{current.summary}</p>
                {current.result && (
                  <p className="projects__result">{current.result}</p>
                )}
                {!current.image && (
                  <p className="projects__dialog-note">
                    Wzór poglądowy — w tym miejscu stanie zdjęcie realizacji.
                  </p>
                )}

                <div className="projects__dialog-actions">
                  <a
                    className="btn btn--primary btn--sm"
                    href="#kontakt"
                    onClick={goToContact}
                  >
                    Zapytaj o podobną realizację
                  </a>
                </div>

                <div className="projects__nav">
                  <button
                    type="button"
                    className="projects__nav-btn"
                    onClick={() => step(-1)}
                    disabled={visible.length < 2}
                  >
                    <span aria-hidden="true">←</span>
                    <span className="visually-hidden">
                      Poprzednia realizacja
                    </span>
                  </button>
                  <p className="projects__counter" aria-live="polite">
                    {openIndex + 1} / {visible.length}
                  </p>
                  <button
                    type="button"
                    className="projects__nav-btn"
                    onClick={() => step(1)}
                    disabled={visible.length < 2}
                  >
                    <span aria-hidden="true">→</span>
                    <span className="visually-hidden">Następna realizacja</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
