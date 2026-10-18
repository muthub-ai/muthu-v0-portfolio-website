# M01: Content as typed code, not a CMS

Status: accepted, 2025 (recorded October 18, 2026)

## Context

One author, a few dozen essays, strict rules on dates, sources and numbers. A CMS adds an account, a runtime and a
second place where content can drift from its checks.

## Decision

Essays, notes, initiatives, playbooks and site facts live in `content/*.ts` as typed objects. Drafts and published
pieces share one file; `status` and `published` decide visibility.

## Consequences

`tsc` and the Playwright content rules check every piece on every pull request, and git history is the editorial log.
Publishing is a pull request, not a button.
