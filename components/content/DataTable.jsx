import React from 'react';

export function DataTable({ columns = [], rows = [], style, ...rest }) {
  return (
    <div
      style={{ overflowX: 'auto', border: 'var(--border-1)', borderRadius: 'var(--radius-panel)', ...style }}
      {...rest}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-table)' }}>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th
                key={i}
                style={{
                  textAlign: 'left',
                  fontSize: 'var(--fs-micro)',
                  letterSpacing: 'var(--ls-label)',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  fontWeight: 'var(--fw-medium)',
                  padding: 'var(--pad-head-cell)',
                  background: 'var(--surface-sunken)',
                  borderBottom: 'var(--border-1)'
                }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((cell, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: 'var(--pad-cell)',
                    borderBottom: ri === rows.length - 1 ? 'none' : 'var(--border-1)',
                    verticalAlign: 'top'
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
