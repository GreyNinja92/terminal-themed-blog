'use client';

import { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo, ReactNode } from 'react';
import { ThemeName, applyTheme } from '@/lib/theme';
import { SITE, FORTUNES } from '@/lib/data';

export type TabId = 'home' | 'writing' | 'contact';

interface Toast {
  id: number;
  title: string;
  body: string;
}

interface ShellContextValue {
  tab: TabId;
  setTab: (t: TabId) => void;
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  matrix: boolean;
  setMatrix: (v: boolean | ((prev: boolean) => boolean)) => void;
  palette: boolean;
  setPalette: (v: boolean | ((prev: boolean) => boolean)) => void;
  snake: boolean;
  setSnake: (v: boolean) => void;
  toast: Toast | null;
  showToast: (title: string, body: string) => void;
  fortune: () => void;
  uptime: string;
  focusedProject: string | null;
  setFocused: (s: string | null) => void;
}

const ShellContext = createContext<ShellContextValue | null>(null);

export function useShell() {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error('useShell must be used inside ShellProvider');
  return ctx;
}

export function ShellProvider({ children }: { children: ReactNode }) {
  const [tab, setTab] = useState<TabId>('home');
  const [theme, setThemeState] = useState<ThemeName>('green');
  const [matrix, setMatrix] = useState(false);
  const [palette, setPalette] = useState(false);
  const [snake, setSnake] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [uptime, setUptime] = useState('00:00:00');
  const [focusedProject, setFocused] = useState<string | null>(null);
  const startT = useRef(Date.now());
  const konami = useRef<string[]>([]);

  const setTheme = useCallback((name: ThemeName) => {
    setThemeState(name);
    applyTheme(name);
  }, []);

  useEffect(() => { applyTheme(theme); }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const s = Math.floor((Date.now() - startT.current) / 1000);
      const h = String(Math.floor(s / 3600)).padStart(2, '0');
      const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
      const ss = String(s % 60).padStart(2, '0');
      setUptime(`${h}:${m}:${ss}`);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const showToast = useCallback((title: string, body: string) => {
    const t: Toast = { id: Date.now(), title, body };
    setToast(t);
    setTimeout(() => setToast((cur) => cur?.id === t.id ? null : cur), 3500);
  }, []);

  const fortune = useCallback(() => {
    const f = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    showToast('◈ FORTUNE', f);
  }, [showToast]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPalette((p) => !p);
        return;
      }
      if (e.key === 'Escape') { setPalette(false); return; }
      if (e.target && ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA')) return;
      if (e.key === '1') setTab('home');
      if (e.key === '2') setTab('writing');
      if (e.key === '3') setTab('contact');
      const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
      konami.current = [...konami.current, e.key].slice(-seq.length);
      if (konami.current.join(',') === seq.join(',')) {
        konami.current = [];
        setMatrix(true);
        showToast('↑↑↓↓←→←→BA', '30 extra lives granted. matrix mode engaged.');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showToast]);

  const value = useMemo(() => ({
    tab, setTab, theme, setTheme, matrix, setMatrix, palette, setPalette,
    snake, setSnake, toast, showToast, fortune, uptime, focusedProject, setFocused,
  }), [tab, theme, setTheme, matrix, palette, snake, toast, showToast, fortune, uptime, focusedProject]);

  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;
}
