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
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-16 sm:pt-20">
        <h1 className="max-w-display font-display text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-[1.16] tracking-[-0.015em]">
          {title}
        </h1>
        <p className="mt-8 max-w-measure text-ink/85">{intro}</p>
        <p className="mt-4 max-w-measure text-[0.95rem] text-ink/65">{note}</p>
        <p className="mt-6">
          <Link href="/changemakers/portfolio" className="text-teal-ink underline decoration-rule hover:decoration-teal-ink">
            The investment portfolio
          </Link>
        </p>
      </section>

      {groups.map((group) => (
        <section key={group.region} className="mx-auto max-w-6xl px-6 pb-14" aria-labelledby={group.region}>
          <h2 id={group.region} className="font-display text-[1.6rem] leading-tight">{group.label}</h2>
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
