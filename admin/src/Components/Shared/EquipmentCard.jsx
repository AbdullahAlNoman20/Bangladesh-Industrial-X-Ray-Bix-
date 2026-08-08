// FILE: admin/src/Components/Shared/EquipmentCard.jsx
import { Link } from 'react-router-dom';

export default function EquipmentCard({ item }) {
  return (
    <article className="overflow-hidden rounded-xl border border-ink/5 bg-white shadow-sm">
      <div className="aspect-square overflow-hidden bg-ink/5">
        <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-contain p-4" />
      </div>
      <div className="border-t border-ink/5 p-4">
        <h3 className="font-display text-base text-ink">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-ink/60">{item.shortDescription}</p>
        <Link to={`/equipment/${item.slug}`} className="mt-3 inline-block text-xs font-medium text-brand hover:underline">
          View Details →
        </Link>
      </div>
    </article>
  );
}