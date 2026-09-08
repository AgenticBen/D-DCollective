import Link from 'next/link';
import type { Metadata } from 'next';
import { EntryList } from '@/components/entry-list';
import { getPortfolio, VEHICLE_LABELS, POSTURE_LABELS } from '@/lib/data';
import { flags } from '@/lib/flags';
import { title, definition, definitionMore, note } from '@/content/portfolio';

export const metadata: Metadata = { title: 'Portfolio — D+D Collective' };

export default async function PortfolioPage() {
  const holdings = await getPortfolio();

  return (
    <>
      <section className="mx-auto max-w-container px-6 pb-12 pt-16 sm:pt-20">
        <h1 className="page-title">
          {title}
        </h1>
        <p className="mt-8 max-w-measure text-body">{definition}</p>
        <p className="mt-4 max-w-measure text-body">{definitionMore}</p>
        <p className="mt-4 max-w-measure text-[0.95rem] text-muted">{note}</p>
      </section>

      <section className="mx-auto max-w-container px-6" aria-labelledby="holdings">
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
          <Link href="/changemakers" className="text-accent underline decoration-rule hover:decoration-accent">
            The organizations we fund
          </Link>
        </p>
      </section>
    </>
  );
}
