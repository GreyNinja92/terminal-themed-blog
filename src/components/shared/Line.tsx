'use client';

import { SHELL } from '@/lib/theme';

interface Props {
  label: string;
  value: string;
  href?: string;
}

export default function Line({ label, value, href }: Props) {
  return (
    <div style={{
      display: 'flex', gap: 14, padding: '6px 0',
      borderBottom: `1px dotted ${SHELL.borderSoft}`, fontSize: 12,
    }}>
      <span style={{ color: 'var(--faint)', width: 90, flexShrink: 0 }}>{label}</span>
      {href ? (
        <a className="link" href={href} target="_blank" rel="noreferrer">
          {value} <span style={{ fontSize: 9 }}>↗</span>
        </a>
      ) : (
        <span style={{ color: 'var(--text)' }}>{value}</span>
      )}
    </div>
  );
}
