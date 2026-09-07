import React from 'react';
import { GradientRule } from './GradientRule.jsx';
import { Eyebrow } from './Eyebrow.jsx';

export function SectionHeader({ eyebrow, title, lede, level = 2, style, ...rest }) {
  const H = 'h' + level;
  return (
    <header style={{ margin: '0 0 20px', ...style }} {...rest}>
      {eyebrow ? <Eyebrow style={{ marginBottom: 8 }}>{eyebrow}</Eyebrow> : null}
      <H
        style={{
          fontSize: level === 1 ? 'var(--fs-h1)' : 'var(--fs-h2)',
          fontWeight: 'var(--fw-semibold)',
          letterSpacing: level === 1 ? 'var(--ls-h1)' : 'var(--ls-h2)',
          lineHeight: level === 1 ? 'var(--lh-tight)' : 1.2,
          margin: '0 0 6px',
          textWrap: 'balance'
        }}
      >
        {title}
      </H>
      <GradientRule style={{ margin: '0 0 18px' }} />
      {lede ? (
        <p style={{ color: 'var(--text-muted)', margin: 0, maxWidth: 'var(--measure-lede)' }}>{lede}</p>
      ) : null}
    </header>
  );
}
