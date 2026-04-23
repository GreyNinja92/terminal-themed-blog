'use client';

import { Post } from '@/lib/data';
import { SHELL, fontMono, fontSerif } from '@/lib/theme';
import { highlight } from '@/lib/utils';

interface Props {
  post: Post;
  compact?: boolean;
}

export default function PostBody({ post, compact = false }: Props) {
  const size = compact ? 13 : 14.5;
  return (
    <div style={{ fontFamily: fontSerif, fontSize: size, lineHeight: 1.7, color: 'var(--text)' }}>
      {post.body.map((b, i) => {
        if (b.k === 'p') return <p key={i} style={{ margin: '0 0 18px' }}>{b.t}</p>;
        if (b.k === 'h') return (
          <h3 key={i} style={{
            fontFamily: fontMono, fontSize: 12, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--acc)',
            margin: '28px 0 12px', fontWeight: 500,
          }}>▸ {b.t}</h3>
        );
        if (b.k === 'q') return (
          <blockquote key={i} style={{
            margin: '18px 0', padding: '2px 0 2px 18px',
            borderLeft: '2px solid var(--acc)', color: 'var(--dim)',
            fontStyle: 'italic', fontSize: size + 1,
          }}>{b.t}</blockquote>
        );
        if (b.k === 'code') return (
          <pre key={i} style={{
            fontFamily: fontMono, fontSize: 12, lineHeight: 1.55, color: 'var(--text)',
            background: '#0a0d10', border: `1px solid ${SHELL.borderSoft}`,
            borderRadius: 4, padding: '14px 16px', margin: '0 0 18px', overflow: 'auto',
          }}>
            <div style={{ color: 'var(--faint)', fontSize: 10, letterSpacing: '0.1em', marginBottom: 8 }}>
              ── {b.lang} ──
            </div>
            <code dangerouslySetInnerHTML={{ __html: highlight(b.t, b.lang) }}/>
          </pre>
        );
        if (b.k === 'link') return (
          <div key={i} style={{ fontFamily: fontMono, fontSize: 12, color: 'var(--dim)', margin: '6px 0' }}>
            <span style={{ color: 'var(--acc)' }}>↗</span> {b.t}
          </div>
        );
        return null;
      })}
      {post.footnotes.length > 0 && (
        <div style={{
          marginTop: 32, paddingTop: 18, borderTop: `1px dotted ${SHELL.borderSoft}`,
          fontFamily: fontMono, fontSize: 11, lineHeight: 1.7, color: 'var(--dim)',
        }}>
          {post.footnotes.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10 }}>
              <span style={{ color: 'var(--faint)' }}>[{i + 1}]</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
