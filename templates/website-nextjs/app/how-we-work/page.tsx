import Link from 'next/link';
import type { Metadata } from 'next';
import { ValuesList } from '@/components/values-list';
import { title, intro, fundingIntro, levers, practiceIntro, practices, closing } from '@/content/how-we-work.mdx';

export const metadata: Metadata = { title: 'How we work — D+D Collective' };

export default function HowWeWorkPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-16 sm:pt-20">
        <h1 className="max-w-display font-display text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-[1.16] tracking-[-0.015em]">
          {title}
        </h1>
        <p className="mt-8 max-w-measure text-ink/85">{intro}</p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-14" aria-labelledby="fund">
        <h2 id="fund" className="font-display text-[1.6rem] leading-tight">What we fund</h2>
        <p className="mt-3 max-w-measure text-ink/85">{fundingIntro}</p>
        <div className="mt-10">
          <ValuesList items={levers} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6" aria-labelledby="practices">
        <h2 id="practices" className="font-display text-[1.6rem] leading-tight">How we work</h2>
        <p className="mt-3 max-w-measure text-ink/85">{practiceIntro}</p>
        <div className="mt-10">
          <ValuesList items={practices} />
        </div>
        <p className="mt-10 max-w-measure text-ink/85">{closing}</p>
        <p className="mt-6">
          <Link href="/mission" className="text-teal-ink underline decoration-rule hover:decoration-teal-ink">
            Mission and values
          </Link>
        </p>
      </section>
    </>
  );
}
