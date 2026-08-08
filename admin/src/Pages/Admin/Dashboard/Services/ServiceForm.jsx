// FILE: admin/src/Pages/Admin/Dashboard/Services/ServiceForm.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormField from '../../../../Components/Shared/FormField';
import { fetchOne, createItem, updateItem } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';
import { sanitizeInput } from '../../../../Components/utils/sanitize';
import { isRequired, validateForm, rule } from '../../../../Components/utils/validators';

const EMPTY = {
  slug: '', category: '', name: '', shortDescription: '', image: '',
  featured: false, introduction: '', whyChooseUs: [''], workingProcess: [{ step: 1, title: '', description: '' }],
  relatedEquipmentIds: [], gallery: [''], previousWork: [],
};

const SCHEMA = {
  slug: [rule(isRequired, 'Slug is required.')],
  category: [rule(isRequired, 'Category is required.')],
  name: [rule(isRequired, 'Service name is required.')],
  shortDescription: [rule(isRequired, 'Short description is required.')],
  image: [rule(isRequired, 'Image path is required.')],
  introduction: [rule(isRequired, 'Introduction is required.')],
};

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
}

export default function ServiceForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { pushToast } = useToast();

  useEffect(() => {
    if (isEdit) fetchOne('services', id).then((data) => data && setValues(data));
  }, [id, isEdit]);

  function setField(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function setListItem(field, index, value) {
    setValues((v) => ({ ...v, [field]: v[field].map((item, i) => (i === index ? value : item)) }));
  }
  function addListItem(field, defaultValue = '') {
    setValues((v) => ({ ...v, [field]: [...v[field], defaultValue] }));
  }
  function removeListItem(field, index) {
    setValues((v) => ({ ...v, [field]: v[field].filter((_, i) => i !== index) }));
  }

  function setStep(index, key, value) {
    setValues((v) => ({
      ...v,
      workingProcess: v.workingProcess.map((s, i) => (i === index ? { ...s, [key]: value } : s)),
    }));
  }
  function addStep() {
    setValues((v) => ({ ...v, workingProcess: [...v.workingProcess, { step: v.workingProcess.length + 1, title: '', description: '' }] }));
  }
  function removeStep(index) {
    setValues((v) => ({ ...v, workingProcess: v.workingProcess.filter((_, i) => i !== index).map((s, i) => ({ ...s, step: i + 1 })) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(values, SCHEMA);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);
    const payload = {
      ...values,
      name: sanitizeInput(values.name),
      shortDescription: sanitizeInput(values.shortDescription),
      introduction: sanitizeInput(values.introduction),
      whyChooseUs: values.whyChooseUs.map(sanitizeInput).filter(Boolean),
      gallery: values.gallery.filter(Boolean),
    };

    if (isEdit) {
      await updateItem('services', id, payload);
      pushToast('Service updated.', { type: 'success' });
    } else {
      await createItem('services', payload);
      pushToast('Service created.', { type: 'success' });
    }
    setSubmitting(false);
    navigate('/admin/dashboard/services');
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 font-display text-2xl text-ink">{isEdit ? 'Edit Service' : 'Add Service'}</h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Service Name" required error={errors.name}>
            <input
              value={values.name}
              onChange={(e) => { setField('name', e.target.value); if (!isEdit) setField('slug', slugify(e.target.value)); }}
              className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </FormField>

          <FormField label="Slug" required error={errors.slug} hint="URL-safe identifier, e.g. radiographic-testing">
            <input
              value={values.slug}
              onChange={(e) => setField('slug', slugify(e.target.value))}
              className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </FormField>

          <FormField label="Category" required error={errors.category}>
            <input
              value={values.category}
              onChange={(e) => setField('category', e.target.value)}
              className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </FormField>

          <FormField label="Card Image Path" required error={errors.image} hint="/assets/images/services/your-image.jpg">
            <input
              value={values.image}
              onChange={(e) => setField('image', e.target.value)}
              className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </FormField>
        </div>

        <FormField label="Short Description" required error={errors.shortDescription}>
          <textarea
            rows={2}
            value={values.shortDescription}
            onChange={(e) => setField('shortDescription', e.target.value)}
            className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </FormField>

        <FormField label="Introduction (Detail Page)" required error={errors.introduction}>
          <textarea
            rows={4}
            value={values.introduction}
            onChange={(e) => setField('introduction', e.target.value)}
            className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </FormField>

        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" checked={values.featured} onChange={(e) => setField('featured', e.target.checked)} className="h-4 w-4 accent-brand" />
          Show in "Featured" section on the Home page
        </label>

        {/* Why Choose Us — dynamic list */}
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Why Choose Us</p>
          <div className="space-y-2">
            {values.whyChooseUs.map((item, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={item}
                  onChange={(e) => setListItem('whyChooseUs', i, e.target.value)}
                  className="flex-1 rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
                <button type="button" onClick={() => removeListItem('whyChooseUs', i)} className="rounded-md px-3 text-sm text-red-600 hover:bg-red-50">✕</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addListItem('whyChooseUs')} className="mt-2 text-sm text-brand hover:underline">+ Add Point</button>
        </div>

        {/* Working Process — dynamic steps */}
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Complete Working Process</p>
          <div className="space-y-3">
            {values.workingProcess.map((step, i) => (
              <div key={i} className="rounded-lg border border-ink/10 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand">Step {step.step}</span>
                  <button type="button" onClick={() => removeStep(i)} className="text-xs text-red-600 hover:underline">Remove</button>
                </div>
                <input
                  placeholder="Step title"
                  value={step.title}
                  onChange={(e) => setStep(i, 'title', e.target.value)}
                  className="mb-2 w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
                <textarea
                  placeholder="Step description"
                  rows={2}
                  value={step.description}
                  onChange={(e) => setStep(i, 'description', e.target.value)}
                  className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
            ))}
          </div>
          <button type="button" onClick={addStep} className="mt-2 text-sm text-brand hover:underline">+ Add Step</button>
        </div>

        {/* Gallery — dynamic image paths */}
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Gallery Image Paths</p>
          <div className="space-y-2">
            {values.gallery.map((img, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={img}
                  onChange={(e) => setListItem('gallery', i, e.target.value)}
                  placeholder="/assets/images/services/example.jpg"
                  className="flex-1 rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
                <button type="button" onClick={() => removeListItem('gallery', i)} className="rounded-md px-3 text-sm text-red-600 hover:bg-red-50">✕</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addListItem('gallery')} className="mt-2 text-sm text-brand hover:underline">+ Add Image</button>
        </div>

        <div className="flex gap-3 border-t border-ink/10 pt-6">
          <button type="submit" disabled={submitting} className="rounded-md bg-brand px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60">
            {submitting ? 'Saving…' : isEdit ? 'Update Service' : 'Publish Service'}
          </button>
          <button type="button" onClick={() => navigate('/admin/dashboard/services')} className="rounded-md border border-ink/10 px-6 py-2.5 text-sm font-medium text-ink hover:bg-ink/5">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}