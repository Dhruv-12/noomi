# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Astro (static output, zero client JS by default, component files for maintainability) with plain CSS and one small vanilla module for the signup form. Chosen because most visitors arrive via the Instagram in-app browser on mobile data, so page weight and first paint matter more than framework features. Signup submission goes through a single adapter that posts to a configurable endpoint; the backend is not yet chosen.

## Users

Young women in India, primarily 16–23 (design voice pitched at roughly 20–21). Heavy consumers of skincare content on Instagram, Reels and YouTube. Sophisticated about branding, quick to spot template brands, and they care about aesthetics, trustworthiness, whether the routine makes sense, simplicity, authenticity, social proof and value. Most arrive on a phone from an Instagram bio link or Reel.

## Product Purpose

Noomi is a new skincare brand launching with exactly two products. Scope (updated 2026-09-24, user brief): Noomi's site is a premium two-product store, not a campaign microsite. Its jobs, in order: explain what Noomi is, show the two products, let her explore each on its own page, and take a pre-order. Products are on PRE-ORDER at 25% off. No accounts, no waitlist. Payments are not yet connected; no provider, price, tax, shipping rule or dispatch date may be invented.

## Positioning

A deliberately short routine: two products, not ten. The small range is the argument, not an apology. (Positioning hypothesis offered by design and accepted as the working frame; the founders have not yet written their own positioning statement.)

## Capabilities and Constraints

- Products (confirmed names only): **Calm Serum**, **Barrier Repair Cream**.
- Purchase flow: home → product page → Pre-order (adds to cart) → cart → checkout (name, email, phone, address, city, state, PIN, country) → "Place pre-order". The early-access signup was removed (2026-09-24).
- CTA language: "Pre-order", "Pre-order now", "Shop the two", "View product", "Continue to checkout", "Place pre-order". Never "Get early access", "Inquiry" or "Join the waitlist".
- Cart: client-side, sessionStorage. Checkout: name, email, phone, address, city, state, PIN, country (India). Payment boundary in `src/lib/payment.ts`, unconfigured; it must never fake a success.
- Undecided and must stay as visible placeholders: ingredients, benefits, textures, usage, sizes, prices, launch date, packaging, photography, founder story, meaning of the name, signup backend, payment provider, shipping and tax rules, legal entity and contact details (placeholders in `src/content/business.ts`).
- Under-18 data collection may need verifiable parental consent under India's DPDP Act; flagged to the founders, not yet resolved.

## Brand Commitments

- Wordmark: `noomi-logo.jpeg` is authoritative. Lowercase "noomi", heavy geometric sans. Never trace, redraw, distort or re-proportion it. The web renders it through an alpha matte cut from that file (`public/brand/noomi-matte.png`), so the geometry is the original's. Approved colourways (user brief, 2026-09-24): the supplied navy #011E54 on light grounds, Mist #F0F4F8 as the light version on dark and photographic grounds. Swap the matte for the vector master when it arrives.
- Palette: `noomi-colours.jpeg` is authoritative: #001F3F, #002D55, #004B87, #6A9BD1, #F0F4F8. Primarily blue. Accents added 2026-09-24 in small doses only: lavender, blush, powder blue, skin neutral.
- Positioning (2026-09-24, corrected): an Indian Gen-Z skincare brand with a subtle Korean beauty sensibility. The influence is an aesthetic layer only (clean dewy photography, glossy textures, cool light, soft gradients, precise layouts), never a homepage topic or explanation. No Hangul, flags, K-pop, cherry blossoms or imitation of existing K-beauty brands. Korean influence is brand inspiration ONLY: never claim Korean manufacturing, formulation, ingredients or ownership. Indian identity comes from real life (heat, humidity, monsoon, commutes, college, exams, late nights, too much advice online), never from stereotypes.
- Must feel: desirable, modern, current, internet-native, sophisticated, confident, premium-but-accessible, warm, distinctive.
- Must not feel: childish, generic Gen-Z, clinical/pharmacy, K-beauty clone, pink, beige wellness, old-fashioned luxury, Shopify template, AI-generated, a presentation about a brand.
- Audience tone (2026-09-24): 16–23, youthful, playful, feminine without cliché, social-media-native; premium but never corporate.

## Evidence on Hand

Only the wordmark and palette files. There are no product photos, packaging, ingredients, test results, certifications, reviews, testimonials, prices, sizes, manufacturing facts, dermatologist involvement or statistics. None of these may be invented.

## Product Principles

1. Fewer, truer things: two products, one short routine, no filler.
2. Never claim what isn't confirmed. Undecided facts read as honest customer copy ("Price coming soon"), never as an invented value and never as a developer placeholder.
3. Respect her intelligence: plain talk, no hype vocabulary.
4. Build for the phone in her hand first.

## Accessibility & Inclusion

WCAG AA contrast, semantic HTML, full keyboard support, prefers-reduced-motion respected. Imagery, once shot, must represent the real range of Indian skin tones.
