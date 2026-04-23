'use client';

import { useState } from 'react';
import { Post } from '@/lib/data';
import { SHELL, fontSerif } from '@/lib/theme';
import PostBody from '@/components/shared/PostBody';
import PostMeta from '@/components/shared/PostMeta';

interface Props {
  posts: Post[];
  allTags: string[];
  tagFilter: string | null;
  setTagFilter: (t: string | null) => void;
}

export default function StreamView({ posts, allTags, tagFilter, setTagFilter }: Props) {
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const toggle = (s: string) =>
    setOpen((o) => { const n = new Set(o); n.has(s) ? n.delete(s) : n.add(s); return n; });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', height: '100%', minHeight: 0 }}>
      <div className="scroll" style={{ overflowY: 'auto', padding: '20px 16px', borderRight: `1px solid ${SHELL.borderSoft}`, fontSize: 11 }}>
        <div style={{ color: 'var(--faint)', fontSize: 10, letterSpacing: '0.2em', marginBottom: 8 }}>{'// FILTER'}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <span className={`tag${!tagFilter ? ' on' : ''}`} onClick={() => setTagFilter(null)}>all</span>
          {allTags.map((t) => (
            <span key={t} className={`tag${tagFilter === t ? ' on' : ''}`} onClick={() => setTagFilter(tagFilter === t ? null : t)}>{t}</span>
          ))}
        </div>
      </div>
      <div className="scroll" style={{ overflowY: 'auto', padding: '32px 48px 72px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          {posts.map((p) => {
            const isOpen = open.has(p.slug);
            return (
              <div key={p.slug} style={{ padding: '18px 0', borderBottom: `1px dotted ${SHELL.borderSoft}` }}>
                <div onClick={() => toggle(p.slug)} style={{ cursor: 'pointer' }}>
                  <PostMeta post={p}/>
                  <h2 style={{ fontFamily: fontSerif, fontSize: 24, fontWeight: 400, lineHeight: 1.2, margin: '8px 0 4px', color: 'var(--text)' }}>
                    {p.title}
                  </h2>
                  <div style={{ fontFamily: fontSerif, fontSize: 14, color: 'var(--dim)', lineHeight: 1.5 }}>{p.dek}</div>
                  <div style={{ marginTop: 10, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {p.tags.map((t) => <span key={t} className="tag">#{t}</span>)}
                  </div>
                </div>
                {isOpen && <div style={{ marginTop: 20 }}><PostBody post={p}/></div>}
                <div onClick={() => toggle(p.slug)} style={{ marginTop: 10, color: 'var(--acc)', fontSize: 11, cursor: 'pointer' }}>
                  {isOpen ? '▾ collapse' : '▸ expand'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
