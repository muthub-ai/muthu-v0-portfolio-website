import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container-site flex flex-col items-start gap-5 py-24">
      <p className="eyebrow">404</p>
      <h1 className="h-display text-5xl">Page not found</h1>
      <p className="text-lg text-body">The page you are looking for has moved or does not exist.</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Go home
        </Link>
        <Link href="/writing" className="btn-secondary">
          Read the writing
        </Link>
      </div>
    </div>
  )
}
