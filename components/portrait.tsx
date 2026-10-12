import Image from "next/image"
import { site } from "@/content/site"

// The studio portrait has a dark background, which looks heavy on the light theme.
// Light theme: the same photo cut out onto a soft warm-gray background. Dark theme: the original.
export function Portrait({ size, className = "", priority = false, decorative = false }: { size: number; className?: string; priority?: boolean; decorative?: boolean }) {
  const alt = decorative ? "" : `Portrait of ${site.name}`
  return (
    <>
      <Image src={site.headshotLight} alt={alt} width={size} height={size} priority={priority} className={`block dark:hidden ${className}`} />
      <Image src={site.headshot} alt={alt} width={size} height={size} priority={priority} className={`hidden dark:block ${className}`} />
    </>
  )
}
