type PlaceholderProps = {
  /** Motyw kompozycji: 1 baner, 2 szyld, 3 roll-up, 4 plakat. */
  theme: 1 | 2 | 3 | 4
  label: string
}

/**
 * Wzór zastępczy pod zdjęcie realizacji.
 * Czysta typografia i geometria w palecie marki — ma wyglądać na celowy element
 * systemu wizualnego, a nie na brakujący obrazek.
 * Element jest w całości `aria-hidden` — dostępną nazwę niesie tekst w kaflu.
 */
export function ProjectPlaceholder({ theme, label }: PlaceholderProps) {
  return (
    <div className={`ph ph--t${theme}`} aria-hidden="true">
      <div className="ph__mesh" />
      <div className="ph__stage">
        <Composition theme={theme} />
      </div>
      <span className="ph__label">{label}</span>
    </div>
  )
}

function Composition({ theme }: { theme: 1 | 2 | 3 | 4 }) {
  if (theme === 1) {
    // Baner / wielki format: pas rozciągnięty w poziomie, oczka po bokach.
    return (
      <svg
        className="ph__art"
        viewBox="0 0 320 200"
        role="presentation"
        focusable="false"
      >
        <rect className="ph__fill" x="16" y="52" width="288" height="96" />
        <g className="ph__stroke">
          <line x1="16" y1="36" x2="304" y2="36" />
          <line x1="16" y1="164" x2="304" y2="164" />
        </g>
        <g className="ph__dots">
          <circle cx="28" cy="64" r="3.5" />
          <circle cx="28" cy="136" r="3.5" />
          <circle cx="292" cy="64" r="3.5" />
          <circle cx="292" cy="136" r="3.5" />
        </g>
        <text className="ph__word" x="160" y="112" textAnchor="middle">
          BLOCKOUT
        </text>
      </svg>
    )
  }

  if (theme === 2) {
    // Szyld: kaseton na wsporniku, mocny kontrast.
    return (
      <svg
        className="ph__art"
        viewBox="0 0 320 200"
        role="presentation"
        focusable="false"
      >
        <g className="ph__stroke">
          <line x1="40" y1="20" x2="40" y2="180" />
          <line x1="40" y1="86" x2="72" y2="86" />
        </g>
        <rect className="ph__fill" x="72" y="46" width="216" height="80" />
        <rect className="ph__accent" x="72" y="126" width="216" height="8" />
        <text
          className="ph__word ph__word--inv"
          x="180"
          y="96"
          textAnchor="middle"
        >
          BLOCKOUT
        </text>
      </svg>
    )
  }

  if (theme === 3) {
    // Roll-up: pionowy panel na stopce, kompozycja wąska i wysoka.
    return (
      <svg
        className="ph__art"
        viewBox="0 0 320 200"
        role="presentation"
        focusable="false"
      >
        <rect className="ph__fill" x="104" y="14" width="112" height="150" />
        <rect
          className="ph__accent"
          x="88"
          y="166"
          width="144"
          height="14"
          rx="7"
        />
        <g className="ph__stroke">
          <line x1="120" y1="112" x2="200" y2="112" />
          <line x1="120" y1="126" x2="176" y2="126" />
        </g>
        <text
          className="ph__word ph__word--stack"
          x="160"
          y="70"
          textAnchor="middle"
        >
          <tspan x="160" dy="0">
            BLOCK
          </tspan>
          <tspan className="ph__word--serif" x="160" dy="30">
            out
          </tspan>
        </text>
      </svg>
    )
  }

  // Plakat: rama, siatka trzech kolumn, znaki cięcia.
  return (
    <svg
      className="ph__art"
      viewBox="0 0 320 200"
      role="presentation"
      focusable="false"
    >
      <rect className="ph__fill" x="80" y="16" width="160" height="168" />
      <rect className="ph__accent" x="80" y="16" width="160" height="26" />
      <g className="ph__stroke">
        <line x1="96" y1="132" x2="224" y2="132" />
        <line x1="96" y1="146" x2="224" y2="146" />
        <line x1="96" y1="160" x2="188" y2="160" />
      </g>
      <g className="ph__dots">
        <rect x="66" y="16" width="10" height="1.5" />
        <rect x="244" y="184" width="10" height="1.5" />
      </g>
      <text
        className="ph__word ph__word--stack"
        x="160"
        y="82"
        textAnchor="middle"
      >
        <tspan x="160" dy="0">
          BLOCK
        </tspan>
        <tspan className="ph__word--serif" x="160" dy="28">
          out
        </tspan>
      </text>
    </svg>
  )
}
