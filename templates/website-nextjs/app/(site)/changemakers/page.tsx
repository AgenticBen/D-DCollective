import type { Metadata } from 'next';
import { SectionHeader } from '@/components/ds';
import { ChangemakersTabs } from '@/components/changemakers-tabs';
import { getOrganizationsForViewer, getPortfolio, POSTURE_LABELS, VEHICLE_LABELS } from '@/lib/data';
import { flags } from '@/lib/flags';

export const metadata: Metadata = { title: 'Changemakers — D+D Collective' };

/* Reads the visitor's session to decide whether drafts are visible, so this
   cannot be cached across viewers. */
export const dynamic = 'force-dynamic';

export default async function ChangemakersPage() {
  const [{ groups, isStaff, draftSlugs }, portfolio] = await Promise.all([
    getOrganizationsForViewer(),
    getPortfolio()
  ]);

  return (
    <div className="mx-auto max-w-container px-7 pb-20 pt-14">
      <SectionHeader
        level={1}
        eyebrow="Changemakers"
        title="The leaders we walk with"
        lede="Committed partners, the redemptive investing portfolio, and scholarship alumni now contributing in their communities."
      />
      <ChangemakersTabs
        groups={groups}
        portfolio={portfolio}
        vehicleLabels={VEHICLE_LABELS}
        postureLabels={POSTURE_LABELS}
        showPosture={flags.showReturnPosture}
        isStaff={isStaff}
        draftSlugs={[...draftSlugs]}
      />
    </div>
  );
}
