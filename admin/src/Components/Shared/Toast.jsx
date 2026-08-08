// FILE: admin/src/Components/Shared/Toast.jsx
import { useToast } from '../hooks/useToast';

const TONE_CLASS = {
  info: 'bg-ink text-white',
  success: 'bg-emerald-600 text-white',
  warning: 'bg-amber-500 text-white',
  error: 'bg-red-600 text-white',
};

export default function Toast() {
  const { toasts, removeToast } = useToast();
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex w-80 flex-col gap-2">
      {toasts.map((t) => (
        <div key={t.id} className={`flex items-start justify-between gap-3 rounded-lg px-4 py-3 shadow-lg ${TONE_CLASS[t.type] ?? TONE_CLASS.info}`} role="alert">
          <p className="text-sm">{t.message}</p>
          <button type="button" onClick={() => removeToast(t.id)} className="text-white/70 hover:text-white" aria-label="Dismiss">✕</button>
        </div>
      ))}
    </div>
  );
}