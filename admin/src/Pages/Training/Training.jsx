// FILE: admin/src/Pages/Training/Training.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import SEO from '../../Components/Shared/SEO';
import Breadcrumb from '../../Components/Shared/Breadcrumb';
import SectionHeading from '../../Components/Shared/SectionHeading';
import { fetchAll } from '../../Components/services/dataStore';

export default function Training() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchAll('trainings').then(setTrainings);
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <SEO title="Training & Certification" path="/training" />
      <Nav />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <Breadcrumb items={[{ label: 'Training' }]} />
        <SectionHeading align="left" eyebrow="Skill Development" title="Training & Certification Courses" subtitle="ASNT-aligned NDT training programs delivered by certified instructors." />

        <div className="grid gap-6 sm:grid-cols-2">
          {trainings.map((t) => (
            <article key={t.id} className="overflow-hidden rounded-xl border border-ink/5 bg-white shadow-sm">
              <img src={t.image} alt={t.title} loading="lazy" className="aspect-video w-full object-cover" />
              <div className="p-5">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-brand/10 px-2.5 py-0.5 font-medium text-brand">{t.level}</span>
                  <span className="rounded-full bg-ink/5 px-2.5 py-0.5 text-ink/60">{t.duration}</span>
                </div>
                <h3 className="mt-2 font-display text-lg text-ink">{t.title}</h3>
                <p className="mt-2 text-sm text-ink/60">{t.description}</p>
                <ul className="mt-3 space-y-1 text-xs text-ink/50">
                  {t.syllabus.map((s) => <li key={s}>• {s}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-ink/5 bg-white p-6 text-center">
          <p className="text-sm text-ink/60">আগ্রহী? এনরোলমেন্টের জন্য যোগাযোগ করুন —</p>
          <Link to="/contact" className="mt-3 inline-block rounded-md bg-brand px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-dark">
            Enroll Now
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}