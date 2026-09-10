import { useEffect, useState } from 'react'

/**
 * Liczba kolumn siatki realizacji, odczytana z tych samych progów,
 * których używa CSS. Potrzebna po stronie JS, żeby deterministycznie
 * upakować wiersze i nie zostawić dziury przy żadnym filtrze.
 */
const QUERIES = [
  { query: '(min-width: 1200px)', columns: 3 },
  { query: '(min-width: 640px)', columns: 2 },
] as const

function read() {
  if (typeof window === 'undefined') return 1
  return QUERIES.find((q) => window.matchMedia(q.query).matches)?.columns ?? 1
}

export function useGridColumns() {
  const [columns, setColumns] = useState(read)

  useEffect(() => {
    const lists = QUERIES.map((q) => window.matchMedia(q.query))
    const update = () => setColumns(read())
    lists.forEach((list) => list.addEventListener('change', update))
    update()
    return () =>
      lists.forEach((list) => list.removeEventListener('change', update))
  }, [])

  return columns
}

/** Proporcje kafla dobrane tak, żeby wszystkie kafle w wierszu miały równą wysokość. */
const RATIO: Record<number, string> = { 1: '4 / 3', 2: '8 / 3', 3: '4 / 1' }

export type Cell = { span: number; aspectRatio: string }

/**
 * Pakuje kafle w pełne wiersze.
 *
 * Każdy kafel ma preferowaną szerokość (`wide` = 2 kolumny, reszta = 1).
 * Gdy preferencja nie mieści się w bieżącym wierszu, wiersz jest domykany
 * przez rozciągnięcie ostatniego kafla na wolne kolumny. Ostatni wiersz
 * domykany jest tak samo — dzięki temu siatka nigdy nie ma dziury,
 * niezależnie od liczby elementów po filtrowaniu i od punktu łamania.
 */
export function packRows(sizes: readonly string[], columns: number): Cell[] {
  const spans: number[] = []
  let used = 0

  sizes.forEach((size) => {
    if (used === columns) used = 0

    // Preferencja szerokości przycięta do miejsca, jakie zostało w wierszu —
    // dzięki temu kafel nigdy nie przenosi się do nowego wiersza,
    // zostawiając za sobą pustą kolumnę.
    const want = Math.min(size === 'wide' ? 2 : 1, columns, columns - used)

    spans.push(want)
    used += want
  })

  // Ostatni wiersz domykamy rozciągnięciem ostatniego kafla.
  if (spans.length && used < columns) spans[spans.length - 1] += columns - used

  return spans.map((span) => ({ span, aspectRatio: RATIO[span] ?? RATIO[1] }))
}
