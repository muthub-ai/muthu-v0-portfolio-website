import Link from "next/link"

// The Knowledge Foundation band under the home hero: the essays as a graph, on wiki.muthub.org. Always dark, in both
// themes, because it is a window into the wiki (which is dark by default). The counts come from the wiki's own
// graph.json at build time; when it cannot be reached (local builds, CI without network) the last known figures stand.

export const WIKI_URL = "https://wiki.muthub.org"
const FALLBACK = { notes: 51, connections: 133, themes: 5 }

export type WikiCounts = typeof FALLBACK

export async function wikiCounts(): Promise<WikiCounts> {
  try {
    const res = await fetch(`${WIKI_URL}/graph.json`, { signal: AbortSignal.timeout(4000), cache: "force-cache" })
    if (!res.ok) return FALLBACK
    const g = (await res.json()) as { nodes: { id: string; type: string }[]; edges: { origin: string }[] }
    // Same rules as the wiki's own counts: entities Semantica extracted ("ext:" ids) are not notes, and machine-found
    // edges (origin "extracted") are not connections an author made.
    const notes = g.nodes.filter((n) => n.type !== "Source" && n.type !== "Theme" && !n.id.startsWith("ext:")).length
    const themes = g.nodes.filter((n) => n.type === "Theme").length
    const connections = g.edges.filter((e) => e.origin !== "source" && e.origin !== "extracted").length
    return notes && themes ? { notes, connections, themes } : FALLBACK
  } catch {
    return FALLBACK
  }
}

const chips = [
  { name: "Governed AI", colour: "#5fd3e0" },
  { name: "Data & AI platforms", colour: "#93a2ff" },
  { name: "AI-native SDLC", colour: "#f5b360" },
  { name: "Leading AI change", colour: "#f584b8" },
  { name: "Context engineering", colour: "#74d6a0" },
]

export function KnowledgeFoundationBand({ counts }: { counts: WikiCounts }) {
  return (
    <section aria-labelledby="kf-heading" data-testid="knowledge-foundation" className="border-y border-line bg-[#0f1114] text-[#c3c6cc]">
      <div className="container-site flex flex-wrap items-stretch">
        <div className="flex min-w-0 flex-[1_1_400px] flex-col justify-center gap-4 py-12 lg:pr-12">
          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6ec4d2]">New · Knowledge Foundation</p>
          <h2 id="kf-heading" className="font-serif text-[2.1rem] font-medium leading-[1.1] tracking-[-0.02em] text-[#ededea] sm:text-[2.5rem]">
            The essays, as a graph you can walk.
          </h2>
          <p className="max-w-[520px] text-[17px] leading-relaxed">
            A living wiki built from everything on this site: {counts.notes} notes across {counts.themes === 5 ? "five" : counts.themes} themes, each with a
            dated source and a review state. Drafted by an LLM librarian in the Open Knowledge Format, checked in CI, reviewed by me,
            rebuilt on every merge.
          </p>
          <dl className="mt-1 flex flex-wrap gap-7">
            {(
              [
                ["Notes", counts.notes],
                ["Connections", counts.connections],
                ["Themes", counts.themes],
              ] as const
            ).map(([label, n]) => (
              <div key={label}>
                <dt className="text-xs uppercase tracking-[0.06em] text-[#a0a6b0]">{label}</dt>
                <dd className="m-0 font-serif text-[26px] text-[#ededea]">{n}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-1 flex flex-wrap gap-3">
            <a href={`${WIKI_URL}/`} className="inline-flex min-h-[48px] items-center rounded-[10px] bg-[#6ec4d2] px-5 font-semibold text-[#0f1114] transition-opacity hover:opacity-90">
              Explore the graph →
            </a>
            <a href={`${WIKI_URL}/#how`} className="inline-flex min-h-[48px] items-center rounded-[10px] border border-[#464a52] px-5 font-semibold text-[#ededea] hover:border-[#6ec4d2]">
              How it works
            </a>
          </div>
        </div>
        <a href={`${WIKI_URL}/`} aria-label="Open the Knowledge Foundation graph" className="relative block min-h-[320px] min-w-0 flex-[1_1_440px] overflow-hidden sm:min-h-[460px]">
          {/* A still of the real graph (regenerated from graph.json with the wiki); the live one is a click away. */}
          <img src="/knowledge-graph.svg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-[1.18] object-cover object-[50%_45%]" />
          <span className="absolute bottom-5 left-4 flex flex-wrap gap-1.5">
            {chips.map((c) => (
              <span key={c.name} className="inline-flex items-center gap-1.5 rounded-full border border-[#2a2d33] bg-[#171a1f] px-2.5 py-1 text-xs text-[#ededea]">
                <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: c.colour }} />
                {c.name}
              </span>
            ))}
          </span>
          <span className="absolute right-0 top-5 rounded-full bg-[#ededea] px-3 py-1.5 text-xs font-semibold text-[#0f1114]">wiki.muthub.org →</span>
        </a>
      </div>
    </section>
  )
}
