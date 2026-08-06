# Blockout

Nowoczesna, komponentowa strona firmy Blockout zbudowana w React 19, TypeScript i Vite. Projekt odtwarza układ oraz interakcje dostarczonego prototypu, z poprawioną dostępnością i przygotowaniem SEO.

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

## Kontrola jakości i build

```bash
npm run lint
npm run build
```

## Docker / wdrożenie

```bash
docker compose up -d --build
```

Strona będzie dostępna pod `http://localhost:8080`. Nginx ma skonfigurowane cache zasobów, gzip, nagłówki bezpieczeństwa i healthcheck kontenera.

## Struktura

- `src/components` — SEO i formularz kontaktowy
- `src/constants` — dane firmy
- `src/styles` — globalne style oraz responsywność
- `public` — favicon, manifest, robots i sitemap

Dane kontaktowe są centralnie zdefiniowane w `src/constants/site.ts`. Formularz posiada walidację Zod i jest gotowy do podłączenia endpointu backendowego w funkcji `submit`.
