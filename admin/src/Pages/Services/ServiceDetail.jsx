// FILE: admin/src/Pages/Services/ServiceDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import SEO from '../../Components/Shared/SEO';
import Breadcrumb from '../../Components/Shared/Breadcrumb';
import EquipmentCard from '../../Components/Shared/EquipmentCard';
import { fetchAll, fetchBySlug } from '../../Components/services/dataStore';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(undefined); // undefined = loading, null = not found
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    let active = true;
    fetchBySlug('services', slug).then((data) => active && setService(data));
    return () => { active = false; };
  }, [slug]);

  useEffect(() => {
    if (service?.relatedEquipmentIds?.length) {
      fetchAll('equipment').then((all) =>
        setEquipment(all.filter((e) => service.relatedEquipmentIds.includes(e.id)))
      );
    }
  }, [service]);

  if (service === undefined) return null;
  if (service === null) return <Navigate to="/404" replace />;

  return (
    <div className="min-h-screen bg-surface">
      <SEO title={service.name} description={service.shortDescription} path={`/services/${service.slug}`} image={service.image} />
      <Nav />

      {/* Service Banner */}
      <section className="relative h-72 overflow-hidden bg-ink">
        <img src={service.image} alt={service.name} className="h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-5xl px-6 pb-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">{service.category}</p>
            <h1 className="font-display text-3xl">{service.name}</h1>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-12 print:max-w-full">
        <Breadcrumb items={[{ label: 'Services', to: '/services' }, { label: service.name }]} />

        {/* Introduction */}
        <section>
          <h2 className="font-display text-xl text-ink">Introduction</h2>
          <p className="mt-2 text-ink/70">{service.introduction}</p>
        </section>

        {/* Why Choose This Service */}
        <section className="mt-10">
          <h2 className="font-display text-xl text-ink">Why Choose This Service</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {service.whyChooseUs.map((w) => (
              <li key={w} className="flex items-start gap-2 rounded-lg border border-ink/5 bg-white p-3 text-sm text-ink/70">
                <span className="text-brand">✓</span> {w}
              </li>
            ))}
          </ul>
        </section>

        {/* Working Process / Roadmap */}
        <section className="mt-10">
          <h2 className="font-display text-xl text-ink">Complete Working Process</h2>
          <ol className="mt-4 space-y-4 border-l-2 border-brand/20 pl-6">
            {service.workingProcess.map((p) => (
              <li key={p.step} className="relative">
                <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
                  {p.step}
                </span>
                <p className="font-medium text-ink">{p.title}</p>
                <p className="text-sm text-ink/60">{p.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Related Equipment */}
        {equipment.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl text-ink">Related Equipment</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {equipment.map((eq) => <EquipmentCard key={eq.id} item={eq} />)}
            </div>
          </section>
        )}

        {/* Gallery */}
        <section className="mt-10">
          <h2 className="font-display text-xl text-ink">Service Gallery</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {service.gallery.map((img) => (
              <img key={img} src={img} alt={service.name} loading="lazy" className="aspect-video rounded-lg object-cover" />
            ))}
          </div>
        </section>

        {/* Previous Work */}
        {service.previousWork.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl text-ink">Previous Work</h2>
            <ul className="mt-3 divide-y divide-ink/5 rounded-lg border border-ink/5 bg-white">
              {service.previousWork.map((w) => (
                <li key={w.project} className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-ink">{w.project}</span>
                  <span className="text-ink/50">{w.client}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Actions */}
        <div className="mt-12 flex flex-wrap gap-3 print:hidden">
          <Link to="/contact" className="rounded-md bg-brand px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-dark">
            Contact Us
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-md border border-ink/10 px-6 py-2.5 text-sm font-medium text-ink hover:bg-ink/5"
          >
            ⬇ Download Full Service Info (PDF)
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}