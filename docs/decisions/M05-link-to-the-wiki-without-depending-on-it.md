# M05: Link to the knowledge graph without depending on it

Status: accepted, October 18, 2026 (see ADR 015 in the knowledge repository)

## Context

The Knowledge Foundation graph at wiki.muthub.org is the best demonstration of the essays' ideas, but the essays site
must never fail or slow down because of it.

## Decision

A highlighted "Graph" link in the header and a dark band under the home hero. The band reads
`wiki.muthub.org/graph.json` with a 4-second timeout, revalidated hourly (ISR), counts notes and connections with the
wiki's own rules (extracted entities and machine edges excluded), and falls back to the last known figures. The
footer's "Last updated" is fixed at build so regeneration cannot change it.

## Consequences

The band's numbers can lag a knowledge release by up to an hour. Everything else on the site is static.
