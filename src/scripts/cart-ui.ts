/**
 * Cart UI wiring. Declarative hooks, one module:
 *   [data-cart-count]            live item count (hidden text when 0 is handled by CSS)
 *   [data-cart-open]             opens the drawer (falls back to its /cart href without JS)
 *   [data-add-to-cart="id"]      adds the quantity from [data-qty-for="id"]
 *   [data-qty-for="id"]          a product-card quantity stepper (local, before adding)
 *   [data-cart-lines]            a list re-rendered from the store using <template data-line-tpl>
 *   [data-cart-subtotal] [data-cart-discount] [data-cart-total]   order totals
 *   [data-cart-empty] / [data-cart-filled]   shown by cart state
 */
import { cart, MAX_QTY } from '../lib/cart';
import { formatPrice } from '../lib/money';
import { PREORDER_PCT } from '../lib/pricing';
import { pending } from '../content/business';

const $$ = <T extends Element>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)];

function renderCounts() {
  const n = cart.count();
  for (const el of $$<HTMLElement>('[data-cart-count]')) el.textContent = String(n);
  for (const el of $$<HTMLElement>('[data-cart-label]')) {
    el.setAttribute('aria-label', n === 0 ? 'Cart, empty' : `Cart, ${n} item${n === 1 ? '' : 's'}`);
    el.dataset.count = String(n);
  }
}

function renderLists() {
  const resolved = cart.resolved();
  const empty = resolved.length === 0;
  for (const el of $$<HTMLElement>('[data-cart-empty]')) el.hidden = !empty;
  for (const el of $$<HTMLElement>('[data-cart-filled]')) el.hidden = empty;
  const t = cart.totals();
  for (const el of $$<HTMLElement>('[data-cart-subtotal]')) el.textContent = formatPrice(t.subtotal);
  // The discount is shown as its rate until a real price makes an amount possible
  for (const el of $$<HTMLElement>('[data-cart-discount]')) el.textContent = t.discount === null ? `−${PREORDER_PCT}%` : `−${formatPrice(t.discount)}`;
  for (const el of $$<HTMLElement>('[data-cart-total]')) el.textContent = t.total === null ? pending.toConfirm : formatPrice(t.total);
  for (const el of $$<HTMLElement>('[data-cart-items-label]')) {
    const n = cart.count();
    el.textContent = `${n} item${n === 1 ? '' : 's'}`;
  }

  for (const list of $$<HTMLElement>('[data-cart-lines]')) {
    const tpl = list.parentElement?.querySelector<HTMLTemplateElement>('template[data-line-tpl]')
      ?? document.querySelector<HTMLTemplateElement>(`template[data-line-tpl="${list.dataset.cartLines}"]`);
    if (!tpl) continue;
    // Keep focus on the same control across re-renders (quantity buttons)
    const focused = document.activeElement as HTMLElement | null;
    const focusKey = focused?.closest('[data-line]') && list.contains(focused)
      ? `${(focused.closest('[data-line]') as HTMLElement).dataset.line}|${focused.dataset.act}` : null;

    list.replaceChildren(...resolved.map((l) => {
      const node = tpl.content.firstElementChild!.cloneNode(true) as HTMLElement;
      node.dataset.line = l.id;
      const set = (k: string, v: string) => node.querySelectorAll<HTMLElement>(`[data-f="${k}"]`).forEach((e) => { e.textContent = v; });
      set('name', l.product.name);
      set('qty', String(l.qty));
      set('unit', formatPrice(l.product.price));
      set('total', formatPrice(l.lineTotal));
      set('size', l.product.size ?? '');
      node.querySelectorAll<HTMLElement>('[data-when="size"]').forEach((e) => { e.hidden = !l.product.size; });
      node.querySelectorAll<HTMLElement>('[data-act]').forEach((b) => {
        const act = b.dataset.act;
        const label = { dec: 'Decrease quantity of', inc: 'Increase quantity of', remove: 'Remove' }[act as 'dec' | 'inc' | 'remove'];
        if (label) b.setAttribute('aria-label', `${label} ${l.product.name}`);
        if (act === 'inc') (b as HTMLButtonElement).disabled = l.qty >= MAX_QTY;
      });
      const img = node.querySelector<HTMLImageElement>('img[data-f="img"]');
      const src = document.querySelector<HTMLElement>(`[data-thumb="${l.id}"]`);
      if (img && src?.dataset.src) img.src = src.dataset.src;
      return node;
    }));

    if (focusKey) {
      const [id, act] = focusKey.split('|');
      (list.querySelector<HTMLElement>(`[data-line="${id}"] [data-act="${act}"]`)
        ?? list.querySelector<HTMLElement>(`[data-line="${id}"] [data-act]`)
        ?? list.closest<HTMLElement>('[data-cart-focus-fallback]'))?.focus();
    }
  }
}

function render() { renderCounts(); renderLists(); }

// Line controls (event delegation, so re-renders need no rebinding)
document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-act]');
  const line = btn?.closest<HTMLElement>('[data-line]');
  if (!btn || !line) return;
  const id = line.dataset.line!;
  const current = cart.lines().find((l) => l.id === id)?.qty ?? 0;
  if (btn.dataset.act === 'inc') cart.setQty(id, current + 1);
  if (btn.dataset.act === 'dec') cart.setQty(id, current - 1);
  if (btn.dataset.act === 'remove') cart.remove(id);
});

// Product-card steppers: local quantity before adding
const steppers = new Map<string, (q: number) => void>();
for (const step of $$<HTMLElement>('[data-qty-for]')) {
  const out = step.querySelector<HTMLElement>('[data-qty-value]')!;
  const dec = step.querySelector<HTMLButtonElement>('[data-step="dec"]')!;
  const inc = step.querySelector<HTMLButtonElement>('[data-step="inc"]')!;
  const sync = (q: number) => {
    q = Math.max(1, Math.min(MAX_QTY, q));
    step.dataset.qty = String(q);
    out.textContent = String(q);
    dec.disabled = q <= 1;
    inc.disabled = q >= MAX_QTY;
  };
  steppers.set(step.dataset.qtyFor!, sync);
  dec.addEventListener('click', () => sync(Number(step.dataset.qty) - 1));
  inc.addEventListener('click', () => sync(Number(step.dataset.qty) + 1));
  sync(1);
}

// Add to cart
for (const btn of $$<HTMLButtonElement>('[data-add-to-cart]')) {
  btn.addEventListener('click', () => {
    const id = btn.dataset.addToCart!;
    const step = document.querySelector<HTMLElement>(`[data-qty-for="${id}"]`);
    const qty = Number(step?.dataset.qty ?? 1);
    cart.add(id, qty);
    // Reset the card's stepper, confirm on the button, then show the cart
    steppers.get(id)?.(1);
    const label = btn.querySelector<HTMLElement>('.btn__label');
    if (label) {
      const was = label.dataset.idle ?? label.textContent ?? '';
      label.dataset.idle = was;
      label.textContent = 'Added';
      setTimeout(() => { label.textContent = was; }, 1600);
    }
    openDrawer(btn);
  });
}

// Drawer
const drawer = document.querySelector<HTMLDialogElement>('[data-cart-drawer]');
let opener: HTMLElement | null = null;

function openDrawer(from?: HTMLElement) {
  if (!drawer || drawer.open) return;
  opener = from ?? (document.activeElement as HTMLElement | null);
  drawer.showModal();
  document.documentElement.classList.add('has-drawer');
}
function closeDrawer() {
  if (!drawer?.open) return;
  drawer.classList.add('is-closing');
  const done = () => {
    drawer.classList.remove('is-closing');
    drawer.close();
  };
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) done();
  else setTimeout(done, 280);
}
if (drawer) {
  drawer.addEventListener('close', () => {
    document.documentElement.classList.remove('has-drawer');
    opener?.focus?.();
  });
  drawer.addEventListener('cancel', (e) => { e.preventDefault(); closeDrawer(); });
  drawer.addEventListener('click', (e) => { if (e.target === drawer) closeDrawer(); }); // backdrop
  for (const b of $$<HTMLElement>('[data-cart-close]', drawer)) b.addEventListener('click', closeDrawer);
  for (const a of $$<HTMLAnchorElement>('[data-cart-open]')) {
    a.addEventListener('click', (e) => { e.preventDefault(); openDrawer(a); });
  }
}

cart.subscribe(render);
render();
