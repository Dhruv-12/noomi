/** Field checks shared by forms. */

/** Returns the 10-digit Indian mobile number, or null if it isn't one. */
export function normaliseIndianMobile(raw: string): string | null {
  let d = raw.replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

export function isEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());
}

/** Indian PIN code: six digits, not starting with 0. */
export const isPinCode = (raw: string) => /^[1-9]\d{5}$/.test(raw.trim());
