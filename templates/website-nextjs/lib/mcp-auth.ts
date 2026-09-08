import { createClient } from '@supabase/supabase-js';

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

  const anon = createClient(url, key, { auth: { persistSession: false } });
  const separator = bearer.indexOf(':');

  if (separator > 0) {
    const email = bearer.slice(0, separator);
    const password = bearer.slice(separator + 1);
    const { data, error } = await anon.auth.signInWithPassword({ email, password });
    if (error || !data.session) return null;
    return { accessToken: data.session.access_token, email: data.user?.email ?? email };
  }

  const { data, error } = await anon.auth.getUser(bearer);
  if (error || !data.user) return null;
  return { accessToken: bearer, email: data.user.email ?? 'unknown' };
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
