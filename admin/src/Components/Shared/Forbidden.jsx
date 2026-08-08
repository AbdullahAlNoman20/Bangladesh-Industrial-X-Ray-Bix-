// FILE: admin/src/Components/Shared/Forbidden.jsx
import { Link } from 'react-router-dom';
export default function Forbidden() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface px-6 text-center">
      <p className="font-display text-7xl text-brand">403</p>
      <h1 className="text-xl font-semibold text-ink">অ্যাক্সেস নিষিদ্ধ</h1>
      <Link to="/" className="rounded-md bg-brand px-5 py-2 text-sm font-medium text-white hover:bg-brand-dark">হোমপেজে ফিরে যান</Link>
    </div>
  );
}