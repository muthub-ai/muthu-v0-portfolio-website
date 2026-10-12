import type { Config } from "tailwindcss"

// Editorial design tokens. Colors are CSS variables (see app/globals.css) so light and dark themes share one palette.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.ts", "./lib/**/*.ts"],
  theme: {
    extend: {
      colors: {
        page: token("page"),
        ink: token("ink"),
        body: token("body"),
        muted: token("muted"),
        line: token("line"),
        strong: token("strong"),
        panel: token("panel"),
        chip: token("chip"),
        accent: token("accent"),
        "accent-strong": token("accent-strong"),
        "accent-soft": token("accent-soft"),
        band: token("band"),
        "band-ink": token("band-ink"),
        "band-muted": token("band-muted"),
        draft: token("draft"),
        "draft-ink": token("draft-ink"),
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1120px",
        prose: "720px",
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
