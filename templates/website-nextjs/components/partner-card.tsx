'use client';

import { FlipCard, MoreHint } from '@/components/flip-card';
import { Pill } from '@/components/ds';
import type { Organization } from '@/lib/data';

/** Front: who and where. Back: what they do, what they offer, where to find them. */
export function PartnerCard({ partner, draft = false }: { partner: Organization; draft?: boolean }) {
  return (
    <FlipCard
      label={partner.name}
      front={
        <>
          <h4 style={{ fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)', margin: 0, color: 'var(--text-strong)' }}>
            {partner.name}
          </h4>
          {partner.place ? (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-meta)', color: 'var(--text-muted)', marginTop: 6 }}>
              {partner.place}
            </div>
          ) : null}
          {draft ? (
            <div style={{ marginTop: 10 }}><Pill>Draft · not consented</Pill></div>
          ) : null}
          <MoreHint />
        </>
      }
      back={
        <>
          <p style={{ margin: 0, fontSize: 'var(--fs-tile)', color: 'var(--text-body)' }}>{partner.description}</p>
          {partner.offers.length > 0 ? (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
              {partner.offers.map((o) => <Pill key={o}>{o}</Pill>)}
            </div>
          ) : null}
          <div style={{ marginTop: 'auto', fontSize: 'var(--fs-meta)' }}>
            {partner.url ? (
              <span style={{ color: 'var(--text-accent)', borderBottom: '1px solid var(--teal)' }}>{partner.url}</span>
            ) : (
              <span style={{ color: 'var(--text-muted)' }}>Website link pending the partner&rsquo;s confirmation</span>
            )}
          </div>
        </>
      }
    />
  );
}
