// FILE: admin/src/Pages/Projects/ProjectDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import SEO from '../../Components/Shared/SEO';
import Breadcrumb from '../../Components/Shared/Breadcrumb';
import { fetchBySlug } from '../../Components/services/dataStore';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(undefined);

  useEffect(() => {
    let active = true;
    fetchBySlug('projects', slug).then((data) => active && setProject(data));
    return () => { active = false; };
  }, [slug]);

  if (project === undefined) return null;
  if (project === null) return <Navigate to="/404" replace />;

  return (
    <div className="min-h-screen bg-surface">
      <SEO title={project.title} description={project.description} path={`/projects/${project.slug}`} image={project.coverImage} />
      <Nav />

      <section className="relative h-72 overflow-hidden bg-ink">
        <img src={project.coverImage} alt={project.title} className="h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-4xl px-6 pb-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">{project.sector} · {project.year}</p>
            <h1 className="font-display text-3xl">{project.title}</h1>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <Breadcrumb items={[{ label: 'Previous Projects', to: '/projects' }, { label: project.title }]} />

        <table className="mb-8 w-full text-sm">
          <tbody>
            <tr className="border-t border-ink/5"><td className="py-2 pr-4 font-medium text-ink/50">Client</td><td className="py-2 text-ink">{project.client}</td></tr>
            <tr className="border-t border-ink/5"><td className="py-2 pr-4 font-medium text-ink/50">Location</td><td className="py-2 text-ink">{project.location}</td></tr>
            <tr className="border-t border-ink/5"><td className="py-2 pr-4 font-medium text-ink/50">Services Provided</td><td className="py-2 text-ink">{project.servicesProvided.join(', ')}</td></tr>
          </tbody>
        </table>

        <p className="text-ink/70">{project.description}</p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {project.gallery.map((img) => (
            <img key={img} src={img} alt={project.title} loading="lazy" className="aspect-video rounded-lg object-cover" />
          ))}
        </div>

        <Link to="/contact" className="mt-10 inline-block rounded-md bg-brand px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-dark">
          Discuss a Similar Project
        </Link>
      </div>

      <Footer />
    </div>
  );
}