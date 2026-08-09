// FILE: admin/src/Pages/Admin/Dashboard/Projects/ProjectForm.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormField from '../../../../Components/Shared/FormField';
import { fetchOne, createItem, updateItem } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';
import { sanitizeInput } from '../../../../Components/utils/sanitize';
import { isRequired, validateForm, rule } from '../../../../Components/utils/validators';

const EMPTY = {
  slug: '', title: '', client: '', sector: '', year: '', location: '',
  servicesProvided: [''], description: '', coverImage: '', gallery: [''],
};
const SCHEMA = {
  slug: [rule(isRequired, 'Slug is required.')],
  title: [rule(isRequired, 'Title is required.')],
  client: [rule(isRequired, 'Client is required.')],
  description: [rule(isRequired, 'Description is required.')],
  coverImage: [rule(isRequired, 'Cover image path is required.')],
};

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
}

export default function ProjectForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { pushToast } = useToast();

  useEffect(() => {
    if (isEdit) fetchOne('projects', id).then((data) => data && setValues(data));
  }, [id, isEdit]);

  function setField(field, value) { setValues((v) => ({ ...v, [field]: value })); }
  function setListItem(field, index, value) { setValues((v) => ({ ...v, [field]: v[field].map((it, i) => (i === index ? value : it)) })); }
  function addListItem(field) { setValues((v) => ({ ...v, [field]: [...v[field], ''] })); }
  function removeListItem(field, index) { setValues((v) => ({ ...v, [field]: v[field].filter((_, i) => i !== index) })); }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(values, SCHEMA);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);
    const payload = {
      ...values,
      title: sanitizeInput(values.title),
      client: sanitizeInput(values.client),
      description: sanitizeInput(values.description),
      servicesProvided: values.servicesProvided.map(sanitizeInput).filter(Boolean),
      gallery: values.gallery.filter(Boolean),
    };

    if (isEdit) {
      await updateItem('projects', id, payload);
      pushToast('Project updated.', { type: 'success' });
    } else {
      await createItem('projects', payload);
      pushToast('Project created.', { type: 'success' });
    }
    setSubmitting(false);
    navigate('/admin/dashboard/projects');
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 font-display text-2xl text-ink">{isEdit ? 'Edit Project' : 'Add Project'}</h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Title" required error={errors.title}>
            <input value={values.title} onChange={(e) => { setField('title', e.target.value); if (!isEdit) setField('slug', slugify(e.target.value)); }} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>

          <FormField label="Slug" required error={errors.slug}>
            <input value={values.slug} onChange={(e) => setField('slug', slugify(e.target.value))} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>

          <FormField label="Client" required error={errors.client}>
            <input value={values.client} onChange={(e) => setField('client', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>

          <FormField label="Sector">
            <input value={values.sector} onChange={(e) => setField('sector', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>

          <FormField label="Year">
            <input value={values.year} onChange={(e) => setField('year', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>

          <FormField label="Location">
            <input value={values.location} onChange={(e) => setField('location', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>
        </div>

        <FormField label="Cover Image Path" required error={errors.coverImage}>
          <input value={values.coverImage} onChange={(e) => setField('coverImage', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <FormField label="Description" required error={errors.description}>
          <textarea rows={4} value={values.description} onChange={(e) => setField('description', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <div>
          <p className="mb-2 text-sm font-medium text-ink">Services Provided</p>
          <div className="space-y-2">
            {values.servicesProvided.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input value={s} onChange={(e) => setListItem('servicesProvided', i, e.target.value)} className="flex-1 rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                <button type="button" onClick={() => removeListItem('servicesProvided', i)} className="rounded-md px-3 text-sm text-red-600 hover:bg-red-50">✕</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addListItem('servicesProvided')} className="mt-2 text-sm text-brand hover:underline">+ Add Service</button>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-ink">Gallery Image Paths</p>
          <div className="space-y-2">
            {values.gallery.map((img, i) => (
              <div key={i} className="flex gap-2">
                <input value={img} onChange={(e) => setListItem('gallery', i, e.target.value)} className="flex-1 rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                <button type="button" onClick={() => removeListItem('gallery', i)} className="rounded-md px-3 text-sm text-red-600 hover:bg-red-50">✕</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addListItem('gallery')} className="mt-2 text-sm text-brand hover:underline">+ Add Image</button>
        </div>

        <div className="flex gap-3 border-t border-ink/10 pt-6">
          <button type="submit" disabled={submitting} className="rounded-md bg-brand px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60">
            {submitting ? 'Saving…' : isEdit ? 'Update Project' : 'Publish Project'}
          </button>
          <button type="button" onClick={() => navigate('/admin/dashboard/projects')} className="rounded-md border border-ink/10 px-6 py-2.5 text-sm font-medium text-ink hover:bg-ink/5">Cancel</button>
        </div>
      </form>
    </div>
  );
}