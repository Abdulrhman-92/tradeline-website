# TRADE LINE — Design v1 Architecture

Bilingual (Arabic RTL / English LTR) dark industrial luxury mockup.
Static HTML + CSS + vanilla JS — built for WordPress/Gutenberg conversion.

---

## 1. Folder Structure

```
design/v1/
├── README.md
├── css/
│   ├── tokens.css      # ALL design constants — single source of truth
│   ├── base.css        # reset + element defaults (headings, links, forms)
│   └── utilities.css   # shared tl-* classes (container, btn, card, grid...)
├── js/
│   └── main.js         # shared interactions (menu, lang, AOS, counters, forms, WhatsApp)
└── components/
    ├── header/         # header.html + header.css (+ header.js if needed)
    ├── hero/
    ├── marquee/
    ├── about/
    ├── services/
    ├── process/
    ├── why-us/
    ├── stats/
    ├── global-reach/
    ├── blog/
    ├── cta/
    ├── contact/
    ├── footer/
    └── whatsapp/
```

Each component folder holds its own `.html` + `.css` (+ `.js` only when it has
page-scoped behavior). Shared behavior lives in `js/main.js` — never duplicate it.

## 2. Page Assembly

Pages (`index.html`, `about.html`, ...) live at the project root and are
assembled by concatenation — no build step:

1. **`<head>`** — CSS in strict order:
   `tokens.css` → `base.css` → `utilities.css` → component CSS files.
2. **Fonts** (Google Fonts, preconnect + `display=swap`):

   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
   ```

3. **AOS** (deferred CDN, the only library):

   ```html
   <script src="https://unpkg.com/aos@2.3.4/dist/aos.js" defer></script>
   ```

4. **`<body>`** — component HTML in section order (header → hero → ... → footer → whatsapp).
5. **Before `</body>`** — `js/main.js` (defer), then any component JS.

## 3. Token Usage Rules

- **Never hardcode** colors, sizes, radii, shadows, transitions, or z-index in
  any CSS file — always `var(--...)` from `tokens.css`.
- New constants are added to `tokens.css` **first**, then consumed.
- Section vertical rhythm = `--section-pad` everywhere (one value, one look).
- Heading sizes are defined **once** in `base.css` (`h1`–`h6`) — never
  overridden per section. Use `h2` for section titles, `h3` for card titles.
- All layout uses **logical properties** (`margin-inline`, `padding-block`,
  `inset-inline`, `text-align: start`) — RTL flips for free, no `left/right`.

## 4. Language Toggle (AR/EN)

- Default: `<html lang="ar" dir="rtl">`. English: `<html lang="en" dir="ltr">`.
- Buttons carry `data-lang-btn="ar"` / `data-lang-btn="en"`.
- Translatable text nodes carry `data-ar="..."` and `data-en="..."` attributes.
- `main.js` swaps `textContent`, toggles `lang` + `dir`, and persists the choice
  in `localStorage` (`tl-lang`) — applied early on next visit (no flash).
- Layout flips automatically via logical properties; fonts switch via the
  `html[lang="en"]` override in `tokens.css`.

## 5. Shared JS Behaviors (`js/main.js`)

| Behavior | Contract | Notes |
|---|---|---|
| Mobile menu | `[data-menu-toggle]` + `[data-menu]` | toggles `.is-open`, `aria-expanded`, closes on link click / Escape |
| Language switcher | `[data-lang-btn]`, `[data-ar]`, `[data-en]` | swaps text, flips `lang`/`dir`, persists |
| AOS init | — | `AOS.init({ once: true, duration: 700 })` when loaded |
| Counters | `[data-count]` + optional `[data-count-suffix]` | IntersectionObserver, ease-out, respects reduced motion |
| Form validation | `[data-form]`, `[required]`, `[data-form-success]` | email pattern, `.is-invalid` class, success message |
| WhatsApp button | `[data-whatsapp]` | `.is-visible` after scroll, fixed position via `--z-whatsapp` |

FAQ uses native `<details>/<summary>` — zero JS by design.

## 6. Gutenberg Conversion Notes

- Every `tl-*` class maps 1:1 to a **block pattern** (e.g. `tl-section-head` →
  group block with eyebrow + heading + paragraph). Conversion = copy-paste of
  the component HTML into a pattern file.
- `tokens.css` values are mirrored into `theme.json` (color palette, font
  families, spacing presets) so the editor matches the mockup.
- Zero-plugin core-blocks architecture: core blocks + theme.json + custom CSS +
  AOS + `main.js` (~30 lines vanilla JS).
- Polylang free handles AR/EN (`/ar/` `/en/` URLs, auto `dir="rtl"`).
- FAQ stays native `details/summary`; counters keep the IntersectionObserver.

## 7. Performance Guardrails

- No jQuery, no sliders, no heavy libraries — AOS is the only dependency (deferred).
- 2 fonts max, preconnect + `display=swap`.
- Images lazy-loaded except hero; WebP-friendly.
- CSS animations (marquee, map routes, pulses) instead of JS where possible.