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
    fetchAll('about').then((data) => setAbout(data[0]));
  }, []);

  if (!about) return null;

  return (
    <div className="min-h-screen bg-surface">
      <SEO title="About Us" path="/about" />
      <Nav />

      <div className="mx-auto max-w-5xl px-6 py-12">
        <Breadcrumb items={[{ label: 'About Us' }]} />

        <SectionHeading align="left" eyebrow="Since 1995" title="About Bangladesh Industrial X-Ray" />
        <p className="text-ink/70">{about.companyHistory}</p>
        <p className="mt-4 text-ink/70">{about.companyOverview}</p>

        {/* CEO Message */}
        <section className="mt-14 grid gap-8 rounded-2xl bg-white p-8 shadow-sm sm:grid-cols-3">
          <img src={about.ceoImage} alt={about.ceoName} className="h-40 w-40 rounded-full object-cover sm:col-span-1" />
          <div className="sm:col-span-2">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand">CEO Message</p>
            <p className="italic text-ink/70">“{about.ceoMessage}”</p>
            <p className="mt-4 font-display text-lg text-ink">{about.ceoName}</p>
            <p className="text-sm text-ink/50">{about.ceoDesignation}</p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mt-14 grid gap-8 sm:grid-cols-2">
          <div className="rounded-xl border border-ink/5 bg-white p-6">
            <h3 className="font-display text-xl text-ink">Mission</h3>
            <p className="mt-2 text-sm text-ink/70">{about.mission}</p>
          </div>
          <div className="rounded-xl border border-ink/5 bg-white p-6">
            <h3 className="font-display text-xl text-ink">Vision</h3>
            <p className="mt-2 text-sm text-ink/70">{about.vision}</p>
          </div>
        </section>

        {/* Company Strength */}
        <section className="mt-14">
          <SectionHeading align="left" eyebrow="Why BIX" title="Company Strength" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {about.strengths.map((s) => (
              <li key={s} className="flex items-start gap-2 rounded-lg border border-ink/5 bg-white p-4 text-sm text-ink/70">
                <span className="mt-0.5 text-brand">✓</span> {s}
              </li>
            ))}
          </ul>
        </section>

        {/* Achievements */}
        <section className="mt-14">
          <SectionHeading align="left" eyebrow="Milestones" title="Achievements" />
          <div className="space-y-4">
            {about.achievements.map((a) => (
              <div key={a.id} className="flex gap-4 rounded-lg border border-ink/5 bg-white p-4">
                <span className="font-display text-2xl text-brand">{a.year}</span>
                <div>
                  <p className="font-medium text-ink">{a.title}</p>
                  <p className="text-sm text-ink/60">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mt-14">
          <SectionHeading align="left" eyebrow="Leadership" title="Team Introduction" />
          <div className="grid gap-6 sm:grid-cols-3">
            {about.team.map((m) => (
              <div key={m.id} className="rounded-xl border border-ink/5 bg-white p-5 text-center">
                <img src={m.photo} alt={m.name} className="mx-auto h-24 w-24 rounded-full object-cover" />
                <p className="mt-3 font-medium text-ink">{m.name}</p>
                <p className="text-sm text-ink/50">{m.designation}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}