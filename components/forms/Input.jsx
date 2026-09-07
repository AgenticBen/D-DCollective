import React from 'react';

export const inputSkin = {
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: 'var(--font-sans)',
  fontSize: 'var(--fs-tile)',
  color: 'var(--text-strong)',
  background: 'var(--surface-card)',
  border: 'var(--border-1)',
  borderRadius: 'var(--radius-note)',
  padding: '10px 12px',
  outline: 'none'
};

export function Input({ style, ...rest }) {
  return <input style={{ ...inputSkin, ...style }} {...rest} />;
}
