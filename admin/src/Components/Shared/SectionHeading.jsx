// FILE: admin/src/Components/Shared/SectionHeading.jsx
export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center';
  return (
    <div className={`mb-10 flex flex-col ${alignClass}`}>
      {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand">{eyebrow}</p>}
      <h2 className="font-display text-3xl tracking-wide text-ink">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-ink/60">{subtitle}</p>}
    </div>
  );
}