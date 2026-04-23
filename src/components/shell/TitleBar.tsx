'use client';

import { THEMES, ThemeName, SHELL, fontMono } from '@/lib/theme';
import { TabId } from './ShellContext';

interface Props {
  tab: TabId;
  setTab: (t: TabId) => void;
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  onFortune: () => void;
  onMatrix: () => void;
  matrix: boolean;
  uptime: string;
  onPalette: () => void;
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'home',    label: '~' },
  { id: 'writing', label: '~/writing' },
  { id: 'contact', label: '~/contact' },
];

export default function TitleBar({ tab, setTab, theme, setTheme, onFortune, onMatrix, matrix, uptime, onPalette }: Props) {
  return (
    <div style={{
      display: 'flex', alignItems: 'stretch', height: 38,
      borderBottom: `1px solid ${SHELL.border}`,
      background: 'rgba(12,15,18,0.8)', backdropFilter: 'blur(10px)',
      flexShrink: 0, userSelect: 'none',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px',
        borderRight: `1px solid ${SHELL.border}`,
        color: 'var(--acc)', fontWeight: 500, letterSpacing: '0.05em',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14">
          <rect x="0.5" y="0.5" width="13" height="13" rx="2" fill="none" stroke="currentColor"/>
          <path d="M4 5 L6 7 L4 9 M7 9 L10 9" stroke="currentColor" fill="none" strokeLinecap="round"/>
        </svg>
        <span>saksham.sh</span>
      </div>

      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          style={{
            background: tab === t.id ? 'rgba(107,212,154,0.06)' : 'transparent',
            border: 'none',
            borderRight: `1px solid ${SHELL.border}`,
            borderBottom: tab === t.id ? '2px solid var(--acc)' : '2px solid transparent',
            padding: '0 16px',
            color: tab === t.id ? 'var(--acc)' : 'var(--mute)',
            fontFamily: fontMono,
            fontSize: 11.5,
            cursor: 'pointer',
            letterSpacing: '0.02em',
          }}
        >
          {t.label}
        </button>
      ))}

      <div style={{ flex: 1 }}/>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '0 14px', color: 'var(--mute)', fontSize: 10.5 }}>
        <span>UP {uptime}</span>
        <span>·</span>
        <button className="tb-btn" onClick={onFortune} title="Random fortune">◈ fortune</button>
        <button className="tb-btn" onClick={onMatrix} style={{ color: matrix ? 'var(--acc)' : 'var(--mute)' }} title="Matrix rain">⟐ matrix</button>
        <div style={{ display: 'flex', gap: 4 }}>
          {(['green', 'amber', 'blue'] as ThemeName[]).map((n) => (
            <button
              key={n}
              className="tb-btn"
              onClick={() => setTheme(n)}
              title={`${n} theme`}
              style={{
                width: 14, height: 14, borderRadius: 2, padding: 0,
                border: `1px solid ${SHELL.borderSoft}`,
                background: THEMES[n].accent,
                outline: theme === n ? '1px solid var(--text)' : 'none',
                outlineOffset: 1,
              }}
            />
          ))}
        </div>
        <button className="tb-btn" onClick={onPalette} title="Command palette (⌘K)">
          <span className="kbd">⌘K</span>
        </button>
      </div>
    </div>
  );
}
