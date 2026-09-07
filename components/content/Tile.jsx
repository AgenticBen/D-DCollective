import React from 'react';
import { Eyebrow } from '../brand/Eyebrow.jsx';

export function Tile({ label, children, style, ...rest }) {
  return (
    <div
      style={{
        background: 'var(--surface-sunken)',
        borderRadius: 'var(--radius-tile)',
        padding: 'var(--pad-tile)',
        ...style
      }}
      {...rest}
    >
      {label ? <Eyebrow style={{ marginBottom: 6 }}>{label}</Eyebrow> : null}
      <p style={{ margin: 0, fontSize: 'var(--fs-tile)', color: 'var(--text-strong)' }}>{children}</p>
    </div>
  );
}
