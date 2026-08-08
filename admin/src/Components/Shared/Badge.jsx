// FILE: admin/src/Components/Shared/Badge.jsx
const TONES = {
  neutral: 'bg-ink/5 text-ink',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-red-700',
  info: 'bg-sky-50 text-sky-700',
  brand: 'bg-brand/10 text-brand',
};

export default function Badge({ children, tone = 'neutral', className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${TONES[tone] ?? TONES.neutral} ${className}`}>
      {children}
    </span>
  );
}