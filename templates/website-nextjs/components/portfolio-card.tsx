'use client';

import { FlipCard, MoreHint } from '@/components/flip-card';
import { Pill } from '@/components/ds';
import type { PortfolioHolding } from '@/lib/data';

/**
 * Front: the company and where it works. Back: the cause and how the capital is
 * held. Return posture stays off unless flags.showReturnPosture is on — that is
 * still Eric and Michele's decision to make.
 */
export function PortfolioCard({
  holding, vehicleLabel, postureLabel
}: { holding: PortfolioHolding; vehicleLabel: string; postureLabel?: string }) {
  return (
    <FlipCard
      label={holding.name}
      front={
        <>
          <h4 style={{ fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)', margin: 0, color: 'var(--text-strong)' }}>
            {holding.name}
          </h4>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-meta)', color: 'var(--text-muted)', marginTop: 6 }}>
            {holding.geography}
          </div>
          <MoreHint />
        </>
      }
      back={
        <>
          <p style={{ margin: 0, fontSize: 'var(--fs-tile)', color: 'var(--text-body)' }}>{holding.cause}</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
            <Pill>{vehicleLabel}</Pill>
            {postureLabel ? <Pill variant="solid">{postureLabel}</Pill> : null}
          </div>
          <div style={{ marginTop: 'auto', fontSize: 'var(--fs-meta)' }}>
            {holding.url ? (
              <span style={{ color: 'var(--text-accent)', borderBottom: '1px solid var(--teal)' }}>{holding.url}</span>
            ) : (
              <span style={{ color: 'var(--text-muted)' }}>No public link</span>
            )}
          </div>
        </>
      }
    />
  );
}
