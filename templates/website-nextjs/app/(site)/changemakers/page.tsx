export const revalidate = 60;

import type { Metadata } from 'next';
import { SectionHeader } from '@/components/ds';
import { ChangemakersTabs } from '@/components/changemakers-tabs';
import { getOrganizationsByRegion, getPortfolio, VEHICLE_LABELS } from '@/lib/data';

export const metadata: Metadata = { title: 'Changemakers — D+D Collective' };

export default async function ChangemakersPage() {
  const [groups, portfolio] = await Promise.all([getOrganizationsByRegion(), getPortfolio()]);

  return (
    <div className="mx-auto max-w-container px-7 pb-20 pt-14">
      <SectionHeader
        level={1}
        eyebrow="Changemakers"
        title="The leaders we walk with"
        lede="Committed partners, the redemptive investing portfolio, and scholarship alumni now contributing in their communities."
      />
      <ChangemakersTabs groups={groups} portfolio={portfolio} vehicleLabels={VEHICLE_LABELS} />
    </div>
  );
}
