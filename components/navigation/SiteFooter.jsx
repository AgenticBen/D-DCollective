import React from 'react';
import { Logo } from '../brand/Logo.jsx';

export function SiteFooter({ columns = [], note, bottom, assetBase = 'assets', logoVariant = 'lockup', style, ...rest }) {
  return (
    <footer style={{ borderTop: 'var(--border-1)', background: 'var(--surface-sunken)', ...style }} {...rest}>
      <div
        style={{
          padding: '36px 28px',
          display: 'grid',
          gap: 28,
          gridTemplateColumns: 'minmax(220px,1fr) repeat(auto-fit,minmax(140px,max-content))'
        }}
      >
      <div>
        <Logo variant={logoVariant} height={30} assetBase={assetBase} />
        {note ? (
          <p style={{ margin: '14px 0 0', fontSize: 13.5, color: 'var(--text-muted)', maxWidth: '40ch' }}>{note}</p>
        ) : null}
      </div>
      {columns.map((c) => (
        <div key={c.title} style={{ display: 'grid', gap: 8, alignContent: 'start' }}>
          <div style={{ fontSize: 'var(--fs-micro)', fontWeight: 'var(--fw-medium)', letterSpacing: 'var(--ls-label)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{c.title}</div>
          {c.links.map((l) => (
            <a key={l} href="#" style={{ fontSize: 'var(--fs-nav)', color: 'var(--text-body)', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      ))}
      </div>
      {bottom ? (
        <div style={{ borderTop: 'var(--border-1)', padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          {bottom}
        </div>
      ) : null}
    </footer>
  );
}
