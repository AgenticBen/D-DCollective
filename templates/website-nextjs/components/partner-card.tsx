'use client';

import { FlipCard, MoreHint } from '@/components/flip-card';
import { Pill } from '@/components/ds';
import type { Organization } from '@/lib/data';

/**
 * Partner logos arrive in every shape and most of them carry a white ground, so
 * the plate is a white box the mark sits inside with `object-fit: contain`.
 * That keeps a wide wordmark and a square icon looking equally deliberate
 * against the card's mist face, the same trick the footer lockup uses.
 */
function LogoPlate({ partner }: { partner: Organization }) {
  if (partner.logoUrl) {
    return (
      <span
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: '#FFFFFF', border: '1px solid var(--border-hairline)',
          borderRadius: 'var(--radius-note)', padding: '6px 10px',
          height: 46, maxWidth: 150
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- partner artwork, arbitrary intrinsic size */}
        <img
          src={partner.logoUrl}
          alt=""
          style={{ maxHeight: 30, maxWidth: 126, width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }}
        />
      </span>
    );
  }

  /* No logo supplied yet: a monogram on the brand teal, so the card still has
     a mark rather than a gap. */
  const initials = partner.name
    .replace(/[^A-Za-z ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');

  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-grid', placeItems: 'center', width: 46, height: 46,
        borderRadius: 'var(--radius-note)', background: 'var(--teal-deep)',
        color: 'var(--text-on-accent)', fontFamily: 'var(--font-mono)', fontSize: 15
      }}
    >
      {initials}
    </span>
  );
}

/** Front: mark, name, place. Back: what they do, what they offer, where to find them. */
export function PartnerCard({ partner, draft = false }: { partner: Organization; draft?: boolean }) {
  return (
    <FlipCard
      label={partner.name}
      height={236}
      front={
        <>
          <LogoPlate partner={partner} />
          <h4 style={{ fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)', margin: '12px 0 0', color: 'var(--text-strong)' }}>
            {partner.name}
          </h4>
          {partner.place ? (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-meta)', color: 'var(--text-muted)', marginTop: 4 }}>
              {partner.place}
            </div>
          ) : null}
          {draft ? <div style={{ marginTop: 10 }}><Pill>Draft · not consented</Pill></div> : null}
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
