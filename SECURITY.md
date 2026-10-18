# Security

muthub.org is a static personal site: no accounts, no stored personal data, no email address published anywhere.
It is served with a strict Content-Security-Policy, HSTS and frame denial (see `next.config.mjs`), and a public-content
guardrail with a private term list runs before every build.

**Reporting a problem:** please use GitHub's private vulnerability reporting (the **Security** tab → "Report a
vulnerability"), not a public issue.
