import Link from 'next/link';
import type { Metadata } from 'next';
import { NextPage } from '@/components/next-page';
import { SectionHeader } from '@/components/ds';
import { title, intro, onTheChangemakersPage, closing } from '@/content/about';

export const metadata: Metadata = { title: 'About — D+D Collective' };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-container px-7 pb-20 pt-14">
      <SectionHeader level={1} eyebrow="About" title={title} />

      {intro.map((p) => (
        <p key={p.slice(0, 24)} className="mt-5 max-w-measure text-body">{p}</p>
      ))}

      <p className="mt-5 max-w-measure text-body">
        {onTheChangemakersPage}{' '}
        <Link href="/changemakers" className="text-accent">Meet the changemakers</Link>.
      </p>

      <p className="mt-[var(--section-gap)] max-w-measure text-body">{closing}</p>
      <NextPage href="/mission" label="Mission and values" />
    </div>
  );
}
