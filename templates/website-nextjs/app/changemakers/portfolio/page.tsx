import Link from 'next/link';
import type { Metadata } from 'next';
import { EntryList } from '@/components/entry-list';
import { getPortfolio, VEHICLE_LABELS, POSTURE_LABELS } from '@/lib/data';
import { flags } from '@/lib/flags';
import { title, definition, definitionMore, note } from '@/content/portfolio.mdx';

export const metadata: Metadata = { title: 'Portfolio — D+D Collective' };

export default async function PortfolioPage() {
  const holdings = await getPortfolio();

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-16 sm:pt-20">
        <h1 className="max-w-display font-display text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-[1.16] tracking-[-0.015em]">
          {title}
        </h1>
        <p className="mt-8 max-w-measure text-ink/85">{definition}</p>
        <p className="mt-4 max-w-measure text-ink/85">{definitionMore}</p>
        <p className="mt-4 max-w-measure text-[0.95rem] text-ink/65">{note}</p>
      </section>

      <section className="mx-auto max-w-6xl px-6" aria-labelledby="holdings">
        <h2 id="holdings" className="sr-only">Holdings</h2>
        <EntryList
          items={holdings.map((h) => ({
            key: h.slug,
            term: h.name,
            termNote: [VEHICLE_LABELS[h.vehicle], h.geography].join(', '),
            body: flags.showReturnPosture ? h.cause + '. ' + POSTURE_LABELS[h.returnPosture] + ' return.' : h.cause + '.',
            href: h.url,
            linkLabel: h.name + ' website'
          }))}
        />
        <p className="mt-10">
          <Link href="/changemakers" className="text-teal-ink underline decoration-rule hover:decoration-teal-ink">
            The organizations we fund
          </Link>
        </p>
      </section>
    </>
  );
}
