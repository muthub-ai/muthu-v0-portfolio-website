# 5. Operations

| Task | How |
|---|---|
| Publish an essay | Add or flip it to `status: "published"` with `published: "YYYY-MM-DD"`; add new time-sensitive sources to `playwright/fixtures/source-dates.ts`; run `python3 scripts/og/make-images.py`; open a pull request |
| Change the tagline | `content/site.ts` (feeds the H1, titles, Open Graph, JSON-LD, `llms.txt`); regenerate the social card |
| Add a private term | Add it to `.confidential-terms.txt` locally and to the `PUBLIC_CONTENT_BLOCKLIST` secret |
| Check links | `node scripts/check-links.mjs` (internal) or `--external` |
| Roll back | Promote the previous production deployment in Vercel, or revert the merge |

## Failure modes

| Symptom | Likely cause | Action |
|---|---|---|
| Build fails in the guardrail without saying the term | A private or stale term in content | Search your change for recently added names; the checker never prints the term by design |
| Content rule fails on dates | A cited source is newer than the piece, or `updated` is earlier than `published` | Fix the date or the citation |
| "No em or en dashes in published prose" | House style | Reword; quoted ranges count too |
| Knowledge Foundation band shows old counts | It refreshes hourly | Wait, or redeploy |
| Footer date looks wrong | It is the latest commit time, in Central time | Expected |
