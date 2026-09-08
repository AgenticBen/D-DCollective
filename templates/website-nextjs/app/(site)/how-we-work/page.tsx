import type { Metadata } from 'next';
import { NextPage } from '@/components/next-page';
import { Card, Note, Pill, SectionHeader, Tile } from '@/components/ds';
import { levers, practices } from '@/content/how-we-work';

export const metadata: Metadata = { title: 'How we work — D+D Collective' };

export default function HowWeWorkPage() {
  return (
    <div className="mx-auto max-w-container px-7 pb-20 pt-14">
      <SectionHeader
        level={1}
        eyebrow="How we work"
        title="Four levers, four practices"
        lede="We infuse racial, gender and disability justice into everything we fund and every leader we walk with."
      />

      <h3 style={{ fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)', margin: '8px 0 12px' }}>Tools &amp; levers</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'var(--gap-grid)' }}>
        {levers.map((l, i) => (
          <Tile key={l.term} label={`${String(i + 1).padStart(2, '0')} · ${l.term}`}>{l.gloss}</Tile>
        ))}
      </div>

      <h3 style={{ fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)', margin: '32px 0 12px' }}>Operational practices</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 'var(--gap-grid)' }}>
        {practices.map((p) => <Tile key={p.term} label={p.term}>{p.gloss}</Tile>)}
      </div>

      {/* Describes the focus only. No application language until 4945(g) approval lands. */}
      <div className="mt-6">
        <Note label="Scholarships:">
          Our 4945(g) approval is pending. This page describes the focus of our scholarship work; it is not an
          open application.
        </Note>
      </div>

      <div style={{ marginTop: 'var(--section-gap)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'var(--gap-cols)' }}>
        <Card title="The redemptive lens">
          <p style={{ margin: 0, fontSize: 'var(--fs-tile)', color: 'var(--text-body)' }}>
            Strategy, operations and leadership are each read along the Praxis spectrum — exploitative, ethical,
            redemptive.
          </p>
        </Card>
        <Card title="Five-pillar rubric">
          <p style={{ margin: '0 0 10px', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-meta)', color: 'var(--text-muted)' }}>
            Impact 35 · Business 35 · Risk 10 · Leadership 10 · Spiritual 10
          </p>
          <p style={{ margin: 0, fontSize: 'var(--fs-tile)', color: 'var(--text-body)' }}>
            Every investment is scored before a second conversation.
          </p>
        </Card>
        <Card title="Return postures">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Pill>Concessionary</Pill><Pill>At market</Pill><Pill>Above market</Pill>
          </div>
        </Card>
      </div>
      <NextPage href="/changemakers" label="The leaders we walk with" hint="Keep reading" />
    </div>
  );
}
