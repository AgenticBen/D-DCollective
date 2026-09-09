import type { Metadata } from 'next';
import { NextPage } from '@/components/next-page';
import { Note, SectionHeader } from '@/components/ds';
import { PersonCard } from '@/components/person-card';
import { getPeopleForViewer } from '@/lib/data';

export const metadata: Metadata = { title: 'Changemakers — D+D Collective' };

/* Reads the visitor's session to decide whether drafts are visible, so this
   cannot be cached across viewers. */
export const dynamic = 'force-dynamic';

/**
 * One grid, no tabs. The people here came to us as partners, founders,
 * scholars and family, and sorting them into those buckets on the page tells
 * the visitor about our filing rather than about them.
 */
export default async function ChangemakersPage() {
  const { people, isStaff, draftSlugs } = await getPeopleForViewer();

  return (
    <div className="mx-auto max-w-container px-7 pb-20 pt-14">
      <SectionHeader
        level={1}
        eyebrow="Changemakers"
        title="The leaders we walk with"
        lede="Founders, scholars, and people building something where they are. Select a card to read how each of them describes the work."
      />

      {isStaff && draftSlugs.size > 0 ? (
        <div style={{ marginBottom: 24 }}>
          <Note label="Staff view:">
            {draftSlugs.size} of these are drafts — not published, or with no consent recorded. Visitors do
            not see them. Descriptions stay ours until the person sends their own.
          </Note>
        </div>
      ) : null}

      {people.length === 0 ? (
        <Note label="Awaiting content:">
          Profiles appear here once each person has approved their own description and photograph. This
          section is intentionally empty rather than filled with people who have not been asked.
        </Note>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
            gap: 'var(--gap-grid)'
          }}
        >
          {people.map((p) => (
            <PersonCard key={p.slug} person={p} draft={draftSlugs.has(p.slug)} />
          ))}
        </div>
      )}

      <NextPage href="/gather" label="Events" />
    </div>
  );
}
