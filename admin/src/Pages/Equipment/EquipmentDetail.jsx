// FILE: admin/src/Pages/Equipment/EquipmentDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import SEO from '../../Components/Shared/SEO';
import Breadcrumb from '../../Components/Shared/Breadcrumb';
import { fetchAll, fetchBySlug } from '../../Components/services/dataStore';

export default function EquipmentDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(undefined);
  const [relatedServices, setRelatedServices] = useState([]);

  useEffect(() => {
    let active = true;
    fetchBySlug('equipment', slug).then((data) => active && setItem(data));
    return () => { active = false; };
  }, [slug]);

  useEffect(() => {
    if (item?.relatedServiceSlugs?.length) {
      fetchAll('services').then((all) =>
        setRelatedServices(all.filter((s) => item.relatedServiceSlugs.includes(s.slug)))
      );
    }
  }, [item]);

  if (item === undefined) return null;
  if (item === null) return <Navigate to="/404" replace />;

  return (
    <div className="min-h-screen bg-surface">
      <SEO title={item.name} description={item.shortDescription} path={`/equipment/${item.slug}`} image={item.image} />
      <Nav />

      <div className="mx-auto max-w-4xl px-6 py-12">
        <Breadcrumb items={[{ label: 'Equipment', to: '/equipment' }, { label: item.name }]} />

        <div className="grid gap-8 sm:grid-cols-2">
          <img src={item.image} alt={item.name} className="aspect-square w-full rounded-xl border border-ink/5 bg-white object-contain p-6" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">{item.category}</p>
            <h1 className="mt-1 font-display text-2xl text-ink">{item.name}</h1>
            <p className="mt-3 text-ink/70">{item.shortDescription}</p>

            <table className="mt-6 w-full text-sm">
              <tbody>
                {item.specifications.map((spec) => (
                  <tr key={spec.label} className="border-t border-ink/5">
                    <td className="py-2 pr-4 font-medium text-ink/50">{spec.label}</td>
                    <td className="py-2 text-ink">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Link to="/contact" className="mt-6 inline-block rounded-md bg-brand px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-dark">
              Request This Service
            </Link>
          </div>
        </div>

        {item.gallery.length > 1 && (
          <section className="mt-10">
            <h2 className="font-display text-xl text-ink">Gallery</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {item.gallery.map((img) => (
                <img key={img} src={img} alt={item.name} loading="lazy" className="aspect-video rounded-lg object-cover" />
              ))}
            </div>
          </section>
        )}

        {relatedServices.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl text-ink">Used In These Services</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {relatedServices.map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.slug}`} className="rounded-full border border-brand px-4 py-1.5 text-sm text-brand hover:bg-brand hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}