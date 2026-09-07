import React from 'react';

export function TocNav({ items = [], onSelect, style, ...rest }) {
  return (
    <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px', fontSize: 'var(--fs-nav)', ...style }} {...rest}>
      {items.map((it) => (
        <a
          key={it.id}
          href={'#' + it.id}
          onClick={onSelect ? (e) => { e.preventDefault(); onSelect(it.id); } : undefined}
          style={{ color: 'var(--text-accent)', textDecoration: 'none', borderBottom: '1px solid transparent' }}
        >
          {it.label}
        </a>
      ))}
    </nav>
  );
}
