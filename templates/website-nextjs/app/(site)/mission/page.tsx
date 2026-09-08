import Link from 'next/link';
import { NextPage } from '@/components/next-page';
import type { Metadata } from 'next';
import { VisionStatement } from '@/components/vision-statement';
import { ValuesList } from '@/components/values-list';
import { vision, shalomGloss, missionLine, missionBody, values, closing } from '@/content/mission';

export const metadata: Metadata = { title: 'Mission — D+D Collective' };

export default function MissionPage() {
  return (
    <>
      <section className="mx-auto max-w-container px-6 pb-14 pt-16 sm:pt-20">
        <h1 className="page-title">
          {missionLine}
        </h1>
        <p className="mt-8 max-w-measure text-body">{missionBody}</p>
        <p className="mt-6 max-w-measure border-l border-teal pl-5 text-body">{shalomGloss}</p>
      </section>

      <VisionStatement>{vision}</VisionStatement>

      <section className="mx-auto max-w-container px-6 pt-16 sm:pt-20" aria-labelledby="values">
        <h2 id="values" className="section-title">Values</h2>
        <p className="mt-3 max-w-measure text-body">
          Six commitments, distilled from the same manifesto. They are the questions we ask ourselves about our
          own conduct before we ask them of anyone we fund.
        </p>
        <div className="mt-10">
          <ValuesList items={values} />
        </div>
        <p className="mt-10 max-w-measure text-body">{closing}</p>
        <NextPage href="/how-we-work" label="How we work" hint="Keep reading" />
      </section>
    </>
  );
}
