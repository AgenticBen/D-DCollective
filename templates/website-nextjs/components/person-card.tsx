'use client';

import { FlipCard, MoreHint } from '@/components/flip-card';
import { Pill } from '@/components/ds';
import type { Person } from '@/lib/data';

/**
 * A changemaker, not a category. Front: their face and how they introduce
 * themselves. Back: two or three sentences in their own words.
 *
 * Portraits are consented artwork like partner logos are, so a missing photo
 * shows a labelled slot rather than a stock face or an initial — the gap is
 * the honest state until the person has sent one.
 *
 * The organization link sits *below* the card, not on its back: the flip
 * surface is a <button>, and an anchor inside a button is invalid and
 * unreachable by keyboard. Underneath it is a real link, always visible,
 * and it does not fight the flip for the same click.
 */
function Portrait({ person }: { person: Person }) {
  if (person.photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- portraits are supplied at unknown intrinsic sizes
      <img
        src={person.photoUrl}
        alt={person.photoAlt ?? ''}
        style={{ flex: 1, width: '100%', minHeight: 0, objectFit: 'cover', display: 'block' }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      style={{
        flex: 1, minHeight: 0, display: 'grid', placeItems: 'center',
        background: 'var(--surface-page)', borderBottom: '1px dashed var(--teal)'
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-meta)',
        color: 'var(--text-muted)', textAlign: 'center', padding: '0 12px'
      }}>
        Portrait
        <br />
        public/people/ · 4:5
      </span>
    </span>
  );
}

export function PersonCard({ person, draft = false }: { person: Person; draft?: boolean }) {
  return (
    <div style={{ display: 'grid', gap: 8, alignContent: 'start' }}>
      <FlipCard
        label={person.name}
        height={368}
        frontBleed
        front={
          <>
            <Portrait person={person} />
            <span style={{ padding: 'var(--pad-card)', display: 'block' }}>
              <h4 style={{ fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)', margin: 0, color: 'var(--text-strong)' }}>
                {person.name}
              </h4>
              {person.role ? (
                <span style={{
                  display: 'block', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-meta)',
                  color: 'var(--text-muted)', marginTop: 4
                }}>
                  {person.role}
                </span>
              ) : null}
              {draft ? <span style={{ display: 'inline-block', marginTop: 10 }}><Pill>Draft · not consented</Pill></span> : null}
              <MoreHint />
            </span>
          </>
        }
        back={
          <>
            <h4 style={{ fontSize: 'var(--fs-tile)', fontWeight: 'var(--fw-semibold)', margin: '0 0 8px', color: 'var(--text-strong)' }}>
              {person.name}
            </h4>
            <p style={{ margin: 0, fontSize: 'var(--fs-tile)', color: 'var(--text-body)' }}>{person.bio}</p>
          </>
        }
      />

      {person.affiliation ? (
        <div style={{ fontSize: 'var(--fs-meta)', paddingLeft: 2 }}>
          {person.affiliationUrl ? (
            <a
              href={person.affiliationUrl}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--text-accent)', borderBottom: '1px solid var(--teal)', textDecoration: 'none' }}
            >
              {person.affiliation} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span style={{ color: 'var(--text-muted)' }}>{person.affiliation}</span>
          )}
        </div>
      ) : null}
    </div>
  );
}
