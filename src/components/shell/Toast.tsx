'use client';

interface ToastData {
  id: number;
  title: string;
  body: string;
}

export default function Toast({ toast }: { toast: ToastData | null }) {
  if (!toast) return null;
  return (
    <div
      key={toast.id}
      className="fade-in"
      style={{
        position: 'fixed', bottom: 44, right: 24, zIndex: 70,
        background: '#0e1216', border: '1px solid var(--acc)',
        borderRadius: 4, padding: '10px 14px', maxWidth: 360,
        fontSize: 12, color: 'var(--text)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ color: 'var(--acc)', fontSize: 10, letterSpacing: '0.1em', marginBottom: 4 }}>
        {toast.title}
      </div>
      <div>{toast.body}</div>
    </div>
  );
}
