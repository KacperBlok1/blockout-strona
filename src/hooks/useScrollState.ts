import { useEffect, useState } from 'react'

/**
 * Zwraca informację, czy strona jest przewinięta poniżej progu.
 * Nasłuch jest pasywny i odczytuje scroll w rAF, żeby nie blokować wątku.
 */
export function useScrollState(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0
    const read = () => {
      frame = 0
      setScrolled(window.scrollY > threshold)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [threshold])

  return scrolled
}
