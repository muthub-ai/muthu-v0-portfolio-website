import { buildSearchIndex } from "@/lib/search"

// Static JSON index for site search; rebuilt on every deploy.
export const dynamic = "force-static"

export function GET() {
  return new Response(JSON.stringify(buildSearchIndex()), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    },
  })
}
