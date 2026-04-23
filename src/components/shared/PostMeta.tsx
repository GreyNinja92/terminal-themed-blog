'use client';

import { CSSProperties } from 'react';
import { Post, POST_KINDS } from '@/lib/data';
import { fontMono } from '@/lib/theme';
import { fmtDate } from '@/lib/utils';

export default function PostMeta({ post, style }: { post: Post; style?: CSSProperties }) {
  const k = POST_KINDS[post.kind];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
      fontFamily: fontMono, fontSize: 10, letterSpacing: '0.06em',
      color: 'var(--mute)', ...style,
    }}>
      <span
        className="kindpill"
        style={{ color: k.color, border: `1px solid ${k.color}55` }}
      >
        {k.label}
      </span>
      <span>{fmtDate(post.date)}</span>
      <span>·</span>
      <span>{post.readMin} MIN</span>
      <span>·</span>
      <span>{post.views.toLocaleString()} VIEWS</span>
      {post.updated && (
        <>
          <span>·</span>
          <span style={{ color: 'var(--acc)' }}>UPD {fmtDate(post.updated)}</span>
        </>
      )}
    </div>
  );
}
