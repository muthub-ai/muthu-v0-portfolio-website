# 2. Readable by agents (and search engines)

**Outcome:** every page is available as clean Markdown with its canonical URL, and structured data describes the author
and each article (decision M02).

## Steps

1. **Markdown twins:** a catch-all route `app/md/[[...path]]` renders any page as Markdown; a rewrite serves it at
   `/<page>.md`. The response carries `X-Robots-Tag: noindex, follow` (set in `next.config.mjs`).
2. **`/llms.txt`** (`app/llms.txt/route.ts`): the site summary and links to the canonical pages and their twins.
3. **RSS** (`/rss.xml`) and **sitemap** (`app/sitemap.ts`).
4. **JSON-LD** (`components/json-ld.tsx`, essay pages): Person, ProfilePage and WebSite (with a search action) site-wide, Article on each essay.
5. **Social cards:** `python3 scripts/og/make-images.py` renders `public/og-image.png` and one card per essay in the
   site's own fonts; the site card reads the tagline from `content/site.ts`, so it never drifts from the home page.

## Check it worked

`curl -I https://<site>/writing/<slug>.md` shows `text/markdown` and `noindex`; the Rich Results test sees Person and
Article; `/llms.txt` lists every published essay.
