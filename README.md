# Blockout — strona marketingowa

Jednostronicowa strona firmy Blockout (materiały reklamowe, druk wielkoformatowy,
oznakowanie firm — Koszalin). React 19 + TypeScript + Vite, bez frameworka CSS.

Celem strony jest jedno: **zdobywanie zapytań ofertowych**. Każda sekcja kończy się
działaniem, a formularz kontaktowy jest dostępny z każdego miejsca strony.

---

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Strona ruszy pod `http://localhost:5173`.

## Kontrola jakości i build

```bash
npm run lint      # ESLint
npm run build     # tsc + vite build → dist/
npm run preview   # podgląd zbudowanej wersji
```

## Wdrożenie

**Hosting statyczny** (Vercel, Netlify, Cloudflare Pages) — najprostsza droga:
katalog `dist`, komenda `npm run build`. Pamiętaj o ustawieniu zmiennej
`VITE_CONTACT_ENDPOINT` w panelu hostingu.

**Docker / własny serwer:**

```bash
docker compose up -d --build
```

Strona stanie pod `http://localhost:8080`. Nginx ma skonfigurowane gzip,
cache zasobów, nagłówki bezpieczeństwa i healthcheck.

---

## ⚠️ Zanim opublikujesz — lista rzeczy do uzupełnienia

Strona nie zawiera **żadnych wymyślonych danych**: nie ma lat doświadczenia,
liczby klientów, opinii ani certyfikatów, bo nie było ich czym potwierdzić.
Poprzednia wersja zawierała nieprawdziwe statystyki („12 lat doświadczenia",
„1200+ realizacji rocznie", „98% zadowolonych klientów") oraz trzy zmyślone
opinie klientów — zostały usunięte.

### 1. Formularz kontaktowy — bez tego nie dostaniesz ani jednego zapytania

Formularz **nie udaje wysyłki**. Dopóki nie podłączysz endpointu, pokazuje
uczciwą informację i kieruje na telefon oraz e-mail.

1. Załóż formularz na [formspree.io](https://formspree.io) — dostaniesz adres
   `https://formspree.io/f/xxxxxxxx`.
2. Utwórz plik `.env` w katalogu głównym (wzór w `.env.example`):
   ```
   VITE_CONTACT_ENDPOINT=https://formspree.io/f/TWOJ_ID
   ```
3. Zrestartuj `npm run dev` — Vite czyta `.env` tylko przy starcie.
4. Na produkcji ustaw tę samą zmienną w panelu hostingu i zbuduj ponownie.
5. Wyślij zgłoszenie testowe i potwierdź adres odbiorczy w mailu od Formspree.

> Uwaga przy testach: formularz odrzuca zgłoszenia wysłane szybciej niż
> 3 sekundy od załadowania strony (zabezpieczenie antyspamowe). Nie klikaj od razu.

Alternatywnie Web3Forms: `VITE_CONTACT_ENDPOINT=https://api.web3forms.com/submit`
i dodanie `access_key` do obiektu `payload` w `src/components/ContactForm.tsx`.

### 2. Zdjęcia realizacji — największa dźwignia konwersji

Wszystkie osiem kafli w sekcji „Realizacje" to **placeholdery** — wzory
typograficzne z widoczną etykietą „Materiał poglądowy". Nie ma tam nazw klientów
ani opisów wykonanych zleceń, bo nie zostały dostarczone.

Podmiana w `src/content/projects.ts`:

```ts
{
  title: 'Nazwa realizacji lub klienta',   // za zgodą klienta
  image: '/realizacje/baner-hala.jpg',     // plik w public/realizacje/
  alt: 'Baner reklamowy na elewacji hali produkcyjnej',
  result: 'Efekt dla klienta — albo zostaw puste',
}
```

Gdy `image` przestanie być puste, kafel automatycznie przełącza się na zdjęcie,
a etykieta „Materiał poglądowy" znika sama.

### 3. Skasuj dwa puste pliki po starej wersji

```
src/components/Seo.tsx     (meta tagi robi teraz vite.config.ts)
src/constants/site.ts      (dane przeniesione do src/content/site.ts)
```

Oba są już puste — zawierają tylko komentarz wyjaśniający i `export {}`.
Nic ich nie importuje, build i lint przechodzą, więc to wyłącznie porządki.
Skasuj je razem z katalogiem `src/constants`.

### 4. Podstrony prawne

Linkowane w stopce i w zgodzie przy formularzu, **jeszcze nie istnieją**:

- `/polityka-prywatnosci` — wymagana przez RODO, skoro zbierasz dane z formularza
- `/cookies`
- `/dane-firmy` — NIP, REGON, forma prawna

### 5. Dane firmy do potwierdzenia — `src/content/site.ts`

| Pole                   | Stan                    | Co zrobić                                                           |
| ---------------------- | ----------------------- | ------------------------------------------------------------------- |
| `url`                  | `https://blockout.pl`   | podmień, jeśli domena jest inna (wpływa na canonical, OG i sitemap) |
| `openingHours`         | pusta tablica           | uzupełnij godziny — dopiero wtedy trafią do danych strukturalnych   |
| `social`               | puste                   | wpisz profile albo zostaw — puste się nie renderują                 |
| telefon, e-mail, adres | z dotychczasowej strony | potwierdź, że aktualne                                              |

### 6. Treści do weryfikacji

- `src/content/services.ts` — lista usług pochodzi z dotychczasowej strony,
  ale opisy i wypunktowania to propozycje copy. Potwierdź, że każda pozycja
  faktycznie jest w ofercie.
- `src/content/process.ts` — pięć kroków współpracy: sprawdź, czy odpowiadają
  temu, jak realnie pracujecie.
- FAQ — odpowiedzi są **celowo ostrożne**: nie deklarują terminów, kosztów
  dostawy ani zasięgu działania. Gdy potwierdzisz realne warunki (np. „wycena
  w 24 h", „realizujemy wysyłkowo w całej Polsce"), doprecyzuj je — konkret
  w FAQ podnosi konwersję mocniej niż większość zmian wizualnych.

---

## Materiały, które warto zdobyć

W kolejności wpływu na liczbę zapytań:

1. **Zdjęcia gotowych realizacji w miejscu montażu** — baner na hali, szyld nad
   wejściem, oklejona witryna, billboard przy trasie. Nie zdjęcia wydruku na
   stole, tylko reklama pracująca w terenie. To jest ta jedna rzecz, która
   najbardziej zmienia skuteczność tej strony.
2. **Zdjęcia typu „przed / po"** — szczególnie dla oznakowania lokali. Działa
   lepiej niż jakikolwiek opis.
3. **Prawdziwe opinie klientów** — z imieniem, firmą i zgodą na publikację.
   Najprościej: poproś o opinię w Google i pokaż ją na stronie. Struktura
   sekcji jest gotowa, brakuje treści.
4. **Zdjęcia procesu produkcji** — maszyna, druk, wykończenie. Budują wiarygodność
   „produkujemy u siebie" lepiej niż deklaracja.
5. **Zdjęcia detali** — oczkowanie banera, krawędź cięcia, faktura folii.
   Dowód jakości, którego nie da się napisać słowami.
6. **Krótkie wideo (15–30 s)** z montażu lub produkcji — materiał na hero
   i do social mediów.
7. **Obrazek Open Graph** — `public/og-blockout.jpg` jest wygenerowany
   z typografii marki. Gdy będą zdjęcia realizacji, warto go podmienić.
8. **Logo w wektorze (SVG)** — obecnie logotyp jest składany typograficznie
   (`block` + `out`). Jeśli istnieje wersja wektorowa, podmień favicon
   i logo w nagłówku.

---

## Checklista SEO przed publikacją

- [ ] `site.url` ustawiony na docelową domenę (`src/content/site.ts`)
- [ ] Domena podmieniona w `public/robots.txt` i `public/sitemap.xml`
- [ ] `lastmod` w `sitemap.xml` zaktualizowany
- [ ] Podgląd linku sprawdzony w [Facebook Debugger](https://developers.facebook.com/tools/debug/)
      i [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [ ] Dane strukturalne sprawdzone w [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] HTTPS wymuszony, przekierowanie `www` → bez `www` (albo odwrotnie) ustawione
- [ ] Strona dodana do Google Search Console + wysłana sitemapa
- [ ] Wizytówka Google Firma uzupełniona i spójna z adresem na stronie
      (NAP: nazwa, adres, telefon muszą się zgadzać co do znaku)
- [ ] Analityka podpięta (GA4 / Plausible) z celem na wysłanie formularza
- [ ] Lighthouse przepuszczony na wersji produkcyjnej (mobile)
- [ ] Zdjęcia realizacji skompresowane (WebP/AVIF, długi bok ≤ 1600 px)
      i uzupełnione o `alt`

Co jest już zrobione i nie wymaga uwagi:

- Meta tagi, Open Graph, Twitter Card i dane strukturalne wstrzykiwane
  **przy buildzie** do `index.html` (`vite.config.ts`) — widzą je także roboty
  i scrapery, które nie wykonują JavaScriptu
- `LocalBusiness` i `FAQPage` w schema.org — wyłącznie z potwierdzonych danych,
  bez ocen i opinii
- Jeden `<h1>`, poprawna hierarchia `<h2>`/`<h3>` w każdej sekcji
- Canonical, `lang="pl"`, manifest, favicon, ikona iOS
- Fonty hostowane lokalnie (szybciej, bez wysyłania IP użytkowników do Google)
- Preload kroju nagłówkowego — nagłówek hero jest elementem LCP
- Zero naruszeń WCAG 2.1 AA w audycie axe-core (desktop i mobile)

---

## Struktura projektu

```
src/
  content/          Treść i dane firmy — jedyne źródło prawdy
    site.ts           dane kontaktowe, adresy, nawigacja
    services.ts       oferta, pasek kompetencji, marquee
    projects.ts       realizacje (obecnie placeholdery)
    process.ts        proces, zalety, FAQ, tematy formularza
  components/
    layout/           Header, Footer, MobileBar
    sections/         Hero, Capabilities, Services, Projects, Process,
                      WhyUs, CtaBand, Faq, Contact
    ui/               Reveal, ProjectPlaceholder
    ContactForm.tsx
  hooks/            useScrollState, useActiveSection, useLockBodyScroll,
                    useGridColumns
  styles/
    tokens.css        kolory, typografia, rytm, ruch — zmieniaj tutaj
    base.css          reset, typografia bazowa, prymitywy (.btn, .container…)
    sections/*.css    style poszczególnych sekcji
    global.css        punkt wejścia (kolejność importów ma znaczenie)
```

**Zasada:** żadnych wartości „na sztywno" w plikach sekcji. Kolor, odstęp
i czas animacji biorą się z tokenów w `tokens.css`. Zmiana koloru marki
w jednym miejscu przechodzi przez całą stronę.

## Dostępność i ruch

- Wszystkie animacje respektują `prefers-reduced-motion` — globalnie w CSS
  i przez `useReducedMotion()` w komponentach.
- Menu mobilne i lightbox mają pułapkę focusu, obsługę Escape i przywracanie
  focusu na element, który je otworzył.
- Galeria: nawigacja strzałkami ← →.
- FAQ: `aria-expanded` + `role="region"`, w pełni obsługiwane z klawiatury.
- Animowane są wyłącznie `transform` i `opacity` — bez przeliczania układu
  przy każdej klatce.
