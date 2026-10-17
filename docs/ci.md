# Continuous integration for muthub.org

Every pull request and every push to `main` runs `.github/workflows/ci.yml`:

1. **Types and content rules** (about 2 minutes)
   - the confidential-terms list is configured (fails if the secret is missing)
   - public-content guardrail (`scripts/check-public-content.mjs`)
   - TypeScript type check (`tsc --noEmit`), which catches the errors `next.config.mjs` lets a build ignore
   - content rules (`playwright/tests/content.spec.ts`): ISO dates, nothing dated in the future, `updated` never
     before `published`, no essay citing a known source published after the essay (`playwright/fixtures/source-dates.ts`),
     internal links resolve and never point forward, related slugs exist, https only, house structure, no em dashes
2. **Build, end-to-end tests, links** (about 6 minutes)
   - `pnpm build` (runs the guardrail again)
   - Playwright against the production build: every page, essay, initiative, playbook and tag; structured data;
     Markdown twins and their noindex header; llms.txt, RSS, sitemap, robots; security headers; redirects; 404 with
     search; header, mobile menu and dark mode; search by `/`, Ctrl+K, arrows and Enter; assessment scoring; Reach
     page has LinkedIn and no email address
   - internal link check over every sitemap URL and every same-site link on those pages

`.github/workflows/weekly-links.yml` checks external links in the essays every Monday and opens an issue if any are
broken. It never blocks a deploy.

## One-time setup (Muthu, in GitHub settings)

1. **Secret:** Settings > Secrets and variables > Actions > New repository secret.
   Name `PUBLIC_CONTENT_BLOCKLIST`; value: the contents of `.confidential-terms.txt` (one term per line).
2. **Branch protection:** Settings > Branches > Add rule for `main`:
   - Require a pull request before merging
   - Require status checks to pass: `types and content rules`, `build, end-to-end tests, links`
   - Require branches to be up to date before merging
   - Do not allow bypassing the above settings (optional; leave off if you want an emergency path)
3. From then on: work on a branch, push it, open a pull request, merge when green. Vercel deploys `main` as before.

## Running the checks locally

```
pnpm build && pnpm start          # terminal 1
pnpm exec playwright test         # terminal 2 (all three browsers locally)
node scripts/check-links.mjs      # internal links
node scripts/check-links.mjs --external   # also external links
```

## Adding a cited source

When an essay cites a new time-sensitive source (a report, a release, a spec version), add a row to
`playwright/fixtures/source-dates.ts` with its first-publication date. The content rules then stop any older essay
from citing it.
