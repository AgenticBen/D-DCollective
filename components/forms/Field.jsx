import React from 'react';

export function Field({ label, hint, required, htmlFor, children, style, ...rest }) {
  return (
    <div style={{ display: 'grid', gap: 6, ...style }} {...rest}>
      {label ? (
        <label
          htmlFor={htmlFor}
          style={{ fontSize: 'var(--fs-micro)', fontWeight: 'var(--fw-medium)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-accent)' }}
        >
          {label}
          {required ? <span style={{ color: 'var(--muted)' }}> · required</span> : null}
        </label>
      ) : null}
      {children}
      {hint ? <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{hint}</div> : null}
    </div>
  );
}
