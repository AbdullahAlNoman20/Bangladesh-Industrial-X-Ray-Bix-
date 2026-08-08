// FILE: admin/src/Pages/About/About.jsx
import { useEffect, useState } from 'react';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import SEO from '../../Components/Shared/SEO';
import Breadcrumb from '../../Components/Shared/Breadcrumb';
import SectionHeading from '../../Components/Shared/SectionHeading';
import { fetchAll } from '../../Components/services/dataStore';

export default function About() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    fetchAll('aboutInfo').then((data) => setAbout(data[0]));
  }, []);

  if (!about) return null;

  return (
    <div className="min-h-screen bg-surface">
      <SEO title="About Us" path="/about" />
      <Nav />

      <div className="mx-auto max-w-5xl px-6 py-12">
        <Breadcrumb items={[{ label: 'About Us' }]} />

        <SectionHeading eyebrow="Since 1995" title="About Bangladesh Industrial X-Ray" align="left" />
        <p className="text-ink/70">{about.companyHistory}</p>
        <p className="mt-4 text-ink/70">{about.companyOverview}</p>

        <div className="mt-14 flex flex-col items-center gap-8 rounded-2xl bg-white p-8 shadow-sm lg:flex-row">
          <img src={about.ceoImage} alt={about.ceoName} className="h-40 w-40 rounded-full object-cover" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">CEO Message</p>
            <p className="mt-2 text-ink/70">“{about.ceoMessage}”</p>
            <p className="mt-4 text-sm font-medium text-ink">{about.ceoName}</p>
            <p className="text-xs text-ink/50">{about.ceoDesignation}</p>
          </div>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="font-display text-lg text-ink">Mission</h3>
            <p className="mt-2 text-sm text-ink/70">{about.mission}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="font-display text-lg text-ink">Vision</h3>
            <p className="mt-2 text-sm text-ink/70">{about.vision}</p>
          </div>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 font-display text-lg text-ink">Company Strength</h3>
            <ul className="space-y-2 text-sm text-ink/70">
              {about.strengths.map((s) => (
                <li key={s} className="flex gap-2"><span className="text-brand">●</span>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-display text-lg text-ink">Achievements</h3>
            <ul className="space-y-2 text-sm text-ink/70">
              {about.achievements.map((a) => (
                <li key={a} className="flex gap-2"><span className="text-brand">●</span>{a}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 rounded-2xl bg-ink p-8 text-white">
          <h3 className="font-display text-lg">Our Team</h3>
          <p className="mt-2 text-sm text-white/70">{about.teamIntro}</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}