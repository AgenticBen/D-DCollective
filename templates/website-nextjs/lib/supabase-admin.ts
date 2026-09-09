import { createClient } from '@supabase/supabase-js';

/**
 * Server-side client holding the secret key, which bypasses row-level
 * security. It exists so a route handler can write a row the anonymous role
 * has no policy to write — a changemaker's own profile, landing unpublished.
 *
 * Import this only from route handlers. The key is read from
 * SUPABASE_SECRET_KEY, deliberately without a NEXT_PUBLIC_ prefix: Next inlines
 * only NEXT_PUBLIC_* variables into client bundles, so this one is `undefined`
 * in the browser and cannot ship there even by mistake.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;

export const supabaseAdmin =
  url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;

/** Bucket holding portraits people upload for their own profile. */
export const PHOTO_BUCKET = 'people-photos';
