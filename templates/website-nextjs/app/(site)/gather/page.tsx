export const revalidate = 60;

import type { Metadata } from 'next';
import {
  ButtonLink, Card, Eyebrow, GradientRule, Note, Pill, SectionHeader
} from '@/components/ds';
import { getUpcomingEvents, getPastEvents, getResources, formatEventDate, type Event } from '@/lib/data';

export const metadata: Metadata = { title: 'Events — D+D Collective' };

/** The next gathering, given the room it deserves. */
function Spotlight({ event }: { event: Event }) {
  return (
    <section
      aria-labelledby="spotlight"
      style={{
        background: 'var(--surface-sunken)', border: 'var(--border-1)',
        borderRadius: 'var(--radius-card)', padding: '28px'
      }}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Eyebrow>Next gathering</Eyebrow>
        {event.kind ? <Pill>{event.kind}</Pill> : null}
      </div>
      <h3 id="spotlight" style={{
        fontSize: 'var(--fs-h2)', fontWeight: 'var(--fw-semibold)',
        letterSpacing: 'var(--ls-h2)', lineHeight: 1.2, margin: '10px 0 0', textWrap: 'balance'
      }}>{event.title}</h3>
      <GradientRule style={{ margin: '14px 0 16px' }} />
      <p style={{
        margin: 0, fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-meta)', color: 'var(--text-muted)'
      }}>
        {formatEventDate(event.date)}{event.location ? ` · ${event.location}` : ''}
      </p>
      <p style={{ margin: '12px 0 20px', color: 'var(--text-body)', maxWidth: 'var(--measure-lede)' }}>
        {event.description}
      </p>
      <ButtonLink href="/apply">Request an invitation</ButtonLink>
    </section>
  );
}

/** The row card the design uses for everything after the spotlight. */
function EventRow({ event, muted = false }: { event: Event; muted?: boolean }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'minmax(0,220px) minmax(0,1fr) max-content',
      gap: 24, alignItems: 'start', border: 'var(--border-1)',
      borderRadius: 'var(--radius-card)', background: 'var(--surface-card)',
      padding: 'var(--pad-card)', opacity: muted ? 0.75 : 1
    }}>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-meta)', color: 'var(--text-muted)' }}>
          {formatEventDate(event.date)}
        </div>
        <div style={{ fontSize: 'var(--fs-tile)', marginTop: 4 }}>{event.location}</div>
      </div>
      <div>
        <h3 style={{ fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)', margin: '0 0 6px' }}>{event.title}</h3>
        <p style={{ margin: 0, fontSize: 'var(--fs-tile)', color: 'var(--text-body)', maxWidth: 'var(--measure-lede)' }}>
          {event.description}
        </p>
      </div>
      <div style={{ display: 'grid', gap: 10, justifyItems: 'end' }}>
        {event.kind ? <Pill>{event.kind}</Pill> : null}
        {muted ? null : <ButtonLink href="/apply" variant="secondary" size="sm">Request an invitation</ButtonLink>}
      </div>
    </div>
  );
}

export default async function GatherPage() {
  const [upcoming, past, resources] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(5),
    getResources()
  ]);

  const [next, ...rest] = upcoming;

  return (
    <div className="mx-auto max-w-container px-7 pb-20 pt-14">
      <SectionHeader
        level={1}
        eyebrow="Events"
        title="Where we gather"
        lede="Dinners, book discussions and convenings, mostly in Charlotte with a few online. The rooms are kept small on purpose, so there is nothing to register for — ask and we will tell you when invitations go out."
      />

      {next ? <Spotlight event={next} /> : (
        <Note label="Nothing scheduled yet:">
          The next gathering has not been set. Ask to be kept in mind and we will tell you when one is.
        </Note>
      )}

      {rest.length > 0 ? (
        <div className="mt-12">
          <h2 style={{ fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)', margin: '0 0 12px' }}>Coming up</h2>
          <div style={{ display: 'grid', gap: 'var(--gap-grid)' }}>
            {rest.map((e) => <EventRow key={e.slug} event={e} />)}
          </div>
        </div>
      ) : null}

      <div className="mt-6">
        <Note label="Invitation-based:">
          We do not publish open event listings. If a gathering sounds like your kind of room, ask, and we will
          keep you in mind for the next one.
        </Note>
      </div>

      <div className="mt-[var(--section-gap)]">
        <SectionHeader title="Archive" lede="The last five gatherings, for a sense of the rooms we keep." />
        {past.length === 0 ? (
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: 'var(--fs-tile)' }}>
            Nothing here yet. Gatherings move into the archive once they have happened.
          </p>
        ) : (
          <div style={{ display: 'grid', gap: 'var(--gap-grid)' }}>
            {past.map((e) => <EventRow key={e.slug} event={e} muted />)}
          </div>
        )}
      </div>

      <div className="mt-[var(--section-gap)]">
        <SectionHeader title="Worth reading" lede="The handful of pieces we keep sending people, drawn from past book discussions." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'var(--gap-cols)' }}>
          {resources.map((r) => (
            <Card key={r.slug} title={r.title}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-meta)', color: 'var(--text-muted)', marginBottom: 8 }}>
                {r.source}
              </div>
              <p style={{ margin: 0, fontSize: 'var(--fs-tile)', color: 'var(--text-body)' }}>{r.why}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
