// FILE: admin/src/Pages/Admin/Dashboard/Home/HomeContentForm.jsx
import { useEffect, useState } from 'react';
import FormField from '../../../../Components/Shared/FormField';
import { fetchAll, updateItem } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';
import { sanitizeInput } from '../../../../Components/utils/sanitize';
import { isRequired, validateForm, rule } from '../../../../Components/utils/validators';

const SCHEMA = {
  heroTitle: [rule(isRequired, 'Hero title is required.')],
  heroSubtitle: [rule(isRequired, 'Hero subtitle is required.')],
};

export default function HomeContentForm() {
  const [record, setRecord] = useState(null);
  const [values, setValues] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { pushToast } = useToast();

  useEffect(() => {
    fetchAll('homeContent').then((data) => { setRecord(data[0]); setValues(data[0]); });
  }, []);

  function setField(field, value) { setValues((v) => ({ ...v, [field]: value })); }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(values, SCHEMA);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);
    const payload = { ...values, heroTitle: sanitizeInput(values.heroTitle), heroSubtitle: sanitizeInput(values.heroSubtitle) };
    await updateItem('homeContent', record.id, payload);
    pushToast('Home page content updated.', { type: 'success' });
    setSubmitting(false);
  }

  if (!values) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl text-ink">Home Page — Hero Section</h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField label="Badge Text" hint="e.g. ISO/IEC 17025:2017 BAB Accredited">
          <input value={values.heroBadge} onChange={(e) => setField('heroBadge', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <FormField label="Hero Title" required error={errors.heroTitle}>
          <input value={values.heroTitle} onChange={(e) => setField('heroTitle', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <FormField label="Hero Subtitle" required error={errors.heroSubtitle}>
          <textarea rows={3} value={values.heroSubtitle} onChange={(e) => setField('heroSubtitle', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <FormField label="Hero Video Path" hint="/assets/videos/hero-montage.mp4">
          <input value={values.heroVideo} onChange={(e) => setField('heroVideo', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <FormField label="Hero Poster Image Path" hint="ভিডিও লোড হওয়ার আগে দেখানো fallback ছবি">
          <input value={values.heroPoster} onChange={(e) => setField('heroPoster', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <div className="border-t border-ink/10 pt-6">
          <button type="submit" disabled={submitting} className="rounded-md bg-brand px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60">
            {submitting ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}