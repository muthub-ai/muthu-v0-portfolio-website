"use client"

import { useState } from "react"

// Copy link and share to LinkedIn. No tracking, no third-party scripts.
export function ShareActions({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  return (
    <div data-print="hide" className="flex flex-wrap items-center gap-2.5" aria-label={`Share "${title}"`}>
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-[40px] items-center rounded-full border border-strong px-4 text-[15px] font-medium text-ink hover:border-ink"
      >
        <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
      </button>
      <a
        href={linkedin}
        rel="noopener noreferrer"
        target="_blank"
        className="inline-flex min-h-[40px] items-center rounded-full border border-strong px-4 text-[15px] font-medium text-ink hover:border-ink"
      >
        Share on LinkedIn
      </a>
    </div>
  )
}
