/** Money is stored in paise (integers) so totals never drift. */
import { pending } from '../content/business';

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });

/** Formats paise as ₹, or the customer-facing "price coming soon" while it is unknown. */
export function formatPrice(paise: number | null): string {
  if (paise === null) return pending.price;
  return inr.format(paise / 100).replace(/\.00$/, '');
}
