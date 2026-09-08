'use client';

import { useState } from 'react';
import { DataTable, Note, Tile } from '@/components/ds';
import { PartnerCard } from '@/components/partner-card';
import type { Organization, PortfolioHolding } from '@/lib/data';

const TABS = ['Partners', 'Portfolio', 'Scholars'] as const;
type Tab = (typeof TABS)[number];

export function ChangemakersTabs({ groups, portfolio, vehicleLabels, initialTab = 'Partners' }: {
  groups: Array<{ region: string; label: string; organizations: Organization[] }>;
  portfolio: PortfolioHolding[];
  vehicleLabels: Record<string, string>;
  initialTab?: Tab;
}) {
  const [tab, setTab] = useState<Tab>(initialTab);

  return (
    <>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: 'var(--border-1)' }}>
        {TABS.map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)} aria-current={tab === t ? 'true' : undefined}
            style={{
              appearance: 'none', background: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)',
              fontSize: 'var(--fs-nav)', fontWeight: 'var(--fw-medium)',
              color: tab === t ? 'var(--text-accent)' : 'var(--text-muted)',
              border: 'none', borderBottom: `2px solid ${tab === t ? 'var(--teal)' : 'transparent'}`,
              padding: '8px 4px', marginBottom: -1, transition: 'var(--transition-color)'
            }}>{t}</button>
        ))}
      </div>

      {tab === 'Partners' ? (
        <div style={{ display: 'grid', gap: 32 }}>
          <p style={{ margin: 0, fontSize: 'var(--fs-tile)', color: 'var(--text-muted)', maxWidth: 'var(--measure-lede)' }}>
            Select a card to see what an organization does and where to find them.
          </p>
          {groups.length === 0 ? (
            <Note label="Awaiting content:">
              Partners appear here once each organization has confirmed its own description and given consent.
            </Note>
          ) : null}
          {groups.map((group) => (
            <div key={group.region}>
              <h3 style={{ fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)', margin: '0 0 12px' }}>{group.label}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 'var(--gap-grid)' }}>
                {group.organizations.map((o) => <PartnerCard key={o.slug} partner={o} />)}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {tab === 'Portfolio' ? (
        <div>
          {portfolio.length === 0 ? (
            <Note label="Awaiting content:">
              The portfolio is published once each holding has been cleared for listing.
            </Note>
          ) : (
            <DataTable
              columns={['Company / fund', 'Type', 'Geography', 'Cause']}
              rows={portfolio.map((r) => [r.name, vehicleLabels[r.vehicle] ?? r.vehicle, r.geography, r.cause])}
            />
          )}
          <p style={{ fontSize: 'var(--fs-meta)', color: 'var(--text-muted)', marginTop: 12 }}>
            Philanthropic capital only. No dollar figures and no return postures published.
          </p>
        </div>
      ) : null}

      {tab === 'Scholars' ? (
        <div style={{ display: 'grid', gap: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 'var(--gap-grid)' }}>
            <Tile label="Profile shape">Name, degree and institution, where they are now, one line on the community contribution, and a quote in their own words.</Tile>
            <Tile label="Alumni only">Scholars featured here have completed their undergraduate degree and are contributing meaningfully to their community.</Tile>
            <Tile label="Consent">Each scholar approves their own profile and photo before publication.</Tile>
          </div>
          {/* No application language here: the new entity's IRS 4945(g) approval is still pending. */}
          <Note label="Awaiting content:">
            Alumni profiles are still being compiled from the predecessor foundation&rsquo;s records. This section is
            intentionally left blank rather than filled with placeholder people.
          </Note>
        </div>
      ) : null}
    </>
  );
}
