"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

// Self-assessment against a playbook. Runs entirely in the browser: nothing is sent or stored.

type Answer = 0 | 1 | 2
const OPTIONS: { value: Answer; label: string }[] = [
  { value: 2, label: "Yes" },
  { value: 1, label: "Partly" },
  { value: 0, label: "No" },
]

function band(score: number) {
  if (score >= 90) return { name: "Ready to scale", text: "The controls are in place. Widen access in steps and keep measuring." }
  if (score >= 70) return { name: "Strong", text: "A solid base with a few gaps. Close them before the next expansion." }
  if (score >= 40) return { name: "Building", text: "Important controls are missing or partial. Scale only the lowest-risk use cases for now." }
  return { name: "Exposed", text: "Most controls are not yet in place. Fix the foundations before adding use cases." }
}

export function Assessment({
  slug,
  title,
  items,
}: {
  slug: string
  title: string
  items: { title: string; check: string }[]
}) {
  const [answers, setAnswers] = useState<(Answer | null)[]>(() => items.map(() => null))
  const [copied, setCopied] = useState(false)

  const answered = answers.filter((a) => a !== null).length
  const complete = answered === items.length
  const score = useMemo(() => {
    const total = answers.reduce<number>((sum, a) => sum + (a ?? 0), 0)
    return Math.round((total / (items.length * 2)) * 100)
  }, [answers, items.length])
  const gaps = useMemo(
    () =>
      answers
        .map((a, i) => ({ a, i }))
        .filter((x): x is { a: Answer; i: number } => x.a !== null && x.a < 2)
        .sort((x, y) => x.a - y.a || x.i - y.i)
        .slice(0, 3),
    [answers],
  )
  const result = band(score)

  const set = (i: number, value: Answer) => {
    setCopied(false)
    setAnswers((prev) => prev.map((a, j) => (j === i ? value : a)))
  }

  const summaryText = () =>
    [
      `${title}: self-assessment`,
      `Score: ${score}/100 (${result.name})`,
      "",
      ...items.map((it, i) => `${i + 1}. ${it.title}: ${answers[i] === 2 ? "Yes" : answers[i] === 1 ? "Partly" : answers[i] === 0 ? "No" : "Not answered"}`),
      "",
      gaps.length ? `Close first: ${gaps.map((g) => items[g.i].title).join("; ")}` : "No gaps flagged.",
      `https://muthub.org/playbooks/${slug}`,
    ].join("\n")

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText())
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="sticky top-0 z-10 -mx-5 flex items-center gap-4 border-b border-line bg-page/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-chip" aria-hidden="true">
          <div className="h-full rounded-full bg-accent transition-[width]" style={{ width: `${(answered / items.length) * 100}%` }} />
        </div>
        <span className="text-[15px] tabular-nums text-muted" aria-live="polite">
          {answered} of {items.length} answered
        </span>
      </div>

      <ol className="flex flex-col">
        {items.map((it, i) => (
          <li key={it.title} className="border-t border-line py-6">
            <fieldset className="flex flex-col gap-3">
              <legend className="flex gap-3">
                <span className="w-7 shrink-0 font-serif text-xl text-muted">{i + 1}</span>
                <span className="flex flex-col gap-1">
                  <span className="text-[19px] font-semibold leading-snug text-ink">{it.title}</span>
                  <span className="text-copy leading-relaxed text-body">{it.check}</span>
                </span>
              </legend>
              <div className="flex flex-wrap gap-2 pl-10">
                {OPTIONS.map((o) => {
                  const on = answers[i] === o.value
                  return (
                    <label
                      key={o.value}
                      className={`inline-flex min-h-[44px] cursor-pointer items-center rounded-full border px-5 text-[15px] transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-accent ${
                        on ? "border-ink bg-ink font-semibold text-page" : "border-strong text-ink hover:border-ink"
                      }`}
                    >
                      <input type="radio" name={`q${i}`} value={o.value} checked={on} onChange={() => set(i, o.value)} className="sr-only" />
                      {o.label}
                    </label>
                  )
                })}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <section aria-labelledby="result-heading" aria-live="polite" className="flex flex-col gap-5 rounded-md border border-line bg-panel px-6 py-7 sm:px-8">
        <h2 id="result-heading" className="label">
          Your result
        </h2>
        {!complete ? (
          <p className="text-copy text-body">Answer all {items.length} points to see your score. {items.length - answered} to go.</p>
        ) : (
          <>
            <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
              <span className="font-serif text-7xl font-medium leading-none tabular-nums text-ink">{score}</span>
              <span className="pb-2 text-[15px] text-muted">out of 100</span>
              <span className="mb-2 rounded-full bg-accent-soft px-4 py-1.5 text-[15px] font-semibold text-ink">{result.name}</span>
            </div>
            <p className="text-copy text-body">{result.text}</p>
            {gaps.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-[15px] font-semibold text-ink">Close these first</p>
                <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-copy">
                  {gaps.map((g) => (
                    <li key={g.i}>
                      <Link href={`/playbooks/${slug}#point-${g.i + 1}`} className="link">
                        {items[g.i].title}
                      </Link>
                      <span className="text-muted"> · {g.a === 0 ? "not in place" : "partly in place"}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <div className="flex flex-wrap gap-3 print:hidden">
              <button type="button" onClick={copy} className="btn-primary">
                <span aria-live="polite">{copied ? "Copied" : "Copy results as text"}</span>
              </button>
              <button type="button" onClick={() => window.print()} className="btn-secondary">
                Print or save as PDF
              </button>
              <button
                type="button"
                onClick={() => {
                  setAnswers(items.map(() => null))
                  setCopied(false)
                }}
                className="btn-secondary"
              >
                Start over
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
