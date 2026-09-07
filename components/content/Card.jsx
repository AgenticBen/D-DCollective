import React from 'react';

export function Card({ title, children, style, ...rest }) {
  return (
    <div
      style={{
        background: 'var(--surface-card)',
        border: 'var(--border-1)',
        borderRadius: 'var(--radius-card)',
        padding: 'var(--pad-card)',
        ...style
      }}
      {...rest}
    >
      {title ? (
        <h3 style={{ fontSize: 'var(--fs-h3)', fontWeight: 'var(--fw-semibold)', margin: '0 0 8px' }}>{title}</h3>
      ) : null}
      {children}
    </div>
  );
}
