import Link from 'next/link';
import { NextPage } from '@/components/next-page';
import type { Metadata } from 'next';
import { SectionHeader } from '@/components/ds';
import { PersonSection } from '@/components/person-section';
import { title, intro, michele, eric, closing } from '@/content/about';

export const metadata: Metadata = { title: 'About — D+D Collective' };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-container px-7 pb-20 pt-14">
      <SectionHeader level={1} eyebrow="About" title={title} />

      {intro.map((p) => (
        <p key={p.slice(0, 24)} className="mt-5 max-w-measure text-body">{p}</p>
      ))}

      <div className="mt-[var(--section-gap)] grid gap-[var(--section-gap)]">
        <PersonSection person={michele} reverse />
        <PersonSection person={eric} />
      </div>

      <p className="mt-[var(--section-gap)] max-w-measure text-body">{closing}</p>
      <NextPage href="/mission" label="Mission and values" hint="Keep reading" />
    </div>
  );
}
