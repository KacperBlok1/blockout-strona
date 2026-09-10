/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Adres usługi odbierającej formularz kontaktowy, np. https://formspree.io/f/TWOJ_ID */
  readonly VITE_CONTACT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
