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
 *
 * Two things here are deliberate and easy to undo by accident. The cards are
 * uniform — no badge marking who is funded and who funds — and the order is
 * alphabetical, because every row leaves sort_order at 0. Putting the family
 * first, or tagging a card "Scholar", restores exactly the hierarchy this page
 * is arranged to drop.
 */
export default async function ChangemakersPage() {
  const { people, isStaff, draftSlugs } = await getPeopleForViewer();

  return (
    <div className="mx-auto max-w-container px-7 pb-20 pt-14">
      {/* No eyebrow: it would only repeat the title. */}
      <SectionHeader
        level={1}
        title="Changemakers"
        lede="Founders, scholars, builders and mentors — in Charlotte and East Africa, and well beyond both. Every description on this page was written by the person it describes. Ours too."
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
