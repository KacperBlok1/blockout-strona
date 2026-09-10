import { useEffect, useState } from 'react'

/**
 * Podświetla w nawigacji sekcję, którą użytkownik aktualnie czyta.
 * IntersectionObserver zamiast nasłuchu scrolla — zero pracy przy każdej klatce.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id.replace('#', '')))
      .filter((element): element is HTMLElement => Boolean(element))

    if (!targets.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [ids])

  return active
}
