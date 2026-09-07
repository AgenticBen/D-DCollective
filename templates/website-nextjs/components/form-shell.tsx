'use client';

import Link from 'next/link';

export function FormHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-10 pt-16 sm:pt-20">
      <h1 className="max-w-display font-display text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-[1.16] tracking-[-0.015em]">
        {title}
      </h1>
      {children}
    </section>
  );
}

/** Section counter for the long form. Not a decorative progress bar. */
export function SectionProgress({ sections, current }: { sections: string[]; current: number }) {
  return (
    <nav aria-label="Form progress" className="border-y border-rule">
      <ol className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-1 px-6 py-3 text-[0.9rem]">
        {sections.map((s, i) => (
          <li
            key={s}
            aria-current={i === current ? 'step' : undefined}
            className={i === current ? 'text-ink' : 'text-ink/50'}
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
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pt-20" aria-labelledby="received">
      <h1 id="received" className="max-w-display font-display text-[clamp(1.8rem,4vw,2.6rem)] font-light leading-[1.16]">
        Received
      </h1>
      <div className="mt-8 max-w-measure text-ink/85">{children}</div>
      <p className="mt-8">
        <Link href="/" className="text-teal-ink underline decoration-rule hover:decoration-teal-ink">
          Back to the beginning
        </Link>
      </p>
    </section>
  );
}

export function SubmitFailed({ onRetry }: { onRetry: () => void }) {
  return (
    <div role="alert" tabIndex={-1} className="mb-8 max-w-measure border-l-2 border-teal-ink bg-field px-5 py-4">
      <h2 className="font-display text-[1.25rem] leading-tight">This did not send</h2>
      <p className="mt-2 text-ink/85">
        The form reached us but the server refused it, so nothing was saved. Your answers are still on this
        page. Try again, and if it fails a second time, email the same person who sent you this link and
        paste your answers in.
      </p>
      <p className="mt-3">
        <button type="button" onClick={onRetry} className="text-teal-ink underline decoration-rule hover:decoration-teal-ink">
          Send again
        </button>
      </p>
    </div>
  );
}
