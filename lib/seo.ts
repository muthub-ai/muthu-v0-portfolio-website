import { getMetaInfo, getPersonalInfo } from "@/lib/data"

const metaInfo = getMetaInfo()
const personalInfo = getPersonalInfo()

export const siteUrl = metaInfo.siteUrl

// Shared social preview image (public/og-image.png, 1200x630).
// If the tagline in data/portfolio-data.json changes, regenerate this image too.
export const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${personalInfo.name}: ${personalInfo.tagline}`,
}

interface PageSeo {
  path: string
  title: string
  description: string
}

/**
 * Canonical URL, Open Graph and X card metadata for one page.
 * Child pages replace (not merge) the layout's openGraph/twitter objects, so every page sets them in full.
 */
export function pageMetadata({ path, title, description }: PageSeo) {
  return {
    alternates: { canonical: path },
    openGraph: {
      type: "website" as const,
      url: path,
      siteName: metaInfo.shortTitle,
      locale: "en_US",
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [ogImage.url],
    },
  }
}
