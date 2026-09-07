import React from 'react';

export function Quote({ children, cite, style, ...rest }) {
  return (
    <blockquote
      style={{
        borderLeft: 'var(--border-accent-left)',
        padding: '4px 0 4px 18px',
        margin: '12px 0 18px',
        fontWeight: 'var(--fw-light)',
        fontSize: 'var(--fs-quote)',
        lineHeight: 'var(--lh-quote)',
        maxWidth: 'var(--measure-lede)',
        ...style
      }}
      {...rest}
    >
      {children}
      {cite ? (
        <footer style={{ fontSize: 'var(--fs-meta)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: 8, fontWeight: 'var(--fw-regular)' }}>{cite}</footer>
      ) : null}
    </blockquote>
  );
}
