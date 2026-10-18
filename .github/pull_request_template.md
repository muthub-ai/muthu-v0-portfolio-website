## What changes

<!-- One or two sentences; a screenshot for anything a reader sees. -->

## Checks

- [ ] `pnpm build` passes (runs the public-content guardrail)
- [ ] `pnpm exec tsc --noEmit` passes
- [ ] Content rules pass (dates, sources, links, house style)
- [ ] New essay: social card generated (`python3 scripts/og/make-images.py`), new time-sensitive sources added to `playwright/fixtures/source-dates.ts`
- [ ] Every public number traces to the Career Master Profile
- [ ] A decision record in `docs/decisions/` if this changes how the site works
