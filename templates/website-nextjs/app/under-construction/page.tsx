import type { Metadata } from 'next';
import { ThemedLogo, Eyebrow, GradientRule } from '@/components/ds';

export const metadata: Metadata = {
  title: 'D+D Collective · Coming soon',
  description: 'Expanding leadership pathways toward the restoration of shalom.'
};

/** What ddcollective.org shows until SITE_LIVE is set. See lib/site-gate.ts. */
export default function UnderConstructionPage() {
  return (
    <main
      className="grid min-h-screen place-items-center px-6 py-16 text-center"
      style={{ background: 'var(--hero-bg)' }}
    >
      <div className="grid max-w-lg justify-items-center gap-3">
        {/* The lockup artwork has its own white ground; a white card makes it read as intentional. */}
        <span style={{
          display: 'inline-block', background: '#FFFFFF', borderRadius: 'var(--radius-tile)',
          padding: '12px 18px', border: '1px solid var(--border-hairline)'
        }}>
          <ThemedLogo kind="lockup" height={52} />
        </span>
        <Eyebrow style={{ marginTop: 28 }}>Coming soon</Eyebrow>
        <h1 className="section-title" style={{ color: 'var(--hero-ink)' }}>Our new site is under construction</h1>
        <GradientRule style={{ margin: '4px auto 0' }} />
        <p className="mt-2 text-[1.05rem]" style={{ color: 'var(--hero-lede)' }}>
          D+D Collective is expanding leadership pathways toward the restoration of shalom.
          We&rsquo;re putting the finishing touches on this site. Please check back soon.
        </p>
      </div>
    </main>
  );
}
