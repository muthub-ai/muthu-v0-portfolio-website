import Link from "next/link"
import type { Metadata } from "next"
import { about } from "@/content/about"
import { site } from "@/content/site"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  path: "/reach",
  title: "Reach me",
  description: `How to reach ${site.fullName}: conference talks, podcasts, advisory boards and peer exchanges on governed AI in regulated industries.`,
})

export default function ReachPage() {
  return (
    <div className="container-site flex flex-wrap gap-14 pb-24 pt-16 sm:pt-[72px]">
      <div className="flex flex-[1_1_320px] flex-col gap-4">
        <h1 className="h-display text-5xl leading-[1.05] sm:text-[56px]">Reach me</h1>
        <p className="text-[17px] leading-relaxed text-body">The best way to reach me is email. I read everything and reply when I can.</p>
        <a href={`mailto:${site.email}`} className="link text-lg font-semibold">
          {site.email}
        </a>
        <p className="text-[15px] text-muted">
          Organizing an event? The{" "}
          <Link href="/about#speaker-kit" className="link">
            speaker kit
          </Link>{" "}
          has bios and a headshot.
        </p>
      </div>
      <div className="grid min-w-0 flex-[999_1_480px] gap-8 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
        <div className="flex flex-col gap-2.5 border-t-2 border-ink pt-4">
          <h2 className="text-[17px] font-semibold">Happy to talk about</h2>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 leading-normal text-body">
            {about.reach.yes.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2.5 border-t border-strong pt-4">
          <h2 className="text-[17px] font-semibold">Not a fit</h2>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 leading-normal text-body">
            {about.reach.no.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
