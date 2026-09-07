import Link from 'next/link';
import type { Metadata } from 'next';
import { VisionStatement } from '@/components/vision-statement';
import { ValuesList } from '@/components/values-list';
import { vision, shalomGloss, missionLine, missionBody, values, closing } from '@/content/mission';

export const metadata: Metadata = { title: 'Mission — D+D Collective' };

export default function MissionPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-16 sm:pt-20">
        <h1 className="max-w-display font-display text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-[1.16] tracking-[-0.015em]">
          {missionLine}
        </h1>
        <p className="mt-8 max-w-measure text-ink/85">{missionBody}</p>
        <p className="mt-6 max-w-measure border-l border-teal pl-5 text-ink/85">{shalomGloss}</p>
      </section>

      <VisionStatement>{vision}</VisionStatement>

      <section className="mx-auto max-w-6xl px-6 pt-16 sm:pt-20" aria-labelledby="values">
        <h2 id="values" className="font-display text-[1.6rem] leading-tight">Values</h2>
        <p className="mt-3 max-w-measure text-ink/85">
          Six commitments, distilled from the same manifesto. They are the questions we ask ourselves about our
          own conduct before we ask them of anyone we fund.
        </p>
        <div className="mt-10">
          <ValuesList items={values} />
        </div>
        <p className="mt-10 max-w-measure text-ink/85">{closing}</p>
        <p className="mt-6">
          <Link href="/how-we-work" className="text-teal-ink underline decoration-rule hover:decoration-teal-ink">
            How we work
          </Link>
        </p>
      </section>
    </>
  );
}
