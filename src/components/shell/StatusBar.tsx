'use client';

import { useState, useEffect } from 'react';
import { SHELL } from '@/lib/theme';
import { TabId } from './ShellContext';

const HINTS: Record<TabId, string> = {
  home:    '⌘K palette · 1/2/3 jump tabs · click an experience or project · try ↑↑↓↓←→←→BA',
  writing: 'j/k next/prev · / search · try the `term` view and type `help`',
  contact: '⌘K palette · hi@sakshamkhatod.com',
};

export default function StatusBar({ tab }: { tab: TabId }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now
    ? now.toLocaleTimeString('en-US', { hour12: false }) + ' PT'
    : '--:--:-- PT';

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14, height: 22, padding: '0 14px',
      borderTop: `1px solid ${SHELL.border}`,
      background: 'rgba(12,15,18,0.8)', color: 'var(--mute)',
      fontSize: 10, flexShrink: 0, letterSpacing: '0.04em',
    }}>
      <span style={{ color: 'var(--acc)' }}>● LIVE</span>
      <span>/~/{tab}</span>
      <span style={{ flex: 1 }}>{HINTS[tab]}</span>
      <span>SEA · 47.6062°N</span>
      <span>{time}</span>
    </div>
  );
}
