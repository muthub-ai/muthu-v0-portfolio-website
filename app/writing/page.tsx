import type { Metadata } from "next"
import { pageMetadata } from "@/lib/seo"
import { WritingHub } from "@/components/writing-hub"

export const metadata: Metadata = pageMetadata({
  path: "/writing",
  title: "Writing",
  description: "Essays and notes on governed AI in financial services: Architecture-as-Code, the AI-native SDLC, agent governance and enterprise data platforms.",
})

export default function WritingPage() {
  return <WritingHub />
}
