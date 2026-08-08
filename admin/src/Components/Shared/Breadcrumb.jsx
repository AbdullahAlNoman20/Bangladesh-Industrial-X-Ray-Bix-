// FILE: admin/src/Components/Shared/Breadcrumb.jsx
import { Link } from 'react-router-dom';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink/50">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link to="/" className="hover:text-brand">Home</Link></li>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <span>/</span>
            {item.to && i < items.length - 1 ? (
              <Link to={item.to} className="hover:text-brand">{item.label}</Link>
            ) : (
              <span className="text-ink">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}