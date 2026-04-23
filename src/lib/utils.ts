export function fmtDate(iso: string): string {
  return new Date(iso)
    .toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
    .toUpperCase();
}

export function highlight(src: string, _lang: string): string {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let out = esc(src);
  out = out.replace(/(\/\/[^\n]*)/g, '<span style="color:var(--faint)">$1</span>');
  out = out.replace(/(--[^\n]*)/g, '<span style="color:var(--faint)">$1</span>');
  out = out.replace(/("[^"]*")/g, '<span style="color:var(--acc2)">$1</span>');
  out = out.replace(
    /\b(fn|pub|let|mut|if|else|for|in|return|as|const|use|struct|impl|match|auto|SELECT|FROM|LIMIT|WHERE)\b/g,
    '<span style="color:var(--acc)">$1</span>',
  );
  out = out.replace(/\b(\d+)\b/g, '<span style="color:#9a8fe3">$1</span>');
  return out;
}
