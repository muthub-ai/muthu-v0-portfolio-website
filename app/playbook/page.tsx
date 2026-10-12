import Link from "next/link"
import type { Metadata } from "next"
import { site } from "@/content/site"
import { playbook } from "@/content/playbook"
import { pageMetadata, writingImage } from "@/lib/seo"
import { Inline } from "@/components/rich-text"
import { JsonLd, personId, personSchema } from "@/components/json-ld"
import { ShareActions } from "@/components/share-actions"

export const metadata: Metadata = pageMetadata({
  path: "/playbook",
  title: playbook.title,
  description: playbook.summary,
  type: "article",
  modifiedTime: playbook.reviewed,
  image: writingImage("playbook", playbook.title),
})

const reviewed = new Date(`${playbook.reviewed}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })

export default function PlaybookPage() {
  const url = `${site.url}/playbook`
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: playbook.title,
    description: playbook.summary,
    url,
    dateModified: playbook.reviewed,
    author: { ...personSchema(), "@id": personId },
    step: playbook.items.map((item, i) => ({ "@type": "HowToStep", position: i + 1, name: item.title, text: item.check })),
  }

  return (
    <>
      <JsonLd data={schema} />
      <article className="mx-auto flex max-w-prose flex-col gap-7 px-5 pb-20 pt-16 sm:px-8 sm:pt-[72px]">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] text-muted">
          <span className="eyebrow">Playbook</span>
          <span>Last reviewed {reviewed}</span>
        </div>
        <h1 className="h-display text-[2.5rem] leading-[1.08] sm:text-[52px]">{playbook.title}</h1>
        <p className="lede">{playbook.summary}</p>
        {playbook.intro.map((p) => (
          <p key={p.slice(0, 24)} className="font-serif text-[1.3125rem] leading-[1.65] text-ink/90">
            {p}
          </p>
        ))}

        <nav aria-label="The twelve points" className="rounded-md border border-line px-6 py-5">
          <p className="label">The twelve points</p>
          <ol className="mt-3 grid list-decimal gap-x-8 gap-y-1.5 pl-5 text-copy leading-snug marker:text-muted sm:grid-cols-2">
            {playbook.items.map((item, i) => (
              <li key={item.title}>
                <a href={`#point-${i + 1}`} className="link">
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <ol className="flex flex-col">
          {playbook.items.map((item, i) => (
            <li key={item.title} id={`point-${i + 1}`} className="flex scroll-mt-8 gap-5 border-t border-line py-8">
              <span aria-hidden="true" className="w-9 shrink-0 font-serif text-4xl leading-none text-muted">
                {i + 1}
              </span>
              <div className="flex min-w-0 flex-col gap-3">
                <h2 className="text-2xl font-semibold tracking-[-0.01em]">{item.title}</h2>
                <p className="font-serif text-[1.25rem] leading-[1.65] text-ink/90 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4">
                  <Inline text={item.text} />
                </p>
                <p className="flex gap-2.5 rounded bg-accent-soft px-4 py-3 text-copy text-ink">
                  <span aria-hidden="true" className="font-semibold text-accent">
                    ✓
                  </span>
                  <span>
                    <span className="font-semibold">Check: </span>
                    {item.check}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="border-t border-line pt-8 font-serif text-[1.3125rem] leading-[1.65] text-ink/90">{playbook.closing}</p>

        <div className="flex flex-col gap-5 border-t border-line pt-6">
          <ShareActions url={url} title={playbook.title} />
          <p className="text-[15px] leading-relaxed text-muted">
            Copy it, adapt it, use it in your own standards. A{" "}
            <a href="/playbook.md" className="link">
              Markdown version
            </a>{" "}
            is easier to paste. Related:{" "}
            <Link href="/writing/model-is-a-tool-harness-is-the-strategy" className="link">
              Model is a tool, harness is the strategy
            </Link>{" "}
            and{" "}
            <Link href="/writing/adopting-mcp-in-a-bank" className="link">
              Adopting MCP in a bank
            </Link>
            . {site.disclosure}
          </p>
        </div>
      </article>
    </>
  )
}
