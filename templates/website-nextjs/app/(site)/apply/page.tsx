import type { Metadata } from 'next';
import { ButtonLink, Card, Note, SectionHeader } from '@/components/ds';
import { NextPage } from '@/components/next-page';

export const metadata: Metadata = { title: 'Connect — D+D Collective' };

const doors = [
  {
    term: 'Potential grantees',
    body:
      'A conversation first. We have historically funded through relationship rather than applications, so the survey below is a short gate before that conversation, not an application.',
    cta: 'Open the grant survey',
    href: '/apply/grants'
  },
  {
    term: 'Potential investors',
    body:
      'Founders and fund managers raising capital. Four short sections, and the first will tell you quickly if the timing is wrong. Co-investors who want to invest alongside us should write instead.',
    cta: 'Open the investment survey',
    href: '/apply/investment'
  }
];

export default function ApplyPage() {
  return (
    <div className="mx-auto max-w-container px-7 pb-20 pt-14">
      <SectionHeader
        level={1}
        eyebrow="Connect"
        title="Join a conversation"
        lede="Two surveys, each on its own page so you can take your time or send the link to a colleague. Both are a first gate rather than an application, and you will hear back only if there is a fit."
      />

      <div style={{ display: 'grid', gap: 'var(--gap-cols)', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
        {doors.map((d) => (
          <Card key={d.term} title={d.term}>
            <p style={{ margin: '0 0 18px', fontSize: 'var(--fs-tile)', color: 'var(--text-body)' }}>{d.body}</p>
            <ButtonLink href={d.href}>{d.cta}</ButtonLink>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: 'var(--section-gap)', display: 'grid', gap: 'var(--gap-cols)', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
        <Card title="Women investors &amp; donors">
          <p style={{ margin: '0 0 18px', fontSize: 'var(--fs-tile)', color: 'var(--text-body)' }}>
            A seat at the table — book discussions and dinners on generosity, redemptive investing, and
            authority and vulnerability with respect to money. No form for this one; ask and we will talk.
          </p>
          <ButtonLink href="/gather" variant="secondary" size="sm">Request an invitation</ButtonLink>
        </Card>
        <Card title="Long-standing partners">
          <p style={{ margin: 0, fontSize: 'var(--fs-tile)', color: 'var(--text-body)' }}>
            Skip both surveys. If you already know us, write to the person you know — partners have never gone
            through a form and do not need to start now.
          </p>
        </Card>
      </div>

      <div className="mt-9">
        <Note label="What to expect:">
          We read everything that comes in and reply where there is a fit. No reply is usually a question of
          geography, stage or timing rather than the quality of the work.
        </Note>
      </div>

      <NextPage href="/how-we-work" label="How we work" hint="Before you start" />
    </div>
  );
}
