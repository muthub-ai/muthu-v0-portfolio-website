import { about } from "@/content/about"
import { site } from "@/content/site"

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}

export const personId = `${site.url}/#person`

export function personSchema() {
  return {
    "@type": "Person",
    "@id": personId,
    name: site.fullName,
    alternateName: [...site.alternateNames],
    givenName: site.givenName,
    familyName: site.familyName,
    url: `${site.url}/`,
    image: `${site.url}${site.headshot}`,
    description: site.description,
    jobTitle: site.jobTitle,
    worksFor: { "@type": "Organization", name: site.employer },
    homeLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: "San Antonio", addressRegion: "TX", addressCountry: "US" },
    },
    alumniOf: about.education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
    knowsAbout: [...site.knowsAbout],
    hasCredential: about.certifications.map((name) => ({
      "@type": "EducationalOccupationalCredential",
      name: `${name} certification`,
      credentialCategory: "certification",
    })),
    sameAs: site.social.map((s) => s.url),
  }
}

export function profilePageSchema(path: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${site.url}${path}#profilepage`,
        url: `${site.url}${path}`,
        name,
        inLanguage: "en-US",
        dateModified: new Date().toISOString(),
        mainEntity: { "@id": personId },
      },
      personSchema(),
    ],
  }
}
