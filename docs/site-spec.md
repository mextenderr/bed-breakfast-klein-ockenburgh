# B&B Portfolio One-Page Website Spec

## Summary
Create a single-scroll, no-backend portfolio website for the B&B with clear anchor-based navigation and a primary booking CTA.
The site is a one-page experience with these sections in order: `Home`, `Room`, `About`, `Price`, `Pictures`, `Location (Google Maps)`, `Reservation`, `Footer`.

Locked decisions:
- Spec format: Markdown PRD
- Copy language: Dutch-first
- Room scope: Single featured room
- Main CTA behavior: Smooth-scroll to reservation section
- Price section: Fixed seasonal rates table

## Doel & Scope
- Doel: een visueel sterke, één-pagina B&B portfolio website zonder backend.
- Scope:
  - Scroll-only website met vaste topbar navigatie.
  - Alle hoofdsecties op dezelfde pagina.
  - Primaire conversie via reserveringsmodule.
- Buiten scope:
  - Backend/CMS/database.
  - Meertalige contentimplementatie (alleen NL als primaire bron voor launch).

## Informatiearchitectuur
Volgorde van secties:
1. Home
2. Room
3. About
4. Price
5. Pictures
6. Location (Google Maps)
7. Reservation
8. Footer

## Sectiespecificatie
### 1) Home
- Purpose: immediate value proposition + trust + primary CTA.
- Required blocks:
  - Hero title (B&B name)
  - Short tagline (rust, natuur, nabij Den Haag/strand if applicable)
  - Intro paragraph (2–4 lines)
  - Primary CTA button: `Reserveer nu` → smooth-scroll to `#reservation`
  - Secondary CTA: `Bekijk kamers` → smooth-scroll to `#room`
- Media: hero image from `public` (fallback if missing).
- Must include visible anchor id: `id="home"`.

### 2) Room (single featured room)
- Purpose: explain the main accommodation offer.
- Required blocks:
  - Room title + short summary
  - 4–6 key features (e.g., bed type, badkamer, wifi, ontbijt, check-in tijden)
  - “Wat je krijgt” bullet list
  - One highlighted image + optional mini-gallery (3 thumbs max)
  - CTA button: `Controleer beschikbaarheid` → `#reservation`
- Must include anchor: `id="room"`.

### 3) About
- Purpose: story and trust-building.
- Required blocks:
  - Host/house story (short narrative)
  - “Waarom bij ons” with 3 trust points
  - Optional quote/testimonial placeholder
- Must include anchor: `id="about"`.

### 4) Price
- Purpose: transparent base pricing with policy context.
- Required blocks:
  - Seasonal table with at least:
    - `Laagseizoen` (nightly rate)
    - `Hoogseizoen` (nightly rate)
  - Notes:
    - what is included (e.g., ontbijt, toeristenbelasting yes/no)
    - cancellation policy summary
    - rates subject to availability/date confirmation
  - CTA: `Boek deze kamer` → `#reservation`
- Must include anchor: `id="price"`.

### 5) Pictures
- Purpose: visual proof of room and surroundings.
- Required blocks:
  - Responsive gallery using renamed assets `room1.jpg` … `room16.jpg`
  - Layout: masonry-like or grid (mobile-first)
  - Lightbox/modal behavior defined in spec (keyboard escape + close button)
- Must include anchor: `id="pictures"`.

### 6) Location (Google Maps)
- Purpose: show exact location and accessibility.
- Required blocks:
  - Embedded Google Map iframe
  - Address block (street, city, postcode)
  - Travel hints (parking/public transport) placeholders
- Must include anchor: `id="location"`.

### 7) Reservation (main conversion section)
- Purpose: final conversion target.
- Required blocks:
  - Section header + reassurance text
  - Existing reservation iframe component (`ReservationModule`)
  - Optional small checklist above iframe (secure booking, no hidden fees text placeholders)
- Must include anchor: `id="reservation"`.
- Every major CTA from other sections points here.

### 8) Footer
- Required blocks:
  - Contact details (email, phone)
  - Address repetition
  - Social link placeholders
  - Copyright line
  - Quick nav links to all section anchors
- Must include anchor: `id="footer"`.

## Navigatie & Scrollgedrag
- Topbar is sticky.
- Menu items map 1:1 to section anchors:
  - Home, Room, About, Price, Pictures, Location, Reservation
- Clicking nav link triggers smooth-scroll.
- Active section highlight in topbar based on scroll position.
- Mobile topbar collapses into hamburger panel with same anchor links.
- No route changes; no separate pages.

## Contentmodel (TypeScript interfaces)
Add a typed content model in the implementation phase (not hardcoded ad hoc).
Spec should define these interfaces:

- `NavItem { label: string; href: "#home"|... }`
- `HeroContent`
- `RoomFeature`
- `PriceSeason { season: "laag"|"hoog"; pricePerNight: string }`
- `GalleryImage { src: string; alt: string }`
- `LocationContent { addressLines: string[]; mapEmbedUrl: string }`
- `FooterContent`

Also define a single `siteContentNL` object as the Dutch source of truth.

## UX/Visual richtlijnen
- Single visual direction across sections.
- Clear spacing rhythm between sections.
- Strong CTA contrast for reservation actions.
- Fully responsive:
  - mobile (<768), tablet (768–1023), desktop (1024+)
- Accessibility:
  - semantic headings (`h1` once, then ordered hierarchy)
  - meaningful `alt` text
  - keyboard-accessible nav + gallery modal
  - visible focus states

## Technische randvoorwaarden
- Next.js frontend only.
- No backend, no CMS, no database.
- Static/local content config acceptable.
- Keep reservation and maps as iframe embeds.
- Keep implementation compatible with current App Router structure under `src/app`.

## Acceptatiecriteria
1. Clicking each topbar item scrolls to correct section anchor.
2. Primary hero CTA scrolls to `#reservation`.
3. Section order matches IA exactly.
4. Mobile menu opens/closes and navigates correctly.
5. Price table renders both seasons.
6. Gallery loads available `room*.jpg` assets without broken links.
7. Map iframe renders and is responsive.
8. Reservation iframe visible and reachable from all major CTAs.
9. Keyboard navigation works for topbar and gallery modal.
10. Lighthouse basic pass for accessibility/performance (non-blocking target baseline).

## Open punten / toekomstige uitbreidingen
## Assumptions & Defaults
- Dutch copy is the primary launch copy.
- Pricing values and exact policy text will be provided later; placeholders allowed in spec.
- One featured room only for initial launch.
- Existing booking provider URL remains unchanged.
- Google Maps embed URL/address details will be inserted from business data later.
