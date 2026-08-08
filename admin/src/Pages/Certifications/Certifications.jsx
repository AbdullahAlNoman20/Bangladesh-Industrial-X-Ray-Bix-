// FILE: admin/src/Pages/Certifications/Certifications.jsx
import { useEffect, useState } from 'react';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import SEO from '../../Components/Shared/SEO';
import Breadcrumb from '../../Components/Shared/Breadcrumb';
import SectionHeading from '../../Components/Shared/SectionHeading';
import Modal from '../../Components/Shared/Modal';
import { fetchAll } from '../../Components/services/dataStore';

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchAll('certifications').then(setCertifications);
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <SEO title="Certifications" path="/certifications" />
      <Nav />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <Breadcrumb items={[{ label: 'Certifications' }]} />
        <SectionHeading align="left" eyebrow="Accreditation" title="Certifications & Licences" subtitle="BIX is ISO/IEC 17025:2017 BAB accredited and licensed by BAERA for industrial radiography." />

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {certifications.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected(c)}
              className="flex flex-col items-center rounded-xl border border-ink/5 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-lg"
            >
              <img src={c.image} alt={c.title} loading="lazy" className="h-36 w-28 rounded object-cover" />
              <p className="mt-3 text-sm font-medium text-ink">{c.title}</p>
              <span className="mt-1 text-xs text-brand">View Details →</span>
            </button>
          ))}
        </div>
      </div>

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={selected?.title} size="md">
        {selected && (
          <div className="space-y-3 text-sm">
            <img src={selected.image} alt={selected.title} className="mx-auto h-72 w-52 rounded object-cover" />
            <p className="text-ink/70">{selected.description}</p>
            <p><span className="text-ink/50">Issued By:</span> {selected.issuedBy}</p>
            <p><span className="text-ink/50">Certificate No.:</span> {selected.certificateNo}</p>
            <p><span className="text-ink/50">Issue Date:</span> {formatDate(selected.issueDate)}</p>
            <p><span className="text-ink/50">Expiry Date:</span> {formatDate(selected.expiryDate)}</p>
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
}