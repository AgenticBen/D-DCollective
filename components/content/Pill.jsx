import React from 'react';

export function Pill({ children, variant = 'outline', style, ...rest }) {
  const solid = variant === 'solid';
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 'var(--fs-pill)',
        fontWeight: 'var(--fw-medium)',
        letterSpacing: 'var(--ls-pill)',
        padding: '2px 8px',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid var(--teal)',
        background: solid ? 'var(--teal)' : 'transparent',
        color: solid ? 'var(--text-on-accent)' : 'var(--text-accent)',
        whiteSpace: 'nowrap',
        ...style
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
