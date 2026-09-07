import React from 'react';

export function Note({ label, children, style, ...rest }) {
  return (
    <div
      role="note"
      style={{
        background: 'var(--warn-bg)',
        border: '1px solid var(--warn-line)',
        color: 'var(--warn-ink)',
        borderRadius: 'var(--radius-note)',
        padding: 'var(--pad-note)',
        fontSize: 'var(--fs-table)',
        margin: '14px 0',
        ...style
      }}
      {...rest}
    >
      {label ? <b style={{ fontWeight: 'var(--fw-semibold)' }}>{label} </b> : null}
      {children}
    </div>
  );
}
