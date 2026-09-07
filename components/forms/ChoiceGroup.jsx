import React from 'react';

export function ChoiceGroup({ name, options = [], type = 'radio', value, onChange, columns = 1, style, ...rest }) {
  const selected = Array.isArray(value) ? value : value == null ? [] : [value];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns},minmax(0,1fr))`, gap: 8, ...style }} {...rest}>
      {options.map((o) => {
        const v = typeof o === 'string' ? o : o.value;
        const label = typeof o === 'string' ? o : o.label;
        const checked = selected.indexOf(v) > -1;
        return (
          <label
            key={v}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              fontSize: 'var(--fs-tile)',
              padding: '9px 12px',
              border: '1px solid ' + (checked ? 'var(--teal)' : 'var(--line)'),
              background: checked ? 'var(--surface-sunken)' : 'var(--surface-card)',
              borderRadius: 'var(--radius-note)',
              cursor: 'pointer',
              transition: 'var(--transition-color)'
            }}
          >
            <input
              type={type}
              name={name}
              value={v}
              checked={checked}
              onChange={onChange ? () => onChange(v) : undefined}
              style={{ accentColor: 'var(--teal-deep)', marginTop: 2 }}
            />
            <span>{label}</span>
          </label>
        );
      })}
    </div>
  );
}
