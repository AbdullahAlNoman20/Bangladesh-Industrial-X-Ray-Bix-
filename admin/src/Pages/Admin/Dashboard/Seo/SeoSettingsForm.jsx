// FILE: admin/src/Pages/Admin/Dashboard/Seo/SeoSettingsForm.jsx
import { useEffect, useState } from 'react';
import FormField from '../../../../Components/Shared/FormField';
import { fetchAll, updateItem } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';
import { sanitizeInput } from '../../../../Components/utils/sanitize';
import { isRequired, validateForm, rule } from '../../../../Components/utils/validators';

const SCHEMA = {
  defaultTitle: [rule(isRequired, 'Default title is required.')],
  description: [rule(isRequired, 'Meta description is required.')],
};

export default function SeoSettingsForm() {
  const [record, setRecord] = useState(null);
  const [values, setValues] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { pushToast } = useToast();

  useEffect(() => {
    fetchAll('seoSettings').then((data) => { setRecord(data[0]); setValues(data[0]); });
  }, []);

  function setField(field, value) { setValues((v) => ({ ...v, [field]: value })); }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(values, SCHEMA);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);
    const payload = { ...values, defaultTitle: sanitizeInput(values.defaultTitle), description: sanitizeInput(values.description) };
    await updateItem('seoSettings', record.id, payload);
    pushToast('SEO settings updated.', { type: 'success' });
    setSubmitting(false);
  }

  if (!values) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl text-ink">SEO Settings</h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField label="Default Site Title" required error={errors.defaultTitle}>
          <input value={values.defaultTitle} onChange={(e) => setField('defaultTitle', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <FormField label="Meta Description" required error={errors.description} hint="Recommended: under 160 characters.">
          <textarea rows={3} value={values.description} onChange={(e) => setField('description', e.target.value)} maxLength={200} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          <p className="mt-1 text-right text-xs text-ink/40">{values.description?.length ?? 0}/200</p>
        </FormField>

        <FormField label="Keywords" hint="Comma-separated">
          <input value={values.keywords} onChange={(e) => setField('keywords', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <FormField label="Default Open Graph Image Path" hint="/assets/images/hero/og-default.jpg">
          <input value={values.ogImage} onChange={(e) => setField('ogImage', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
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