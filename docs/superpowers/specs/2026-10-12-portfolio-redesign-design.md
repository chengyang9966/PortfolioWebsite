# Portfolio Redesign — Design

**Date:** 2026-10-12
**Goal:** Replace the 2019 Bootstrap template (lorem ipsum, stock projects) with a fast, impressive single-page portfolio that shows Ong Cheng Yang's real work and experience to recruiters, clients and peers.

## Stack

- Static: `index.html`, `css/style.css`, `js/main.js`. No frameworks, no build step.
- Fonts via Google Fonts: Instrument Serif (display), Geist (body), Geist Mono (dates, tags, labels).
- Remove all template baggage: Bootstrap, jQuery, Owl Carousel, Isotope, Magnific Popup, Font Awesome kit, bundled Roboto/FA font files, and every image under `img/` (still in git history).
- Icons: a handful of inline SVGs (GitHub, LinkedIn, arrow, external link).
- Deploy target: GitHub Pages from `master` (not currently enabled; enabling it is a separate, user-confirmed step).

## Visual direction: editorial dark

- Background near-black (`#0c0c0b`), text warm off-white, muted grey for secondary text, one amber accent.
- Large serif display type for name and section headings; mono for metadata.
- Thin hairline rules separate sections and rows; numbered section labels (`01 — Work`).
- Responsive from 360px up; single column on mobile.

## Sections

1. **Nav (sticky):** `CY` monogram · Work · Experience · About · Contact. Active section highlighted via IntersectionObserver.
2. **Hero:** name, pitch ("Full-stack engineer & team lead building AI products"), "Currently Team Lead at Giv AI Labs" status line with a pulsing dot, location (Kuala Lumpur), links: Email, CV (Google Drive PDF), GitHub, LinkedIn. A "years shipping" counter (since 2020).
3. **Selected Work** — numbered case-study rows; each has: title, one-line summary, role, 2–4 "what I did" bullets, stack tags, visual, external link.
   - **01 Mantiq Launch** (Giv AI Labs, 2025–now) — flagship, full width. Idea → validated → branded → live business; 21 AI tools across Validate / Brand / Build / Run; one shared brief powers every tool. Role: Team Lead. Bullets: lead the team building the product; AI tools for businesses and teachers; migrated auth to Cognito and services to ECS. Visual: screenshot of mantiq-launch.com. Link: https://mantiq-launch.com/
   - **02 Signsbeat** (Vitalz, 2024) — AI wellness companion syncing wearables over Bluetooth; longevity index, lifestyle journaling. Role: Senior Full Stack. Built web + mobile from scratch, BLE device connection, AI insights. Visual: fanned phone screenshots from the App Store listing. Link: App Store.
   - **03 HotelX** (IFCA, 2020–2021) — cloud hotel management system trusted by 1,000+ properties. Built features in React/TypeScript/Node/GraphQL; integrated Revenue Monster payments, WhatsApp, Telegram and NodeMailer. Visual: screenshot of ifca.asia/hotelx. Link: https://ifca.asia/hotelx/
   - **04 Loan & Cashier Systems** (Arkmind / FirebiredIt) — compact two-up: Loan application system and cashier admin system; React, Redux Toolkit, Node, Express, Prisma. No visual (typographic card).
4. **Experience** — timeline rows `dates | role | company | one line`:
   - Aug 2025 – Now · Team Lead · Giv AI Labs Sdn Bhd
   - Oct 2024 – Jul 2025 · Freelance Full Stack Developer · Arkmind
   - Jan 2024 – Oct 2024 · Senior Full Stack Developer · Vitalz Sdn Bhd
   - Jan 2022 – Dec 2023 · Node.js Developer · CelcomDigi Berhad
   - May 2021 – Dec 2021 · Software Engineer · Syntrino Solution
   - Sep 2020 – May 2021 · Software Engineer · IFCA Sdn Bhd
5. **About + Stack** — short first-person paragraph (business background → FinTech → engineering, which is why he builds products with the business in mind). Stack grouped: Frontend (React, Next.js, TypeScript, Angular, HTML/CSS), Backend (Node.js, Express, GraphQL, Prisma, PostgreSQL, .NET Core), Cloud (AWS: ECS, Lambda, Cognito, EC2, S3, RDS, CloudFront, CloudWatch; Docker), Mobile (React Native, Bluetooth LE).
   Education condensed: Higher Diploma FinTech (LYIT, 2019); BBus Mgmt (Hons), Enterprise Development Award (LYIT, 2018); European Business & Economics Programme (HWR Berlin, 2017).
6. **Contact footer** — large "Let's build something." + email, socials, © 2026.

## Motion

- Scroll reveal (fade + 16px rise, staggered) via IntersectionObserver.
- Project visuals: subtle pointer-follow tilt/parallax on hover (desktop only).
- Hero: staggered line-in on load.
- All motion disabled under `prefers-reduced-motion: reduce`. Page fully usable without JS (content visible by default; JS adds the `.js` class that enables reveal states).

## Analytics

- GoatCounter (cookie-free, no consent banner). Script tag included with a clearly marked `data-goatcounter` placeholder URL; user creates the account and fills in their code.

## Assets

- `img/work/mantiq.webp`, `img/work/hotelx.webp` — captured with headless Chrome at 1440×900.
- `img/work/signsbeat-1..3.png` — downloaded from the App Store listing.
- `img/og.png` — social share image (1200×630) captured from the hero.
- Meta: title, description, Open Graph/Twitter tags, favicon (SVG monogram).

## Out of scope

Testimonials, newsletter form, "services" section, phone number, blog, multi-page case studies, GitHub profile overhaul (follow-up).

## Verification

- Render in headless Chrome at 1440px and 390px; check for overflow, broken images, console errors.
- Lighthouse-style sanity: no render-blocking libraries, images sized/lazy-loaded, alt text on all images, keyboard focus visible, color contrast ≥ 4.5:1 for body text.
