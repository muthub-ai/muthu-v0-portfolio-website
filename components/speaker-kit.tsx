"use client"

import { useState } from "react"

export function SpeakerKit({ bios, headshot }: { bios: { short: string; long: string }; headshot: string }) {
  const [length, setLength] = useState<"short" | "long">("short")
  const [copied, setCopied] = useState(false)
  const options = [
    { id: "short" as const, label: "Short bio (60 words)" },
    { id: "long" as const, label: "Long bio (150 words)" },
  ]

  async function copy() {
    try {
      await navigator.clipboard.writeText(bios[length])
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Bio length" className="flex flex-wrap gap-2.5">
          {options.map((o) => {
            const on = o.id === length
            return (
              <button
                key={o.id}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setLength(o.id)
                  setCopied(false)
                }}
                className={`min-h-[44px] rounded-full border px-[18px] text-[15px] ${on ? "border-ink bg-ink font-semibold text-page" : "border-strong bg-page font-medium text-ink"}`}
              >
                {o.label}
              </button>
            )
          })}
        </div>
        <a href={headshot} download className="link font-semibold">
          Download headshot
        </a>
      </div>
      <div className="flex flex-col gap-4 rounded-md border border-line bg-page px-8 py-7">
        <p className="text-[17px] leading-[1.7] text-ink/90">{bios[length]}</p>
        <button type="button" onClick={copy} className="min-h-[44px] self-start rounded-full border border-strong px-[18px] text-[15px] font-semibold hover:border-ink">
          {copied ? "Copied" : "Copy bio"}
        </button>
        <span aria-live="polite" className="sr-only">
          {copied ? "Bio copied to clipboard" : ""}
        </span>
      </div>
    </div>
  )
}
