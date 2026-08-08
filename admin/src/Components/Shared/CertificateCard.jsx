// FILE: admin/src/Components/Shared/CertificateCard.jsx
export default function CertificateCard({ cert, onViewDetails }) {
  return (
    <button
      type="button"
      onClick={() => onViewDetails?.(cert)}
      className="flex flex-col items-center rounded-xl border border-ink/5 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-lg"
    >
      <img src={cert.image} alt={cert.title} loading="lazy" className="h-32 w-24 rounded object-cover" />
      <p className="mt-3 text-sm font-medium text-ink">{cert.title}</p>
      <span className="mt-1 text-xs text-brand">View Details →</span>
    </button>
  );
}