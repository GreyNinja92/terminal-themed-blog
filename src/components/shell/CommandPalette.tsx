'use client';

import { useState, useEffect, useMemo } from 'react';
import { SHELL, fontMono } from '@/lib/theme';

export interface Command {
  id: string;
  label: string;
  icon?: string;
  hint?: string;
  run: () => void;
}

interface Props {
  open: boolean;
  onClose: () => void;
  cmds: Command[];
}

export default function CommandPalette({ open, onClose, cmds }: Props) {
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (open) { setQ(''); setIdx(0); }
  }, [open]);

  const filtered = useMemo(() => {
    if (!q) return cmds;
    const s = q.toLowerCase();
    return cmds.filter((c) => c.label.toLowerCase().includes(s) || (c.hint ?? '').toLowerCase().includes(s));
  }, [q, cmds]);

  useEffect(() => { setIdx(0); }, [q]);

  if (!open) return null;

  const run = (c: Command) => { c.run(); onClose(); };

  return (
    <div
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
        zIndex: 60, display: 'flex', justifyContent: 'center', paddingTop: 88,
      }}
    >
      <div style={{
        width: 560, background: '#0e1216',
        border: `1px solid ${SHELL.borderSoft}`, borderRadius: 6,
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)', overflow: 'hidden',
        height: 'fit-content',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
          borderBottom: `1px solid ${SHELL.borderSoft}`,
        }}>
          <span style={{ color: 'var(--acc)' }}>❯</span>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="type a command or search… (try: matrix, fortune, snake, sudo)"
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
              else if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(filtered.length - 1, i + 1)); }
              else if (e.key === 'ArrowUp')   { e.preventDefault(); setIdx((i) => Math.max(0, i - 1)); }
              else if (e.key === 'Enter')     { if (filtered[idx]) run(filtered[idx]); }
            }}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--text)', fontFamily: fontMono, fontSize: 13,
            }}
          />
          <span className="kbd">ESC</span>
        </div>
        <div className="scroll" style={{ maxHeight: 360, overflowY: 'auto' }}>
          {filtered.length === 0 && (
            <div style={{ padding: 18, color: 'var(--mute)', fontSize: 12 }}>
              no match. try <span style={{ color: 'var(--acc)' }}>help</span>.
            </div>
          )}
          {filtered.map((c, i) => (
            <div
              key={c.id}
              onMouseEnter={() => setIdx(i)}
              onClick={() => run(c)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '9px 16px',
                cursor: 'pointer',
                background: i === idx ? 'rgba(107,212,154,0.08)' : 'transparent',
                borderLeft: `2px solid ${i === idx ? 'var(--acc)' : 'transparent'}`,
              }}
            >
              <span style={{ color: 'var(--acc)', width: 18 }}>{c.icon ?? '›'}</span>
              <span style={{ color: 'var(--text)', fontSize: 12 }}>{c.label}</span>
              <span style={{ flex: 1 }}/>
              {c.hint && <span style={{ color: 'var(--mute)', fontSize: 10.5 }}>{c.hint}</span>}
            </div>
          ))}
        </div>
        <div style={{
          display: 'flex', gap: 14, padding: '8px 14px',
          borderTop: `1px solid ${SHELL.borderSoft}`,
          color: 'var(--faint)', fontSize: 10,
        }}>
          <span><span className="kbd">↑↓</span> navigate</span>
          <span><span className="kbd">↵</span> run</span>
          <span><span className="kbd">ESC</span> close</span>
        </div>
      </div>
    </div>
  );
}
