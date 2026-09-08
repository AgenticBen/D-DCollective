'use client';

import { useEffect, useState } from 'react';

const KEY = 'dd-website-theme';
/* The brand ships no icon set, so glyphs come from unicode — the same approach
   the source documents take with arrows. */
const OPTIONS = [['light', '☀', 'Light mode'], ['dark', '☽', 'Dark mode']] as const;

export function ThemeToggle() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    try { setTheme(localStorage.getItem(KEY) ?? 'light'); } catch { setTheme('light'); }
  }, []);

  function choose(next: string) {
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem(KEY, next); } catch { /* private mode */ }
  }

  return (
    <div role="group" aria-label="Colour scheme"
      style={{ display: 'inline-flex', border: '1px solid var(--teal)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
      {OPTIONS.map(([value, glyph, label]) => {
        const on = theme === value;
        return (
          <button key={value} type="button" aria-pressed={on} aria-label={label} title={label}
            onClick={() => choose(value)}
            style={{
              appearance: 'none', cursor: on ? 'default' : 'pointer', padding: '7px 11px',
              border: 'none', display: 'grid', placeItems: 'center', fontSize: 16, lineHeight: 1,
              background: on ? 'var(--teal)' : 'transparent',
              color: on ? 'var(--text-on-accent)' : 'var(--text-accent)',
              transition: 'var(--transition-color)'
            }}>
            <span aria-hidden="true">{glyph}</span>
          </button>
        );
      })}
    </div>
  );
}
