// FILE: admin/src/Pages/Services/ServicesList.jsx
import { useEffect, useMemo, useState } from 'react';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import SEO from '../../Components/Shared/SEO';
import Breadcrumb from '../../Components/Shared/Breadcrumb';
import SectionHeading from '../../Components/Shared/SectionHeading';
import ServiceCard from '../../Components/Shared/ServiceCard';
import { fetchAll } from '../../Components/services/dataStore';

export default function ServicesList() {
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchAll('services').then(setServices);
  }, []);

  const categories = useMemo(
    () => ['All', ...new Set(services.map((s) => s.category))],
    [services]
  );

  const filtered = activeCategory === 'All' ? services : services.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-surface">
      <SEO title="Services" path="/services" />
      <Nav />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <Breadcrumb items={[{ label: 'Services' }]} />
        <SectionHeading align="left" eyebrow="What We Do" title="Our Services" subtitle="Comprehensive NDT and industrial inspection services across Bangladesh." />

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat ? 'bg-brand text-white' : 'bg-white text-ink/60 hover:bg-ink/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      </div>

      <Footer />
    </div>
  );
}