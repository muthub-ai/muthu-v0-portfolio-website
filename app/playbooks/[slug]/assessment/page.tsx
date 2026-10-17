import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getPlaybook, playbooks } from "@/content/playbooks"
import { pageMetadata, writingImage } from "@/lib/seo"
import { Assessment } from "@/components/assessment"

interface Props {
  params: { slug: string }
}

export const dynamicParams = false

export function generateStaticParams() {
  return playbooks.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const playbook = getPlaybook(params.slug)
  if (!playbook) return {}
  return pageMetadata({
    path: `/playbooks/${playbook.slug}/assessment`,
    title: `Self-assessment: ${playbook.short}`,
    description: `Score your organization against ${playbook.items.length} points from "${playbook.title}". Runs in your browser; nothing is stored.`,
    image: writingImage(`playbooks-${playbook.slug}`, playbook.title),
  })
}

export default function AssessmentPage({ params }: Props) {
  const playbook = getPlaybook(params.slug)
  if (!playbook) notFound()
  return (
    <div className="mx-auto flex max-w-prose flex-col gap-7 px-5 pb-20 pt-16 sm:px-8 sm:pt-[72px]">
      <Link href={`/playbooks/${playbook.slug}`} className="eyebrow hover:text-ink hover:underline">
        ← {playbook.short}
      </Link>
      <h1 className="h-display text-[2.5rem] leading-[1.08] sm:text-[48px]">Self-assessment</h1>
      <p className="lede">
        For each point, answer honestly for your organization today: yes, partly or no. You get a score, a readiness band and the three gaps to close first.
        It runs in your browser; nothing is sent or stored.
      </p>
      <Assessment slug={playbook.slug} title={playbook.title} items={playbook.items.map(({ title, check }) => ({ title, check }))} />
    </div>
  )
}
