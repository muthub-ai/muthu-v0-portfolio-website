import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { about } from "@/content/about"
import { site } from "@/content/site"
import { pageMetadata } from "@/lib/seo"
import { JsonLd, profilePageSchema } from "@/components/json-ld"
import { SpeakerKit } from "@/components/speaker-kit"

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About",
  description: `${site.fullName} is a Distinguished Engineer at Wells Fargo. Career, education, certifications and speaker bios.`,
})

export default function AboutPage() {
  return (
    <>
      <JsonLd data={profilePageSchema("/about", `About ${site.displayName}`)} />
      <section className="container-site flex flex-wrap items-start gap-14 pb-14 pt-16 sm:pt-[72px]">
        <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-6">
          <h1 className="h-display text-5xl leading-[1.05] sm:text-[56px]">About</h1>
          <p className="font-serif text-2xl leading-normal">{about.mission}</p>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="text-lg leading-[1.7] text-ink/90">
              {p}
            </p>
          ))}
          <p className="text-[17px] text-muted">
            What I am working on this quarter is on my{" "}
            <Link href="/now" className="link">
              Now page
            </Link>
            .
          </p>
        </div>
        <figure className="flex max-w-[260px] flex-[1_1_220px] flex-col gap-2.5">
          <Image src={site.headshot} alt={`Portrait of ${site.name}`} width={520} height={520} className="aspect-square w-full rounded object-cover" />
          <figcaption className="text-[15px] text-muted">{site.location}</figcaption>
        </figure>
      </section>

      <section id="how-i-think" aria-labelledby="principles" className="border-t border-line bg-panel">
        <div className="container-site flex flex-col gap-10 py-16">
          <div className="flex max-w-[720px] flex-col gap-3">
            <h2 id="principles" className="h-display text-[32px] sm:text-4xl">
              How I think and lead
            </h2>
            <p className="text-[17px] leading-relaxed text-muted">The principles behind the work and the writing. Each one came from something that went right, or wrong, in a real program.</p>
          </div>
          <div className="grid gap-12 md:grid-cols-2">
            {[
              { heading: "How I think about AI in a bank", items: about.principles.ai },
              { heading: "How I lead", items: about.principles.lead },
            ].map((group) => (
              <div key={group.heading} className="flex flex-col">
                <h3 className="label border-b-2 border-ink pb-3">{group.heading}</h3>
                <ol className="flex flex-col">
                  {group.items.map((p, i) => (
                    <li key={p.title} className="flex gap-4 border-b border-line py-5">
                      <span aria-hidden="true" className="w-6 shrink-0 pt-0.5 font-serif text-xl text-muted">
                        {i + 1}
                      </span>
                      <div className="flex flex-col gap-1.5">
                        <strong className="font-serif text-[22px] font-medium leading-snug text-ink">{p.title}</strong>
                        <span className="text-[17px] leading-relaxed text-body">{p.text}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="career" className="border-t border-line">
        <div className="container-site flex flex-wrap gap-14 py-14">
          <h2 id="career" className="h-display flex-[1_1_220px] text-[32px]">
            Career
          </h2>
          <ol className="flex min-w-0 flex-[999_1_560px] flex-col">
            {about.career.map((c) => (
              <li key={c.org} className="flex flex-wrap gap-x-6 gap-y-1.5 border-t border-line py-5">
                <span className="flex-[0_0_150px] text-[15px] text-muted">{c.period}</span>
                <div className="flex flex-[1_1_360px] flex-col gap-1">
                  <strong className="text-lg font-semibold">{c.org}</strong>
                  <span className="leading-relaxed text-body">{c.detail}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="credentials" className="border-t border-line">
        <div className="container-site flex flex-wrap gap-14 py-14">
          <h2 id="credentials" className="h-display flex-[1_1_220px] text-[32px]">
            Education and certifications
          </h2>
          <div className="grid min-w-0 flex-[999_1_560px] gap-6 leading-relaxed [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
            {about.education.map((e) => (
              <div key={e.degree} className="flex flex-col gap-1.5">
                <strong className="font-semibold">{e.degree}</strong>
                <span className="text-body">{e.school}</span>
              </div>
            ))}
            <div className="flex flex-col gap-1.5">
              <strong className="font-semibold">Certifications</strong>
              <span className="text-body">{about.certifications.join(" · ")}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="speaker-kit" aria-labelledby="kit" className="border-t border-line">
        <div className="container-site flex flex-col gap-7 py-14">
          <div className="flex flex-col gap-2">
            <h2 id="kit" className="h-display text-[32px]">
              Speaker kit
            </h2>
            <p className="text-[17px] text-muted">For event organizers and editors: bios you can use as written, and a headshot (JPG, 800 × 800).</p>
          </div>
          <SpeakerKit bios={about.bios} headshot={site.headshot} />
        </div>
      </section>

      <section id="disclosures" aria-labelledby="disclosures-heading" className="border-t border-line">
        <div className="container-site flex flex-wrap gap-14 py-12">
          <h2 id="disclosures-heading" className="label flex-[1_1_220px]">
            Disclosures and colophon
          </h2>
          <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-3 text-[15px] leading-[1.7] text-body">
            <p>Views are my own and do not represent Wells Fargo. There is no paid or sponsored content on this site.</p>
            <p>
              Built with Next.js and hosted on Vercel. Every page is also published as Markdown (add <code>.md</code> to any URL) and listed in{" "}
              <a href="/llms.txt" className="link">
                llms.txt
              </a>
              , with structured data, so search engines and AI assistants can read and cite it accurately. Questions?{" "}
              <Link href="/reach" className="link">
                Reach me
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
