# M04: Integrity rules for dated writing

Status: accepted, October 2026

## Context

Essays were adapted from posts written over two years. A reader must be able to trust that a piece dated May did not
quietly cite something from September.

## Decision

Content tests enforce ISO dates, nothing dated in the future, `updated` never before `published`, and no piece citing a
known source (listed with its first-publication date in `playwright/fixtures/source-dates.ts`) published after the
piece. Internal links must resolve and never point to a later piece.

## Consequences

Adding a time-sensitive source means adding one fixture row. Backdating is caught by CI.
