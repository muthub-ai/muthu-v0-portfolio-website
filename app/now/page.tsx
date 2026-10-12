import type { Metadata } from "next"
import { now } from "@/content/about"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  path: "/now",
  title: "Now",
  description: "What Muthu Bommiah is focused on this quarter.",
})

export default function NowPage() {
  const updated = new Date(`${now.updated}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })
  return (
    <div className="mx-auto flex max-w-prose flex-col gap-6 px-5 pb-24 pt-16 sm:px-8 sm:pt-[72px]">
      <h1 className="h-display text-5xl leading-[1.05] sm:text-[56px]">Now</h1>
      <p className="text-[15px] text-muted">Updated {updated}. What I am focused on this quarter.</p>
      <ul className="flex list-disc flex-col gap-4 pl-6 font-serif text-[21px] leading-relaxed text-ink/90">
        {now.items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  )
}
