import type React from "react"
import type { Metadata, Viewport } from "next"
import { Instrument_Sans, Newsreader } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { site } from "@/content/site"
import { ogImage } from "@/lib/seo"

const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" })
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.displayName} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.fullName,
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.png" },
  alternates: { types: { "application/rss+xml": "/rss.xml" } },
  verification: { google: ["m1tOQodciY7a9D2qxYrcnGqB16TgZjazsXJDsIQLrpw", "B7i-SXGOWSOAtKCLaDb1UEXDiENZYwQvVOmUV6pFgnE"] },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: `${site.displayName} | ${site.tagline}`,
    description: site.description,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title: `${site.displayName} | ${site.tagline}`, description: site.description, images: [ogImage.url] },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1114" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${sans.variable}`}>
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "t6w5pnlllv");`,
          }}
        />
      </head>
      <body className="min-h-screen bg-page font-sans text-ink">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
