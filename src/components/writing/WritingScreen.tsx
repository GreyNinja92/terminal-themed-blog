'use client';

import { useState, useMemo } from 'react';
import { POSTS, sortedPosts } from '@/lib/data';
import { SHELL, fontMono } from '@/lib/theme';
import SplitView from './SplitView';
import TerminalView from './TerminalView';
import SpatialView from './SpatialView';
import StreamView from './StreamView';

type ViewId = 'split' | 'terminal' | 'spatial' | 'stream';

interface Props {
  showToast: (title: string, body: string) => void;
}

export default function WritingScreen({ showToast }: Props) {
  const [view, setView] = useState<ViewId>('split');
  const [selected, setSelected] = useState(sortedPosts()[0].slug);
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const allTags = useMemo(() => [...new Set(POSTS.flatMap((p) => p.tags))].sort(), []);
  const filtered = useMemo(() => {
    let L = sortedPosts();
    if (tagFilter) L = L.filter((p) => p.tags.includes(tagFilter));
    if (search) {
      const s = search.toLowerCase();
      L = L.filter((p) => p.title.toLowerCase().includes(s) || p.dek.toLowerCase().includes(s) || p.tags.some((t) => t.includes(s)));
    }
    return L;
  }, [tagFilter, search]);

  const post = POSTS.find((p) => p.slug === selected) ?? POSTS[0];

  const VIEWS: [ViewId, string][] = [['split', 'split'], ['terminal', 'term'], ['spatial', 'canvas'], ['stream', 'stream']];

  return (
    <div style={{ display: 'grid', gridTemplateRows: '36px 1fr', height: '100%', minHeight: 0 }}>
      <div style={{
        display: 'flex', alignItems: 'center', padding: '0 14px',
        borderBottom: `1px solid ${SHELL.borderSoft}`,
        gap: 4, fontSize: 11,
      }}>
        <span style={{ color: 'var(--faint)', marginRight: 10 }}>{'// ~/writing · view:'}</span>
        {VIEWS.map(([id, lbl]) => (
          <button
            key={id}
            onClick={() => setView(id)}
            style={{
              background: view === id ? 'rgba(107,212,154,0.08)' : 'transparent',
              border: `1px solid ${view === id ? 'var(--acc)' : SHELL.borderSoft}`,
              color: view === id ? 'var(--acc)' : 'var(--mute)',
              padding: '3px 10px', borderRadius: 3,
              fontFamily: fontMono, fontSize: 10.5, cursor: 'pointer',
              letterSpacing: '0.05em',
            }}
          >
            ▸ {lbl}
          </button>
        ))}
        <span style={{ flex: 1 }}/>
        <span style={{ color: 'var(--mute)' }}>{filtered.length} posts</span>
      </div>
      <div style={{ minHeight: 0, overflow: 'hidden' }}>
        {view === 'split'    && <SplitView posts={filtered} allTags={allTags} tagFilter={tagFilter} setTagFilter={setTagFilter} search={search} setSearch={setSearch} selected={selected} setSelected={setSelected} post={post}/>}
        {view === 'terminal' && <TerminalView posts={filtered} showToast={showToast}/>}
        {view === 'spatial'  && <SpatialView posts={filtered} setSelected={setSelected} setView={setView}/>}
        {view === 'stream'   && <StreamView posts={filtered} allTags={allTags} tagFilter={tagFilter} setTagFilter={setTagFilter}/>}
      </div>
    </div>
  );
}
