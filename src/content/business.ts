/**
 * Business, legal and commerce facts. Every value here is a placeholder until
 * the founders supply it. Nothing in this file may be guessed.
 *
 * Replace a placeholder string with the real value and every page that uses
 * it (policies, contact, checkout, footer) updates.
 */

export const business = {
  legalEntityName: '[LEGAL ENTITY NAME]',
  registeredAddress: '[REGISTERED ADDRESS]',
  gstin: '[GSTIN]',
  phone: '[PHONE NUMBER]',
  supportEmail: '[SUPPORT EMAIL]',
  privacyEmail: '[PRIVACY EMAIL]',
  grievanceEmail: '[GRIEVANCE EMAIL]',
  grievanceOfficerName: '[GRIEVANCE OFFICER NAME — TBD]',
  jurisdiction: '[JURISDICTION — TBD]',
};

export const commerce = {
  shipping: '[SHIPPING — TBD]',
  tax: '[TAX — TBD]',
  paymentProvider: '[PAYMENT PROVIDER — TBD]',
  logisticsProvider: '[SHIPPING CARRIER / LOGISTICS PROVIDER — TBD]',
  claimWindow: '[CLAIM WINDOW — TBD]',
  refundPeriod: '[REFUND PROCESSING PERIOD — TBD]',
  /**
   * Pre-order offer (supplied by the founders, 2026-09-24): 25% off pre-orders.
   * Applied to the cart subtotal once real prices exist; never to a TBD price.
   */
  preorder: {
    discountPercent: 25,
    /** No dispatch date has been set. Never invent one. */
    dispatch: '[DISPATCH DATE — TBD]',
  },
  /** Countries the checkout accepts. India-only until the founders decide otherwise. */
  shippingCountries: ['India'],
};

/**
 * What customers see while a fact is still undecided. The bracketed
 * placeholders above are for the legal drafts and the team; they must never
 * appear in the shop UI.
 */
export const pending = {
  price: 'Price coming soon',
  toConfirm: 'Confirmed before you pay',
  soon: 'Coming soon',
};

/**
 * INTERNAL FLAG. The Privacy Policy and the Returns, Refunds, Replacements
 * and Product-Damage Policy are DRAFTS. They must be reviewed by an Indian
 * lawyer familiar with consumer protection law, e-commerce law, cosmetics
 * regulation, data protection and D2C contracts before the site takes
 * orders or collects personal data in production.
 *
 * While false, each policy page shows a visible "Draft, pending legal
 * review" notice. Set to true only after that review, and set the dates.
 */
export const legal = {
  reviewedByCounsel: false,
  privacyEffectiveDate: '[EFFECTIVE DATE]',
  returnsEffectiveDate: '[EFFECTIVE DATE]',
};
