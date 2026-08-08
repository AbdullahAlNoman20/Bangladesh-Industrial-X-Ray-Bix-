// FILE: admin/src/Components/layout/AdminTopbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AdminTopbar({ onMenuClick }) {
  const { admin, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-ink/5 bg-white px-4 py-3 lg:px-6">
      <button type="button" onClick={onMenuClick} className="rounded-md p-2 text-ink/70 hover:bg-ink/5 lg:hidden" aria-label="Open menu">☰</button>
      <div className="flex items-center gap-4">
        <Link to="/" target="_blank" rel="noopener noreferrer" className="text-xs text-ink/50 hover:text-brand">↗ View Live Site</Link>
        <div className="flex items-center gap-2 border-l border-ink/10 pl-4">
          <span className="text-sm font-medium text-ink">{admin?.name}</span>
          <button type="button" onClick={logout} className="rounded-md px-2 py-1 text-xs text-ink/50 hover:bg-ink/5" title="Logout">⎋ Logout</button>
        </div>
      </div>
    </header>
  );
}