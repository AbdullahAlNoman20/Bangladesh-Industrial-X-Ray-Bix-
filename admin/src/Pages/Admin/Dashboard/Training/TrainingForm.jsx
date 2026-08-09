// FILE: admin/src/Pages/Admin/Dashboard/Training/TrainingForm.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormField from '../../../../Components/Shared/FormField';
import { fetchOne, createItem, updateItem } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';
import { sanitizeInput } from '../../../../Components/utils/sanitize';
import { isRequired, validateForm, rule } from '../../../../Components/utils/validators';

const EMPTY = { title: '', duration: '', level: '', description: '', image: '', syllabus: [''] };
const SCHEMA = {
  title: [rule(isRequired, 'Title is required.')],
  duration: [rule(isRequired, 'Duration is required.')],
  level: [rule(isRequired, 'Level is required.')],
  description: [rule(isRequired, 'Description is required.')],
  image: [rule(isRequired, 'Image path is required.')],
};

export default function TrainingForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { pushToast } = useToast();

  useEffect(() => {
    if (isEdit) fetchOne('trainings', id).then((data) => data && setValues(data));
  }, [id, isEdit]);

  function setField(field, value) { setValues((v) => ({ ...v, [field]: value })); }
  function setListItem(index, value) { setValues((v) => ({ ...v, syllabus: v.syllabus.map((it, i) => (i === index ? value : it)) })); }
  function addListItem() { setValues((v) => ({ ...v, syllabus: [...v.syllabus, ''] })); }
  function removeListItem(index) { setValues((v) => ({ ...v, syllabus: v.syllabus.filter((_, i) => i !== index) })); }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(values, SCHEMA);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);
    const payload = {
      ...values,
      title: sanitizeInput(values.title),
      description: sanitizeInput(values.description),
      syllabus: values.syllabus.map(sanitizeInput).filter(Boolean),
    };

    if (isEdit) {
      await updateItem('trainings', id, payload);
      pushToast('Course updated.', { type: 'success' });
    } else {
      await createItem('trainings', payload);
      pushToast('Course created.', { type: 'success' });
    }
    setSubmitting(false);
    navigate('/admin/dashboard/training');
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl text-ink">{isEdit ? 'Edit Course' : 'Add Course'}</h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField label="Title" required error={errors.title}>
          <input value={values.title} onChange={(e) => setField('title', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Level" required error={errors.level}>
            <input value={values.level} onChange={(e) => setField('level', e.target.value)} placeholder="Level I & II" className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>
          <FormField label="Duration" required error={errors.duration}>
            <input value={values.duration} onChange={(e) => setField('duration', e.target.value)} placeholder="2 Weeks" className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>
        </div>

        <FormField label="Cover Image Path" required error={errors.image}>
          <input value={values.image} onChange={(e) => setField('image', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <FormField label="Description" required error={errors.description}>
          <textarea rows={3} value={values.description} onChange={(e) => setField('description', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <div>
          <p className="mb-2 text-sm font-medium text-ink">Syllabus Points</p>
          <div className="space-y-2">
            {values.syllabus.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input value={s} onChange={(e) => setListItem(i, e.target.value)} className="flex-1 rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                <button type="button" onClick={() => removeListItem(i)} className="rounded-md px-3 text-sm text-red-600 hover:bg-red-50">✕</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addListItem} className="mt-2 text-sm text-brand hover:underline">+ Add Point</button>
        </div>

        <div className="flex gap-3 border-t border-ink/10 pt-6">
          <button type="submit" disabled={submitting} className="rounded-md bg-brand px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60">
            {submitting ? 'Saving…' : isEdit ? 'Update Course' : 'Publish Course'}
          </button>
          <button type="button" onClick={() => navigate('/admin/dashboard/training')} className="rounded-md border border-ink/10 px-6 py-2.5 text-sm font-medium text-ink hover:bg-ink/5">Cancel</button>
        </div>
      </form>
    </div>
  );
}