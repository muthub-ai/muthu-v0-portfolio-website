# M02: Every page is readable by agents

Status: accepted, 2026 (recorded October 18, 2026)

## Context

The audience includes assistants and agents that summarise or cite the essays. HTML alone is a poor source for them.

## Decision

Every page has a Markdown twin (`/<page>.md`, rewritten to the `app/md/[[...path]]` route and served with `X-Robots-Tag: noindex, follow` so it never competes with the
HTML in search), schema.org JSON-LD (Person, ProfilePage, WebSite, Article), and `/llms.txt` lists the canonical pages.

## Consequences

Agents get clean text with the canonical URL; search engines index only the HTML. Tests cover the twins and headers.
