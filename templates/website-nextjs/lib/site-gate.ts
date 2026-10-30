/**
 * Pre-launch gate.
 *
 * - The public domain (ddcollective.org) shows the "under construction" page
 *   until SITE_LIVE is set to "true" in Vercel.
 * - Every other address (d-d-collective.vercel.app, previews) asks for the
 *   shared preview password in SITE_PASSWORD.
 *
 * To launch: set SITE_LIVE=true in Vercel (Production) and redeploy.
 */

export const PUBLIC_HOSTS = ['ddcollective.org', 'www.ddcollective.org'];

export const PREVIEW_COOKIE = 'dd_preview';
export const PREVIEW_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function siteIsLive() {
  return process.env.SITE_LIVE === 'true';
}

/**
 * The cookie holds a hash of the password, never the password itself.
 * Changing SITE_PASSWORD signs everyone out of the preview.
 */
export async function previewToken(password: string) {
  const bytes = new TextEncoder().encode(`dd-preview:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

/** Only allow redirects back to a path on this site. */
export function safeNext(next: string | null | undefined) {
  if (!next || !next.startsWith('/') || next.startsWith('//')) return '/';
  return next;
}
