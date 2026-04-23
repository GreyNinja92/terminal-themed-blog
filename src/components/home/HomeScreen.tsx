'use client';

import { useState } from 'react';
import { SITE } from '@/lib/data';
import { SHELL, fontMono, fontSerif } from '@/lib/theme';
import Line from '@/components/shared/Line';
import SectionLabel from '@/components/shared/SectionLabel';
import ProjectOverlay from './ProjectOverlay';

interface Props {
  openTab: (tab: 'writing') => void;
  focusedProject: string | null;
  setFocused: (s: string | null) => void;
}

export default function HomeScreen({ openTab, focusedProject, setFocused }: Props) {
  const [openExp, setOpenExp] = useState(0);

  return (
    <div className="scroll" style={{ padding: '40px 56px 72px', height: '100%', overflow: 'auto' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>

        {/* HERO */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 56, alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: 'var(--faint)', fontSize: 10, letterSpacing: '0.2em', marginBottom: 8 }}>
              {'// WHOAMI · $ cat ~/.profile'}
            </div>
            <h1 style={{
              fontFamily: fontSerif, fontSize: 60, lineHeight: 1.02,
              margin: 0, color: 'var(--text)', fontWeight: 300, letterSpacing: '-0.02em',
            }}>
              {SITE.name}<span style={{ color: 'var(--acc)' }}>.</span>
            </h1>
            <div style={{ marginTop: 12, color: 'var(--dim)', fontSize: 14 }}>
              <span style={{ color: 'var(--acc)' }}>{SITE.role}</span> @ {SITE.company} · {SITE.location}
            </div>
            <div style={{ marginTop: 28, fontFamily: fontSerif, fontSize: 16.5, lineHeight: 1.7, color: 'var(--text)' }}>
              {SITE.about.map((p, i) => <p key={i} style={{ margin: '0 0 14px' }}>{p}</p>)}
            </div>
            <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn primary" onClick={() => openTab('writing')}>▸ read the blog</button>
              <a className="btn" href={SITE.links.resume} download>↓ résumé.pdf</a>
              <a className="btn" href={`mailto:${SITE.email}`}>✉ email</a>
              <a className="btn" href={SITE.links.github} target="_blank" rel="noreferrer">↗ github</a>
            </div>
            <div style={{ flex: 1 }}/>
            <div style={{
              marginTop: 24, paddingTop: 18,
              borderTop: `1px dotted ${SHELL.borderSoft}`,
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18,
            }}>
              <div>
                <div style={{ color: 'var(--faint)', fontSize: 10, letterSpacing: '0.2em', marginBottom: 8 }}>{'// EDU'}</div>
                {SITE.education.map((e) => (
                  <div key={e.school} style={{ marginBottom: 8, fontSize: 11.5 }}>
                    <div style={{ color: 'var(--text)' }}>{e.degree}</div>
                    <div style={{ color: 'var(--dim)' }}>{e.school}</div>
                    <div style={{ color: 'var(--mute)', fontSize: 10 }}>{e.when}{e.note ? ` · ${e.note}` : ''}</div>
                  </div>
                ))}
              </div>
              <div>
                <div style={{ color: 'var(--faint)', fontSize: 10, letterSpacing: '0.2em', marginBottom: 8 }}>{'// FOCUS'}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {SITE.skills.map((s) => <span key={s} className="tag on">{s}</span>)}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links sidebar */}
          <div style={{
            fontSize: 11, border: `1px solid ${SHELL.borderSoft}`, borderRadius: 4,
            padding: 18, background: 'rgba(12,15,18,0.5)', display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ color: 'var(--faint)', fontSize: 10, letterSpacing: '0.2em', marginBottom: 10 }}>
              {'// QUICK LINKS'}
            </div>
            <Line label="email"    value={SITE.email}     href={`mailto:${SITE.email}`}/>
            <Line label="github"   value="@GreyNinja92"   href={SITE.links.github}/>
            <Line label="linkedin" value="in/saksham"     href={SITE.links.linkedin}/>
            <Line label="twitter"  value="@sakshamkhatod" href={SITE.links.twitter}/>
            <Line label="status"   value="open to chat"/>
            <div style={{ color: 'var(--faint)', fontSize: 10, letterSpacing: '0.2em', margin: '20px 0 8px' }}>
              {'// STACK'}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {SITE.stack.map((s) => <span key={s} className="tag">{s}</span>)}
            </div>
            <div style={{ flex: 1 }}/>
          </div>
        </div>

        {/* EXPERIENCE */}
        <SectionLabel right="cat ~/work/experience.log">{'// EXPERIENCE'}</SectionLabel>
        <div style={{ border: `1px solid ${SHELL.borderSoft}`, borderRadius: 4 }}>
          {SITE.experience.map((e, i) => {
            const on = openExp === i;
            return (
              <div
                key={i}
                onClick={() => setOpenExp(on ? -1 : i)}
                style={{
                  borderBottom: i < SITE.experience.length - 1 ? `1px solid ${SHELL.borderSoft}` : 'none',
                  padding: '14px 18px', cursor: 'pointer',
                  background: on ? 'rgba(107,212,154,0.03)' : 'transparent',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr auto', gap: 16, alignItems: 'center' }}>
                  <span style={{ color: 'var(--mute)', fontSize: 11 }}>{e.when}</span>
                  <div>
                    <div style={{ color: 'var(--text)', fontSize: 13 }}>
                      {e.role} <span style={{ color: 'var(--faint)' }}>@</span>{' '}
                      <span style={{ color: 'var(--acc)' }}>{e.org}</span>
                    </div>
                    <div style={{ color: 'var(--dim)', fontSize: 11.5, marginTop: 3 }}>{e.blurb}</div>
                  </div>
                  <span style={{ color: 'var(--mute)' }}>{on ? '▾' : '▸'}</span>
                </div>
                {on && (
                  <div style={{
                    marginTop: 12, paddingLeft: 166,
                    fontFamily: fontSerif, fontSize: 14, lineHeight: 1.65, color: 'var(--text)',
                  }}>
                    {e.detail}
                    <div style={{ marginTop: 10, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {e.stack.map((s) => <span key={s} className="tag">{s}</span>)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* PROJECTS */}
        <SectionLabel right="ls ~/work/projects">{'// PROJECTS'}</SectionLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {SITE.projects.map((p) => (
            <div
              key={p.slug}
              onClick={() => setFocused(p.slug)}
              style={{
                border: `1px solid ${SHELL.borderSoft}`, borderRadius: 4,
                padding: 18, cursor: 'pointer', background: SHELL.card,
                transition: 'border-color .12s, transform .12s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--acc)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = SHELL.borderSoft;
                (e.currentTarget as HTMLDivElement).style.transform = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ color: 'var(--faint)', fontSize: 10 }}>{p.n}</span>
                <span style={{ color: 'var(--text)', fontSize: 14 }}>{p.name}</span>
                <span style={{ flex: 1 }}/>
                <span style={{ color: 'var(--acc)', fontSize: 10 }}>▸ open</span>
              </div>
              <div style={{ color: 'var(--dim)', marginTop: 6, fontFamily: fontSerif, fontSize: 13, lineHeight: 1.55 }}>
                {p.blurb}
              </div>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 10 }}>
                {p.stack.map((s) => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* PUBLICATIONS */}
        <SectionLabel right="ls ~/work/papers">{'// PUBLICATIONS'}</SectionLabel>
        <div>
          {SITE.publications.map((p) => (
            <a
              key={p.n}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'grid', gridTemplateColumns: '44px 150px 1fr auto',
                gap: 14, padding: '12px 4px',
                borderBottom: `1px dotted ${SHELL.borderSoft}`,
                alignItems: 'baseline', color: 'inherit',
              }}
              onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(107,212,154,0.03)'}
              onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'}
            >
              <span style={{ color: 'var(--faint)', fontSize: 10 }}>{p.n}</span>
              <span className="kindpill" style={{ color: 'var(--acc2)', border: '1px solid var(--acc2)', width: 'fit-content' }}>{p.field}</span>
              <span style={{ color: 'var(--text)', fontSize: 13, fontFamily: fontSerif }}>{p.title}</span>
              <span style={{ color: 'var(--mute)', fontSize: 10.5 }}>{p.venue} <span style={{ color: 'var(--acc)' }}>↗</span></span>
            </a>
          ))}
        </div>
      </div>

      {focusedProject && <ProjectOverlay slug={focusedProject} onClose={() => setFocused(null)}/>}
    </div>
  );
}
