# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 2019 Bootstrap template with an editorial-dark, single-page Next.js portfolio driven by typed CV data.

**Architecture:** Next.js App Router with `output: "export"` produces a fully static site. All CV content lives in `src/content/*.ts` as typed data; section components in `src/components/` only render it. Interactivity (active nav, reveal, tilt) is isolated in small client components; everything else is a server component.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, motion 14, @vercel/analytics 2, pnpm.

**Spec:** `docs/superpowers/specs/2026-10-12-portfolio-redesign-design.md`

---

## File structure

| File | Responsibility |
|---|---|
| `src/content/types.ts` | `Project`, `Role`, `SkillGroup`, `Education`, `Profile` types |
| `src/content/profile.ts` | name, pitch, links, current role, location, start year |
| `src/content/projects.ts` | 4 case studies (ordered) |
| `src/content/experience.ts` | 6 roles, newest first |
| `src/content/about.ts` | about paragraphs, skill groups, education |
| `src/app/layout.tsx` | fonts, metadata/OG, `<Analytics />` |
| `src/app/page.tsx` | composes sections in order |
| `src/app/globals.css` | Tailwind import, theme tokens, base styles, reduced-motion |
| `src/app/icon.svg` | CY monogram favicon |
| `src/components/nav.tsx` | client; sticky nav, active section via IntersectionObserver |
| `src/components/hero.tsx` | hero |
| `src/components/section-label.tsx` | `01 — Work` label + heading |
| `src/components/reveal.tsx` | client; scroll reveal wrapper (motion) |
| `src/components/tilt.tsx` | client; pointer-follow tilt wrapper |
| `src/components/work.tsx` | Selected Work section |
| `src/components/project-row.tsx` | one case study row |
| `src/components/project-visual.tsx` | browser frame / phone fan / typographic card |
| `src/components/experience.tsx` | timeline |
| `src/components/about.tsx` | about + stack + education |
| `src/components/contact.tsx` | footer CTA |
| `src/components/icons.tsx` | inline SVG icons |
| `public/work/*` | screenshots |
| `public/og.png` | 1200×630 share image |
| `scripts/smoke.mjs` | post-build content assertions on `out/index.html` |

Verification for this project is build-level rather than unit TDD (a content-only static site has no logic worth unit-testing): `pnpm typecheck`, `pnpm lint`, `pnpm build`, `node scripts/smoke.mjs`, and headless-Chrome screenshots at 1440px and 390px.

---

### Task 1: Remove template, scaffold Next.js

**Files:** delete `index.html`, `Js/`, `css/`, `fonts/`, `icons/`, `img/`, `vendor/`; create Next.js scaffold at repo root.

- [ ] **Step 1:** `git rm -rq index.html Js css fonts icons img vendor`
- [ ] **Step 2:** Scaffold in a temp dir and move in:
  ```bash
  pnpm dlx create-next-app@16.4.0 /tmp/cy-scaffold --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --no-turbopack --yes
  rsync -a --exclude .git --exclude node_modules /tmp/cy-scaffold/ ./ && pnpm install
  ```
- [ ] **Step 3:** `next.config.ts` → `{ output: "export", images: { unoptimized: true } }`. Add scripts `"typecheck": "tsc --noEmit"`, `"smoke": "node scripts/smoke.mjs"`. `pnpm add motion @vercel/analytics`.
- [ ] **Step 4:** Run `pnpm build`. Expected: succeeds, `out/index.html` exists.
- [ ] **Step 5:** Commit `chore: replace 2019 template with Next.js scaffold`.

### Task 2: Content data

**Files:** create `src/content/{types,profile,projects,experience,about}.ts`.

- [ ] **Step 1:** Write types:
  ```ts
  export type Link = { label: string; href: string };
  export type Visual =
    | { kind: "browser"; src: string; alt: string; url: string }
    | { kind: "phones"; shots: { src: string; alt: string }[] }
    | { kind: "type"; lines: string[] };
  export type Project = {
    slug: string; index: string; title: string; org: string; period: string;
    summary: string; role: string; points: string[]; stack: string[];
    visual: Visual; link?: Link; featured?: boolean;
  };
  export type Role = { period: string; title: string; company: string; line: string; current?: boolean };
  export type SkillGroup = { name: string; items: string[] };
  export type Education = { year: string; title: string; school: string; note?: string };
  ```
- [ ] **Step 2:** Fill data files with exactly the content listed in the spec (§Sections 3–5). Experience newest first, six roles including Arkmind freelance Oct 2024 – Jul 2025.
- [ ] **Step 3:** `pnpm typecheck` → no errors. Commit `feat: add typed CV content`.

### Task 3: Assets

**Files:** `public/work/mantiq.webp`, `public/work/hotelx.webp`, `public/work/signsbeat-{1,2,3}.webp`.

- [ ] **Step 1:** Capture with headless Chrome:
  ```bash
  CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  "$CH" --headless=new --hide-scrollbars --window-size=1440,900 --virtual-time-budget=8000 --screenshot=/tmp/mantiq.png https://mantiq-launch.com/
  "$CH" --headless=new --hide-scrollbars --window-size=1440,900 --virtual-time-budget=8000 --screenshot=/tmp/hotelx.png https://ifca.asia/hotelx/
  ```
- [ ] **Step 2:** Download first 3 App Store screenshots (URLs from `itunes.apple.com/lookup?id=6499316817&country=my`, swap `392x696bb` → `784x1392bb`).
- [ ] **Step 3:** `cwebp -q 82` each into `public/work/`. View each image to confirm it rendered real content (no cookie wall/blank). Re-capture with longer budget if not.
- [ ] **Step 4:** Commit `feat: add project screenshots`.

### Task 4: Theme, layout, metadata

**Files:** `src/app/globals.css`, `src/app/layout.tsx`, `src/app/icon.svg`.

- [ ] **Step 1:** `globals.css`: `@import "tailwindcss";` + `@theme` tokens: `--color-ink #0c0c0b`, `--color-paper #ecebe6`, `--color-muted #8d8b84`, `--color-line #26251f`, `--color-accent #f2a541`; font vars `--font-serif/--font-sans/--font-mono` from next/font CSS variables. Base: `html{scroll-behavior:smooth}` (disabled under reduced motion), `::selection` accent, focus-visible ring accent, subtle grain via SVG noise background on body.
- [ ] **Step 2:** `layout.tsx`: load `Instrument_Serif` (400, normal+italic), `Geist`, `Geist_Mono` via `next/font/google` with `variable`; `metadata` with title "Ong Cheng Yang — Full-stack Engineer & Team Lead", description, `metadataBase`, openGraph/twitter images `/og.png`; render `<Analytics />`.
- [ ] **Step 3:** `icon.svg`: 32×32 rounded square, ink bg, "CY" in accent serif.
- [ ] **Step 4:** `pnpm build` passes. Commit.

### Task 5: Primitives

**Files:** `icons.tsx`, `reveal.tsx`, `tilt.tsx`, `section-label.tsx`.

- [ ] **Step 1:** `reveal.tsx` (client): `motion.div` with `initial={{opacity:0,y:16}}`, `whileInView={{opacity:1,y:0}}`, `viewport={{once:true,margin:"-10% 0px"}}`, `transition={{duration:0.7,ease:[0.22,1,0.36,1],delay}}`; uses `useReducedMotion()` to render a plain div when reduced.
- [ ] **Step 2:** `tilt.tsx` (client): tracks pointer on element, sets `rotateX/rotateY` (max 4°) via `useSpring` motion values; no-op on coarse pointers and reduced motion.
- [ ] **Step 3:** `section-label.tsx`: `<p class="font-mono text-xs uppercase tracking-[0.2em] text-muted">{index} — {label}</p>` then `<h2 class="font-serif text-5xl md:text-7xl">`.
- [ ] **Step 4:** `icons.tsx`: `ArrowUpRight`, `GitHub`, `LinkedIn`, `Mail`, `FileText` SVG components with `aria-hidden`.
- [ ] **Step 5:** typecheck + commit.

### Task 6: Nav + Hero

- [ ] **Step 1:** `nav.tsx` (client): fixed top, blurred ink background after 24px scroll; links to `#work #experience #about #contact`; IntersectionObserver (`rootMargin: "-45% 0px -50% 0px"`) sets active id → accent dot beside active link. Mobile: monogram + "Contact" only.
- [ ] **Step 2:** `hero.tsx`: min-h-svh, bottom-aligned. Mono status line with pulsing accent dot "Currently — Team Lead at Giv AI Labs". `h1` serif, `text-[clamp(3.5rem,11vw,10rem)]`, "Ong" / "Cheng Yang" (second line italic). Pitch paragraph max-w-xl. Row of link pills (Email, CV, GitHub, LinkedIn). Right-bottom mono stats: `{years}+ yrs shipping` (computed from `profile.since`), `Kuala Lumpur, MY`. Lines stagger in via `Reveal` delays.
- [ ] **Step 3:** Wire into `page.tsx`; `pnpm build`; commit.

### Task 7: Work section

- [ ] **Step 1:** `project-visual.tsx`: `browser` → rounded frame with 3 dots + mono URL bar, `<img>` (lazy, width/height set); `phones` → 3 phone frames overlapping, rotated −6°/0°/6°, middle raised; `type` → bordered card with large serif lines.
- [ ] **Step 2:** `project-row.tsx`: grid `md:grid-cols-12`; left (cols 1–5): index + org/period mono, serif title, summary, role, points list with accent en-dash bullets, stack tags (mono, bordered pills), link with ArrowUpRight. Right (cols 6–12): `Tilt` → `ProjectVisual`. Featured row: visual spans full width under the text. Alternate sides on desktop for non-featured rows.
- [ ] **Step 3:** `work.tsx`: `id="work"`, `SectionLabel index="01" label="Selected work"`, map projects with `Reveal`, hairline between rows.
- [ ] **Step 4:** build + commit.

### Task 8: Experience, About, Contact

- [ ] **Step 1:** `experience.tsx`: `id="experience"`, label 02. Rows: `grid md:grid-cols-[10rem_1fr_1fr]` period (mono) | title (serif text-2xl) + company | line (muted). Current role gets accent "Now". Row hover: line brightens, slight x-shift.
- [ ] **Step 2:** `about.tsx`: `id="about"`, label 03. Two columns: paragraphs (serif lead sentence, then sans) | skill groups (mono heading, items inline separated by `·`) + education list.
- [ ] **Step 3:** `contact.tsx`: `id="contact"`, label 04, huge serif "Let's build something." with email as underlined accent link, social icons, `© 2026 Ong Cheng Yang · Built with Next.js`.
- [ ] **Step 4:** build + commit.

### Task 9: OG image, smoke test, visual QA

- [ ] **Step 1:** `scripts/smoke.mjs`: read `out/index.html`, assert it contains each of: "Ong", "Mantiq Launch", "Signsbeat", "HotelX", "Giv AI Labs", "Arkmind", "CelcomDigi", "Syntrino", "IFCA", "Vitalz", "linkedin.com/in/chengyangong", "github.com/chengyang9966", and does NOT contain "Lorem"; exit 1 listing failures.
- [ ] **Step 2:** `pnpm build && pnpm smoke` → "smoke: all checks passed".
- [ ] **Step 3:** Serve `out/` (`npx serve out -l 4173`), screenshot at 1440×900 full page and 390×844; inspect for overflow, broken images, contrast. Fix issues.
- [ ] **Step 4:** Capture hero at 1200×630 → `public/og.png`. Rebuild.
- [ ] **Step 5:** `pnpm lint && pnpm typecheck`. Write `README.md` (what it is, `pnpm dev`, where content lives, deploy). Commit.
