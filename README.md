# muthub.org

Personal site of Muthukrishnan (Muthu) Bommiah: essays, initiatives and profile on governed enterprise AI in financial services. Built with Next.js (App Router), Tailwind CSS and hosted on Vercel.

## Run locally

```bash
pnpm install
pnpm dev        # http://localhost:3000 (draft essays visible)
pnpm build      # runs the public-content check, then a production build (drafts hidden)
pnpm test:e2e   # Playwright tests, with pnpm dev running
```

## Where things live

| Path | What |
|---|---|
| `content/site.ts` | Name, tagline, bio line, numbers, social links, newsletter URL, themes |
| `content/essays.ts` | Essays and notes. Set `status: "published"` and `published: "YYYY-MM-DD"` to publish one |
| `content/initiatives.ts` | Case studies (problem, approach, governance, outcome, lesson) |
| `content/about.ts` | About page, career, bios, Reach me lists and the Now page |
| `app/` | Pages, plus `/llms.txt`, `/rss.xml`, `/sitemap.xml` and Markdown twins (`/<page>.md`) |
| `scripts/check-public-content.mjs` | Fails the build if a private or stale term appears. The private list stays in git-ignored `.confidential-terms.txt` |

## Publishing rules

- Every number must trace to the Career Master Profile.
- Drafts never appear in production. Preview them with `pnpm dev`, or set `NEXT_PUBLIC_SHOW_DRAFTS=true` on a Vercel preview deployment.
- Views are the author's own and do not represent his employer.
