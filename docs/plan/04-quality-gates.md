# 4. Quality gates

**Outcome:** two required checks gate every pull request. The detail is in [docs/ci.md](../ci.md); this is the plan.

| Check | Contains | Time |
|---|---|---|
| **types and content rules** | blocklist configured · public-content guardrail (decision M03) · `tsc --noEmit` · content rules (decision M04) | ~2 min |
| **build, end-to-end tests, links** | `pnpm build` · Playwright over every page, structured data, twins and headers, security headers, redirects, search, dark mode, mobile menu · internal link check over the sitemap | ~6 min |
| weekly links (not blocking) | external links in the essays; opens an issue if any break | Mondays |

## Steps

1. **Secret** `PUBLIC_CONTENT_BLOCKLIST` (one term per line). The guardrail fails CI if it is missing.
2. **Branch protection** on `main`: require a pull request and both checks.
3. **pnpm 10** in CI (`pnpm/action-setup` with version 10): `pnpm-workspace.yaml` uses pnpm 10 settings and pnpm 9
   refuses it.
4. `.github/ci-run.sh` copies a failing step's tail into a check annotation.
