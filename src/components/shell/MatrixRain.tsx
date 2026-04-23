'use client';

import { useRef, useEffect } from 'react';

export default function MatrixRain({ on }: { on: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!on) return;
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d')!;
    let W = (c.width = window.innerWidth);
    let H = (c.height = window.innerHeight);
    const cols = Math.floor(W / 14);
    const drops = Array(cols).fill(1).map(() => Math.random() * -50);
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01'.split('');
    let raf: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(11,13,16,0.08)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#6bd49a';
      ctx.font = '14px JetBrains Mono';
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 14, drops[i] * 14);
        if (drops[i] * 14 > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onR = () => {
      W = c.width = window.innerWidth;
      H = c.height = window.innerHeight;
    };
    window.addEventListener('resize', onR);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onR);
    };
  }, [on]);

  if (!on) return null;
  return (
    <canvas
      ref={ref}
      style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none', opacity: 0.75 }}
    />
  );
}
