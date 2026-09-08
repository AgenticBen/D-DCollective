import Link from 'next/link';
import type { Metadata } from 'next';
import { signOut } from '@/app/admin/actions';
import { createClient } from '@/lib/auth/server';

export const metadata: Metadata = {
  title: 'Admin — D+D Collective',
  robots: { index: false, follow: false }
};

/**
 * Admin chrome, deliberately outside the (site) route group so the public nav
 * and footer do not appear here. Access is gated in middleware against a
 * validated JWT, server-side — never by conditional rendering here.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  /* /admin/login renders inside this shell, so the control only belongs here
     when there is actually a session to end. */
  const { data } = await (await createClient()).auth.getClaims();
  const signedIn = Boolean(data?.claims);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="border-b border-rule">
        <div className="mx-auto flex max-w-container items-center justify-between gap-6 px-6 py-5">
          <div className="flex items-baseline gap-3">
            <Link href="/" className="no-underline">
              <span className="text-[1.35rem] leading-none">D+D Collective</span>
            </Link>
            <span className="rounded-full bg-teal-deep px-2.5 py-0.5 text-[0.7rem] uppercase tracking-wider text-paper">
              Admin
            </span>
          </div>
          {signedIn ? (
            <form action={signOut}>
              <button type="submit" className="text-[0.9rem] text-accent underline-offset-2 hover:underline">
                Sign out
              </button>
            </form>
          ) : null}
        </div>
      </header>
      <main id="main" className="flex-1">{children}</main>
      <footer className="border-t border-rule bg-mist">
        <p className="mx-auto max-w-container px-6 py-4 text-[0.85rem] text-muted">
          D+D Collective · staff access only
        </p>
      </footer>
    </div>
  );
}
