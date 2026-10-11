import { getMetaInfo, getPersonalInfo } from "@/lib/data"

export function SiteFooter() {
  const meta = getMetaInfo()
  const personal = getPersonalInfo()

  return (
    <footer className="relative z-10 mt-8 sm:mt-12 py-4 sm:py-6 px-4 text-center text-xs sm:text-sm text-zinc-500 space-y-1">
      <p>
        © {new Date().getFullYear()} {personal.name}. {meta.disclosure}
      </p>
      <p>
        <a href={`mailto:${personal.email}`} className="hover:text-cyan-400 transition-colors">
          {personal.email}
        </a>
      </p>
    </footer>
  )
}
