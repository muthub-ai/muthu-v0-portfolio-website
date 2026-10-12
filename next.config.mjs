/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
    ]
  },
  async rewrites() {
    // Markdown twins of every page for agents: /index.md, /about.md, /writing/<slug>.md, ...
    return [
      { source: "/index.md", destination: "/md" },
      { source: "/:section.md", destination: "/md/:section" },
      { source: "/:section/:slug.md", destination: "/md/:section/:slug" },
    ]
  },
}

export default nextConfig
