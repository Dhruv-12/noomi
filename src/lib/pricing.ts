/**
 * Every price, discount and total on the site comes from here.
 * All amounts are paise (integers). null means "not known yet" and renders
 * as a TBD placeholder: nothing is estimated, and the 25% pre-order discount
 * is only ever applied to a real price.
 */
import { commerce } from '../content/business';
import type { Product } from '../content/site';

export const PREORDER_PCT = commerce.preorder.discountPercent;

/** The discount on an amount, rounded to the nearest paisa. */
const discountOn = (paise: number) => Math.round((paise * PREORDER_PCT) / 100);

/** The price a customer pays per unit on pre-order, or null while the price is TBD. */
export function preorderUnitPrice(p: Product): number | null {
  return p.price === null ? null : p.price - discountOn(p.price);
}

export type Totals = {
  /** Sum of list prices × quantities. */
  subtotal: number | null;
  /** The pre-order discount, as a positive amount to subtract. */
  discount: number | null;
  /** Not configured yet: [SHIPPING — TBD]. */
  shipping: number | null;
  /** Not configured yet: [TAX — TBD]. Whether prices include GST is also TBD. */
  tax: number | null;
  /** Only known once every part above is known. */
  total: number | null;
};

export function totals(lines: { product: Product; qty: number }[]): Totals {
  const subtotal = lines.some((l) => l.product.price === null)
    ? null
    : lines.reduce((s, l) => s + (l.product.price as number) * l.qty, 0);
  const discount = subtotal === null ? null : discountOn(subtotal);
  const shipping: number | null = null; // [SHIPPING — TBD]
  const tax: number | null = null; // [TAX — TBD]
  const total = [subtotal, discount, shipping, tax].some((v) => v === null)
    ? null
    : (subtotal as number) - (discount as number) + (shipping as number) + (tax as number);
  return { subtotal, discount, shipping, tax, total };
}
