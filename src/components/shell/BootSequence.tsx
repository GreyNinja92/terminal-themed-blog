'use client';

import { useState, useEffect, useRef } from 'react';

interface Props {
  onDone: () => void;
}

export default function BootSequence({ onDone }: Props) {
  const TARGET = 'saksham.sh';
  const CHARS  = '!<>-_\\/[]{}—=+*^?#█▓▒░01';
  const [phase, setPhase] = useState<'scan' | 'glitch' | 'settled' | 'fade'>('scan');
  const [text,  setText]  = useState('');
  const [sweep, setSweep] = useState(0);
  const [flick, setFlick] = useState(1);
  const [bar,   setBar]   = useState(0);

  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const t0 = performance.now();
    const total = 1600;
    let raf: number;
    const step = () => {
      const t = performance.now() - t0;
      if (t < 320) {
        setSweep(Math.min(1, t / 320));
        setPhase('scan');
      } else if (t < 1150) {
        const p = (t - 320) / 830;
        let s = '';
        for (let i = 0; i < TARGET.length; i++) {
          const threshold = (i / TARGET.length) * 0.7;
          if (p > threshold + 0.25)     s += TARGET[i];
          else if (p > threshold)       s += CHARS[Math.floor(Math.random() * CHARS.length)];
          else                          s += ' ';
        }
        setText(s);
        setBar(p);
        setPhase('glitch');
        setFlick(Math.random() > 0.90 ? 0.35 + Math.random() * 0.5 : 1);
      } else if (t < 1350) {
        setText(TARGET);
        setBar(1);
        setPhase('settled');
        setFlick(1);
      } else if (t < total) {
        setPhase('fade');
        setFlick(1 - (t - 1350) / (total - 1350));
      } else {
        cancelAnimationFrame(raf);
        onDoneRef.current();
        return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#05080a', zIndex: 100,
      display: 'grid', placeItems: 'center', overflow: 'hidden',
      opacity: phase === 'fade' ? flick : 1,
      transition: phase === 'fade' ? 'opacity 180ms linear' : 'none',
    }}>
      <div style={{
        position: 'absolute', left: 0, right: 0,
        top: `${sweep * 100}%`,
        height: 2, background: 'var(--acc)',
        boxShadow: '0 0 18px 4px var(--acc), 0 0 40px 10px color-mix(in srgb, var(--acc) 50%, transparent)',
        opacity: phase === 'scan' ? 1 : 0,
        transition: 'opacity 220ms',
      }}/>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)',
        pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 3px)',
        pointerEvents: 'none', opacity: flick,
      }}/>
      <div style={{
        fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, Menlo, monospace',
        fontSize: 'clamp(36px, 7vw, 84px)',
        color: 'var(--acc)', letterSpacing: '0.08em',
        textShadow: '0 0 14px var(--acc), 0 0 44px color-mix(in srgb, var(--acc) 60%, transparent)',
        opacity: phase === 'scan' ? 0 : flick,
        transition: 'opacity 180ms',
        fontWeight: 500,
      }}>
        <span>{text || '\u00A0'}</span>
        {phase !== 'scan' && <span className="caret" style={{ marginLeft: 6 }}/>}
      </div>
      <div style={{
        position: 'absolute', bottom: 72, left: '50%', transform: 'translateX(-50%)',
        width: 240, height: 2, background: 'rgba(255,255,255,0.08)',
        opacity: phase === 'scan' || phase === 'fade' ? 0 : flick * 0.8,
      }}>
        <div style={{ width: `${bar * 100}%`, height: '100%', background: 'var(--acc)', boxShadow: '0 0 8px var(--acc)' }}/>
      </div>
      <div style={{
        position: 'absolute', bottom: 36, left: 0, right: 0, textAlign: 'center',
        fontFamily: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, Menlo, monospace',
        fontSize: 10, letterSpacing: '0.3em',
        color: 'var(--mute)', opacity: phase === 'scan' ? 0 : flick * 0.7,
      }}>
        {phase === 'glitch'  && 'RESOLVING SIGNAL · /dev/tty0'}
        {phase === 'settled' && 'LINK ESTABLISHED · SEA'}
        {phase === 'fade'    && 'LOADING UI …'}
      </div>
    </div>
  );
}
