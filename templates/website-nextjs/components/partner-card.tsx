'use client';

import { useMemo, useState } from 'react';
import { GradientRule, Pill } from '@/components/ds';
import type { Organization } from '@/lib/data';

/**
 * Flip card, ported from the design system's ui kit. Front is the name and
 * place; the back carries the description, what they offer, and a website link
 * when one has been confirmed. Keyboard and pointer both flip it, and
 * prefers-reduced-motion turns the rotation into a plain swap.
 */
export function PartnerCard({ partner }: { partner: Organization }) {
  const [flipped, setFlipped] = useState(false);
  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  );

  /* backface-visibility alone is unreliable, so each face also fades at the
     midpoint of the rotation. */
  const fade = { transition: reduced ? 'none' : 'opacity 0ms linear 230ms' };

  const face: React.CSSProperties = {
    position: 'absolute', inset: 0,
    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
    borderRadius: 'var(--radius-card)', border: 'var(--border-1)',
    padding: 'var(--pad-card)', display: 'flex', flexDirection: 'column', overflow: 'hidden'
  };

  return (
    <button
      type="button"
      aria-expanded={flipped}
      aria-label={`${flipped ? 'Hide' : 'Show'} details for ${partner.name}`}
      onClick={() => setFlipped((v) => !v)}
      style={{
        appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer',
        perspective: 1200, height: 208, textAlign: 'left', fontFamily: 'var(--font-sans)'
      }}
    >
      <div style={{
        position: 'relative', height: '100%', transformStyle: 'preserve-3d',
        transition: reduced ? 'none' : 'transform 460ms cubic-bezier(.2,0,.2,1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
      }}>
        <div style={{ ...face, ...fade, background: 'var(--surface-sunken)', opacity: flipped ? 0 : 1, visibility: flipped ? 'hidden' : 'visible' }}>
          <h4 style={{ fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)', margin: 0, color: 'var(--text-strong)' }}>
            {partner.name}
          </h4>
          {partner.place ? (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-meta)', color: 'var(--text-muted)', marginTop: 6 }}>
              {partner.place}
            </div>
          ) : null}
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <GradientRule width={32} />
            <span style={{ fontSize: 'var(--fs-pill)', letterSpacing: 'var(--ls-pill)', color: 'var(--text-accent)', fontWeight: 'var(--fw-medium)' }}>
              More
            </span>
          </div>
        </div>

        <div style={{
          ...face, ...fade, background: 'var(--surface-card)', transform: 'rotateY(180deg)',
          opacity: flipped ? 1 : 0, visibility: flipped ? 'visible' : 'hidden'
        }}>
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
        </div>
      </div>
    </button>
  );
}
