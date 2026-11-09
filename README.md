# Jofrey Igot — Video Portfolio

An iOS-style portfolio site for a video editor. Built with **Next.js 16 (App Router)**, **React 19** and strict **TypeScript**, deployed on **Vercel**.

Live: https://jofrey-igot.vercel.app

## Stack

| Concern   | Choice                                                                           |
| --------- | -------------------------------------------------------------------------------- |
| Framework | Next.js 16, App Router, statically generated pages                               |
| Language  | TypeScript 6 (`strict`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax`)      |
| Styling   | CSS Modules plus CSS-variable design tokens (light/dark), no runtime CSS library |
| Quality   | ESLint 10 (`eslint-config-next`), Prettier, Vitest                               |
| CI        | GitHub Actions: format check, lint, type-check, tests, production build          |
| Hosting   | Vercel (production from `main`, a preview URL for every branch and pull request) |
| Node      | 24 LTS (`.nvmrc`)                                                                |

TypeScript stays on 6.x for now: 7.0 (the Go compiler) has no programmatic API yet, which `typescript-eslint` needs. Move to 7.x once 7.1 ships it.

## Getting started

```bash
nvm use            # Node 24
npm ci
npm run dev        # http://localhost:3000
```

| Command          | What it does                             |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | Development server                       |
| `npm run build`  | Production build (also type-checks)      |
| `npm run verify` | Format check, lint, type-check and tests |
| `npm run format` | Format all files with Prettier           |
| `npm test`       | Unit tests                               |

## Updating content

All text and videos live in `src/content/`. Pages never contain content, so most changes touch one file.

**Add a video** — open `src/content/projects.ts`, copy an entry, and change it:

```ts
{
  id: 'd76',                    // unique, never reused
  title: 'My new reel',
  category: 'food',             // food | talk | ugc | kids (see categories.ts)
  client: '@someclient',        // optional tag
  hue: 30,                      // placeholder gradient colour, 0-360
  media: drive('https://drive.google.com/file/d/<id>/view'),
}
```

The Drive file must be shared as "Anyone with the link → Viewer". A link or bare file id both work. `youtube('ID')`, `vimeo('ID')` and `file('/videos/x.mp4')` are also available.
Other optional fields: `description`, `tools`, `thumbnail`, `orientation`, `featured: true` (only one video).

| To change…                 | Edit                        |
| -------------------------- | --------------------------- |
| Categories and their order | `src/content/categories.ts` |
| Name, bio, contact, links  | `src/content/site.ts`       |
| Resume text                | `src/content/resume.ts`     |
| Resume PDF                 | replace `public/resume.pdf` |
| Services                   | `src/content/services.ts`   |

`npm test` fails on duplicate ids, unknown categories or malformed Drive links, and a bad `drive(...)` value fails the build, so mistakes never reach the live site.

## Project structure

```
src/
  app/            Routes (/, /about, /services, /resume, /contact), layout, SEO files, icons
  components/
    layout/       Nav bar, tab bar, theme toggle, skip link
    work/         Gallery, filter pills, video cards, bottom-sheet player
    about/ resume/ ui/   Page-specific parts and shared building blocks
  content/        Typed content: videos, categories, site details, resume, services
  lib/            Pure, unit-tested logic (Drive links, filtering, layout maths, theme, routes)
  hooks/          Small React hooks
```

Principles: content is data, logic is pure functions with tests, components are small and typed, and anything the browser must do (play video, swipe, theme) lives in a few client components. Everything else renders on the server at build time.

## How some things work

- **Video playback** — Drive videos play in an iframe. Drive's player crops video when its frame is narrower than about 300px, so the frame is rendered at least 360px wide and scaled down to fit (`lib/frame.ts`, `work/video-player.tsx`).
- **Video shape** — each cover image is measured when it loads, and the card and player switch to tall, wide or square (`lib/orientation.ts`).
- **Player sheet** — a native `<dialog>`: focus is trapped, Escape closes it, and the page behind is inert. Swipe the handle down to close.
- **Theme** — follows the device until the visitor uses the toggle; the choice is saved and applied before first paint (`lib/theme.ts`).
- **Old links** — `/#about` style links from the first version redirect to the new pages.
- **Security headers** — a Content-Security-Policy and other headers are set in `next.config.ts`. If a new video host is added, allow it in `frame-src`.

## Deployment

- Pushing to `main` deploys to production. Every other branch and pull request gets its own preview URL.
- `vercel.json` pins the framework to Next.js.
- To roll back: revert the commit on `main` (`git revert <sha>`) or promote an earlier deployment in the Vercel dashboard.
- Optional environment variable: `NEXT_PUBLIC_SITE_URL` — the public address, used for canonical links and the sitemap. Defaults to the Vercel URL; set it if a custom domain is added.

## Quality gates

CI (`.github/workflows/ci.yml`) runs on every push and pull request: `npm ci`, format check, lint, type-check, tests, build. Dependabot opens weekly update PRs, grouped by minor/patch.
