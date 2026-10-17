"use client"

import { useEffect, useState } from "react"

// Thin reading-progress bar across the top, plus a small percentage badge, for long-form pages.
export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const percent = Math.round(progress)
  return (
    <>
      <div aria-hidden="true" data-print="hide" className="fixed inset-x-0 top-0 z-50 h-[3px] bg-transparent">
        <div className="h-full bg-accent transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
      </div>
      <div
        aria-hidden="true"
        data-print="hide" className={`fixed bottom-5 right-5 z-50 rounded-full border border-line bg-page/90 px-3 py-1.5 text-[13px] font-semibold tabular-nums text-ink shadow-sm backdrop-blur transition-opacity duration-300 ${
          percent > 2 ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {percent}%
      </div>
    </>
  )
}
