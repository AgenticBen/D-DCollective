import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/auth/middleware';

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

/** Only the admin is gated; the public site is untouched. */
export const config = {
  matcher: ['/admin/:path*']
};
