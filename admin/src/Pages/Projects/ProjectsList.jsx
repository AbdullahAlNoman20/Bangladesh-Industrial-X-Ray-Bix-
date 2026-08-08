// FILE: admin/src/Pages/Projects/ProjectsList.jsx
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import SEO from '../../Components/Shared/SEO';
import Breadcrumb from '../../Components/Shared/Breadcrumb';
import SectionHeading from '../../Components/Shared/SectionHeading';
import { fetchAll } from '../../Components/services/dataStore';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [activeSector, setActiveSector] = useState('All');

  useEffect(() => {
    fetchAll('projects').then(setProjects);
  }, []);

  const sectors = useMemo(() => ['All', ...new Set(projects.map((p) => p.sector))], [projects]);
  const filtered = activeSector === 'All' ? projects : projects.filter((p) => p.sector === activeSector);

  return (
    <div className="min-h-screen bg-surface">
      <SEO title="Previous Projects" path="/projects" />
      <Nav />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <Breadcrumb items={[{ label: 'Previous Projects' }]} />
        <SectionHeading align="left" eyebrow="Portfolio" title="Previous Projects" subtitle="Selected NDT projects delivered across Bangladesh's energy, power and marine sectors." />

        <div className="mb-8 flex flex-wrap gap-2">
          {sectors.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setActiveSector(s)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeSector === s ? 'bg-brand text-white' : 'bg-white text-ink/60 hover:bg-ink/5'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.id} className="overflow-hidden rounded-xl border border-ink/5 bg-white shadow-sm">
              <img src={p.coverImage} alt={p.title} loading="lazy" className="aspect-video w-full object-cover" />
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-brand">{p.sector} · {p.year}</p>
                <h3 className="mt-1 font-display text-lg text-ink">{p.title}</h3>
                <p className="mt-1 text-sm text-ink/50">{p.client}</p>
                <Link to={`/projects/${p.slug}`} className="mt-3 inline-block text-sm font-medium text-brand hover:underline">
                  View Case Study →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}