"use client"

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-site flex flex-col items-start gap-5 py-24">
      <h1 className="h-display text-5xl">Something went wrong</h1>
      <p className="text-lg text-body">An unexpected error occurred. Please try again.</p>
      <button type="button" className="btn-primary" onClick={() => reset()}>
        Try again
      </button>
    </div>
  )
}
