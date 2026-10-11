# Ong Cheng Yang — Portfolio

Personal portfolio: selected work, experience and contact. Next.js 16 (App Router), TypeScript, Tailwind CSS 4, statically prerendered.

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
| Project screenshots | `src/assets/work/` (static imports, WebP) |

## Check before pushing

```bash
pnpm typecheck && pnpm lint && pnpm build && pnpm smoke
```

`pnpm smoke` asserts the prerendered page contains the real CV content (and no template leftovers).

## Deploy

Hosted on Vercel: import the GitHub repo once and every push to `master` deploys. Visitor stats come from Vercel Web Analytics (`<Analytics />` in `src/app/layout.tsx`); enable it under the project's **Analytics** tab.
