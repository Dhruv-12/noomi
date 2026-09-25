---
name: Noomi
description: Two textures in blue light. A campaign world built from five client blues, one variable family at two extremes, and square edges.
colors:
  ink: "#001F3F"
  depth: "#002D55"
  blue: "#004B87"
  calm: "#6A9BD1"
  mist: "#F0F4F8"
  mist-soft: "#C0D2E1"
  ink-soft: "#00284D"
typography:
  display-black:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(5.25rem, 26vw, 15rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 75"
  display-wide:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 18vw, 9rem)"
    fontWeight: 300
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.625rem, 7vw, 3rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  lede:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 4.6vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.35
  body:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
  action:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 105"
  caption:
    fontFamily: "'Archivo Variable', 'Archivo', ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0.01em"
    fontVariation: "'wdth' 112"
rounded:
  none: "0px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
  s9: "96px"
  s10: "128px"
  s11: "176px"
  gutter: "clamp(20px, 5vw, 64px)"
components:
  button-primary:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "0 24px 0 32px"
    height: "60px"
  button-primary-hover:
    backgroundColor: "{colors.calm}"
    textColor: "{colors.ink}"
  link-cta:
    textColor: "currentColor"
    typography: "{typography.action}"
    height: "44px"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.mist}"
    rounded: "{rounded.none}"
    height: "56px"
  sticky-bar:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.mist}"
    padding: "0 clamp(20px, 5vw, 64px)"
    height: "48px"
---

# Design System: Noomi

## Overview

**Creative North Star: "Two Textures in Blue Light"**

Noomi is a premium two-product store with a campaign's eye (it was first built as a campaign microsite; since 2026-09-24 the store comes first). Two materials, a clear serum and a thick cream, meet under cool blue light, and the page is built as a run of immersive colour fields that each own one of the five client blues. Sections never sit in boxes; they flow ground to ground through tonal bands, and macro campaign plates bleed off the edge and feather into the ground through gradient masks rather than being framed.

Type does the rest. One variable family, Archivo, is pushed to both ends of its width axis: condensed black for the hard statement, expanded light for the soft one, stacked against each other whenever a headline has two beats. Density is low and the scale is loud; a single idea per viewport, set huge, with small plain body copy beside it. Everything is square. There are no cards, pills, badges or rounded corners anywhere in the build.

Motion is slow and material, and supports the brand world rather than decorating it. **The hero is the one authored moment:** on load the photo resolves from soft to sharp (0–0.8s), light travels through the serum drop on its own soft-masked layer (0.4–1.2s), the cream breathes on the base layer (0.5–1.3s), the headline unmasks (0.7–1.4s), the offer and CTA settle (0.9–1.5s), then an almost invisible ambient loop continues. A future 5–8s campaign film replaces the stills in the same box (`hero.film` in `src/content/media.ts`), with the photo as its poster. Supporting motion is feedback or story only: the ticker, heading unmasks (`src/scripts/reveal.ts`), the two-halves hover, and a shared scroll drift (`[data-drift]` in global.css). No WebGL. Reduced motion keeps every reveal as a fade and removes all movement; "Too many steps?" shows its resolved state. The only other ambient loop is "Too many steps?" itself (~4.8 s, CSS only, paused off-screen).

**Key Characteristics:**
- Five client blues used as full-bleed grounds, one per section, joined by tonal bands.
- Archivo at two extremes of width (75% black, 125% light) as the only display voices.
- Square edges throughout (0px radius); no containers, cards or chips.
- Feathered, mask-edged campaign photography that bleeds to the viewport edge and overlaps display type.
- Every temporary campaign image carries a visible "Mood image" credit.

## Colors

A monochrome blue world: five fixed client blues from ink to mist, plus two quiet mixes for secondary text.

### Primary
- **Noomi Blue** (blue): the brand's working colour. Ground of the pre-order band; the colour of the pre-order offer on light grounds, the "to two." accent and focus/error signals on Mist.

### Secondary
- **Calm Blue** (calm): the light accent. Used as a ground (the Pair section, with ink text), as the pointer-fill on primary buttons, the strike-through line in the edit list, focus and error signals on dark grounds, the checked-state underline in the channel switch, and accent display words on ink ("got loud.", the joined name). Text selection is calm with ink text.

### Neutral
- **Ink** (ink): the deepest ground and the page's base colour (body background). Hosts the Loud and Early Access sections; primary text colour on every light ground.
- **Depth** (depth): the Edit section ground, a step up from ink.
- **Mist** (mist): the light ground (hero, Barrier Repair Cream world, Transparency) and the text colour on every dark ground. Also the primary button face on dark grounds.
- **Mist Soft** (mist-soft, canonically `color-mix(in srgb, mist 80%, blue)`): secondary text on dark grounds: field labels, consent line, lede under The Edit, pending notes in the serum world.
- **Ink Soft** (ink-soft, canonically `color-mix(in srgb, ink 80%, blue)`): secondary text on light grounds.

### Accents (user brief 2026-09-24)
- **Lavender** (`--lavender` #DCD8F0): the Korea × India section ground; display accents on Ink.
- **Blush** (`--blush` #F2D7DE): the strike line in the edit, underline under the kept product names, the offer text on dark grounds, ticker dots, the product-card sticker.
- **Powder** (`--powder` #D5E4F2): the Barrier Repair Cream feature ground; sticker gradients.
- **Skin** (`--skin` #E9D6C8): reserved for skin-toned neutrals in future imagery-led layouts.
- **Gloss highlight** (white, `#fff` / `rgb(255 255 255 / 0.5)`): only the specular spot on stickers and the hero's light sweep.
Small doses only: accents never make the page pink, and the five blues stay the base.

### Named Rules
**The Client Palette Rule.** The five blues are client-authoritative and fixed, and remain the base of every page. The four accents above were added by the user brief of 2026-09-24; any other new colour must be a mix of the blues or the accents.

**The Calm Is Never Body Text Rule.** Calm never sets running or body text on a light ground (mist or calm itself). On ink, depth and blue grounds it may carry accent display words, strokes, focus and error text.

**The One Ground Per Section Rule.** Each section declares one palette ground and inherits its text colour from it: mist and calm grounds take ink text, blue, depth and ink grounds take mist text. Text never starts inside the tonal band.

## Typography

**Display Font:** Archivo Variable (with Archivo, ui-sans-serif, system-ui)
**Body Font:** Archivo Variable (same family)

**Character:** One family, two voices. Condensed black (width 75, weight 800) is blunt and physical; expanded light (width 125, weight 300) is airy and calm. Stacked together they read as the two textures in type.

### Hierarchy
- **Display Black** (800, width 75%, clamp(5.25rem, 26vw, 15rem) in the hero; section titles run from clamp(4rem, 21vw, 12rem) to clamp(5rem, 33vw, 17rem); line-height 0.86 to 0.9): the hard half of every headline ("to two.", "got loud.", "Be first.", "Calm", "Cream").
- **Display Wide** (300, width 125%, clamp(3.5rem, 18vw, 9rem) in the hero, clamp(2.75rem, 14vw, 8rem) in sections, line-height 0.95 to 1): the soft half ("Edited", "Skincare", "Serum", "A pair,").
- **Title** (300, width 125%, clamp(1.625rem, 7vw, 3rem), line-height 1.05 to 1.1): product lines and the disclosure list; the wide voice at reading size.
- **Lede** (400, clamp(1.375rem, 4.6vw, 1.75rem), line-height 1.35, 26 to 32ch): section intros set next to display type.
- **Body** (400, 1.0625rem rising to 1.125rem at 900px, line-height 1.5): base text; small print at 0.875rem.
- **Action** (650, width 105%, 1.25rem): button and link-CTA labels. The header link uses 0.875rem at width 112%.
- **Caption** (600, width 112%, 0.8125rem, +0.01em): image callouts, mood credits, field labels, footer links, the edit footnote. Sentence case, never a kicker above a heading.

### Named Rules
**The Two Voices Rule.** Display type uses only condensed black or expanded light from the same family; a two-beat headline sets one beat in each. Never introduce a second typeface or a middle-width display voice.

**The Wide Is Never Bold Rule.** The expanded voice stays at weight 300; the condensed voice stays at 800.

## Layout

Mobile-first single column that becomes a 12-column grid at 900px (column gap 24px), inside a 1360px max container with a fluid gutter of clamp(20px, 5vw, 64px). The spacing scale runs 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 176px; section padding is typically 64px (mobile) to 96 or 128px (desktop).

Composition is overlap, not separation: images break the gutter with negative margins and bleed to one viewport edge, and display type or copy is pulled up over the feathered part of the image with negative top margins (clamp values around 4 to 12rem). Headline words are offset against each other (one justified start, the next end or indented) and drift horizontally with scroll progress.

The hero is one viewport (100svh, 640 to 1000px): header, headline, then line and button pinned to the bottom over the darkened base of the plate. Image callouts are positioned in image coordinates so their leaders stay on their textures at every crop.

The sticky header (see Navigation) carries the mark, navigation and cart on every page; there is no dock.

### Named Rules
**The Tonal Band Rule.** Sections join through a vertical gradient band (clamp(96px, 14vh, 150px), longer for dark-to-light) from the previous ground into the current one. Dark-to-light and light-to-dark bands pass through blue and calm so the midpoint stays blue. Content starts below the band.

## Elevation & Depth

Flat and atmospheric. Depth comes from photography, tonal bands, gradient masks that feather images into their ground, a darkening ink gradient under the hero base, and scroll-linked scale and drift. Surfaces do not lift. The single shadow in the build is a long soft ink shadow under the small detail image that overlaps the cream plate, so it reads as a print laid on a print.

### Shadow Vocabulary
- **Overlap print** (`box-shadow: 0 30px 60px -30px color-mix(in srgb, var(--ink) 70%, transparent)`): only for a smaller image overlapping a larger one.

### Named Rules
**The Feather, Don't Frame Rule.** Campaign images meet their ground through gradient `mask-image` fades, not borders, frames or containers.

## Shapes

Square everywhere (0px radius): buttons, inputs, images, the sticky bar. Lines are hairlines at 1px (field underlines, list rules at ink 22% or currentColor 28%, callout leaders) or 2px (link-CTA underline, switch underline). The authored arrow has square caps and a 2.5 stroke on a 24 grid. The only curved forms are photographic. The one deliberate exception is the **sticker**: a small glossy circle (76–112px, radial gradient from a white highlight through blush or powder into lavender, rotated 4–10°, soft offset shadow) carrying a two-line offer or aside. At most one per section.

## Components

### Buttons
Tactile and quiet: a square slab that floods with colour from wherever the pointer enters.
- **Shape:** square (0px), minimum height 60px, padding 0 24px 0 32px, label left and arrow right with space-between. Full width on mobile.
- **Primary (on dark grounds):** mist face, ink label, calm flood.
- **Hover / Focus:** a circular clip-path fill expands from the pointer position (700ms, ease-out) and drains back out where it leaves; keyboard focus blooms from centre and adds a 2px currentColor outline at 4px offset. The arrow slides out right while a second arrow slides in from the left. Active scales to 0.985. Busy state pins the fill and pulses it.
- **Other variants:** the component also defines an ink-face variant for light grounds and a mist-on-blue variant; neither ships on the current page.

### Link CTA
Text link with an arrow ("Shop the two", "View product"), action type at 1.25rem, 44px minimum hit area, 2px currentColor underline that wipes away to the right on hover while the arrow nudges 6px. The header "Early access" link uses the same wipe at 1px.

### Inputs / Fields
- **Style:** borderless, transparent, 56px tall, text at 1.375 to 1.75rem weight 500 in mist, a single 1px underline at mist 45%. Prefixes (+91) sit on the same underline in mist-soft.
- **Focus:** underline turns calm and thickens by a 1px calm box-shadow.
- **Error:** underline stays calm; message in calm, 0.875rem weight 600, below the field.
- **Channel switch:** two text options at 1.25rem; the checked one turns mist with a 2px calm underline that grows in.

### Wordmark (signature)
One component, `src/components/Wordmark.astro`, is the only place the logo is referenced. Today its source is `src/assets/brand/noomi-wordmark.png`, a 3720px raster derived from the only supplied master (`brand/noomi-logo.jpeg`). It is **not** a vector. It is used as an alpha mask so the exact geometry takes a colour from its ground: **mark** navy #011E54 on light grounds, **light** Mist on dark and photographic ones. Swapping in the vector master is a one-line import change in that file. Never distorted, re-proportioned or effected.
- **Header:** 96–116px on phones, 128px on desktop, top left, linking home; it rises through its baseline on the home page only.
- **Footer sign-off:** the light mark at full measure on the Ink footer, its feet cropped by the page's last edge.

### Navigation
One sticky header on every page (`SiteHeader.astro`), solid Mist with a 1px ink-10% rule: the wordmark (links home) left; Home, Calm Serum, Barrier Repair Cream as 0.875rem/600 text links (hairline underline on hover and for `aria-current`) from 900px; the cart control (bag icon + square count) at the far right. Phones: wordmark · "Menu" button · cart, the destinations in a panel of wide-voice hairline rows under the bar. 60px tall (72px desktop). No dock.
### Mood Credit
Every temporary campaign image carries a quiet disclosure: `.credit` (global.css), 10px, weight 500, 80% opacity, horizontal, in the image's bottom corner (`--top` where copy overlaps the bottom, `--ink` on light image areas). Discoverable, never part of the composition.

### Hero (signature)
One focal point, then a way in. The line "Skincare, / edited **to two.**" in the negative space; the 4:5 serum-and-cream plate at full width and native density (capped at min(110vw, 540px) tall on phones, cropped into its own negative space); the two callouts are links to their product pages; the foot on the navy base: "Two products. **Pre-order now, 25% off.**" and a solid Mist "Shop the two" button. Not full-viewport: on a 390×844 phone the product section starts inside the first screen. Desktop: line and offer on the Mist left, the plate right.
### Ghost button
The hero CTA: transparent, 1px inset hairline at 55% of the text colour, 52px tall, label 1.0625rem/600. The ground sets `--ghost` (line and text) and `--ghost-on` (text once flooded). Same pointer-flood as the primary button.

### Store (2026-09-24: a website, not a presentation)
Priority order for every page: navigation, products, product discovery, pre-order CTA, cart, checkout, hierarchy, then brand expression. Sections are compact (32–64px padding on phones), grounds meet at crisp edges, display type stays at section-title scale (clamp(1.875rem, 8vw, 3rem)) outside the hero, and no section exists only to make a statement.
- **Home = desire and discovery (art-direction pass 2026-09-24, "one screen, one idea").** Hero (a still that comes alive on load) → **Too many steps?** (directly after the hero, on the hero's navy: a fast ~4.8 s autoplay loop (4.5 s phones, 4.8 s desktop; first cut at ~1.3 s while the words are still wandering, cuts rippling 0.14 s apart) in which nine routine words are already on screen (a ~160 ms fade, no fly-in), each wandering on its own small asynchronous path, then get struck in blush and fly off in overlapping groups, then **Calm Serum + Barrier Repair Cream** land as links and "That's it." settles while the question dims; it pauses off-screen, never needs a click, and under reduced motion shows the resolved state still) → **Which one are you opening?** (the gel + cream swatch; each half is its product's door: hover leans the photo toward it, dims the other half, fills the label blush; tap presses) → **01 / Calm · Calm Serum · First step.** (Blue, image-led) → **02 / Barrier · Barrier Repair Cream · Second step.** (Powder, type-led) → ticker (carries the one brand line, "Skin first. Everything else later.") → **Made to be touched.** (the Noomi camera roll: six tilted, framed campaign photos, captions of a word or two, alternate frames lift on scroll) → **Edited for real life.** (one static campaign moment: a large portrait beside "Edited for / real life." and "Early class. Hot day. / Late night. Still two."; only the shared one-time reveal) → **Found us early. Take 25% off.** (Blue) → Footer. No specifications, tables or paragraphs on the homepage.
- **Product names on the homepage** size from their own container (`cqi`), one word per line, so no word can ever clip.
- **Customer-facing copy never shows development placeholders.** Undecided facts use `pending` in `src/content/business.ts` ("Price coming soon", "Confirmed before you pay", "Coming soon"); bracketed placeholders live only in the legal drafts and code comments.
- **Korean influence:** felt only through the photography and restraint (cool light, dewy skin, glossy texture, soft gradients, precise layouts). The homepage never names or explains it.
- **Voice:** short, warm, a little funny, specific to Indian Gen-Z life (humidity, autos, exam weeks, 11:30 pm). Each section readable in 2–4 seconds. Never a product-performance or texture claim.
- **Product page:** breadcrumb; gallery (swipe strip on phones, stacked on desktop); name, line, price block with the offer in Blue, 60px stepper + full-width ink "Pre-order", dispatch note; accordion details (Description, Ingredients, Size and texture, How to use, Pre-order and returns); a link to the other product. Desktop: gallery 7/12, sticky buying column 5/12.
- **Cart control:** 22px bag icon (1.75 stroke, square caps) and an 18px square count, 6px apart, one 44px target; the count is a hairline box at 0 and fills with the ground's ink after.
- **Drawer and /cart:** lines (64×80 thumb, wide-voice name, size · unit price, stepper, Remove, line total), then Subtotal, "Pre-order discount · 25%" in Blue, Shipping, Tax, Total, and an ink "Continue to checkout" slab.
- **Checkout:** "Pre-order" title with the offer and dispatch note; numbered groups (Contact, Delivery, Payment); underline fields; summary with the same five rows; ink "Place pre-order"; an honest status line.
- **Legal pages:** as before (two-voice title, draft notice, contents, numbered clauses).
- **Footer:** Ink; "Shop" (Home, Calm Serum, Barrier Repair Cream, Cart) and "Help" (Contact, Returns & Refunds, Privacy Policy) link groups, then the light wordmark at full measure, feet cropped by the page edge.
## Do's and Don'ts

### Do:
- **Do** give every section one palette ground via its ground declaration and join it to the previous one with a tonal band.
- **Do** set display type only in condensed black (800, width 75%) or expanded light (300, width 125%), one beat in each when a headline has two.
- **Do** keep every edge square (0px) and every rule a 1px or 2px hairline.
- **Do** feather campaign images into the ground with gradient masks and let them bleed to a viewport edge.
- **Do** put the quiet `.credit` disclosure on every temporary campaign image, and never present it as product photography.
- **Do** render the wordmark only through `Wordmark.astro`: navy #011E54 on light grounds, Mist on dark and photographic ones.
- **Do** keep content visible without JS, and settle all motion under `prefers-reduced-motion`.

### Don't:
- **Don't** use calm for body text on mist or calm grounds.
- **Don't** trace, redraw, distort or re-proportion the wordmark, give it any colour but the supplied navy or Mist, or add effects to it beyond the baseline rise.
- **Don't** add hues outside the five client blues; mix them instead.
- **Don't** wrap content in cards, pills, badges or rounded containers.
- **Don't** add a second typeface or a medium-width display voice.
- **Don't** set small eyebrow or kicker labels above headlines; captions belong to images, fields and footnotes.
- **Don't** let text begin inside a tonal band, where its ground is still changing.
- **Don't** state product ingredients, benefits, sizes or prices in the design; unconfirmed facts stay as visible placeholders.
