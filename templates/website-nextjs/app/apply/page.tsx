import Link from 'next/link';
import type { Metadata } from 'next';
import { title, intro, expectations, grantsBlurb, investmentBlurb } from '@/content/apply';

export const metadata: Metadata = { title: 'Apply — D+D Collective' };

const routes = [
  { href: '/apply/grants', term: 'Grants', body: grantsBlurb, cta: 'Start the grant form' },
  { href: '/apply/investment', term: 'Investment', body: investmentBlurb, cta: 'Start the investment form' }
];

export default function ApplyPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-16 sm:pt-20">
        <h1 className="max-w-display font-display text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-[1.16] tracking-[-0.015em]">
          {title}
        </h1>
        <p className="mt-8 max-w-measure text-ink/85">{intro}</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14" aria-labelledby="expectations">
        <h2 id="expectations" className="font-display text-[1.6rem] leading-tight">What to expect</h2>
        <ul className="mt-6 border-t border-rule">
          {expectations.map((e: string) => (
            <li key={e.slice(0, 24)} className="max-w-measure border-b border-rule py-4">{e}</li>
          ))}
        </ul>
      </section>

      <h2 className="sr-only">The two forms</h2>
      <ul className="border-t border-rule">
        {routes.map((r) => (
          <li key={r.href} className="border-b border-rule">
            <div className="mx-auto grid max-w-6xl gap-3 px-6 py-9 sm:grid-cols-[14rem_1fr] sm:gap-10 sm:py-11">
              <h3 className="font-display text-[1.6rem] leading-tight">{r.term}</h3>
              <div>
                <p className="max-w-measure">{r.body}</p>
                <p className="mt-4">
                  <Link href={r.href} className="text-teal-ink underline decoration-rule hover:decoration-teal-ink">
                    {r.cta}
                  </Link>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
