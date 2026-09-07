import React from 'react';
import { inputSkin } from './Input.jsx';

export function Textarea({ rows = 4, style, ...rest }) {
  return <textarea rows={rows} style={{ ...inputSkin, lineHeight: 'var(--lh-body)', resize: 'vertical', ...style }} {...rest} />;
}
