// FILE: admin/src/Pages/Admin/Dashboard/DashboardHome.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAll } from '../../../Components/services/dataStore';

const CARDS = [
  { resource: 'services', label: 'Services', to: '/admin/dashboard/services', icon: '🛠️' },
  { resource: 'equipment', label: 'Equipment', to: '/admin/dashboard/equipment', icon: '📦' },
  { resource: 'certifications', label: 'Certifications', to: '/admin/dashboard/certifications', icon: '📜' },
  { resource: 'galleryItems', label: 'Gallery Items', to: '/admin/dashboard/gallery', icon: '🖼️' },
  { resource: 'projects', label: 'Previous Projects', to: '/admin/dashboard/projects', icon: '🏗️' },
  { resource: 'testimonials', label: 'Testimonials', to: '/admin/dashboard/testimonials', icon: '💬' },
  { resource: 'contactSubmissions', label: 'Contact Submissions', to: '/admin/dashboard/contact', icon: '📥' },
];

export default function DashboardHome() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    CARDS.forEach((c) => {
      fetchAll(c.resource).then((data) => setCounts((prev) => ({ ...prev, [c.resource]: data.length })));
    });
  }, []);

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl text-ink">Dashboard Overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c) => (
          <Link key={c.resource} to={c.to} className="flex items-center gap-4 rounded-xl border border-ink/5 bg-white p-4 shadow-sm hover:shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-xl">{c.icon}</div>
            <div>
              <p className="text-xs uppercase tracking-wide text-ink/50">{c.label}</p>
              <p className="font-display text-2xl text-ink">{counts[c.resource] ?? '—'}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}