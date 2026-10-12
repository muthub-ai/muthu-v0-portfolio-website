import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { themes, type ThemeSlug } from "@/content/site"
import { pageMetadata } from "@/lib/seo"
import { WritingHub } from "@/components/writing-hub"

interface Props {
  params: { theme: string }
}

export const dynamicParams = false

export function generateStaticParams() {
  return themes.map((t) => ({ theme: t.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const theme = themes.find((t) => t.slug === params.theme)
  if (!theme) return {}
  return pageMetadata({ path: `/writing/theme/${theme.slug}`, title: `${theme.name}: writing`, description: theme.blurb })
}

export default function ThemePage({ params }: Props) {
  const theme = themes.find((t) => t.slug === params.theme)
  if (!theme) notFound()
  return <WritingHub theme={theme.slug as ThemeSlug} />
}
