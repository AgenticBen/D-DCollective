import React from 'react';
import { inputSkin } from './Input.jsx';

export function Select({ options = [], placeholder, style, ...rest }) {
  return (
    <select style={{ ...inputSkin, appearance: 'none', paddingRight: 32, ...style }} {...rest}>
      {placeholder ? <option value="">{placeholder}</option> : null}
      {options.map((o) => {
        const value = typeof o === 'string' ? o : o.value;
        const label = typeof o === 'string' ? o : o.label;
        return <option key={value} value={value}>{label}</option>;
      })}
    </select>
  );
}
