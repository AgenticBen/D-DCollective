import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/auth/middleware';
import { PUBLIC_HOSTS, PREVIEW_COOKIE, previewToken, siteIsLive } from '@/lib/site-gate';

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = (request.headers.get('host') ?? '').split(':')[0].toLowerCase();

  // The admin keeps its own Supabase sign-in on every address.
  if (pathname.startsWith('/admin')) return updateSession(request);

  // APIs (MCP server, form handlers, preview sign-in) do their own checks.
  if (pathname.startsWith('/api/')) return NextResponse.next();

  // Public domain: the under-construction page until launch.
  if (PUBLIC_HOSTS.includes(host)) {
    if (siteIsLive() || pathname === '/under-construction') return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = '/under-construction';
    url.search = '';
    return NextResponse.rewrite(url);
  }

  // Every other address: the preview password.
  if (pathname === '/preview-access' || pathname === '/under-construction') return NextResponse.next();

  const password = process.env.SITE_PASSWORD;
  // Local development with no password set: no gate.
  if (!password && process.env.NODE_ENV !== 'production') return NextResponse.next();

  const cookie = request.cookies.get(PREVIEW_COOKIE)?.value;
  if (password && cookie && cookie === (await previewToken(password))) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = '/preview-access';
  url.search = `?next=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

/** Everything except Next's build files and static files (anything with a dot). */
export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\..*).*)']
};
