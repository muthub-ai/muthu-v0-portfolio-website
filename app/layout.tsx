
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator"
import { AnimationProvider } from "@/contexts/animation-context"
import { getMetaInfo } from "@/lib/data"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

const metaInfo = getMetaInfo()

export const metadata: Metadata = {
  title: metaInfo.title,
  description: metaInfo.description,
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
  <meta name="google-site-verification" content="m1tOQodciY7a9D2qxYrcnGqB16TgZjazsXJDsIQLrpw" />
  <meta name="google-site-verification" content="B7i-SXGOWSOAtKCLaDb1UEXDiENZYwQvVOmUV6pFgnE" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <AnimationProvider>
          <ScrollProgressIndicator />
          {children}
        </AnimationProvider>
  <Analytics />
  <SpeedInsights />
      </body>
    </html>
  )
}
