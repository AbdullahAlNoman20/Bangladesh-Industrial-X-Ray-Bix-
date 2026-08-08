// FILE: admin/src/Pages/Gallery/GalleryCategory.jsx
import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
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

export default function GalleryCategory() {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [preview, setPreview] = useState(null);

  const matchedCategory = GALLERY_CATEGORIES.find((c) => slugifyCategory(c) === category);

  useEffect(() => {
    if (!matchedCategory) return;
    fetchAll('galleryItems').then((all) => setItems(all.filter((i) => i.category === matchedCategory)));
  }, [matchedCategory]);

  if (!matchedCategory) return <Navigate to="/404" replace />;

  return (
    <div className="min-h-screen bg-surface">
      <SEO title={matchedCategory} path={`/gallery/${category}`} />
      <Nav />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <Breadcrumb items={[{ label: 'Gallery', to: '/gallery' }, { label: matchedCategory }]} />
        <SectionHeading align="left" eyebrow="Gallery" title={matchedCategory} />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPreview(item)}
              className="group relative aspect-square overflow-hidden rounded-lg bg-ink/5"
            >
              <img src={item.thumbnail} alt={item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              {item.type === 'video' && (
                <span className="absolute inset-0 flex items-center justify-center bg-ink/30 text-2xl text-white">▶</span>
              )}
            </button>
          ))}
          {items.length === 0 && <p className="col-span-full text-sm text-ink/40">No items in this category yet.</p>}
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