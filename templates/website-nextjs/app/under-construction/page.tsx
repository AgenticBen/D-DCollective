import type { Metadata } from 'next';
import { Logo, Eyebrow, GradientRule } from '@/components/ds';

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
        {/* Transparent artwork so the logo sits straight on the tinted band, no white box. */}
        <span className="logo-light"><Logo variant="lockup-transparent" height={52} /></span>
        <span className="logo-dark"><Logo variant="lockup-dark-transparent" height={52} alt="" /></span>
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
