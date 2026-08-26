# Tradeline — Project Plan

## Direction (approved by user — full authority granted)
**"Dark Industrial Luxury — The Line System"**
Charcoal `#1A1A1A` + orange `#F97316`, route-line motif from logo's orange L.
Bilingual Arabic-first (RTL) + English (LTR). Performance-first architecture.

## Design System
- **Colors:** charcoal `#1A1A1A`, near-black `#0F0F0F`, orange `#F97316`, orange-light `#FB923C`, text `#F5F5F4` / muted `#A3A3A3`, lines `rgba(255,255,255,.08)`
- **Fonts:** Cairo (Arabic) + Space Grotesk (English) — Google Fonts, display=swap
- **Icons:** custom inline SVG, 2px stroke, rounded caps
- **Textures:** blueprint grid (4-6% opacity), orange radial glows
- **Motion:** AOS (deferred) + CSS keyframes (marquee, map routes, pulses) — zero jQuery

## Home Page Sections
1. Header — sticky, logo, nav, AR/EN toggle, mobile menu
2. Hero — animated SVG world map + trade routes, headline, 2 CTAs, stats strip
3. Marquee — countries/destinations strip (CSS only)
4. About preview — image + text + link
5. Services — 6 cards (Import, Export, Logistics, Customs, Sourcing, Consulting)
6. Process — 6-step timeline (Inquiry → Quotation → Contract → Shipping → Customs → Delivery)
7. Why us — 4 features
8. Stats counters — animated (years, countries, shipments, satisfaction)
9. Global reach — countries grid with flags
10. Blog preview — 3 cards
11. CTA banner — parallax port image
12. Contact — form + info cards + WhatsApp
13. Footer — links, social, copyright

## Other Pages
- `about.html` — story, mission/vision, values, timeline
- `services.html` — detailed services + process + CTA
- `contact.html` — form + map placeholder + info
- `blog.html` — article cards

## Performance Guardrails (speed requirement)
- Zero block plugins in WP later; mockup: no jQuery, no heavy libs
- AOS deferred + page-scoped; images lazy-loaded (except hero)
- Google Fonts: preconnect + display=swap, 2 fonts max
- CSS animations instead of JS where possible
- Logical CSS properties → free RTL in WP (Polylang)

## Gutenberg Conversion Path
- `tl-*` BEM class prefixes per section → block patterns
- FAQ/details native; counters = vanilla IntersectionObserver
- theme.json tokens mirror CSS variables

## Verification
1. Browser render — all sections, RTL default
2. AR/EN toggle flips correctly
3. Mobile 375px — no overflow, menu works
4. AOS + counters + marquee work
5. Screenshots → `screenshots/preview/` then `screenshots/v1/`
6. web-design-guidelines review