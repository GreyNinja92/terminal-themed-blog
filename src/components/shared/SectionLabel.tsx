'use client';

import { ReactNode } from 'react';
import { SHELL } from '@/lib/theme';

interface Props {
  children: ReactNode;
  right?: string;
}

export default function SectionLabel({ children, right }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', margin: '40px 0 14px' }}>
      <div style={{ color: 'var(--faint)', fontSize: 10, letterSpacing: '0.2em' }}>{children}</div>
      <div style={{ flex: 1, borderBottom: `1px dotted ${SHELL.borderSoft}`, margin: '0 12px 4px' }}/>
      {right && <div style={{ color: 'var(--mute)', fontSize: 10, letterSpacing: '0.08em' }}>{right}</div>}
    </div>
  );
}
