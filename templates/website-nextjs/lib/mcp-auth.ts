import { createHash } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

/**
 * Sessions, cached per warm instance and keyed by a hash of the credential so
 * the credential itself is never held in memory.
 *
 * Without this, every MCP call signs in again — and a client makes several on
 * connect alone (initialize, tools/list, then each tool call). That burns
 * Supabase's auth rate limit for no reason and puts a round trip in front of
 * every tool. A cold start simply re-authenticates.
 */
const SESSION_TTL_MS = 50 * 60 * 1000; // access tokens last an hour
const sessions = new Map<string, { accessToken: string; email: string; expiresAt: number }>();

const keyFor = (credential: string) => createHash('sha256').update(credential).digest('hex');

/**
 * The MCP server acts as the signed-in staff member, never as a superuser.
 * Row-level security then does the enforcing: staff can manage content, and
 * nobody — including this server — can read grant_submissions or
 * investment_submissions, because those tables carry no policy at all.
 *
 * The bearer credential is either:
 *   - a Supabase access token (a JWT, no colon), or
 *   - `email:password`, which is what makes a static MCP config work, since
 *     access tokens expire after an hour.
 *
 * Either way the check is the same one the admin login makes, so revoking
 * access means changing the password or disabling the user in Supabase.
 */
export async function sessionForCredential(bearer: string): Promise<{ accessToken: string; email: string } | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;

  const cacheKey = keyFor(bearer);
  const cached = sessions.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return { accessToken: cached.accessToken, email: cached.email };
  }
  sessions.delete(cacheKey);

  const anon = createClient(url, key, { auth: { persistSession: false } });
  const separator = bearer.indexOf(':');

  if (separator > 0) {
    const email = bearer.slice(0, separator);
    const password = bearer.slice(separator + 1);
    const { data, error } = await anon.auth.signInWithPassword({ email, password });
    if (error || !data.session) return null;
    const session = { accessToken: data.session.access_token, email: data.user?.email ?? email };
    sessions.set(cacheKey, { ...session, expiresAt: Date.now() + SESSION_TTL_MS });
    return session;
  }

  const { data, error } = await anon.auth.getUser(bearer);
  if (error || !data.user) return null;
  const session = { accessToken: bearer, email: data.user.email ?? 'unknown' };
  sessions.set(cacheKey, { ...session, expiresAt: Date.now() + SESSION_TTL_MS });
  return session;
}

/** A Supabase client that carries the staff member's identity into RLS. */
export function clientForSession(accessToken: string) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: { persistSession: false },
      global: { headers: { Authorization: `Bearer ${accessToken}` } }
    }
  );
}
