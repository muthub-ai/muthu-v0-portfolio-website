#!/usr/bin/env python3
"""Generate the site's brand images in the site's own type (Newsreader + Instrument Sans).

Writes:
  public/og-image.png          site-wide social card (1200x630)
  public/og/<slug>.png         one social card per essay and note
  app/icon.svg, app/apple-icon.png, app/favicon.ico

Run from the repo root after adding or retitling writing:  python3 scripts/og/make-images.py
Needs Pillow and fontTools (pip install pillow fonttools). Pieces without a card fall back to og-image.png.
"""
import json
import re
from datetime import date
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
FONTS = Path(__file__).resolve().parent / "fonts"
SERIF = str(FONTS / "Newsreader-Medium.ttf")
SANS = str(FONTS / "InstrumentSans-Regular.ttf")
SANS_BOLD = str(FONTS / "InstrumentSans-SemiBold.ttf")

PAGE = (255, 255, 255)
INK = (21, 23, 28)
BODY = (63, 68, 80)
MUTED = (91, 97, 110)
LINE = (231, 229, 224)
PANEL = (246, 245, 242)
ACCENT = (11, 92, 107)
W, H = 1200, 630
PAD = 80

THEMES = {
    "context-engineering": "Context engineering",
    "governed-ai": "Governed AI",
    "ai-native-sdlc": "AI-native SDLC",
    "data-ai-platforms": "Data & AI platforms",
    "leading-ai-change": "Leading AI change",
}


def font(path, size):
    return ImageFont.truetype(path, size)


def tracked(draw, xy, text, fnt, fill, tracking):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += draw.textlength(ch, font=fnt) + tracking
    return x


def wrap(draw, text, fnt, width):
    words, lines, line = text.split(), [], ""
    for word in words:
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=fnt) <= width:
            line = trial
        else:
            lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def fit_title(draw, text, width, max_lines, sizes, max_height=10_000):
    for size in sizes:
        fnt = font(SERIF, size)
        lines = wrap(draw, text, fnt, width)
        if len(lines) <= max_lines and len(lines) * size * 1.12 <= max_height:
            return fnt, lines, size
    fnt = font(SERIF, sizes[-1])
    lines = wrap(draw, text, fnt, width)[:max_lines]
    lines[-1] = lines[-1].rstrip(".,:;") + "…"
    return fnt, lines, sizes[-1]


def rounded(img, radius):
    mask = Image.new("L", img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, img.size[0] - 1, img.size[1] - 1], radius=radius, fill=255)
    out = Image.new("RGBA", img.size)
    out.paste(img, (0, 0), mask)
    return out


def headshot(size, radius):
    img = Image.open(ROOT / "public/headshot.jpg").convert("RGB")
    side = min(img.size)
    img = img.crop(((img.width - side) // 2, (img.height - side) // 2, (img.width + side) // 2, (img.height + side) // 2))
    return rounded(img.resize((size, size), Image.LANCZOS), radius)


def site_card():
    img = Image.new("RGB", (W, H), PAGE)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, 8], fill=ACCENT)
    photo = 400
    img.paste(headshot(photo, 6), (W - PAD - photo, (H - photo) // 2), headshot(photo, 6))
    text_w = W - PAD * 2 - photo - 64
    tracked(d, (PAD, 112), "MUTHUKRISHNAN (MUTHU) BOMMIAH", font(SANS_BOLD, 20), ACCENT, 2.4)
    fnt, lines, size = fit_title(d, "Architecting how banks put AI to work, at scale and under control.", text_w, 4, [64, 58, 52])
    y = 168
    for line in lines:
        d.text((PAD, y), line, font=fnt, fill=INK)
        y += int(size * 1.12)
    d.text((PAD, H - PAD - 26), "Distinguished Engineer  ·  muthub.org", font=font(SANS, 24), fill=MUTED)
    img.save(ROOT / "public/og-image.png", optimize=True)


def item_card(item):
    img = Image.new("RGB", (W, H), PAGE)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, 8], fill=ACCENT)
    label = (THEMES.get(item.get("theme", ""), "Note") if item.get("theme") else "Note").upper()
    if item.get("series"):
        label += f"  ·  PART {item['series']}"
    tracked(d, (PAD, 96), label, font(SANS_BOLD, 22), ACCENT, 2.6)
    fnt, lines, size = fit_title(d, item["title"], W - PAD * 2, 4, [72, 66, 60, 54, 50], max_height=290)
    y = 150
    for line in lines:
        d.text((PAD, y), line, font=fnt, fill=INK)
        y += int(size * 1.12)
    # Footer: rule, small portrait, name and date.
    fy = H - PAD - 64
    d.line([PAD, fy - 28, W - PAD, fy - 28], fill=LINE, width=2)
    face = headshot(64, 32)
    img.paste(face, (PAD, fy), face)
    d.text((PAD + 84, fy + 4), "Muthu Bommiah", font=font(SANS_BOLD, 24), fill=INK)
    when = ""
    if item.get("published"):
        when = date.fromisoformat(item["published"]).strftime("%b %-d, %Y")
    d.text((PAD + 84, fy + 36), "  ·  ".join(x for x in ["muthub.org", when] if x), font=font(SANS, 20), fill=MUTED)
    img.save(ROOT / "public/og" / f"{item['slug']}.png", optimize=True)


def read_items():
    """Pull slug/title/theme/published/series out of the content files (they are JSON-shaped TS arrays)."""
    items = []
    for name in ["essays.ts", "essays-more.ts", "context-engineering.ts"]:
        src = (ROOT / "content" / name).read_text()
        for chunk in re.split(r'\n  \{\n', src)[1:]:
            get = lambda key: (m.group(1) if (m := re.search(rf'"{key}": "((?:[^"\\]|\\.)*)"', chunk)) else None)
            slug, title = get("slug"), get("title")
            if not slug or not title:
                continue
            part = re.search(r'"part": (\d+)', chunk)
            items.append({
                "slug": slug,
                "title": json.loads(f'"{title}"'),
                "theme": get("theme"),
                "published": get("published"),
                "series": part.group(1) if part else None,
            })
    return items


def glyph_path(char, size, origin_x, baseline):
    from fontTools.pens.svgPathPen import SVGPathPen
    from fontTools.pens.transformPen import TransformPen
    from fontTools.ttLib import TTFont

    tt = TTFont(SERIF)
    glyph_set = tt.getGlyphSet()
    name = tt.getBestCmap()[ord(char)]
    scale = size / tt["head"].unitsPerEm
    width = glyph_set[name].width * scale
    pen = SVGPathPen(glyph_set)
    glyph_set[name].draw(TransformPen(pen, (scale, 0, 0, -scale, origin_x - width / 2, baseline)))
    return pen.getCommands()


def icons():
    # Serif "M" in page white on an ink tile, with the accent rule under it.
    path = glyph_path("M", 46, 32, 42)
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#15171C"/>
  <path d="{path}" fill="#FFFFFF"/>
  <rect x="20" y="48" width="24" height="4" rx="2" fill="#6EC4D2"/>
</svg>
'''
    (ROOT / "app/icon.svg").write_text(svg)

    def tile(size, rounded_corners=True):
        scale = size / 64
        img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        d.rounded_rectangle([0, 0, size - 1, size - 1], radius=int(12 * scale) if rounded_corners else 0, fill=INK)
        fnt = font(SERIF, int(46 * scale))
        d.text((size / 2, 42 * scale), "M", font=fnt, fill=PAGE, anchor="ms")
        d.rounded_rectangle([20 * scale, 48 * scale, 44 * scale, 52 * scale], radius=2 * scale, fill=(110, 196, 210))
        return img

    tile(180, rounded_corners=False).convert("RGB").save(ROOT / "app/apple-icon.png", optimize=True)
    big = tile(256)
    big.save(ROOT / "app/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    tile(512).save(ROOT / "public/icon-512.png", optimize=True)
    tile(192).save(ROOT / "public/icon-192.png", optimize=True)


if __name__ == "__main__":
    (ROOT / "public/og").mkdir(exist_ok=True)
    site_card()
    items = read_items()
    for item in items:
        item_card(item)
    icons()
    print(f"site card, {len(items)} item cards, icons")
