// FILE: admin/src/Pages/Home/Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import SEO from '../../Components/Shared/SEO';
import SectionHeading from '../../Components/Shared/SectionHeading';
import ServiceCard from '../../Components/Shared/ServiceCard';
import EquipmentCard from '../../Components/Shared/EquipmentCard';
import CertificateCard from '../../Components/Shared/CertificateCard';
import TestimonialCard from '../../Components/Shared/TestimonialCard';
import PartnerLogo from '../../Components/Shared/PartnerLogo';
import FaqAccordion from '../../Components/Shared/FaqAccordion';
import { fetchAll } from '../../Components/services/dataStore';
import heroImg from '../../assets/hero.png';

export default function Home() {
  const [services, setServices] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [partners, setPartners] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetchAll('services').then(setServices);
    fetchAll('equipment').then(setEquipment);
    fetchAll('certifications').then(setCertifications);
    fetchAll('testimonials').then(setTestimonials);
    fetchAll('partners').then(setPartners);
    fetchAll('faqs').then(setFaqs);
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      <SEO title="Home" path="/" />
      <Nav />

      {/* 2.2 Hero Banner */}
      <section className="relative overflow-hidden bg-ink text-white">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroImg}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        >
          <source src="/assets/videos/hero-montage.mp4" type="video/mp4" />
        </video>
        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
          <p className="mb-3 inline-block rounded-full bg-caution/20 px-3 py-1 text-xs font-medium text-caution">
            ISO/IEC 17025:2017 BAB Accredited
          </p>
          <h1 className="font-display text-4xl leading-tight tracking-wide lg:text-6xl">
            Bangladesh Industrial X-Ray
          </h1>
          <p className="mt-4 text-white/70">
            Trusted NDT & Industrial Inspection partner since 1995 — Radiography, Ultrasonic, PAUT,
            PMI, Lifting Equipment and Rope Access services across Bangladesh.
          </p>
          <Link to="/contact" className="mt-8 inline-block rounded-md bg-brand px-6 py-3 text-sm font-medium hover:bg-brand-dark">
            Get a Quote
          </Link>
        </div>
      </section>

      {/* 2.3 Services Section */}
      <section id="services" className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="What We Do" title="Our Services" subtitle="Comprehensive NDT and industrial inspection services delivered by ASNT-certified professionals." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
        <div className="mt-10 text-center">
          <Link to="/services" className="rounded-md border border-brand px-6 py-2.5 text-sm font-medium text-brand hover:bg-brand hover:text-white">
            View All Services
          </Link>
        </div>
      </section>

      {/* 2.4 Equipment Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Our Fleet" title="Major Inspection Equipment" />
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {equipment.slice(0, 8).map((eq) => <EquipmentCard key={eq.id} item={eq} />)}
          </div>
          <div className="mt-10 text-center">
            <Link to="/equipment" className="rounded-md border border-brand px-6 py-2.5 text-sm font-medium text-brand hover:bg-brand hover:text-white">
              View All Equipment
            </Link>
          </div>
        </div>
      </section>

      {/* 2.5 Certification Section */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="Accreditation" title="Certifications & Licences" />
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {certifications.map((c) => <CertificateCard key={c.id} cert={c} />)}
        </div>
        <div className="mt-10 text-center">
          <Link to="/certifications" className="rounded-md border border-brand px-6 py-2.5 text-sm font-medium text-brand hover:bg-brand hover:text-white">
            View Details
          </Link>
        </div>
      </section>

      {/* 2.6 Mission & Vision */}
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand">Mission</p>
            <h3 className="font-display text-2xl">Our Mission</h3>
            <p className="mt-3 text-white/60">
              To meet customer's satisfaction by rendering services maintaining all requisite safety,
              norms & standards utilizing technology-driven skilled resources to ensure QA & QC of
              industrial products through world-class NDT and allied methods.
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand">Vision</p>
            <h3 className="font-display text-2xl">Our Vision</h3>
            <p className="mt-3 text-white/60">
              To become leaders in the specialized field of Non-destructive Testing, Material Testing
              and related quality services, ensuring safe working environments through innovation and
              state-of-the-art technology.
            </p>
          </div>
        </div>
      </section>

      {/* 2.7 Testimonials */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading eyebrow="Client Voices" title="Testimonials" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((t) => <TestimonialCard key={t.id} testimonial={t} />)}
        </div>
        <div className="mt-10 text-center">
          <Link to="/testimonials" className="text-sm font-medium text-brand hover:underline">
            Read More Reviews →
          </Link>
        </div>
      </section>

      {/* 2.8 Happy Clients */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Trusted By" title="Our Happy Clients" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((p) => <PartnerLogo key={p.id} partner={p} />)}
          </div>
        </div>
      </section>

      {/* 2.9 FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <SectionHeading eyebrow="Have Questions?" title="Frequently Asked Questions" />
        <FaqAccordion items={faqs} />
      </section>

      <Footer />
    </div>
  );
}