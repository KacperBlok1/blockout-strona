import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { ElementType } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 26 },
  down: { y: -26 },
  left: { x: 26 },
  right: { x: -26 },
  none: {},
}

type RevealProps = {
  children: ReactNode
  className?: string
  /** Opóźnienie w sekundach — do kaskadowania elementów w rzędzie. */
  delay?: number
  direction?: Direction
  /** Element HTML, w który opakowujemy zawartość (domyślnie div). */
  as?: ElementType
  /** Ile procent elementu musi być widoczne, żeby odpalić animację. */
  amount?: number
}

/**
 * Pojawianie się przy przewijaniu.
 * Przy `prefers-reduced-motion` element renderuje się od razu w stanie docelowym —
 * bez animacji, bez opóźnienia, bez ryzyka niewidocznej treści.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  as = 'div',
  amount = 0.2,
}: RevealProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
