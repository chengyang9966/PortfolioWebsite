# Ong Cheng Yang — Portfolio

Personal portfolio: selected work, case studies, experience and contact. Next.js 16 (App Router), TypeScript, Tailwind CSS 4, GSAP + Lenis for motion, React `<ViewTransition>` for page transitions. Fully prerendered.

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Update content

All CV content lives in typed data files. Components only render it.

| What | File |
| --- | --- |
| Name, links, current role | `src/content/profile.ts` |
| Case studies + "Also built" | `src/content/projects.ts` |
| Experience timeline | `src/content/experience.ts` |
| About, tools, education | `src/content/about.ts` |
| Case-study text | `caseStudy` field in `src/content/projects.ts` |
| Project screenshots | `src/assets/work/` (static imports, WebP) |
| Preview videos | `public/work/*.webm` + `*.mp4` (silent loops of public sites) |

## CV

`/cv` renders the CV from `src/content/cv.ts` (plus `profile.ts`). After `pnpm build`:

```bash
pnpm cv                                # public/ong-cheng-yang-cv.pdf, linked from the site (no phone)
CV_PHONE="+60 ..." pnpm cv             # also cv-private/ong-cheng-yang-cv.pdf for emailing (git-ignored)
```

Re-run and commit the public PDF whenever the CV content changes.

## Motion

Primitives live in `src/components/motion/` (smooth scroll, split-text reveal, fade-in, magnetic, cursor, marquee). Everything respects `prefers-reduced-motion`: no preloader, no smooth scroll, no custom cursor, content shown in its final state.

## Check before pushing

```bash
pnpm typecheck && pnpm lint && pnpm build && pnpm smoke
```

`pnpm smoke` asserts the prerendered page contains the real CV content (and no template leftovers).

## Branches and deploys

- **`main`**: the live site. Vercel deploys every push to `main` to production.
- **Changes**: work on a branch, open a pull request into `main`, check the Vercel preview link on the PR, then merge.
- **`legacy`** (and tag `v1-legacy`): the original 2019 Bootstrap site, kept frozen for reference.

Visitor stats come from Vercel Web Analytics (`<Analytics />` in `src/app/layout.tsx`); enable it under the project's **Analytics** tab.
