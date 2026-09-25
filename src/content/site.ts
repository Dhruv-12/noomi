/**
 * Every product fact the site shows lives here.
 *
 * Only the two product names are confirmed. Everything set to `null` is
 * unknown and must stay null until the founders confirm it. The site renders
 * a null value as a visible "[… — TBD]" placeholder, so never fill one with a
 * guess: no invented prices, ingredients, sizes, claims or registrations.
 */

export type Availability = 'in_stock' | 'out_of_stock' | 'coming_soon';

export type Product = {
  id: string;
  slug: string;
  /** [TBD] stock-keeping unit, once assigned */
  sku: string | null;
  name: string;
  /** Short line under the name. null until the founders write it. */
  line: string | null;
  /** Brand line used on cards until a description exists (site copy, not a product claim). */
  tagline: string;
  /** Product description for the shop. null until founder-approved. */
  description: string | null;
  /** Price in paise (₹1 = 100 paise), tax treatment TBD. null = [PRICE — TBD] */
  price: number | null;
  /** Previous price in paise, only if a real one exists. */
  compareAtPrice: number | null;
  currency: 'INR';
  /** e.g. "30 ml". null = [SIZE — TBD] */
  size: string | null;
  /** Full ingredient list (INCI), as published on the pack. null = [TBD] */
  ingredients: string | null;
  texture: string | null;
  /** null = [AVAILABILITY — TBD]. Pre-order status is set site-wide in business.ts. */
  availability: Availability | null;
  /** Real product photography, once shot. The shop shows a labelled mood image until then. */
  image: { src: string; alt: string } | null;
  /** Free-form facts (batch info, shelf life, usage…), only once confirmed. */
  metadata: Record<string, string>;
};

export const products: Product[] = [
  {
    id: 'calm-serum',
    slug: 'calm-serum',
    sku: null, // [TBD]
    name: 'Calm Serum',
    line: null, // [TBD] one-line description, founder-approved
    tagline: 'Half the routine. All of the thought.',
    description: null, // [TBD]
    price: null, // [PRICE — TBD]
    compareAtPrice: null,
    currency: 'INR',
    size: null, // [TBD]
    ingredients: null, // [TBD] full INCI list
    texture: null, // [TBD]
    availability: null, // [TBD]
    image: null, // [TBD] product photography
    metadata: {},
  },
  {
    id: 'barrier-repair-cream',
    slug: 'barrier-repair-cream',
    sku: null, // [TBD]
    name: 'Barrier Repair Cream',
    line: null, // [TBD] one-line description, founder-approved
    tagline: 'The other half.',
    description: null, // [TBD]
    price: null, // [PRICE — TBD]
    compareAtPrice: null,
    currency: 'INR',
    size: null, // [TBD]
    ingredients: null, // [TBD] full INCI list
    texture: null, // [TBD]
    availability: null, // [TBD]
    image: null, // [TBD] product photography
    metadata: {},
  },
];

export const productById = (id: string) => products.find((p) => p.id === id);

export const launch = {
  instagram: null as string | null, // [TBD] handle without @
};
