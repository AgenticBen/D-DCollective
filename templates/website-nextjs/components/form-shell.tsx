'use client';

import Link from 'next/link';
import { ButtonLink, SectionHeader } from '@/components/ds';

/** The kit runs the surveys in a narrower column than the site's pages. */
export const surveyWrap = 'mx-auto w-full max-w-[820px] px-7';

export function FormHeader({
  title, eyebrow, lede, children
}: { title: string; eyebrow?: string; lede?: string; children?: React.ReactNode }) {
  return (
    <section className={`${surveyWrap} pb-2 pt-12`}>
      <SectionHeader level={1} eyebrow={eyebrow} title={title} lede={lede} />
      {children}
    </section>
  );
}

/** Section counter for the long form. Not a decorative progress bar. */
export function SectionProgress({ sections, current }: { sections: string[]; current: number }) {
  return (
    <nav aria-label="Form progress" className="border-y border-rule">
      <ol className="mx-auto flex max-w-container flex-wrap gap-x-6 gap-y-1 px-6 py-3 text-[0.9rem]">
        {sections.map((s, i) => (
          <li
            key={s}
            aria-current={i === current ? 'step' : undefined}
            className={i === current ? 'text-ink' : 'text-muted'}
          >
            <span className="sr-only">{i < current ? 'Completed: ' : i === current ? 'Current section: ' : 'Not started: '}</span>
            {s}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Submitted({ children }: { children: React.ReactNode }) {
  return (
    <section className={`${surveyWrap} pb-20 pt-12`} aria-labelledby="received">
      <SectionHeader
        level={1}
        eyebrow="Received"
        title="Your answers are with us"
        lede="Nothing else is needed from you now."
      />
      <div className="max-w-measure text-body">{children}</div>
      <p className="mt-8">
        <ButtonLink href="/" variant="secondary">Back to the website</ButtonLink>
      </p>
    </section>
  );
}

export function SubmitFailed({ onRetry }: { onRetry: () => void }) {
  return (
    <div role="alert" tabIndex={-1} className="mb-8 max-w-measure rounded-r-note border-l-[3px] px-5 py-4"
      style={{ borderColor: 'var(--warn-line)', background: 'var(--warn-bg)', color: 'var(--warn-ink)' }}>
      <h2 className="section-title">This did not send</h2>
      <p className="mt-2 text-body">
        The form reached us but the server refused it, so nothing was saved. Your answers are still on this
        page. Try again, and if it fails a second time, email the same person who sent you this link and
        paste your answers in.
      </p>
      <p className="mt-3">
        <button type="button" onClick={onRetry} className="text-accent underline decoration-rule hover:decoration-accent">
          Send again
        </button>
      </p>
    </div>
  );
}
