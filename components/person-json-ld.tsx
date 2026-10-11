import { getAboutInfo, getCredentialsInfo, getMetaInfo, getPersonalInfo } from "@/lib/data"

/**
 * Structured data (schema.org) for the home page: a ProfilePage whose main entity is a Person.
 * Search engines and AI assistants use this to describe who Muthu is and to tie his profiles together.
 * Validate with https://search.google.com/test/rich-results or https://validator.schema.org after changes.
 */
export function PersonJsonLd() {
  const meta = getMetaInfo()
  const personal = getPersonalInfo()
  const about = getAboutInfo()
  const credentials = getCredentialsInfo()

  const siteUrl = meta.siteUrl
  const personId = `${siteUrl}/#person`

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: `${siteUrl}/`,
        name: meta.title,
        description: meta.description,
        inLanguage: "en-US",
        dateModified: new Date().toISOString(),
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: personal.name,
        alternateName: [personal.alternateName, "Muthu"],
        givenName: "Muthukrishnan",
        familyName: "Bommiah",
        url: `${siteUrl}/`,
        image: `${siteUrl}${personal.avatar}`,
        description: meta.description,
        jobTitle: personal.jobTitle,
        worksFor: { "@type": "Organization", name: personal.employer },
        homeLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: "San Antonio",
            addressRegion: "TX",
            addressCountry: "US",
          },
        },
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "University of Oklahoma" },
          { "@type": "CollegeOrUniversity", name: "Madurai Kamaraj University" },
        ],
        knowsAbout: [
          "Enterprise AI strategy",
          "AI governance",
          "Generative AI",
          "Agentic AI",
          "AI-augmented software development",
          "Architecture-as-Code",
          "Model Context Protocol",
          "Machine learning operations (MLOps)",
          "Cloud data and AI platforms",
          "Financial services technology",
        ],
        knowsLanguage: about.languages.map((language) => language.name),
        hasCredential: credentials.certifications.map((cert) => ({
          "@type": "EducationalOccupationalCredential",
          name: cert.name,
          credentialCategory: "certification",
        })),
        sameAs: personal.social.map((link) => link.url),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
