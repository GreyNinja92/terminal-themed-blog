'use client';

import { useEffect } from 'react';
import { SITE } from '@/lib/data';
import { fontSerif } from '@/lib/theme';

interface Props {
  slug: string;
  onClose: () => void;
}

export default function ProjectOverlay({ slug, onClose }: Props) {
  const p = SITE.projects.find((x) => x.slug === slug);

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);

  if (!p) return null;

  return (
    <div
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)',
        zIndex: 40, display: 'flex', justifyContent: 'center',
        alignItems: 'center', padding: 40,
      }}
    >
      <div
        className="fade-in"
        style={{
          width: 720, maxHeight: '82vh', overflow: 'auto',
          background: '#0e1216', border: '1px solid var(--acc)',
          borderRadius: 6, padding: 32, boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span style={{ color: 'var(--faint)', fontSize: 11 }}>{p.n}</span>
          <h2 style={{ margin: 0, fontFamily: fontSerif, fontSize: 32, fontWeight: 400, color: 'var(--text)' }}>
            {p.name}
          </h2>
          <span style={{ flex: 1 }}/>
          <span style={{ color: 'var(--faint)', fontSize: 10 }}>ESC to close</span>
          <span style={{ color: 'var(--mute)', cursor: 'pointer', fontSize: 14 }} onClick={onClose}>[X]</span>
        </div>
        <div style={{ marginTop: 10, color: 'var(--acc)', fontSize: 12 }}>{p.blurb}</div>
        <div style={{ marginTop: 20, fontFamily: fontSerif, fontSize: 15, lineHeight: 1.7, color: 'var(--text)' }}>
          {p.detail}
        </div>
        <div style={{ marginTop: 22, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {p.stack.map((s) => <span key={s} className="tag">{s}</span>)}
        </div>
        <div style={{ marginTop: 22, display: 'flex', gap: 10 }}>
          <a className="btn primary" href={p.link} target="_blank" rel="noreferrer">▸ view on github</a>
          <button className="btn" onClick={onClose}>close</button>
        </div>
      </div>
    </div>
  );
}
