import React from 'react';

export function Eyebrow({ children, tone = 'accent', as: Tag = 'div', style, ...rest }) {
  return (
    <Tag
      style={{
        fontSize: 'var(--fs-eyebrow)',
        fontWeight: 'var(--fw-medium)',
        letterSpacing: 'var(--ls-eyebrow)',
        textTransform: 'uppercase',
        color: tone === 'muted' ? 'var(--text-muted)' : 'var(--text-accent)',
        ...style
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
