import React from 'react';

export function GradientRule({ width = 56, palette = 'interface', style, ...rest }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: 'var(--rule-height)',
        width: width === 'full' ? '100%' : width,
        background: palette === 'brand' ? 'var(--grad-brand)' : 'var(--grad)',
        borderRadius: 'var(--radius-rule)',
        ...style
      }}
      {...rest}
    />
  );
}
