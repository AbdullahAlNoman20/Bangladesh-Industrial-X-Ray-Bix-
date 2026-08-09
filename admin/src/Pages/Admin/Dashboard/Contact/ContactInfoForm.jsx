// FILE: admin/src/Pages/Admin/Dashboard/Contact/ContactInfoForm.jsx
import { useEffect, useState } from 'react';
import FormField from '../../../../Components/Shared/FormField';
import { fetchAll, updateItem } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';
import { sanitizeInput } from '../../../../Components/utils/sanitize';
import { isRequired, isEmail, validateForm, rule } from '../../../../Components/utils/validators';

const SCHEMA = {
  headOffice: [rule(isRequired, 'Head office address is required.')],
  email: [rule(isRequired, 'Email is required.'), rule(isEmail, 'Enter a valid email.')],
  phone: [rule(isRequired, 'Phone is required.')],
};

export default function ContactInfoForm() {
  const [record, setRecord] = useState(null);
  const [values, setValues] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { pushToast } = useToast();

  useEffect(() => {
    fetchAll('contactInfo').then((data) => { setRecord(data[0]); setValues(data[0]); });
  }, []);

  function setField(field, value) { setValues((v) => ({ ...v, [field]: value })); }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(values, SCHEMA);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);
    const payload = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, typeof v === 'string' ? sanitizeInput(v) : v]));
    await updateItem('contactInfo', record.id, payload);
    pushToast('Contact information updated.', { type: 'success' });
    setSubmitting(false);
  }

  if (!values) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl text-ink">Contact Information</h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField label="Head Office Address" required error={errors.headOffice}>
          <textarea rows={2} value={values.headOffice} onChange={(e) => setField('headOffice', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <FormField label="Registered Office Address">
          <textarea rows={2} value={values.registeredOffice} onChange={(e) => setField('registeredOffice', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <FormField label="Chattogram Office Address">
          <textarea rows={2} value={values.chattogramOffice} onChange={(e) => setField('chattogramOffice', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Primary Email" required error={errors.email}>
            <input type="email" value={values.email} onChange={(e) => setField('email', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>
          <FormField label="Secondary Email">
            <input type="email" value={values.secondaryEmail} onChange={(e) => setField('secondaryEmail', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>
          <FormField label="Primary Phone" required error={errors.phone}>
            <input value={values.phone} onChange={(e) => setField('phone', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>
          <FormField label="Secondary Phone">
            <input value={values.secondaryPhone} onChange={(e) => setField('secondaryPhone', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>
        </div>

        <FormField label="Google Map Embed URL" hint="iframe src URL, e.g. https://www.google.com/maps/embed?...">
          <input value={values.mapEmbedUrl} onChange={(e) => setField('mapEmbedUrl', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
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