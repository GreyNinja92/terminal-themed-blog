export const THEMES = {
  green: { accent: '#6bd49a', accent2: '#d4c46b', text: '#e6e4de', dim: '#a8ada6', mute: '#7a7e84', faint: '#5a5e64' },
  amber: { accent: '#e8b04a', accent2: '#d97b47', text: '#f2e6c9', dim: '#c9b78f', mute: '#8f7e5a', faint: '#5e5340' },
  blue:  { accent: '#6ba9d4', accent2: '#9a8fe3', text: '#e0e6ec', dim: '#a0b0c0', mute: '#6f7d8b', faint: '#4d5866' },
} as const;

export type ThemeName = keyof typeof THEMES;

export const SHELL = {
  bg: '#0b0d10',
  panel: 'rgba(10,12,14,0.55)',
  border: '#1d2127',
  borderSoft: '#262c33',
  card: 'linear-gradient(180deg, #12171c 0%, #0e1216 100%)',
};

export const fontMono = 'var(--font-mono), "IBM Plex Mono", ui-monospace, Menlo, monospace';
export const fontSerif = 'var(--font-serif), "Iowan Old Style", Georgia, serif';

export function applyTheme(name: ThemeName) {
  if (typeof document === 'undefined') return;
  const t = THEMES[name] ?? THEMES.green;
  const r = document.documentElement.style;
  r.setProperty('--acc', t.accent);
  r.setProperty('--acc2', t.accent2);
  r.setProperty('--text', t.text);
  r.setProperty('--dim', t.dim);
  r.setProperty('--mute', t.mute);
  r.setProperty('--faint', t.faint);
}
