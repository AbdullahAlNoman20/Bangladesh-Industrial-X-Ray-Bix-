// FILE: admin/src/Pages/Partners/Partners.jsx
import { useEffect, useState } from 'react';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import SEO from '../../Components/Shared/SEO';
import Breadcrumb from '../../Components/Shared/Breadcrumb';
import SectionHeading from '../../Components/Shared/SectionHeading';
import PartnerLogo from '../../Components/Shared/PartnerLogo';
import { fetchAll } from '../../Components/services/dataStore';

export default function Partners() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetchAll('partners').then(setPartners);
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <SEO title="Partners" path="/partners" />
      <Nav />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <Breadcrumb items={[{ label: 'Partners' }]} />
        <SectionHeading align="left" eyebrow="Trusted By" title="Our Partners & Clients" subtitle="Leading energy, power, marine and industrial companies across Bangladesh trust BIX for their NDT requirements." />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {partners.map((p) => <PartnerLogo key={p.id} partner={p} />)}
        </div>
      </div>

      <Footer />
    </div>
  );
}