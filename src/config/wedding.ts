/** Couple names used across the invitation and the admin message generator. */
export const BRIDE_NAME = 'Ishanka';
export const GROOM_NAME = 'Bhagya';
export const COUPLE_NAMES = `${BRIDE_NAME} & ${GROOM_NAME}`;

/**
 * Google Apps Script Web App URL that saves RSVPs into the couple's Google Sheet.
 * Paste the URL from Deploy > New deployment (see google-apps-script/SETUP.md).
 */
export const RSVP_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzGYTjz5A-W6K1srF5-b8Y3_pfDsa6AGXwppmosezlrTqZQIQxptZ2Lrl0ozEQS4Gu8/exec';

export type GuestPrefix = 'Mr.' | 'Mrs.' | 'Miss' | 'Mr. & Mrs.' | 'Family' | 'Dear';

/** Prefixes in admin dropdown order, with the short code stored in the invitation URL (`?t=`). */
export const GUEST_PREFIXES: { value: GuestPrefix; code: string }[] = [
  { value: 'Mr.', code: 'mr' },
  { value: 'Mrs.', code: 'mrs' },
  { value: 'Miss', code: 'miss' },
  { value: 'Mr. & Mrs.', code: 'mrmrs' },
  { value: 'Family', code: 'family' },
  // "Dear" is a greeting style, not a title: the link carries no prefix and the name stands alone.
  { value: 'Dear', code: '' },
];

/**
 * Combines prefix and name into how the guest is addressed, e.g. "Mr. Sanjaya" or "Sanjaya and Family".
 * Never contains "Dear" — the greeting adds that itself.
 */
export function formatGuestDisplayName(prefix: GuestPrefix | null, name: string): string {
  const cleanName = name.trim().replace(/\s+/g, ' ');
  if (!cleanName) return '';

  switch (prefix) {
    case 'Family':
      return `${cleanName} and Family`;
    case 'Dear':
    case null:
      return cleanName;
    default:
      return `${prefix} ${cleanName}`;
  }
}

/** Builds `{origin}/{guestName}?t={prefixCode}`, with the name safely URL-encoded. */
export function buildInvitationUrl(origin: string, prefix: GuestPrefix, name: string): string {
  const cleanName = name.trim().replace(/\s+/g, ' ');
  const code = GUEST_PREFIXES.find((p) => p.value === prefix)?.code;
  const query = code ? `?t=${code}` : '';
  return `${origin}/${encodeURIComponent(cleanName)}${query}`;
}

/**
 * Reads the guest's display name from the current URL.
 * Supports the path format (`/Sanjaya?t=mr`) and older `?title=Mr.&name=Sanjaya` links.
 */
export function readGuestDisplayNameFromLocation(location: Location): string {
  const params = new URLSearchParams(location.search);

  const legacyName = params.get('name');
  if (legacyName) {
    const legacyTitle = params.get('title') || '';
    const known = GUEST_PREFIXES.find((p) => p.value === legacyTitle);
    return known
      ? formatGuestDisplayName(known.value, legacyName)
      : `${legacyTitle} ${legacyName}`.trim();
  }

  const segment = location.pathname.replace(/^\/+|\/+$/g, '');
  if (!segment || segment.includes('/')) return '';

  let name: string;
  try {
    name = decodeURIComponent(segment);
  } catch {
    return '';
  }

  const code = params.get('t') || '';
  const prefix = GUEST_PREFIXES.find((p) => p.code && p.code === code)?.value ?? null;
  return formatGuestDisplayName(prefix, name);
}
