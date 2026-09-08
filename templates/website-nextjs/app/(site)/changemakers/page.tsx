import Link from 'next/link';
import type { Metadata } from 'next';
import { EntryList } from '@/components/entry-list';
import { getOrganizationsByRegion } from '@/lib/data';
import { title, intro, note } from '@/content/changemakers';

export const metadata: Metadata = { title: 'Changemakers — D+D Collective' };

export default async function ChangemakersPage() {
  const groups = await getOrganizationsByRegion();

  return (
    <>
      <section className="mx-auto max-w-container px-6 pb-12 pt-16 sm:pt-20">
        <h1 className="page-title">
          {title}
        </h1>
        <p className="mt-8 max-w-measure text-body">{intro}</p>
        <p className="mt-4 max-w-measure text-[0.95rem] text-muted">{note}</p>
        <p className="mt-6">
          <Link href="/changemakers/portfolio" className="text-accent underline decoration-rule hover:decoration-accent">
            The investment portfolio
          </Link>
        </p>
      </section>

      {groups.map((group) => (
        <section key={group.region} className="mx-auto max-w-container px-6 pb-14" aria-labelledby={group.region}>
          <h2 id={group.region} className="section-title">{group.label}</h2>
          <div className="mt-8">
            <EntryList
              items={group.organizations.map((o) => ({
                key: o.slug,
                term: o.name,
                termNote: o.place,
                body: o.description,
                href: o.url,
                linkLabel: o.name + ' website',
                logoUrl: o.logoUrl,
                logoAlt: o.name
              }))}
            />
          </div>
        </section>
      ))}
    </>
  );
}
