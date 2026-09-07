import { NextResponse } from 'next/server';
import { grantApplicationSchema, type ApplyResponse } from '@/lib/schemas';

/**
 * Pre-qualification intake. Runs server-side only; the client never touches a
 * database.
 *
 * TODO(supabase): insert the parsed payload into the gift_requests table with the
 * service-role key, then notify Michele. Nothing else belongs in this handler —
 * scoring, exclusion screens and diligence stay in the internal system.
 */
export async function POST(request: Request): Promise<NextResponse<ApplyResponse>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: 'server' }, { status: 400 });
  }

  const parsed = grantApplicationSchema.safeParse(body);
  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return NextResponse.json(
      { ok: false, reason: 'validation', fieldErrors: fieldErrors as Record<string, string[]> },
      { status: 422 }
    );
  }

  // Honeypot: a filled hidden field means a bot. Accept and discard.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const payload = parsed.data;
  void payload; // TODO(supabase): persist

  return NextResponse.json({ ok: true });
}
