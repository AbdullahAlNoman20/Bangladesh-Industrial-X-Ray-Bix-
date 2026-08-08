// FILE: admin/src/Pages/Testimonials/Testimonials.jsx
import { useEffect, useState } from 'react';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import SEO from '../../Components/Shared/SEO';
import Breadcrumb from '../../Components/Shared/Breadcrumb';
import SectionHeading from '../../Components/Shared/SectionHeading';
import TestimonialCard from '../../Components/Shared/TestimonialCard';
import { fetchAll } from '../../Components/services/dataStore';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchAll('testimonials').then(setTestimonials);
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <SEO title="Testimonials" path="/testimonials" />
      <Nav />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <Breadcrumb items={[{ label: 'Testimonials' }]} />
        <SectionHeading align="left" eyebrow="Client Voices" title="What Our Clients Say" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => <TestimonialCard key={t.id} testimonial={t} />)}
        </div>
      </div>

      <Footer />
    </div>
  );
}