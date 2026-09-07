import React from 'react';

const BASE = {
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--fs-nav)',
  fontWeight: 'var(--fw-medium)',
  letterSpacing: 'var(--ls-brand)',
  borderRadius: 'var(--radius-pill)',
  cursor: 'pointer',
  transition: 'var(--transition-color)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8
};

const SIZES = { sm: { padding: '6px 14px' }, md: { padding: '10px 20px' }, lg: { padding: '13px 26px', fontSize: 'var(--fs-body)' } };

export function Button({ children, variant = 'primary', size = 'md', disabled, style, ...rest }) {
  const skin =
    variant === 'primary'
      ? { background: 'var(--teal-deep)', color: 'var(--text-on-accent)', border: '1px solid var(--teal-deep)' }
      : variant === 'secondary'
      ? { background: 'transparent', color: 'var(--text-accent)', border: '1px solid var(--teal)' }
      : { background: 'transparent', color: 'var(--text-accent)', border: '1px solid transparent', padding: '6px 4px', borderRadius: 0 };
  return (
    <button
      disabled={disabled}
      style={{ ...BASE, ...SIZES[size], ...skin, opacity: disabled ? 0.45 : 1, cursor: disabled ? 'not-allowed' : 'pointer', ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
