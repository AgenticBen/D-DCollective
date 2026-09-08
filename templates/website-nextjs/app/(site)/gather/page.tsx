export const revalidate = 60;

import Link from 'next/link';
import type { Metadata } from 'next';
import { EntryList } from '@/components/entry-list';
import { getEvents, getResources, formatEventDate } from '@/lib/data';
import { title, intro, invitationNote, emptyState, resourcesIntro } from '@/content/gather';

export const metadata: Metadata = { title: 'Gather — D+D Collective' };

export default async function GatherPage() {
  const [events, resources] = await Promise.all([getEvents(), getResources()]);

  return (
    <>
      <section className="mx-auto max-w-container px-6 pb-12 pt-16 sm:pt-20">
        <h1 className="page-title">
          {title}
        </h1>
        <p className="mt-8 max-w-measure text-body">{intro}</p>
        <p className="mt-4 max-w-measure text-body">{invitationNote}</p>
      </section>

      <section className="mx-auto max-w-container px-6 pb-14" aria-labelledby="events">
        <h2 id="events" className="section-title">Coming up</h2>
        {events.length > 0 ? (
          <div className="mt-8">
            <EntryList
              items={events.map((e) => ({
                key: e.slug,
                term: e.title,
                termNote: formatEventDate(e.date) + ' in ' + e.location,
                body: e.description,
                href: e.url,
                linkLabel: 'More about ' + e.title
              }))}
            />
          </div>
        ) : (
          <div className="mt-6 max-w-measure border-l border-teal pl-5">
            <p className="text-body">{emptyState}</p>
            <p className="mt-4">
              <Link href="/apply" className="text-accent underline decoration-rule hover:decoration-accent">
                Write to us
              </Link>
            </p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-container px-6" aria-labelledby="resources">
        <h2 id="resources" className="section-title">Worth reading</h2>
        <p className="mt-3 max-w-measure text-body">{resourcesIntro}</p>
        <div className="mt-8">
          <EntryList
            items={resources.map((r) => ({
              key: r.slug,
              term: r.title,
              termNote: r.source,
              body: r.why,
              href: r.url,
              linkLabel: 'Read it'
            }))}
          />
        </div>
      </section>
    </>
  );
}
