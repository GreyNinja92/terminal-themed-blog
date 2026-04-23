'use client';

import { useEffect, useRef, useState } from 'react';
import { Post, POST_KINDS } from '@/lib/data';
import { SITE } from '@/lib/data';
import { SHELL, fontMono, fontSerif } from '@/lib/theme';
import { fmtDate } from '@/lib/utils';
import PostBody from '@/components/shared/PostBody';
import PostMeta from '@/components/shared/PostMeta';

interface Props {
  posts: Post[];
  allTags: string[];
  tagFilter: string | null;
  setTagFilter: (t: string | null) => void;
  search: string;
  setSearch: (s: string) => void;
  selected: string;
  setSelected: (s: string) => void;
  post: Post;
}

function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = (e: Event) => {
      const t = e.target as HTMLElement;
      if (!t.classList.contains('scroll')) return;
      const max = t.scrollHeight - t.clientHeight;
      setPct(max > 0 ? Math.min(100, (t.scrollTop / max) * 100) : 0);
    };
    document.addEventListener('scroll', onScroll, true);
    return () => document.removeEventListener('scroll', onScroll, true);
  }, []);
  return (
    <div style={{
      position: 'fixed', top: 38 + 36, left: 320, right: 0, height: 2,
      zIndex: 5, pointerEvents: 'none',
    }}>
      <div style={{ width: `${pct}%`, height: '100%', background: 'var(--acc)', transition: 'width 0.05s' }}/>
    </div>
  );
}

export default function SplitView({ posts, allTags, tagFilter, setTagFilter, search, setSearch, selected, setSelected, post }: Props) {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target && ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA')) return;
      const i = posts.findIndex((p) => p.slug === selected);
      if (e.key === 'j') { e.preventDefault(); if (posts[i + 1]) setSelected(posts[i + 1].slug); }
      if (e.key === 'k') { e.preventDefault(); if (posts[i - 1]) setSelected(posts[i - 1].slug); }
      if (e.key === '/') { e.preventDefault(); searchRef.current?.focus(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [posts, selected, setSelected]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', height: '100%', minHeight: 0 }}>
      {/* Post list */}
      <div style={{ borderRight: `1px solid ${SHELL.borderSoft}`, display: 'grid', gridTemplateRows: 'auto auto 1fr', minHeight: 0 }}>
        <div style={{
          padding: '10px 14px', borderBottom: `1px solid ${SHELL.borderSoft}`,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ color: 'var(--acc)' }}>/</span>
          <input
            ref={searchRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search posts…"
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--text)', fontFamily: fontMono, fontSize: 12,
            }}
          />
          {search && <span onClick={() => setSearch('')} style={{ cursor: 'pointer', color: 'var(--mute)' }}>✕</span>}
        </div>
        <div style={{
          padding: '10px 14px', borderBottom: `1px solid ${SHELL.borderSoft}`,
          display: 'flex', gap: 4, flexWrap: 'wrap',
        }}>
          <span className={`tag${!tagFilter ? ' on' : ''}`} onClick={() => setTagFilter(null)}>all</span>
          {allTags.map((t) => (
            <span key={t} className={`tag${tagFilter === t ? ' on' : ''}`} onClick={() => setTagFilter(tagFilter === t ? null : t)}>{t}</span>
          ))}
        </div>
        <div className="scroll" style={{ overflowY: 'auto' }}>
          {posts.map((p) => {
            const k = POST_KINDS[p.kind];
            const on = p.slug === selected;
            return (
              <div
                key={p.slug}
                onClick={() => setSelected(p.slug)}
                style={{
                  padding: '12px 14px',
                  borderBottom: `1px dotted ${SHELL.borderSoft}`,
                  borderLeft: `2px solid ${on ? 'var(--acc)' : 'transparent'}`,
                  background: on ? 'rgba(107,212,154,0.04)' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: k.color }}/>
                  <span style={{ color: 'var(--mute)', fontSize: 10, letterSpacing: '0.05em' }}>{fmtDate(p.date)}</span>
                  {p.pinned && <span style={{ color: 'var(--acc2)', fontSize: 10 }}>★</span>}
                  <span style={{ flex: 1 }}/>
                  <span style={{ color: 'var(--faint)', fontSize: 10 }}>{p.readMin}m</span>
                </div>
                <div style={{ fontFamily: fontSerif, fontSize: 14, lineHeight: 1.3, color: on ? 'var(--text)' : 'var(--dim)' }}>
                  {p.title}
                </div>
              </div>
            );
          })}
          {posts.length === 0 && (
            <div style={{ padding: 20, color: 'var(--mute)', textAlign: 'center' }}>no posts match</div>
          )}
        </div>
      </div>

      {/* Post reader */}
      <div className="scroll" style={{ overflowY: 'auto', padding: '28px 48px 72px', position: 'relative' }}>
        <ReadingProgress/>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ color: 'var(--faint)', fontSize: 10, letterSpacing: '0.2em', marginBottom: 10 }}>
            {'// cat ~/writing/'}{post.slug}{'.md'}
          </div>
          <h1 style={{ fontFamily: fontSerif, fontSize: 36, lineHeight: 1.15, margin: 0, fontWeight: 400, color: 'var(--text)' }}>
            {post.title}
          </h1>
          <div style={{ fontFamily: fontSerif, fontStyle: 'italic', fontSize: 16, color: 'var(--dim)', marginTop: 10 }}>
            {post.dek}
          </div>
          <div style={{ marginTop: 14 }}><PostMeta post={post}/></div>
          <div style={{ marginTop: 14, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {post.tags.map((t) => <span key={t} className="tag" onClick={() => setTagFilter(t)}>#{t}</span>)}
          </div>
          {post.toc.length > 0 && (
            <div style={{
              margin: '28px 0', padding: '14px 18px',
              border: `1px dotted ${SHELL.borderSoft}`, borderRadius: 4,
            }}>
              <div style={{ color: 'var(--faint)', fontSize: 10, letterSpacing: '0.2em', marginBottom: 8 }}>
                {'// contents'}
              </div>
              {post.toc.map((t, i) => (
                <div key={i} style={{ fontSize: 12, color: 'var(--dim)', margin: '3px 0' }}>
                  <span style={{ color: 'var(--faint)' }}>0{i + 1}.</span> {t}
                </div>
              ))}
            </div>
          )}
          <div style={{ marginTop: 26 }}><PostBody post={post}/></div>
          <div style={{
            marginTop: 48, paddingTop: 18, borderTop: `1px dotted ${SHELL.borderSoft}`,
            color: 'var(--mute)', fontSize: 11, display: 'flex', gap: 16,
          }}>
            <span><span className="kbd">j/k</span> next/prev</span>
            <span><span className="kbd">/</span> search</span>
            <span style={{ flex: 1 }}/>
            <a className="link" href={SITE.links.twitter} target="_blank" rel="noreferrer">discuss on twitter ↗</a>
          </div>
        </div>
      </div>
    </div>
  );
}
