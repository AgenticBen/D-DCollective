import React from 'react';

const ASSET = {
  lockup: 'logo-lockup.png',
  'lockup-dark': 'logo-lockup-dark.png',
  mark: 'logo-mark.png',
  'mark-dark': 'logo-mark-dark.png',
  /* White knocked out, for placing on a coloured ground. */
  'lockup-transparent': 'logo-lockup-transparent.png',
  'mark-transparent': 'logo-mark-transparent.png',
  'mark-dark-transparent': 'logo-mark-dark-transparent.png',
  'lockup-dark-transparent': 'logo-lockup-dark-transparent.png'
};

export function Logo({ variant = 'lockup', height = 36, assetBase = 'assets', alt = 'D+D Collective', style, ...rest }) {
  return (
    <img
      src={`${assetBase}/${ASSET[variant] || ASSET.lockup}`}
      alt={alt}
      style={{ height, width: 'auto', display: 'block', ...style }}
      {...rest}
    />
  );
}
