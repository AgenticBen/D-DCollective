import Link from 'next/link';
import {
  ButtonLink, Card, Eyebrow, GradientRule, Quote, SectionHeader
} from '@/components/ds';
import { HeroGutter } from '@/components/hero-cards';
import { Logo } from '@/components/ds';
import { getPortfolio } from '@/lib/data';
import { heroSubtitle, mission, intro, pathways, fitYes, fitNo } from '@/content/home';

export const revalidate = 60;

export default async function HomePage() {
  const portfolio = await getPortfolio();
  const left = portfolio.slice(0, 3);
  const right = portfolio.slice(3, 6);

  return (
    <>
      <section className="hero-dark overflow-hidden">
        <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-7 py-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2.6fr)_minmax(0,0.85fr)] lg:py-24">
          <HeroGutter holdings={left} />

          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:text-left text-center">
            <div>
            <Eyebrow>Impact investing &amp; foundation</Eyebrow>
            <h1 style={{
              fontSize: 'clamp(34px,5vw,60px)', fontWeight: 'var(--fw-semibold)',
              letterSpacing: 'var(--ls-h1)', lineHeight: 'var(--lh-tight)',
              margin: '14px 0 0', textWrap: 'balance'
            }}>
              Expanding leadership pathways toward the{' '}
              <span className="hero-accent">restoration of shalom</span>
            </h1>
            <GradientRule palette="brand" style={{ margin: '22px auto 22px 0' }} />
            <p className="hero-lede" style={{ maxWidth: '46ch', margin: '0 0 26px' }}>
              {heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-3 md:justify-start justify-center">
              <ButtonLink href="/changemakers">Meet the changemakers</ButtonLink>
              <ButtonLink href="/how-we-work" variant="secondary">How we work</ButtonLink>
            </div>
            </div>

            {/* The hero ground is always dark, so this takes the dark variant
                directly rather than the theme-swapping ThemedLogo. */}
            <div className="justify-self-center md:justify-self-end">
              <Logo variant="mark-dark-transparent" height={190} alt="" />
            </div>
          </div>

          <HeroGutter holdings={right} offset={3} />
        </div>
      </section>

      <div className="mx-auto max-w-container px-7 py-14">
        <h2 className="sr-only">Three ways we work</h2>
        <div className="grid gap-[var(--gap-cols)] md:grid-cols-3">
          {pathways.map((p) => (
            <Card key={p.verb} title={p.verb}>
              <p style={{ margin: '0 0 14px', fontSize: 'var(--fs-tile)', color: 'var(--text-body)' }}>{p.body}</p>
              <Link href={p.href} style={{ fontSize: 'var(--fs-nav)', fontWeight: 'var(--fw-medium)', textDecoration: 'none' }}>
                {p.cta} →
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-[var(--section-gap)] grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              title="Why leaders"
              lede="Visionary leaders, expanded pathways, and power surrendered for the greater good."
            />
            <Quote>
              We envision a world where shalom is restored and creative, redemptive innovation flourishes;
              where human dignity and a diversity of thought and experience are treasured, mutual benefit is
              embraced, and power is shared.
            </Quote>
            <Link href="/mission" style={{ fontSize: 'var(--fs-nav)', fontWeight: 'var(--fw-medium)', textDecoration: 'none' }}>
              Read the full vision →
            </Link>
          </div>

          <Card title="Whether this is a fit">
            <p style={{ margin: '0 0 16px', fontSize: 'var(--fs-tile)', color: 'var(--text-body)' }}>
              We would rather you know quickly. If the second list describes you, a conversation is probably
              not the best use of your week — and we would still rather say so here than after three emails.
            </p>
            <Eyebrow style={{ marginBottom: 8 }}>Usually a fit</Eyebrow>
            <ul className="m-0 grid list-none gap-2 p-0" style={{ fontSize: 'var(--fs-tile)' }}>
              {fitYes.map((t) => <li key={t} style={{ borderBottom: 'var(--border-1)', paddingBottom: 8 }}>{t}</li>)}
            </ul>
            <Eyebrow tone="muted" style={{ margin: '18px 0 8px' }}>Usually not</Eyebrow>
            <ul className="m-0 grid list-none gap-2 p-0" style={{ fontSize: 'var(--fs-tile)', color: 'var(--text-muted)' }}>
              {fitNo.map((t) => <li key={t} style={{ borderBottom: 'var(--border-1)', paddingBottom: 8 }}>{t}</li>)}
            </ul>
            <p className="mt-5">
              <ButtonLink href="/apply" size="sm">Start a conversation</ButtonLink>
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}
