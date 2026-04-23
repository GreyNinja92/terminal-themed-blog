'use client';

import { useState, useEffect, useRef } from 'react';
import { POSTS, Post, POST_KINDS } from '@/lib/data';
import { SITE } from '@/lib/data';
import { SHELL, fontMono, fontSerif } from '@/lib/theme';
import { fmtDate } from '@/lib/utils';
import PostMeta from '@/components/shared/PostMeta';
import PostBody from '@/components/shared/PostBody';

type HistoryLine =
  | { k: 'in';   t: string }
  | { k: 'out';  t: string }
  | { k: 'err';  t: string }
  | { k: 'row';  t: Post }
  | { k: 'post'; t: Post };

interface Props {
  posts: Post[];
  showToast: (title: string, body: string) => void;
}

export default function TerminalView({ posts, showToast }: Props) {
  const [history, setHistory] = useState<HistoryLine[]>([
    { k: 'out', t: "# saksham's writings · type `help` for commands, `ls` to list posts" },
  ]);
  const [q, setQ] = useState('');
  const [hIdx, setHIdx] = useState(-1);
  const [cmdHist, setCmdHist] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const push = (lines: HistoryLine | HistoryLine[]) =>
    setHistory((h) => [...h, ...(Array.isArray(lines) ? lines : [lines])]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setCmdHist((h) => [...h, cmd]);
    setHIdx(-1);
    push({ k: 'in', t: cmd });
    const [c, ...args] = cmd.split(/\s+/);
    if (c === 'help') push({ k: 'out', t: 'commands: ls [--tag X] · cat <slug> · tags · recent · pinned · clear · about · sudo · exit' });
    else if (c === 'ls') {
      const tagFlag = args.indexOf('--tag');
      const tag = tagFlag >= 0 ? args[tagFlag + 1] : null;
      const L = tag ? posts.filter((p) => p.tags.includes(tag)) : posts;
      if (L.length === 0) push({ k: 'out', t: '(none)' });
      else L.forEach((p) => push({ k: 'row', t: p }));
    } else if (c === 'cat') {
      const slug = args[0];
      const p = POSTS.find((x) => x.slug === slug);
      if (!p) push({ k: 'err', t: `cat: ${slug}: no such post. try \`ls\`.` });
      else push({ k: 'post', t: p });
    } else if (c === 'tags') {
      push({ k: 'out', t: [...new Set(POSTS.flatMap((p) => p.tags))].sort().join('  ') });
    } else if (c === 'recent') {
      posts.slice(0, 5).forEach((p) => push({ k: 'row', t: p }));
    } else if (c === 'pinned') {
      posts.filter((p) => p.pinned).forEach((p) => push({ k: 'row', t: p }));
    } else if (c === 'clear') {
      setHistory([]);
    } else if (c === 'about') {
      push({ k: 'out', t: `${SITE.name} — ${SITE.role} @ ${SITE.company}. see ~/ for more.` });
    } else if (c === 'sudo') {
      push({ k: 'err', t: 'saksham is not in the sudoers file. this incident will be reported.' });
    } else if (c === 'rm' && args[0] === '-rf') {
      push({ k: 'err', t: 'nice try.' });
    } else if (c === 'exit') {
      push({ k: 'out', t: '…you can just click another tab, you know.' });
    } else {
      push({ k: 'err', t: `${c}: command not found. try \`help\`.` });
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { run(q); setQ(''); }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const i = hIdx < 0 ? cmdHist.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(i);
      setQ(cmdHist[i] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const i = hIdx < 0 ? -1 : hIdx + 1;
      if (i >= cmdHist.length) { setHIdx(-1); setQ(''); }
      else { setHIdx(i); setQ(cmdHist[i]); }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const parts = q.split(/\s+/);
      if (parts[0] === 'cat' && parts[1]) {
        const m = POSTS.find((p) => p.slug.startsWith(parts[1]));
        if (m) setQ('cat ' + m.slug);
      }
    }
  };

  return (
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: '1fr auto' }}>
      <div
        ref={scrollRef}
        className="scroll"
        style={{ overflowY: 'auto', padding: 20, fontFamily: fontMono, fontSize: 12.5, lineHeight: 1.65 }}
      >
        {history.map((h, i) => {
          if (h.k === 'in') return (
            <div key={i}>
              <span style={{ color: 'var(--acc)' }}>saksham@seattle ~/writing ❯ </span>
              <span style={{ color: 'var(--text)' }}>{h.t}</span>
            </div>
          );
          if (h.k === 'out') return <div key={i} style={{ color: 'var(--dim)', whiteSpace: 'pre-wrap' }}>{h.t}</div>;
          if (h.k === 'err') return <div key={i} style={{ color: '#e37b6b' }}>{h.t}</div>;
          if (h.k === 'row') {
            const p = h.t;
            const kk = POST_KINDS[p.kind];
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 90px 1fr auto', gap: 10, color: 'var(--dim)' }}>
                <span style={{ color: 'var(--mute)' }}>{fmtDate(p.date)}</span>
                <span style={{ color: kk.color }}>{kk.label}</span>
                <span style={{ color: 'var(--text)' }}>{p.slug} <span style={{ color: 'var(--faint)' }}>— {p.title}</span></span>
                <span style={{ color: 'var(--mute)' }}>{p.readMin}m</span>
              </div>
            );
          }
          if (h.k === 'post') {
            const p = h.t;
            return (
              <div key={i} style={{ margin: '10px 0 14px', padding: '12px 14px', border: `1px dotted ${SHELL.borderSoft}`, borderRadius: 4 }}>
                <div style={{ fontFamily: fontSerif, fontSize: 18, color: 'var(--text)' }}>{p.title}</div>
                <div style={{ marginTop: 6 }}><PostMeta post={p}/></div>
                <div style={{ marginTop: 10 }}><PostBody post={p} compact/></div>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div style={{
        display: 'flex', gap: 8, alignItems: 'center', padding: '10px 20px',
        borderTop: `1px solid ${SHELL.borderSoft}`, background: 'rgba(10,13,16,0.5)',
      }}>
        <span style={{ color: 'var(--acc)' }}>saksham@seattle ~/writing ❯</span>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKey}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: 'var(--text)', fontFamily: fontMono, fontSize: 13,
          }}
        />
      </div>
    </div>
  );
}
