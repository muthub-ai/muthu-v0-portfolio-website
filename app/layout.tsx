import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ScrollProgressIndicator } from "@/components/scroll-progress-indicator"
import { AnimationProvider } from "@/contexts/animation-context"
import { getMetaInfo, getPersonalInfo } from "@/lib/data"
import { ogImage } from "@/lib/seo"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

const metaInfo = getMetaInfo()
const personalInfo = getPersonalInfo()

export const metadata: Metadata = {
  metadataBase: new URL(metaInfo.siteUrl),
  title: {
    default: metaInfo.title,
    template: `%s | ${metaInfo.shortTitle}`,
  },
  description: metaInfo.description,
  applicationName: metaInfo.shortTitle,
  authors: [{ name: personalInfo.name, url: metaInfo.siteUrl }],
  creator: personalInfo.name,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: metaInfo.shortTitle,
    locale: "en_US",
    title: metaInfo.title,
    description: metaInfo.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: metaInfo.title,
    description: metaInfo.description,
    images: [ogImage.url],
  },
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
        <script type="text/javascript" dangerouslySetInnerHTML={{__html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "t6w5pnlllv");
        `}} />
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
