import { Eyebrow, GradientRule, Note } from '@/components/ds';
import type { Person } from '@/content/about';

/**
 * One founder: portrait on one side, words on the other. `reverse` flips the
 * sides so the two of them alternate down the page rather than stacking into a
 * single column of faces.
 */
export function PersonSection({ person, reverse = false }: { person: Person; reverse?: boolean }) {
  return (
    <section className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
      <div className={reverse ? 'md:order-2' : undefined}>
        <PersonPhoto person={person} />
      </div>

      <div className={reverse ? 'md:order-1' : undefined}>
        <Eyebrow>{person.role}</Eyebrow>
        <h2 className="mt-2 section-title">{person.name}</h2>
        <GradientRule style={{ margin: '14px 0 18px' }} />

        {person.bio.map((p) => (
          <p key={p.slice(0, 24)} className="mt-4 max-w-measure text-body">{p}</p>
        ))}

        {person.markers.length > 0 ? (
          <ul className="mt-7 border-t border-rule">
            {person.markers.map((m) => (
              <li key={m.slice(0, 24)} className="max-w-measure border-b border-rule py-3.5 text-tile">{m}</li>
            ))}
          </ul>
        ) : null}

        {person.draft ? (
          <div className="mt-6">
            <Note label="Not written yet:">
              This introduction is a placeholder. Replace it in <code>content/about.ts</code> before launch.
            </Note>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/**
 * The portrait, or a labelled slot showing exactly where one goes and roughly
 * what shape it should be, so the space is legible before any photo exists.
 */
function PersonPhoto({ person }: { person: Person }) {
  if (person.photo) {
    // eslint-disable-next-line @next/next/no-img-element -- portraits are supplied at unknown intrinsic sizes
    return (
      <img
        src={person.photo}
        alt={person.photoAlt}
        className="w-full rounded-card border border-rule object-cover"
        style={{ aspectRatio: '4 / 5' }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Photograph of ${person.name} — not added yet`}
      className="grid w-full place-items-center rounded-card border border-dashed"
      style={{ aspectRatio: '4 / 5', background: 'var(--surface-sunken)', borderColor: 'var(--teal)' }}
    >
      <div className="px-6 text-center">
        <Eyebrow>Photograph</Eyebrow>
        <p className="mt-2 text-tile" style={{ color: 'var(--text-body)' }}>{person.name}</p>
        <p className="mt-2 font-mono text-meta" style={{ color: 'var(--text-muted)' }}>
          public/people/ · portrait · 4:5
        </p>
      </div>
    </div>
  );
}
