import { NextResponse } from 'next/server';
import { profileSubmissionSchema, PHOTO_MAX_BYTES, PHOTO_TYPES, type ApplyResponse } from '@/lib/schemas';
import { supabaseAdmin, PHOTO_BUCKET } from '@/lib/supabase-admin';

/**
 * A changemaker filling in their own profile.
 *
 * Multipart rather than JSON because a portrait comes with it, and base64 in a
 * JSON body would inflate a 4MB photo past the platform's request limit.
 *
 * The row lands with is_published false and consent_received_at set from the
 * person's own tick. Those are two different keys and both are needed: their
 * consent, and a decision by Eric or Michele to publish. Neither one alone puts
 * a face on the website.
 *
 * The email goes to a separate table with no public policy. Row-level security
 * gates rows, not columns, so an address stored on `people` would be readable
 * by anyone the moment the profile was published.
 */
const slugify = (name: string) =>
  name.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || 'person';

const extensionFor = (type: string) => (type === 'image/png' ? 'png' : type === 'image/webp' ? 'webp' : 'jpg');

export async function POST(request: Request): Promise<NextResponse<ApplyResponse>> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, reason: 'server' }, { status: 400 });
  }

  const photo = form.get('photo');
  const fields = Object.fromEntries(
    [...form.entries()].filter(([key]) => key !== 'photo').map(([key, value]) => [key, String(value)])
  );

  const parsed = profileSubmissionSchema.safeParse(fields);
  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    return NextResponse.json(
      { ok: false, reason: 'validation', fieldErrors: fieldErrors as Record<string, string[]> },
      { status: 422 }
    );
  }

  // Honeypot: a filled hidden field means a bot. Accept and discard.
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const hasPhoto = photo instanceof File && photo.size > 0;
  if (hasPhoto) {
    if (!PHOTO_TYPES.includes(photo.type as (typeof PHOTO_TYPES)[number])) {
      return NextResponse.json(
        { ok: false, reason: 'validation', fieldErrors: { photo: ['A JPEG, PNG or WebP, please.'] } },
        { status: 422 }
      );
    }
    if (photo.size > PHOTO_MAX_BYTES) {
      return NextResponse.json(
        { ok: false, reason: 'validation', fieldErrors: { photo: ['That photo is over 4MB. A smaller one, please.'] } },
        { status: 422 }
      );
    }
  }

  if (!supabaseAdmin) return NextResponse.json({ ok: false, reason: 'server' }, { status: 500 });

  const { name, email, role, bio, affiliation, affiliationUrl, photoAlt } = parsed.data;
  const slug = `${slugify(name)}-${Math.random().toString(36).slice(2, 8)}`;

  let photoUrl: string | null = null;
  if (hasPhoto) {
    const path = `${slug}.${extensionFor(photo.type)}`;
    const { error } = await supabaseAdmin.storage
      .from(PHOTO_BUCKET)
      .upload(path, photo, { contentType: photo.type, upsert: true });
    if (error) return NextResponse.json({ ok: false, reason: 'server' }, { status: 500 });
    photoUrl = supabaseAdmin.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl;
  }

  const { error: insertError } = await supabaseAdmin.from('people').insert({
    slug,
    name,
    role: role || null,
    bio,
    affiliation: affiliation || null,
    affiliation_url: affiliationUrl || null,
    photo_url: photoUrl,
    photo_alt: photoAlt || (hasPhoto ? `${name}` : null),
    is_published: false,
    consent_received_at: new Date().toISOString().slice(0, 10)
  });
  if (insertError) return NextResponse.json({ ok: false, reason: 'server' }, { status: 500 });

  /* Best effort: the profile is saved either way, and an address we cannot
     store is not a reason to make someone fill the form in twice. */
  await supabaseAdmin.from('people_contact').insert({ slug, email });

  return NextResponse.json({ ok: true });
}
