# Portfolio v2 — Motion layer & case studies

**Date:** 2026-10-12
**Builds on:** `2026-10-12-portfolio-redesign-design.md` (identity, palette, type, content stay).
**Why:** v1 read as clean but static next to award-level portfolios (mikewilcockdesign.com, auge-xp.com). The gap is motion, interactivity and depth, not palette.

## Decisions (from user)

- Keep the identity (harbour teal, Newsreader + Schibsted Grotesk, sodium accent); add a full motion layer. No WebGL.
- Each project gets a case-study page with a shared-element page transition.
- Work previews use silent video loops of **public** pages only (Mantiq, HotelX). Signsbeat uses App Store phone shots.
- Mantiq copy: Cheng Yang works on the product app (the 21 tools), backend/infrastructure, and leads the team — not the marketing site.
- Drop the HotelX staff-login screenshot. Add a credit line: product names and imagery belong to their companies.

## Libraries

- `lenis` — smooth scroll, driven by the GSAP ticker.
- `gsap` + `ScrollTrigger` + `SplitText`, via `@gsap/react` `useGSAP` for cleanup.
- React 19.3 `<ViewTransition>` + `<Link transitionTypes>` for route transitions (no config needed in Next 16).
- `motion` removed (GSAP covers it).

## Global layer

- **Smooth scroll:** Lenis root instance; scrolls to top on route change; disabled under reduced motion.
- **Preloader:** first visit per session only. Full-screen panel, serif counter 0→100 (~1.6s), panel wipes up, then the hero intro plays. An inline head script marks `html.js` and `html.seen` before paint so repeat visits never flash it.
- **Cursor:** fine pointers only. Small paper dot (difference blend) that lags the pointer; grows into a sodium "View" disc over `[data-cursor="view"]`, a ring over links. Native cursor hidden while active.
- **Magnetic** buttons for primary CTAs (Email me, contact email, socials).
- **Letter-roll** hover on nav links (CSS, duplicated label slides up).
- **Grain** overlay, fixed, ~5% opacity.
- **Header:** name (left), live Kuala Lumpur clock (centre, desktop), nav + "Email me" (right). On case pages nav links point to `/#section`.
- **Reduced motion:** no Lenis, no preloader, no cursor, reveals render in final state, marquee static.
- **No-JS / pre-hydration:** content is server-rendered and visible; intro-animated elements are hidden only under `html.js`, with a 3s CSS fallback that reveals them if JS fails.

## Home page

1. **Hero:** as v1, but the name animates per character (masked rise, staggered) after the preloader; status line and intro fade up. On scroll, the name drifts up slower than the page (parallax) and the intro fades.
2. **Marquee:** large Newsreader italic list of stack words separated by sodium diamonds; speed and direction react to scroll velocity.
3. **Selected work (desktop ≥1024px):** left 5 cols list of projects (index, serif title, role and year, "View case study"); right 7 cols sticky 16:10 preview. Scrolling (or hovering) a row activates it: the preview swaps with a clip-path wipe, the active video plays, others pause. Counter `(01 / 03)` + progress bar under the preview. Click opens `/work/[slug]` with the preview morphing into the case-study hero.
   **Mobile/tablet:** stacked cards — media (video autoplays when in view) then title and meta.
   "Also built" stays below, with reveals.
4. **Experience:** rows stagger in; hover sweeps a raised-colour fill across the row.
5. **About:** lead paragraph reveals line-by-line; tool rows stagger.
6. **Contact:** "Let's build something." scrubs in per character as it scrolls into view; magnetic email; clock.

## Case-study page `/work/[slug]`

Statically generated for each project.
- Back link "All work" (nav-back transition).
- Title (split reveal) + facts row: Role, Company, Year, Built with.
- Hero media (shared `ViewTransition` name with the home preview).
- Overview paragraph (large serif), then 2–3 sections (heading + body) in a two-column layout.
- Gallery: screenshots with clip reveal and slight parallax.
- Credit line.
- Next project: huge serif title linking forward (nav-forward), wrapping to the first project.
- Contact footer.

## Content model changes

`Project` gains: `year`, `media` (`video` with webm/mp4/poster, or `phones`), and `caseStudy` (`overview`, `sections[]`, `gallery[]`). Case-study text uses only facts from the CV and the user's answers; no invented metrics.

## Assets

- `public/work/mantiq.{webm,mp4}`, `public/work/hotelx.{webm,mp4}` — ~10s silent loops, 1280×800, recorded with puppeteer + ffmpeg scrolling the public site (cookie banner dismissed). Posters are the existing screenshots.
- Extra gallery captures for HotelX modules page if available.

## Verification

- `pnpm typecheck && pnpm lint && pnpm build && pnpm smoke` (smoke also checks each case page HTML exists and contains its title).
- Headless Chrome: home at 1440 and 390, a case page at 1440 and 390, a click-through from the work list to a case page, no console errors besides local Vercel Analytics 404, no horizontal overflow.
- Reduced-motion run: page fully visible, no preloader.
