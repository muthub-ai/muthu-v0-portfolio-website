"use client"

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Georgia, serif", padding: "64px 24px", maxWidth: 720, margin: "0 auto", color: "#15171C" }}>
        <h1 style={{ fontSize: 40, fontWeight: 500 }}>Something went wrong</h1>
        <p style={{ fontSize: 18 }}>An unexpected error occurred. Please try again.</p>
        <button type="button" onClick={() => reset()} style={{ minHeight: 48, padding: "0 24px", borderRadius: 999, border: 0, background: "#15171C", color: "#fff", fontSize: 16 }}>
          Try again
        </button>
      </body>
    </html>
  )
}
