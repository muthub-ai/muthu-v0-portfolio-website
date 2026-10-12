import type { ReactNode } from "react"
import type { Block } from "@/content/site"
import { Figure } from "@/components/figures"

// Minimal inline Markdown: `code`, **bold**, *italic*, [text](https://url). Anything else renders as plain text.
const inlinePattern = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)\s]+\))/g

export function Inline({ text }: { text: string }) {
  const parts = text.split(inlinePattern).filter((part) => part !== "")
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
          return (
            <code key={index} className="rounded bg-chip px-1.5 py-0.5 font-mono text-[0.85em]">
              {part.slice(1, -1)}
            </code>
          )
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return <em key={index}>{part.slice(1, -1)}</em>
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
        if (link) {
          const external = link[2].startsWith("http")
          return (
            <a key={index} href={link[2]} {...(external ? { rel: "noopener noreferrer" } : {})}>
              {link[1]}
            </a>
          )
        }
        return <span key={index}>{part}</span>
      })}
    </>
  )
}

/** Stable anchor id for an essay section heading. */
export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-essay">
      {blocks.map((block, index): ReactNode => {
        switch (block.type) {
          case "p":
            return (
              <p key={index}>
                <Inline text={block.text} />
              </p>
            )
          case "h2":
            return (
              <h2 key={index} id={headingId(block.text)} className="scroll-mt-8">
                {block.text}
              </h2>
            )
          case "ul":
            return (
              <ul key={index}>
                {block.items.map((item, i) => (
                  <li key={i}>
                    <Inline text={item} />
                  </li>
                ))}
              </ul>
            )
          case "ol":
            return (
              <ol key={index}>
                {block.items.map((item, i) => (
                  <li key={i}>
                    <Inline text={item} />
                  </li>
                ))}
              </ol>
            )
          case "quote":
            return (
              <blockquote key={index} className="!my-10 rounded-md bg-panel px-8 py-7 text-[1.75rem] italic leading-snug text-ink">
                “{block.text}”
              </blockquote>
            )
          case "code":
            return (
              <pre key={index} className="!my-8 overflow-x-auto rounded-md bg-panel px-6 py-5 font-mono text-[0.8rem] leading-relaxed text-ink">
                <code>{block.text}</code>
              </pre>
            )
          case "figure":
            return <Figure key={index} name={block.name} />
          case "monday":
            return (
              <aside key={index} aria-label="What to do Monday" className="!mt-10 rounded-md border border-line border-l-4 border-l-accent px-7 py-6 font-sans">
                <p className="label">What to do Monday</p>
                <ul className="mt-3 flex !list-none flex-col gap-3 !pl-0 text-copy text-ink">
                  {block.items.map((item, i) => (
                    <li key={i} className="flex gap-3 !mt-0">
                      <span aria-hidden="true" className="mt-[3px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-strong text-[12px] text-muted">
                        {i + 1}
                      </span>
                      <span>
                        <Inline text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              </aside>
            )
          case "bottomLine":
            return (
              <div key={index} className="!mt-10 rounded-md bg-accent-soft px-8 py-7">
                <p className="eyebrow font-sans">Bottom line</p>
                <p className="mt-2">
                  <Inline text={block.text} />
                </p>
              </div>
            )
        }
      })}
    </div>
  )
}
