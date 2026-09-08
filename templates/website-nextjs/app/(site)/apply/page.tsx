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
      <section className="mx-auto max-w-container px-6 pb-12 pt-16 sm:pt-20">
        <h1 className="page-title">
          {title}
        </h1>
        <p className="mt-8 max-w-measure text-body">{intro}</p>
      </section>

      <section className="mx-auto max-w-container px-6 pb-14" aria-labelledby="expectations">
        <h2 id="expectations" className="section-title">What to expect</h2>
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
            <div className="mx-auto grid max-w-container gap-3 px-6 py-9 sm:grid-cols-[14rem_1fr] sm:gap-10 sm:py-11">
              <h3 className="section-title">{r.term}</h3>
              <div>
                <p className="max-w-measure">{r.body}</p>
                <p className="mt-4">
                  <Link href={r.href} className="text-accent underline decoration-rule hover:decoration-accent">
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
