# Project Rules

## Visual Identity
- **Primary colors:** charcoal `#1A1A1A`, near-black `#0F0F0F`, orange `#F97316`
- **Accent:** orange-light `#FB923C`, orange glow `rgba(249,115,22,.15)`
- **Text:** `#F5F5F4` (primary), `#A3A3A3` (muted)
- **Borders/lines:** `rgba(255,255,255,.08)`
- **Fonts:** Cairo (Arabic) + Space Grotesk (English) — Google Fonts
- **General style:** dark industrial luxury, route-line motif, blueprint grid textures, orange radial glows, custom 2px-stroke SVG icons

## Technical Decisions
- **Icons:** custom inline SVG (2px stroke, rounded caps) — no icon libraries
- **Libraries:** AOS only (deferred) — no jQuery, no GSAP, no Three.js
- **Fonts source:** Google Fonts with preconnect + display=swap
- **Animations:** CSS keyframes (marquee, map routes, pulses) + AOS scroll reveals
- **CSS:** logical properties (margin-inline, inset-inline) for free RTL
- **Class naming:** `tl-*` BEM prefixes (Gutenberg pattern mapping)
- **Images:** Unsplash, lazy-loaded except hero, WebP-friendly

## Client-specific Rules
- Bilingual AR/EN — Arabic is primary (RTL default), English polished secondary
- No sliders, no stock ship/container hero photos (template cliché)
- WhatsApp floating button + real contact info (Arab business trust channel)
- Trust stack: stats → countries → certifications → testimonials
- Free solutions first (budget < $400)
- Design must be Gutenberg-implementable (block patterns)
- Performance is a hard requirement — measured against any site