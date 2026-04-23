'use client';

import { useState, useRef } from 'react';
import { Post, POST_KINDS } from '@/lib/data';
import { SHELL, fontSerif } from '@/lib/theme';
import { fmtDate } from '@/lib/utils';

interface Layout {
  slug: string;
  x: number;
  y: number;
  rot: number;
}

interface Props {
  posts: Post[];
  setSelected: (s: string) => void;
  setView: (v: 'split') => void;
}

function makeLayout(posts: Post[], scattered = true): Layout[] {
  return posts.map((p, i) => {
    const cols = 3;
    const cx = (i % cols) * 230 + 40 + (scattered ? (Math.random() * 20 - 10) : 0);
    const cy = Math.floor(i / cols) * 180 + 40 + (scattered ? (Math.random() * 10 - 5) : 0);
    return { slug: p.slug, x: cx, y: cy, rot: scattered ? (Math.random() * 4 - 2) : 0 };
  });
}

export default function SpatialView({ posts, setSelected, setView }: Props) {
  const [layout, setLayout] = useState<Layout[]>(() => makeLayout(posts));
  const drag = useRef<{ slug: string; ox: number; oy: number } | null>(null);

  const onDown = (e: React.MouseEvent, slug: string) => {
    const start = layout.find((l) => l.slug === slug);
    if (!start) return;
    drag.current = { slug, ox: e.clientX - start.x, oy: e.clientY - start.y };
    document.body.style.userSelect = 'none';
    (document.body.style as CSSStyleDeclaration & { webkitUserSelect: string }).webkitUserSelect = 'none';
    const move = (ev: MouseEvent) =>
      setLayout((L) => L.map((l) =>
        l.slug === drag.current?.slug ? { ...l, x: ev.clientX - drag.current!.ox, y: ev.clientY - drag.current!.oy } : l,
      ));
    const up = () => {
      drag.current = null;
      document.body.style.userSelect = '';
      (document.body.style as CSSStyleDeclaration & { webkitUserSelect: string }).webkitUserSelect = '';
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden', userSelect: 'none' }} className="gridbg">
      <div style={{ position: 'absolute', top: 10, left: 14, color: 'var(--faint)', fontSize: 10, letterSpacing: '0.15em', zIndex: 10 }}>
        {'// drag cards · click to read · '}
        <span onClick={() => setLayout(makeLayout(posts, false))} style={{ color: 'var(--acc)', cursor: 'pointer' }}>↻ tidy</span>
      </div>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {posts.map((p) => {
          const l = layout.find((x) => x.slug === p.slug);
          if (!l) return null;
          const k = POST_KINDS[p.kind];
          return (
            <div
              key={p.slug}
              onMouseDown={(e) => onDown(e, p.slug)}
              onDoubleClick={() => { setSelected(p.slug); setView('split'); }}
              style={{
                position: 'absolute', left: l.x, top: l.y, width: 220,
                padding: 14, background: SHELL.card,
                border: `1px solid ${p.pinned ? 'var(--acc2)' : SHELL.borderSoft}`,
                borderRadius: 4, cursor: 'grab',
                transform: `rotate(${l.rot}deg)`,
                boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                userSelect: 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: k.color }}/>
                <span style={{ color: 'var(--mute)', fontSize: 9, letterSpacing: '0.1em' }}>{k.label.toUpperCase()}</span>
                {p.pinned && <span style={{ marginLeft: 'auto', color: 'var(--acc2)', fontSize: 10 }}>★</span>}
              </div>
              <div style={{ fontFamily: fontSerif, fontSize: 13.5, lineHeight: 1.25, color: 'var(--text)' }}>{p.title}</div>
              <div style={{ color: 'var(--mute)', fontSize: 10, marginTop: 8, letterSpacing: '0.05em' }}>
                {fmtDate(p.date)} · {p.readMin}m
              </div>
              <div style={{ color: 'var(--faint)', fontSize: 9, marginTop: 4 }}>2× click to read →</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
