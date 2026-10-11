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
    ]
  },
}

export default nextConfig
