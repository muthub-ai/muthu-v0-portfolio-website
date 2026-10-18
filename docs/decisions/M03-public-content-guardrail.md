# M03: A public-content guardrail runs before every build

Status: accepted, October 2026

## Context

The author works inside a regulated employer. Some names, programs and figures must never appear publicly, and the
list itself is private.

## Decision

`scripts/check-public-content.mjs` runs before `next build` with built-in checks (stale phrases, email addresses) and a
private term list: `.confidential-terms.txt` locally (git-ignored), the `PUBLIC_CONTENT_BLOCKLIST` secret in CI. CI
fails if the secret is missing. A match fails the build without printing the term. Every public number traces to the
author's private master profile.

## Consequences

Nothing confidential can be deployed by accident, including by an agent editing content.
