'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Passwordless by request, so the dashboard can be reviewed. Nothing here is a
 * credential check — submitting always continues. Real auth belongs in
 * middleware, server-side, before this ships anywhere reachable.
 */
export default function AdminLoginPage() {
  const router = useRouter();

  return (
    <div className="mx-auto grid max-w-sm gap-7 px-6 py-16">
      <div>
        <p className="text-[0.75rem] uppercase tracking-[0.08em] text-teal-ink">Staff access</p>
        <h1 className="mt-2 font-display text-[2rem] leading-tight">Admin sign in</h1>
        <div className="mt-3 h-0.5 w-14 bg-teal" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push('/admin');
        }}
        className="grid gap-4 border border-rule p-6"
      >
        <label className="grid gap-1.5 text-[0.9rem]">
          <span className="font-medium">Username</span>
          <input
            name="username"
            autoComplete="username"
            className="border border-rule bg-paper px-3 py-2 text-[0.95rem] outline-none focus:border-teal-ink"
          />
        </label>
        <label className="grid gap-1.5 text-[0.9rem]">
          <span className="font-medium">Password</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            className="border border-rule bg-paper px-3 py-2 text-[0.95rem] outline-none focus:border-teal-ink"
          />
        </label>
        <button
          type="submit"
          className="mt-1 bg-teal-ink px-4 py-2.5 text-[0.95rem] text-paper hover:opacity-90"
        >
          Sign in
        </button>
        <p className="text-center text-[0.8rem] text-ink/60">
          Sign in works with the fields empty while this is a demonstration.
        </p>
      </form>

      <p className="text-center">
        <Link
          href="/"
          className="inline-block rounded-full border border-teal px-5 py-2.5 text-[0.9rem] text-teal-ink no-underline hover:bg-field"
        >
          Not an Admin, go back to home page
        </Link>
      </p>
    </div>
  );
}
