// Security headers. The CSP allows only this site, Microsoft Clarity and Vercel's own analytics.
// Inline scripts are needed for the theme switcher, structured data and Next.js hydration.
const isDev = process.env.NODE_ENV !== "production"
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.clarity.ms https://scripts.clarity.ms https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.clarity.ms https://c.bing.com",
  "font-src 'self' data:",
  `connect-src 'self' https://*.clarity.ms https://c.bing.com https://vitals.vercel-insights.com${isDev ? " ws:" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://buttondown.com https://buttondown.email",
  "object-src 'none'",
  // Only on Vercel: upgrading requests would break a local `pnpm start` served over http.
  ...(process.env.VERCEL ? ["upgrade-insecure-requests"] : []),
].join("; ")

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
]

// The footer's "Last updated" is the latest commit, read once at build and inlined: pages regenerated later (the
// home page re-reads the wiki's counts hourly) must not show their regeneration time instead.
import { execSync } from "node:child_process"
let siteUpdated = ""
try {
  siteUpdated = execSync("git log -1 --format=%cI", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim()
} catch {
  siteUpdated = new Date().toISOString()
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  env: { SITE_UPDATED: siteUpdated },
  async headers() {
    // Markdown twins are for agents; keep them out of Google's index so they never compete with the HTML pages.
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, follow" }]
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/:path(.*\\.md)", headers: noindex },
      { source: "/md/:path*", headers: noindex },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Next.js resizes images per screen and serves AVIF/WebP (the headshot drops from ~94 KB to ~15 KB).
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        // One authoritative copy: send the old Vercel production URL to muthub.org.
        // Matches this exact host only, so preview deployments keep working.
        source: "/:path*",
        has: [{ type: "host", value: "muthu-m9.vercel.app" }],
        destination: "https://muthub.org/:path*",
        statusCode: 301,
      },
      // Old project pages moved to /initiatives.
      { source: "/projects/middleware-modernization-bunge", destination: "/initiatives/middleware-platforms-bunge", statusCode: 301 },
      { source: "/projects/global-systems-implementation-bunge", destination: "/initiatives/middleware-platforms-bunge", statusCode: 301 },
      { source: "/projects/:slug", destination: "/initiatives/:slug", statusCode: 301 },
      { source: "/projects", destination: "/initiatives", statusCode: 301 },
      { source: "/Muthu_resume.pdf", destination: "/about", statusCode: 301 },
      // The single playbook became a collection.
      { source: "/playbook.md", destination: "/playbooks/governing-coding-agents.md", statusCode: 301 },
      { source: "/playbook", destination: "/playbooks/governing-coding-agents", statusCode: 301 },
    ]
  },
  async rewrites() {
    // Markdown twins of every page for agents: /index.md, /about.md, /writing/<slug>.md, ...
    return [
      { source: "/index.md", destination: "/md" },
      { source: "/:section.md", destination: "/md/:section" },
      { source: "/:section/:slug.md", destination: "/md/:section/:slug" },
      { source: "/writing/theme/:theme.md", destination: "/md/writing/theme/:theme" },
      { source: "/writing/tag/:tag.md", destination: "/md/writing/tag/:tag" },
    ]
  },
}

export default nextConfig
