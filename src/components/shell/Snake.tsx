'use client';

import { useState, useEffect, useRef } from 'react';
import { SHELL } from '@/lib/theme';

interface SnakeState {
  snake: { x: number; y: number }[];
  dir: { x: number; y: number };
  food: { x: number; y: number };
  score: number;
  dead: boolean;
}

const W = 28, H = 18;

export default function Snake({ onClose }: { onClose: () => void }) {
  const [state, setState] = useState<SnakeState>(() => ({
    snake: [{ x: 10, y: 10 }],
    dir: { x: 1, y: 0 },
    food: { x: 15, y: 10 },
    score: 0,
    dead: false,
  }));
  const ref = useRef(state);
  ref.current = state;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const d = ref.current.dir;
      if (e.key === 'ArrowUp'    && d.y !== 1)  setState((s) => ({ ...s, dir: { x: 0, y: -1 } }));
      if (e.key === 'ArrowDown'  && d.y !== -1) setState((s) => ({ ...s, dir: { x: 0, y: 1 } }));
      if (e.key === 'ArrowLeft'  && d.x !== 1)  setState((s) => ({ ...s, dir: { x: -1, y: 0 } }));
      if (e.key === 'ArrowRight' && d.x !== -1) setState((s) => ({ ...s, dir: { x: 1, y: 0 } }));
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    const tick = setInterval(() => {
      setState((s) => {
        if (s.dead) return s;
        const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };
        if (head.x < 0 || head.y < 0 || head.x >= W || head.y >= H || s.snake.some((p) => p.x === head.x && p.y === head.y)) {
          return { ...s, dead: true };
        }
        const ate = head.x === s.food.x && head.y === s.food.y;
        const snake = [head, ...s.snake];
        if (!ate) snake.pop();
        const food = ate ? { x: Math.floor(Math.random() * W), y: Math.floor(Math.random() * H) } : s.food;
        return { ...s, snake, food, score: s.score + (ate ? 10 : 0) };
      });
    }, 110);

    return () => {
      window.removeEventListener('keydown', onKey);
      clearInterval(tick);
    };
  }, [onClose]);

  return (
    <div
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
        zIndex: 80, display: 'grid', placeItems: 'center',
      }}
    >
      <div style={{
        background: '#0a0d10', border: '1px solid var(--acc)',
        borderRadius: 6, padding: 18,
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          color: 'var(--acc)', fontSize: 11, marginBottom: 10,
        }}>
          <span>SNAKE.EXE</span>
          <span>SCORE {state.score.toString().padStart(4, '0')}</span>
          <span style={{ cursor: 'pointer' }} onClick={onClose}>[X]</span>
        </div>
        <svg
          width={W * 16}
          height={H * 16}
          style={{ display: 'block', background: '#06080a', border: `1px solid ${SHELL.borderSoft}` }}
        >
          {state.snake.map((p, i) => (
            <rect
              key={i}
              x={p.x * 16 + 1} y={p.y * 16 + 1}
              width={14} height={14}
              fill={i === 0 ? 'var(--acc)' : 'color-mix(in srgb, var(--acc) 60%, transparent)'}
            />
          ))}
          <rect
            x={state.food.x * 16 + 2} y={state.food.y * 16 + 2}
            width={12} height={12}
            fill="var(--acc2)"
          />
        </svg>
        <div style={{ color: 'var(--mute)', fontSize: 10, marginTop: 8, textAlign: 'center' }}>
          {state.dead
            ? <span style={{ color: 'var(--acc2)' }}>GAME OVER · ESC to close</span>
            : <span>← ↑ → ↓ to move · ESC to quit</span>
          }
        </div>
      </div>
    </div>
  );
}
