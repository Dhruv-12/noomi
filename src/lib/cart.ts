/**
 * The cart. Client-side only, persisted for the browsing session
 * (sessionStorage), keyed by product id so the same product is never listed
 * twice: adding it again raises its quantity.
 *
 * Every UI (header count, drawer, /cart, /checkout) reads and writes through
 * this module and re-renders on the `noomi:cart` event, so they never drift.
 */
import { productById, type Product } from '../content/site';
import { totals, type Totals } from './pricing';

export type CartLine = { id: string; qty: number };
export type ResolvedLine = CartLine & { product: Product; lineTotal: number | null };

const KEY = 'noomi-cart-v1';
/** Technical guard against runaway input, not a business rule. */
export const MAX_QTY = 99;
const EVENT = 'noomi:cart';

let lines: CartLine[] = load();

function load(): CartLine[] {
  try {
    const raw = sessionStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    // Drop anything that no longer matches a real product or a sane quantity
    return parsed
      .filter((l): l is CartLine => !!l && typeof l.id === 'string' && Number.isInteger(l.qty))
      .filter((l) => productById(l.id) && l.qty > 0)
      .map((l) => ({ id: l.id, qty: Math.min(l.qty, MAX_QTY) }));
  } catch {
    return [];
  }
}

function commit(next: CartLine[]) {
  lines = next;
  try { sessionStorage.setItem(KEY, JSON.stringify(lines)); } catch { /* private mode: cart lives for this page only */ }
  document.dispatchEvent(new CustomEvent(EVENT));
}

export const cart = {
  lines: (): CartLine[] => lines.map((l) => ({ ...l })),

  count: (): number => lines.reduce((n, l) => n + l.qty, 0),

  add(id: string, qty = 1) {
    if (!productById(id) || qty < 1) return;
    const existing = lines.find((l) => l.id === id);
    commit(existing
      ? lines.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + qty, MAX_QTY) } : l))
      : [...lines, { id, qty: Math.min(qty, MAX_QTY) }]);
  },

  setQty(id: string, qty: number) {
    if (qty < 1) return cart.remove(id);
    commit(lines.map((l) => (l.id === id ? { ...l, qty: Math.min(Math.floor(qty), MAX_QTY) } : l)));
  },

  remove(id: string) { commit(lines.filter((l) => l.id !== id)); },

  clear() { commit([]); },

  /** Lines joined to product data, with line totals (null while a price is TBD). */
  resolved(): ResolvedLine[] {
    return lines.flatMap((l) => {
      const product = productById(l.id);
      if (!product) return [];
      return [{ ...l, product, lineTotal: product.price === null ? null : product.price * l.qty }];
    });
  },

  /** Subtotal, pre-order discount, shipping, tax and total (null = TBD). */
  totals(): Totals {
    return totals(cart.resolved());
  },

  subscribe(fn: () => void) {
    document.addEventListener(EVENT, fn);
    // Another tab of the same session can't share sessionStorage, but a
    // back/forward-cache restore can leave a page stale: re-read on show.
    window.addEventListener('pageshow', () => { lines = load(); fn(); });
    return () => document.removeEventListener(EVENT, fn);
  },
};
