// FILE: admin/src/Pages/Equipment/EquipmentList.jsx
import { useEffect, useMemo, useState } from 'react';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import SEO from '../../Components/Shared/SEO';
import Breadcrumb from '../../Components/Shared/Breadcrumb';
import SectionHeading from '../../Components/Shared/SectionHeading';
import EquipmentCard from '../../Components/Shared/EquipmentCard';
import { fetchAll } from '../../Components/services/dataStore';

export default function EquipmentList() {
  const [equipment, setEquipment] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetchAll('equipment').then(setEquipment);
  }, []);

  const categories = useMemo(() => ['All', ...new Set(equipment.map((e) => e.category))], [equipment]);
  const filtered = activeCategory === 'All' ? equipment : equipment.filter((e) => e.category === activeCategory);

  return (
    <div className="min-h-screen bg-surface">
      <SEO title="Equipment" path="/equipment" />
      <Nav />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <Breadcrumb items={[{ label: 'Equipment' }]} />
        <SectionHeading align="left" eyebrow="Our Fleet" title="Major Inspection Equipment" subtitle="Modern, calibrated NDT equipment operated by certified technicians." />

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

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((eq) => <EquipmentCard key={eq.id} item={eq} />)}
        </div>
      </div>

      <Footer />
    </div>
  );
}