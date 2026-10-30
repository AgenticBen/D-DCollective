import { NextResponse, type NextRequest } from 'next/server';
import { PREVIEW_COOKIE, PREVIEW_COOKIE_MAX_AGE, previewToken, safeNext } from '@/lib/site-gate';

/** Checks the shared preview password and sets the preview cookie. */
export async function POST(request: NextRequest) {
  const form = await request.formData();
  const attempt = String(form.get('password') ?? '');
  const next = safeNext(String(form.get('next') ?? '/'));
  const password = process.env.SITE_PASSWORD;

  if (!password || attempt !== password) {
    const url = new URL('/preview-access', request.url);
    url.searchParams.set('next', next);
    url.searchParams.set('error', password ? 'wrong' : 'unset');
    return NextResponse.redirect(url, 303);
  }

  const response = NextResponse.redirect(new URL(next, request.url), 303);
  response.cookies.set(PREVIEW_COOKIE, await previewToken(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: PREVIEW_COOKIE_MAX_AGE
  });
  return response;
}
