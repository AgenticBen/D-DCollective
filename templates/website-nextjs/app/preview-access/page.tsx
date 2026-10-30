import type { Metadata } from 'next';
import { ThemedLogo, Eyebrow, GradientRule, buttonStyle } from '@/components/ds';
import { safeNext } from '@/lib/site-gate';

export const metadata: Metadata = { title: 'Preview · D+D Collective' };

const ERRORS: Record<string, string> = {
  wrong: 'That password did not work. Try again.',
  unset: 'The preview password has not been set up yet.'
};

export default function PreviewAccessPage({ searchParams }: { searchParams: { next?: string; error?: string } }) {
  const next = safeNext(searchParams.next);
  const error = searchParams.error ? ERRORS[searchParams.error] : null;

  return (
    <main className="mx-auto grid min-h-screen max-w-sm content-center gap-7 px-6 py-16">
      <div className="grid justify-items-center gap-2 text-center">
        <ThemedLogo kind="lockup" height={40} />
        <Eyebrow style={{ marginTop: 20 }}>Team preview</Eyebrow>
        <h1 className="section-title">This site is not public yet</h1>
        <GradientRule style={{ margin: '4px auto 0' }} />
        <p className="text-[0.95rem] text-muted">Enter the preview password to see the work in progress.</p>
      </div>

      <form method="post" action="/api/preview-access" className="grid gap-4 border border-rule p-6">
        <input type="hidden" name="next" value={next} />
        <label className="grid gap-1.5 text-[0.9rem]">
          <span className="font-medium">Password</span>
          <input
            name="password" type="password" required autoFocus autoComplete="current-password"
            className="border border-rule bg-paper px-3 py-2 text-[0.95rem] outline-none focus:border-accent"
          />
        </label>
        {error && <p role="alert" className="text-[0.85rem]" style={{ color: 'var(--warn-ink)' }}>{error}</p>}
        <button type="submit" style={buttonStyle('primary', 'md')}>View the site</button>
      </form>
    </main>
  );
}
