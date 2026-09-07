import React from 'react';
import { Logo } from '../brand/Logo.jsx';

export function SiteHeader({ items = [], active, onNavigate, action, assetBase = 'assets', logoVariant = 'lockup', style, ...rest }) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        padding: '18px 28px',
        borderBottom: 'var(--border-1)',
        background: 'var(--surface-page)',
        ...style
      }}
      {...rest}
    >
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(items[0] && items[0].id); }}
        style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
      >
        <Logo variant={logoVariant} height={34} assetBase={assetBase} />
      </a>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
        {items.map((it) => (
          <a
            key={it.id}
            href={'#' + it.id}
            onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(it.id); }}
            style={{
              fontSize: 'var(--fs-nav)',
              textDecoration: 'none',
              color: active === it.id ? 'var(--text-accent)' : 'var(--text-body)',
              borderBottom: '1px solid ' + (active === it.id ? 'var(--teal-deep)' : 'transparent'),
              paddingBottom: 2,
              transition: 'var(--transition-color)'
            }}
          >
            {it.label}
          </a>
        ))}
        {action}
      </nav>
    </header>
  );
}
