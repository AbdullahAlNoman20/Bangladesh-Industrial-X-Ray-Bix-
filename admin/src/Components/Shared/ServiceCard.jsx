// FILE: admin/src/Components/Shared/ServiceCard.jsx
import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-ink/5 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="aspect-[4/3] overflow-hidden bg-ink/5">
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-brand">{service.category}</p>
        <h3 className="mt-1 font-display text-lg text-ink">{service.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink/60">{service.shortDescription}</p>
        <Link to={`/services/${service.slug}`} className="mt-4 inline-block text-sm font-medium text-brand hover:underline">
          Learn More →
        </Link>
      </div>
    </article>
  );
}