/**
 * PAYMENT BOUNDARY. The checkout talks only to `startPayment()`.
 *
 * STATUS: NO PAYMENT PROVIDER IS CONFIGURED. [PAYMENT PROVIDER — TBD]
 * `startPayment()` therefore always returns `not-configured`. It never
 * simulates a charge, never returns a fake success, and holds no keys.
 *
 * To go live (all of this is external work, none of it exists yet):
 *  1. Choose a provider (e.g. Razorpay, Cashfree, PayU, Stripe India,
 *     or Shopify Checkout if the store moves to Shopify).
 *  2. Add a SERVER endpoint. This site is static; a provider's secret key
 *     must never reach the browser. Either add an Astro server adapter
 *     (Vercel / Netlify / Node) or a serverless function that:
 *       - re-prices the cart from trusted product data (never trust client prices),
 *       - computes shipping and tax,   [SHIPPING — TBD] [TAX — TBD]
 *       - creates the provider order and returns its public order id.
 *  3. Add a provider adapter below that loads the provider's own checkout
 *     script and opens it with that order id (only public keys client-side).
 *  4. Add a server webhook that verifies the provider's signature and marks
 *     the order paid. Only that verification may show "order confirmed".
 *  5. Order storage, confirmation email/WhatsApp, and fulfilment hand-off.
 */

export type CheckoutCustomer = {
  name: string;
  email: string;
  phone: string; // E.164, +91XXXXXXXXXX
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type CheckoutOrder = {
  lines: { id: string; sku: string | null; qty: number }[];
  customer: CheckoutCustomer;
};

export type PaymentResult =
  /** The provider's own checkout opened; the outcome arrives via its callback and server verification. */
  | { ok: true; status: 'redirected' }
  | { ok: false; reason: 'not-configured' | 'prices-missing' | 'provider-error' };

export interface PaymentProvider {
  id: string;
  start(order: CheckoutOrder): Promise<PaymentResult>;
}

/** Registered providers. Empty until a real integration is built. */
const providers: Record<string, PaymentProvider> = {};

const configured = import.meta.env.PUBLIC_PAYMENT_PROVIDER as string | undefined;

export const paymentConfigured = (): boolean => !!configured && configured in providers;

export async function startPayment(order: CheckoutOrder, pricesKnown: boolean): Promise<PaymentResult> {
  if (!paymentConfigured()) return { ok: false, reason: 'not-configured' };
  if (!pricesKnown) return { ok: false, reason: 'prices-missing' };
  return providers[configured!].start(order);
}
