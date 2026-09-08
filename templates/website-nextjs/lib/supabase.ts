import { createClient } from '@supabase/supabase-js';

/**
 * Read-only client for public content. Uses the publishable key, which is
 * designed to ship to the browser: row-level security decides what it can see,
 * and it can read nothing from grant_submissions or investment_submissions —
 * those tables carry no policy at all and are reachable only from server route
 * handlers with the service-role key.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase = url && key ? createClient(url, key) : null;

/** True when the site is configured to read live content. */
export const hasSupabase = supabase !== null;
