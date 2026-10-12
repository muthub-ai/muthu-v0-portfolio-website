import { site } from "@/content/site"

// Newsletter signup. Posts to the provider in site.newsletterAction (for example Buttondown's embed-subscribe URL).
// Until that is set, it points readers to LinkedIn instead of collecting emails.
export function Newsletter({ compact = false }: { compact?: boolean }) {
  const linkedin = site.social.find((s) => s.label === "LinkedIn")?.url
  return (
    <section id="subscribe" aria-labelledby="newsletter-heading" className="scroll-mt-8 bg-band text-band-ink">
      <div className={`container-site flex flex-wrap items-center justify-between gap-10 ${compact ? "py-14" : "py-[72px]"}`}>
        <div className="flex flex-[1_1_420px] flex-col gap-3">
          <h2 id="newsletter-heading" className="font-serif text-[2rem] font-medium leading-tight tracking-[-0.01em] sm:text-4xl">
            A monthly note on AI in banking
          </h2>
          <p className="text-[17px] leading-relaxed text-band-muted">One essay and three short notes, once a month. No spam, unsubscribe any time.</p>
        </div>
        {site.newsletterAction ? (
          <form action={site.newsletterAction} method="post" target="_blank" className="flex flex-[1_1_380px] flex-wrap gap-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className="min-h-[48px] flex-[1_1_220px] rounded-full border border-white/20 bg-white/5 px-5 text-base text-band-ink placeholder:text-band-muted"
            />
            <button type="submit" className="min-h-[48px] rounded-full bg-band-ink px-6 text-base font-semibold text-band">
              Subscribe
            </button>
          </form>
        ) : (
          <div className="flex flex-[1_1_380px] flex-col gap-3">
            <p className="text-[17px] text-band-muted">The first issue goes out soon. Until then, follow along on LinkedIn.</p>
            <a href={linkedin} className="inline-flex min-h-[48px] w-fit items-center rounded-full bg-band-ink px-6 font-semibold text-band" rel="noopener noreferrer">
              Follow on LinkedIn
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
