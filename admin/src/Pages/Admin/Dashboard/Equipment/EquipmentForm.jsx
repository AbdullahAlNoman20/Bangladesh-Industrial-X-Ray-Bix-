// FILE: admin/src/Pages/Admin/Dashboard/Equipment/EquipmentForm.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormField from '../../../../Components/Shared/FormField';
import { fetchOne, createItem, updateItem } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';
import { sanitizeInput } from '../../../../Components/utils/sanitize';
import { isRequired, validateForm, rule } from '../../../../Components/utils/validators';

const EMPTY = {
  slug: '', category: '', name: '', shortDescription: '', image: '',
  manufacturer: '', modelNo: '', quantity: '', gallery: [''],
  specifications: [{ label: '', value: '' }], relatedServiceSlugs: [],
};

const SCHEMA = {
  slug: [rule(isRequired, 'Slug is required.')],
  category: [rule(isRequired, 'Category is required.')],
  name: [rule(isRequired, 'Equipment name is required.')],
  image: [rule(isRequired, 'Image path is required.')],
};

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
}

export default function EquipmentForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { pushToast } = useToast();

  useEffect(() => {
    if (isEdit) fetchOne('equipment', id).then((data) => data && setValues(data));
  }, [id, isEdit]);

  function setField(field, value) { setValues((v) => ({ ...v, [field]: value })); }
  function setListItem(field, index, value) { setValues((v) => ({ ...v, [field]: v[field].map((it, i) => (i === index ? value : it)) })); }
  function addListItem(field, defaultValue = '') { setValues((v) => ({ ...v, [field]: [...v[field], defaultValue] })); }
  function removeListItem(field, index) { setValues((v) => ({ ...v, [field]: v[field].filter((_, i) => i !== index) })); }

  function setSpec(index, key, value) {
    setValues((v) => ({ ...v, specifications: v.specifications.map((s, i) => (i === index ? { ...s, [key]: value } : s)) }));
  }
  function addSpec() { setValues((v) => ({ ...v, specifications: [...v.specifications, { label: '', value: '' }] })); }
  function removeSpec(index) { setValues((v) => ({ ...v, specifications: v.specifications.filter((_, i) => i !== index) })); }

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
      manufacturer: sanitizeInput(values.manufacturer),
      gallery: values.gallery.filter(Boolean),
      specifications: values.specifications.filter((s) => s.label && s.value),
    };

    if (isEdit) {
      await updateItem('equipment', id, payload);
      pushToast('Equipment updated.', { type: 'success' });
    } else {
      await createItem('equipment', payload);
      pushToast('Equipment created.', { type: 'success' });
    }
    setSubmitting(false);
    navigate('/admin/dashboard/equipment');
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 font-display text-2xl text-ink">{isEdit ? 'Edit Equipment' : 'Add Equipment'}</h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Equipment Name" required error={errors.name}>
            <input
              value={values.name}
              onChange={(e) => { setField('name', e.target.value); if (!isEdit) setField('slug', slugify(e.target.value)); }}
              className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </FormField>

          <FormField label="Slug" required error={errors.slug}>
            <input value={values.slug} onChange={(e) => setField('slug', slugify(e.target.value))} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>

          <FormField label="Category" required error={errors.category}>
            <input value={values.category} onChange={(e) => setField('category', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>

          <FormField label="Manufacturer">
            <input value={values.manufacturer} onChange={(e) => setField('manufacturer', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>

          <FormField label="Model No.">
            <input value={values.modelNo} onChange={(e) => setField('modelNo', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>

          <FormField label="Quantity">
            <input value={values.quantity} onChange={(e) => setField('quantity', e.target.value)} placeholder="e.g. 05 Sets" className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>

          <FormField label="Card Image Path" required error={errors.image} hint="/assets/images/equipment/your-image.jpg">
            <input value={values.image} onChange={(e) => setField('image', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>
        </div>

        <FormField label="Short Description">
          <textarea rows={2} value={values.shortDescription} onChange={(e) => setField('shortDescription', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        {/* Specifications */}
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Specifications</p>
          <div className="space-y-2">
            {values.specifications.map((spec, i) => (
              <div key={i} className="flex gap-2">
                <input placeholder="Label" value={spec.label} onChange={(e) => setSpec(i, 'label', e.target.value)} className="w-1/3 rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                <input placeholder="Value" value={spec.value} onChange={(e) => setSpec(i, 'value', e.target.value)} className="flex-1 rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                <button type="button" onClick={() => removeSpec(i)} className="rounded-md px-3 text-sm text-red-600 hover:bg-red-50">✕</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addSpec} className="mt-2 text-sm text-brand hover:underline">+ Add Spec</button>
        </div>

        {/* Gallery */}
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
            {submitting ? 'Saving…' : isEdit ? 'Update Equipment' : 'Publish Equipment'}
          </button>
          <button type="button" onClick={() => navigate('/admin/dashboard/equipment')} className="rounded-md border border-ink/10 px-6 py-2.5 text-sm font-medium text-ink hover:bg-ink/5">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}