// FILE: admin/src/Pages/Gallery/Gallery.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import SEO from '../../Components/Shared/SEO';
import Breadcrumb from '../../Components/Shared/Breadcrumb';
import SectionHeading from '../../Components/Shared/SectionHeading';
import Modal from '../../Components/Shared/Modal';
import { fetchAll, GALLERY_CATEGORIES } from '../../Components/services/dataStore';

function slugifyCategory(cat) {
  return cat.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
}

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchAll('galleryItems').then(setItems);
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <SEO title="Gallery" path="/gallery" />
      <Nav />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <Breadcrumb items={[{ label: 'Gallery' }]} />
        <SectionHeading align="left" eyebrow="Our Work" title="Photo & Video Gallery" subtitle="A glimpse into our field operations, equipment and milestones." />

        <div className="mb-8 flex flex-wrap gap-2">
          {GALLERY_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/gallery/${slugifyCategory(cat)}`}
              className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-ink/60 hover:bg-brand hover:text-white"
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPreview(item)}
              className="group relative aspect-square overflow-hidden rounded-lg bg-ink/5"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {item.type === 'video' && (
                <span className="absolute inset-0 flex items-center justify-center bg-ink/30 text-2xl text-white">▶</span>
              )}
              <span className="absolute inset-x-0 bottom-0 bg-ink/60 px-2 py-1 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Modal open={Boolean(preview)} onClose={() => setPreview(null)} title={preview?.title} size="lg">
        {preview?.type === 'video' ? (
          <video src={preview.src} controls className="w-full rounded-lg" />
        ) : (
          <img src={preview?.src} alt={preview?.title} className="w-full rounded-lg" />
        )}
      </Modal>

      <Footer />
    </div>
  );
}