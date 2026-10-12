import Link from "next/link"
import type { Metadata } from "next"
import { getInitiatives } from "@/lib/content"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  path: "/initiatives",
  title: "Initiatives",
  description: "Case studies of AI, data and architecture work Muthu Bommiah has led at Wells Fargo, USAA and Bunge: problem, approach, governance, outcome and lesson.",
})

export default function InitiativesPage() {
  const all = getInitiatives()
  return (
    <div className="container-site flex flex-col gap-12 pb-24 pt-16 sm:pt-[72px]">
      <div className="flex max-w-[720px] flex-col gap-4">
        <h1 className="h-display text-5xl leading-[1.05] sm:text-[56px]">Initiatives</h1>
        <p className="text-[19px] leading-relaxed text-body">
          Public summaries of work I have led. Each one covers the problem, the approach, how it was governed, what changed, and what I learned.
        </p>
      </div>
      <ol className="flex flex-col">
        {all.map((item) => (
          <li key={item.slug} className="border-t border-line">
            <Link href={`/initiatives/${item.slug}`} className="group flex flex-wrap gap-x-10 gap-y-3 py-8">
              <div className="flex flex-[0_0_220px] flex-col gap-1 text-sm text-muted">
                <span className="font-semibold text-ink">{item.organization}</span>
                <span>{item.period}</span>
              </div>
              <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-2">
                <span className="font-serif text-[28px] font-medium leading-tight text-ink group-hover:text-accent">{item.title}</span>
                <span className="text-base leading-relaxed text-body">{item.summary}</span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
