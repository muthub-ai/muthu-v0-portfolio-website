# 3. Vercel, DNS and security headers

**Outcome:** `main` deploys the apex domain with strict headers; previews are private.

## Steps

1. **Vercel project** from this repository (framework Next.js). Production branch `main`.
2. **Domain:** add the apex domain; with nameservers on Vercel, records are managed there (the wiki subdomain lives in
   the other project).
3. **Headers** (`next.config.mjs`): a Content-Security-Policy allowing only the site, Vercel analytics and Microsoft
   Clarity (and the newsletter provider as a form action), HSTS with subdomains, `nosniff`, `X-Frame-Options: DENY`,
   `Referrer-Policy`, a restrictive `Permissions-Policy`, `Cross-Origin-Opener-Policy`. `upgrade-insecure-requests`
   only on Vercel, so local `pnpm start` over http still works.
4. **Redirect** the old `*.vercel.app` production host to the domain (host-matched, so previews keep working).
5. **Analytics:** Vercel Web Analytics and Microsoft Clarity, both allowed by the CSP.

## Check it worked

`curl -I https://<domain>/` shows the CSP and HSTS; the old host returns 301 to the domain.

## Gotchas

- Any new third-party script or form target must be added to the CSP, or it fails silently in the browser; the
  Playwright header tests catch regressions.
