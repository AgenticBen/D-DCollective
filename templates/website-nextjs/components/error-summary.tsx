'use client';

import { forwardRef } from 'react';

export type SummaryItem = { name: string; message: string; label: string };

/**
 * Rendered on submit, focused programmatically, and each item links to its
 * field. Focus lands here rather than on the first bad input so that a screen
 * reader hears how many problems there are before being moved.
 */
export const ErrorSummary = forwardRef<HTMLDivElement, { items: SummaryItem[] }>(
  function ErrorSummary({ items }, ref) {
    if (items.length === 0) return null;
    return (
      <div
        ref={ref}
        role="alert"
        tabIndex={-1}
        className="mb-8 max-w-measure border-l-2 border-accent bg-mist px-5 py-4"
      >
        <h2 className="section-title">
          {items.length === 1 ? 'One thing to fix' : items.length + ' things to fix'}
        </h2>
        <ul className="mt-3 space-y-2">
          {items.map((i) => (
            <li key={i.name}>
              <a href={'#' + i.name} className="text-accent underline decoration-rule hover:decoration-accent">
                {i.label}
              </a>
              <span className="text-muted">{' — ' + i.message}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
