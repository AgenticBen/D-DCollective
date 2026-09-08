import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — D+D Collective',
  robots: { index: false, follow: false }
};

/**
 * Admin chrome. Deliberately outside the (site) route group so the public nav
 * and footer do not appear here.
 *
 * There is NO authentication yet: /admin/login accepts anything and /admin is
 * directly reachable. That is intentional for review, and it is safe only while
 * two things stay true — Vercel deployment protection covers every URL that
 * serves this, and the submissions shown are invented. It must be replaced with
 * Supabase Auth in middleware before a custom domain is attached or a real
 * application is stored. See components/admin-demo-notice.tsx.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
          <Link href="/admin/login" className="text-[0.9rem] text-accent no-underline hover:underline">
            Sign out
          </Link>
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
