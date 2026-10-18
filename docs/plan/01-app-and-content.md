# 1. The app and its content

**Outcome:** a Next.js 14 App Router site whose every page comes from typed content files.

## Steps

1. **Scaffold** Next.js 14 (App Router), TypeScript, Tailwind CSS 3, `next-themes` for dark mode. Fonts: Newsreader
   (serif) and Instrument Sans (sans), self-hosted through `next/font`.
2. **Design tokens** as RGB triplets in `app/globals.css` (`--page`, `--ink`, `--body`, `--muted`, `--line`,
   `--panel`, `--accent`, `--band`…) with a `.dark` set; Tailwind maps them (`tailwind.config.ts`). Text colours meet
   WCAG AA on their backgrounds in both themes.
3. **Content model** (decision M01) in `content/`:
   - `site.ts`: names, tagline, bio, navigation (the highlighted "Graph" entry), themes, social links;
   - `essays.ts`, `essays-more.ts`, `context-engineering.ts`: essays and notes as typed objects with `slug`, `title`,
     `summary`, `theme`, `status`, `published`, `updated`, `related`, `series` and a `body` of typed blocks
     (`p`, `h2`, `ul`, `ol`, `quote`, `code`, `figure`, `bottomLine`);
   - `initiatives.ts`, `playbooks.ts`, `about.ts`.
4. **Pages:** home (hero, Knowledge Foundation band, featured, latest, playbooks, start here), writing hub with theme
   and tag pages, essay pages with reading time and related pieces, initiatives, playbooks, about, reach, now, search,
   a 404 with search.
5. **Drafts** are visible in `pnpm dev` and on previews with `NEXT_PUBLIC_SHOW_DRAFTS=true`, never in production.

## Check it worked

`pnpm dev`, then open a draft and a published essay; switch dark mode; search with `/`.

## Gotchas

- `next.config.mjs` ignores type errors during `next build`; CI runs `tsc --noEmit` separately so none slip through.
- An async server component cannot be used directly in JSX with this project's React types: fetch in the page and pass
  props (as the Knowledge Foundation band does).
