// FILE: admin/src/Pages/Contact/Contact.jsx
import { useEffect, useState } from 'react';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import SEO from '../../Components/Shared/SEO';
import Breadcrumb from '../../Components/Shared/Breadcrumb';
import SectionHeading from '../../Components/Shared/SectionHeading';
import { fetchAll, createItem } from '../../Components/services/dataStore';
import { sanitizeInput } from '../../Components/utils/sanitize';
import { isRequired, isEmail, isPhoneBD, validateForm, rule } from '../../Components/utils/validators';

const SCHEMA = {
  name: [rule(isRequired, 'Name is required.')],
  email: [rule(isRequired, 'Email is required.'), rule(isEmail, 'Enter a valid email.')],
  phone: [rule(isRequired, 'Phone is required.'), rule(isPhoneBD, 'Enter a valid Bangladeshi phone number.')],
  message: [rule(isRequired, 'Message is required.')],
};

const INITIAL = { name: '', email: '', phone: '', company: '', message: '' };

export default function Contact() {
  const [contact, setContact] = useState(null);
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  useEffect(() => {
    fetchAll('contactInfo').then((data) => setContact(data[0]));
  }, []);

  function handleChange(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(values, SCHEMA);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setStatus('submitting');
    const safePayload = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, sanitizeInput(v)])
    );
    await createItem('contactSubmissions', { ...safePayload, submittedAt: new Date().toISOString() });
    setStatus('success');
    setValues(INITIAL);
  }

  return (
    <div className="min-h-screen bg-surface">
      <SEO title="Contact Us" path="/contact" />
      <Nav />

      <div className="mx-auto max-w-5xl px-6 py-12">
        <Breadcrumb items={[{ label: 'Contact' }]} />
        <SectionHeading align="left" eyebrow="Get In Touch" title="Contact Us" subtitle="Have a project or an inspection requirement? Send us a message and our team will get back to you." />

        <div className="grid gap-10 sm:grid-cols-2">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">Full Name</label>
              <input
                id="name"
                value={values.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">Email</label>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">Phone</label>
              <input
                id="phone"
                value={values.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-ink">Company (Optional)</label>
              <input
                id="company"
                value={values.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">Message</label>
              <textarea
                id="message"
                rows={4}
                value={values.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
              {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full rounded-md bg-brand py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60"
            >
              {status === 'submitting' ? 'Sending…' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-sm text-emerald-600" role="status">ধন্যবাদ! আপনার মেসেজ পাঠানো হয়েছে — আমরা শীঘ্রই যোগাযোগ করব।</p>
            )}
          </form>

          {contact && (
            <div className="space-y-6">
              <div className="rounded-xl border border-ink/5 bg-white p-5">
                <h3 className="font-display text-lg text-ink">Head Office</h3>
                <p className="mt-1 text-sm text-ink/60">{contact.headOffice}</p>
              </div>
              <div className="rounded-xl border border-ink/5 bg-white p-5">
                <h3 className="font-display text-lg text-ink">Chattogram Office</h3>
                <p className="mt-1 text-sm text-ink/60">{contact.chattogramOffice}</p>
              </div>
              <div className="rounded-xl border border-ink/5 bg-white p-5">
                <h3 className="font-display text-lg text-ink">Get In Touch</h3>
                <p className="mt-1 text-sm text-ink/60">
                  <a href={`mailto:${contact.email}`} className="hover:text-brand">{contact.email}</a> ·{' '}
                  <a href={`tel:${contact.phone}`} className="hover:text-brand">{contact.phone}</a>
                </p>
              </div>
              {contact.mapEmbedUrl && (
                <iframe
                  title="BIX Location"
                  src={contact.mapEmbedUrl}
                  className="h-64 w-full rounded-xl border border-ink/5"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}