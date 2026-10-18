# Plan: build muthub.org again

The essays site. It stands alone: if the Knowledge Foundation disappeared tomorrow, this site would build and serve
unchanged (decision M05). The wider three-repository system is planned in the knowledge repository's
[docs/plan](https://github.com/muthub-ai/knowledge-foundation/tree/main/docs/plan).

| # | Document | Outcome |
|---|---|---|
| 1 | [01-app-and-content.md](01-app-and-content.md) | A Next.js App Router site with typed content, themes, search and dark mode |
| 2 | [02-readable-by-agents.md](02-readable-by-agents.md) | Markdown twins, `llms.txt`, RSS, sitemap, JSON-LD, social cards |
| 3 | [03-vercel-dns-security.md](03-vercel-dns-security.md) | Production on Vercel at the apex domain with strict headers |
| 4 | [04-quality-gates.md](04-quality-gates.md) | The guardrail, type check, content rules, end-to-end and link checks gating every pull request |
| 5 | [05-operations.md](05-operations.md) | Publishing, updating, rollback, failure modes |

**Prerequisites:** Node 22, pnpm 10, a Vercel account managing the domain's DNS, Python 3 with Pillow and fontTools for
social cards, and a private term list for the guardrail.
