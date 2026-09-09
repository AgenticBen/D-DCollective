'use client';

import { useMemo, useState, type ReactNode } from 'react';

/**
 * The flip mechanics from the design kit, factored out so partners and
 * portfolio holdings share one implementation.
 *
 * backface-visibility alone is unreliable, so each face also fades at the
 * midpoint of the rotation. prefers-reduced-motion turns the whole thing into
 * a plain swap.
 */
export function FlipCard({
  label, front, back, height = 208, frontBleed = false
}: { label: string; front: ReactNode; back: ReactNode; height?: number; frontBleed?: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    []
  );

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
      aria-label={`${flipped ? 'Hide' : 'Show'} details for ${label}`}
      onClick={() => setFlipped((v) => !v)}
      style={{
        appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer',
        perspective: 1200, height, textAlign: 'left', fontFamily: 'var(--font-sans)'
      }}
    >
      <div style={{
        position: 'relative', height: '100%', transformStyle: 'preserve-3d',
        transition: reduced ? 'none' : 'transform 460ms cubic-bezier(.2,0,.2,1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
      }}>
        <div style={{
          ...face, ...fade, background: 'var(--surface-sunken)',
          /* A portrait runs to the card edge; the caption below it carries its own padding. */
          padding: frontBleed ? 0 : face.padding,
          opacity: flipped ? 0 : 1, visibility: flipped ? 'hidden' : 'visible'
        }}>
          {front}
        </div>
        <div style={{
          ...face, ...fade, background: 'var(--surface-card)', transform: 'rotateY(180deg)',
          opacity: flipped ? 1 : 0, visibility: flipped ? 'visible' : 'hidden'
        }}>
          {back}
        </div>
      </div>
    </button>
  );
}

/** The shared "turn me over" affordance that sits at the foot of every front face. */
export function MoreHint() {
  return (
    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
      <span aria-hidden="true" style={{
        height: 'var(--rule-height)', width: 32, borderRadius: 'var(--radius-rule)',
        background: 'var(--grad)', display: 'inline-block'
      }} />
      <span style={{
        fontSize: 'var(--fs-pill)', letterSpacing: 'var(--ls-pill)',
        color: 'var(--text-accent)', fontWeight: 'var(--fw-medium)'
      }}>More</span>
    </div>
  );
}
