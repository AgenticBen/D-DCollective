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
          <input
            name="password" type="password" required autoComplete="current-password"
            className="border border-rule bg-paper px-3 py-2 text-[0.95rem] outline-none focus:border-accent"
          />
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
