// FILE: admin/src/Pages/Services/ServiceDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import SEO from '../../Components/Shared/SEO';
import Breadcrumb from '../../Components/Shared/Breadcrumb';
import EquipmentCard from '../../Components/Shared/EquipmentCard';
import { fetchBySlug, fetchAll } from '../../Components/services/dataStore';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(undefined); // undefined = loading, null = not found
  const [relatedEquipment, setRelatedEquipment] = useState([]);

  useEffect(() => {
    let active = true;
    fetchBySlug('services', slug).then(async (found) => {
      if (!active) return;
      setService(found ?? null);
      if (found?.relatedEquipmentIds?.length) {
        const allEquipment = await fetchAll('equipment');
        setRelatedEquipment(allEquipment.filter((e) => found.relatedEquipmentIds.includes(e.id)));
      }
    });
    return () => { active = false; };
  }, [slug]);

  if (service === null) return <Navigate to="/404" replace />;
  if (!service) return null;

  return (
    <div className="min-h-screen bg-surface">
      <SEO title={service.name} description={service.shortDescription} path={`/services/${service.slug}`} image={service.banner} />
      <Nav />

      <section className="relative bg-ink text-white">
        <img src={service.banner} alt={service.name} className="h-64 w-full object-cover opacity-40" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6">
            <p className="text-xs font-medium uppercase tracking-widest text-brand">{service.category}</p>
            <h1 className="mt-2 font-display text-3xl lg:text-4xl">{service.name}</h1>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <Breadcrumb items={[{ label: 'Services', to: '/services' }, { label: service.name }]} />

        <h2 className="font-display text-xl text-ink">Introduction</h2>
        <p className="mt-3 text-ink/70">{service.introduction}</p>

        {service.whyChooseUs?.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-xl text-ink">Why Choose This Service</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {service.whyChooseUs.map((reason) => (
                <li key={reason} className="flex gap-2 text-sm text-ink/70"><span className="text-brand">✓</span>{reason}</li>
              ))}
            </ul>
          </div>
        )}

        {service.workingProcess?.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-xl text-ink">Complete Working Process</h2>
            <ol className="mt-4 space-y-4 border-l-2 border-brand/20 pl-6">
              {service.workingProcess.map((step) => (
                <li key={step.step} className="relative">
                  <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-medium text-white">
                    {step.step}
                  </span>
                  <p className="text-sm font-medium text-ink">{step.title}</p>
                  <p className="text-sm text-ink/60">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {relatedEquipment.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-xl text-ink">Related Equipment</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {relatedEquipment.map((eq) => <EquipmentCard key={eq.id} item={eq} />)}
            </div>
          </div>
        )}

        {service.gallery?.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-xl text-ink">Service Gallery</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {service.gallery.map((img) => (
                <img key={img} src={img} alt={service.name} loading="lazy" className="aspect-square rounded-lg object-cover" />
              ))}
            </div>
          </div>
        )}

        {service.previousWork?.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-xl text-ink">Previous Work</h2>
            <ul className="mt-4 divide-y divide-ink/5 rounded-xl border border-ink/5 bg-white">
              {service.previousWork.map((w) => (
                <li key={w.projectName} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
                  <span className="text-ink">{w.projectName}</span>
                  <span className="text-ink/50">{w.client} · {w.year}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-3 print:hidden">
          <Link to="/contact" className="rounded-md bg-brand px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-dark">
            Contact Us
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-md border border-ink/10 px-6 py-2.5 text-sm font-medium text-ink hover:bg-ink/5"
          >
            Download Service Info (PDF)
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}