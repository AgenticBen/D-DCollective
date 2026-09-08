'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/auth/client';
import { buttonStyle, Eyebrow, GradientRule, Note } from '@/components/ds';

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const email = String(form.get('username') ?? '').trim();
    const password = String(form.get('password') ?? '');

    const { error: signInError } = await createClient().auth.signInWithPassword({ email, password });

    if (signInError) {
      /* Deliberately not saying which of the two was wrong. */
      setError('That email and password did not match an account.');
      setPending(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="mx-auto grid max-w-sm gap-7 px-6 py-16">
      <div className="text-center">
        <Eyebrow>Staff access</Eyebrow>
        <h1 className="mt-2 section-title">Admin sign in</h1>
        <GradientRule style={{ margin: '12px auto 0' }} />
      </div>

      <form onSubmit={onSubmit} className="grid gap-4 border border-rule p-6">
        <label className="grid gap-1.5 text-[0.9rem]">
          <span className="font-medium">Username</span>
          <input
            name="username" type="email" required autoComplete="username"
            className="border border-rule bg-paper px-3 py-2 text-[0.95rem] outline-none focus:border-accent"
          />
          <span className="text-[0.8rem] text-muted">Your D+D email address.</span>
        </label>
        <label className="grid gap-1.5 text-[0.9rem]">
          <span className="font-medium">Password</span>
          <span className="relative block">
            <input
              name="password" type={showPassword ? 'text' : 'password'} required autoComplete="current-password"
              className="w-full border border-rule bg-paper py-2 pl-3 pr-11 text-[0.95rem] outline-none focus:border-accent"
            />
            {/* The design system ships no icon set, so this is a single drawn
                glyph for one control rather than the start of an icon library. */}
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-pressed={showPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              title={showPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 grid w-11 place-items-center text-muted hover:text-accent"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
                <circle cx="12" cy="12" r="2.6" />
                {showPassword ? <path d="m4 20 16-16" /> : null}
              </svg>
            </button>
          </span>
        </label>

        {error ? <Note label="Could not sign in:">{error}</Note> : null}

        <button type="submit" disabled={pending} style={{ ...buttonStyle('primary', 'lg'), width: '100%', opacity: pending ? 0.45 : 1 }}>
          {pending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-center">
        <Link href="/" style={buttonStyle('outline', 'md')}>Not an Admin, go back to home page</Link>
      </p>
    </div>
  );
}
