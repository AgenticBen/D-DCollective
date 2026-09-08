import Link from 'next/link';
import type { Metadata } from 'next';
import { ValuesList } from '@/components/values-list';
import { title, intro, fundingIntro, levers, practiceIntro, practices, closing } from '@/content/how-we-work';

export const metadata: Metadata = { title: 'How we work — D+D Collective' };

export default function HowWeWorkPage() {
  return (
    <>
      <section className="mx-auto max-w-container px-6 pb-12 pt-16 sm:pt-20">
        <h1 className="page-title">
          {title}
        </h1>
        <p className="mt-8 max-w-measure text-body">{intro}</p>
      </section>

      <section className="mx-auto max-w-container px-6 pb-14" aria-labelledby="fund">
        <h2 id="fund" className="section-title">What we fund</h2>
        <p className="mt-3 max-w-measure text-body">{fundingIntro}</p>
        <div className="mt-10">
          <ValuesList items={levers} />
        </div>
      </section>

      <section className="mx-auto max-w-container px-6" aria-labelledby="practices">
        <h2 id="practices" className="section-title">How we work</h2>
        <p className="mt-3 max-w-measure text-body">{practiceIntro}</p>
        <div className="mt-10">
          <ValuesList items={practices} />
        </div>
        <p className="mt-10 max-w-measure text-body">{closing}</p>
        <p className="mt-6">
          <Link href="/mission" className="text-accent underline decoration-rule hover:decoration-accent">
            Mission and values
          </Link>
        </p>
      </section>
    </>
  );
}
