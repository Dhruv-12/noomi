# Noomi — pre-order store

A two-product skincare store built with Astro: home, two product pages, cart, pre-order checkout, policies and contact. Output is static, designed for 390px phones first. Products are on **pre-order at 25% off**; online payment is not yet connected.

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
```

## Routes

| Route | What |
|---|---|
| `/` | Hero, too many steps (autoplay loop), which one are you opening, Calm Serum, Barrier Repair Cream, camera roll, edited for real life, pre-order |
| `/products/calm-serum`, `/products/barrier-repair-cream` | Product pages (generated from `src/content/site.ts`) |
| `/cart` | Full-page cart (the header's cart control opens the same cart as a drawer) |
| `/checkout` | Pre-order checkout |
| `/privacy-policy`, `/returns-refunds`, `/contact` | Policies (drafts) and contact |

## Where things live

| What | File |
|---|---|
| Every product fact (price, size, SKU, ingredients, availability…) | `src/content/site.ts` |
| All imagery, one map (hero still + future hero film, products, campaign world). Replace files here, not in components | `src/content/media.ts` |
| Legal entity, contacts, GSTIN, shipping/tax/payment placeholders, pre-order offer and dispatch date, legal-review flag | `src/content/business.ts` |
| Prices, the 25% pre-order discount, subtotal/discount/shipping/tax/total | `src/lib/pricing.ts` |
| Cart store (sessionStorage, one line per product) | `src/lib/cart.ts` |
| Cart UI wiring (counts, drawer, add buttons, line lists, totals) | `src/scripts/cart-ui.ts` |
| Payment boundary (the only place checkout talks to payments) | `src/lib/payment.ts` |
| Header and navigation, footer | `src/components/SiteHeader.astro`, `src/components/Footer.astro` |
| Product card (home) and product page | `src/components/ProductCard.astro`, `src/pages/products/[slug].astro` |
| Colour, type and spacing tokens | `src/styles/global.css` |
| Original brand references | `brand/` |
| The logo: one component, one asset (swap the import for the SVG master) | `src/components/Wordmark.astro`, `src/assets/brand/noomi-wordmark.png` |

## Hero film (optional, when a real one exists)

Put a 5–8 s muted loop (4:5, no text) in `public/film/` and set `hero.film = { webm: '/film/hero.webm', mp4: '/film/hero.mp4' }` in `src/content/media.ts`. The hero swaps it in with no layout change, uses the current photo as the poster, pauses it off-screen, and skips it under reduced motion.

## Undecided facts

Customers never see bracketed placeholders. `src/content/business.ts` holds the team's placeholders (for the legal drafts) and `pending`, the customer wording ("Price coming soon", "Confirmed before you pay", "Coming soon"). The contact page lists only details that are actually set.

## Pricing

Prices are in paise in `src/content/site.ts`. The 25% pre-order discount is applied to the cart subtotal in `src/lib/pricing.ts`, rounded to the nearest paisa, and only once real prices exist: while any price is `null`, the subtotal, discount amount and total show as TBD (the discount shows as "−25%"). The total also stays TBD until shipping and tax rules are set.

## Still [TBD] (nothing below was invented)

**Blocking launch**
- **Payments: not connected.** See `src/lib/payment.ts` for exactly what is needed: a provider account, a server endpoint (this site is static; secret keys must never reach the browser), a provider adapter, a signature-verifying webhook, order storage and fulfilment hand-off. Until then checkout validates and then says, truthfully, that the order can't be placed.
- **Legal review.** `/privacy-policy` and `/returns-refunds` are drafts. Have them reviewed by an Indian lawyer covering consumer protection, e-commerce, cosmetics regulation, data protection and D2C contracts, then set `legal.reviewedByCounsel = true` and the effective dates in `src/content/business.ts`. Under-18 customers: the DPDP Act requires verifiable parental consent; the Privacy Policy has a [TBD] clause for the mechanism.
- Business details in `src/content/business.ts`: legal entity, registered address, GSTIN, phone, support/privacy/grievance emails, Grievance Officer, jurisdiction, claim window, refund period, logistics provider, shipping and tax rules.
- Instagram handle: `launch.instagram`
- Real domain: `astro.config.mjs` → `site`
- Favicon (none supplied; browsers request `/favicon.ico` and get a 404).

**Product facts** (`src/content/site.ts`). Each `null` renders as a visible "[… — TBD]". Prices are in paise.
- Price (and compare-at price, only if real), size, SKU, availability
- Description, full ingredient list (INCI), texture
- Product photography (the shop and cart show labelled mood images until then)

**Pre-order facts**: dispatch date (`commerce.preorder.dispatch`), pre-order cancellation terms (Returns policy clause 3.5), and whether GST is included in prices.

**Temporary campaign images (replace all before launch).** These are AI-generated art direction made in Canva. They are not product photography and show no packaging. Each file has its generation prompt embedded, and each use in code is marked `REPLACE WITH FINAL NOOMI CAMPAIGN IMAGE`. Replace them with the real shoot, keeping the same file names or updating the imports.

| File | Used in | Shot brief |
|---|---|---|
| `hero-4x5.jpg` | Home hero (animated) | Serum drop touching a cream swirl on wet navy glass, mist above, 4:5 |
| `serum.jpg` | Calm Serum card, feature, product page, cart | Serum texture pooling and droplets on blue, 4:5 |
| `skin-droplet.jpg` | Calm Serum product page; moodboard | Macro cheek, one serum droplet, cool blue light, 4:5 |
| `cream.jpg` | Barrier Repair Cream card, feature, product page, cart | Cream swirl texture, blue light, 4:5 |
| `cream-hand.jpg` | Cream feature detail, product page; moodboard | Cream dab on skin, 4:5 |
| `textures.jpg` | "Which one are you opening?"; camera roll | Serum and cream swatches side by side, powder blue, 16:9 |
| `condensation.jpg` | Moodboard | Condensation on cool glass |
| `portrait.jpg` | Moodboard | Profile portrait, blue light, 4:5 |
| `monsoon.jpg` | Camera roll ("after the rain") | Young Indian woman at a rain-streaked window, monsoon evening, 4:5 |
| `getting-ready.jpg` | "Edited for real life." | Young Indian woman getting ready, fingertip to cheek, morning light, 4:5 |

The people in these images are AI-generated, not customers or models; replace with a real shoot that represents the real range of Indian skin tones.

**Resolution.** Canva's generator tops out at 1136×1408 (4:5) and 1680×944 (16:9); nothing larger can be generated here, and none of these files is upscaled. Measured in the browser (source pixels per CSS pixel, after cover-crop and scroll zoom): 2.5–3.3× on a 390px phone at 3×, but only 1.2–1.5× at 1440px desktop at 2×, where they look soft on retina screens. **Brief for the shoot:** deliver at least 2400px on the short side (hero: 2400×3000 or larger) so desktop retina is covered too.

**Brand assets**
- **Vector wordmark (SVG). Not in the project.** The only logo source supplied is `brand/noomi-logo.jpeg` (mark ≈615px wide). The site uses a cleaned 3720px raster derived from it, which is not equivalent to a vector. When the SVG arrives: add it to `src/assets/brand/` and change the one import in `src/components/Wordmark.astro`. Also confirm the light (Mist) colourway.
- Social share image (1200×630) and favicon (none yet, so the browser shows its default)

**Promises the site makes that the team must keep**
- "Pre-order now, 25% off" on every product.
- "Ships after launch. Dispatch date: [TBD]" — set a real date before taking payment.
- "Damaged, defective or incorrect products are covered by our Returns & Refunds Policy."
