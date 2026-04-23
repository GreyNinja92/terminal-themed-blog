'use client';

import { SITE } from '@/lib/data';
import { SHELL, fontSerif } from '@/lib/theme';
import Line from '@/components/shared/Line';

export default function ContactScreen() {
  return (
    <div className="scroll" style={{
      padding: '56px 56px', height: '100%', overflow: 'auto',
      display: 'grid', placeItems: 'center',
    }}>
      <div style={{ maxWidth: 620, textAlign: 'left', width: '100%' }}>
        <div style={{ color: 'var(--faint)', fontSize: 10, letterSpacing: '0.2em', marginBottom: 10 }}>
          {'// $ cat ~/.plan'}
        </div>
        <h1 style={{ fontFamily: fontSerif, fontSize: 48, lineHeight: 1.05, margin: 0, color: 'var(--text)', fontWeight: 300 }}>
          {"Let's talk"}<span style={{ color: 'var(--acc)' }}>.</span>
        </h1>
        <p style={{ fontFamily: fontSerif, fontSize: 16, lineHeight: 1.6, color: 'var(--dim)', marginTop: 16 }}>
          {`I'm usually up for a conversation about distributed systems, putting LLMs in production,
          side projects, or what AWS is really like. The quickest way to reach me is email.`}
        </p>
        <div style={{ marginTop: 26, border: `1px solid ${SHELL.borderSoft}`, borderRadius: 4, padding: 20 }}>
          <Line label="email"    value={SITE.email}     href={`mailto:${SITE.email}`}/>
          <Line label="github"   value="@GreyNinja92"   href={SITE.links.github}/>
          <Line label="linkedin" value="in/saksham"     href={SITE.links.linkedin}/>
          <Line label="twitter"  value="@sakshamkhatod" href={SITE.links.twitter}/>
          <Line label="résumé"   value="resume.pdf"     href={SITE.links.resume}/>
          <Line label="based in" value="Seattle, WA (open to remote / relocation)"/>
          <Line label="timezone" value="Pacific (UTC−8)"/>
        </div>
        <div style={{ marginTop: 20, color: 'var(--mute)', fontSize: 11 }}>
          {'ps. try '}<span className="kbd">⌘K</span>{' for the command menu. and maybe the '}
          <span style={{ color: 'var(--acc)' }}>↑↑↓↓←→←→BA</span>{' thing.'}
        </div>
      </div>
    </div>
  );
}
