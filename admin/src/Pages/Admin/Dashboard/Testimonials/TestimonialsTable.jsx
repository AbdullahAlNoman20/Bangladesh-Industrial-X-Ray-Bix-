// FILE: admin/src/Pages/Admin/Dashboard/Testimonials/TestimonialsTable.jsx
import { useEffect, useState } from 'react';
import CmsTable from '../../../../Components/Shared/CmsTable';
import ConfirmDialog from '../../../../Components/Shared/ConfirmDialog';
import FormField from '../../../../Components/Shared/FormField';
import { fetchAll, createItem, updateItem, deleteItem } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';
import { isRequired, validateForm, rule } from '../../../../Components/utils/validators';

const EMPTY = { clientName: '', designation: '', feedback: '', rating: 5, clientPhoto: '', video: '' };
const SCHEMA = {
  clientName: [rule(isRequired, 'Client name is required.')],
  feedback: [rule(isRequired, 'Feedback is required.')],
};
const COLUMNS = [
  { key: 'clientName', label: 'Client' },
  { key: 'designation', label: 'Designation' },
  { key: 'rating', label: 'Rating', render: (row) => '★'.repeat(row.rating) },
];

export default function TestimonialsTable() {
  const [testimonials, setTestimonials] = useState([]);
  const [editing, setEditing] = useState(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [pendingDelete, setPendingDelete] = useState(null);
  const { pushToast } = useToast();

  async function load() { setTestimonials(await fetchAll('testimonials')); }
  useEffect(() => { load(); }, []);

  function openNew() { setValues(EMPTY); setErrors({}); setEditing({}); }
  function openEdit(row) { setValues(row); setErrors({}); setEditing(row); }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(values, SCHEMA);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    const payload = { ...values, rating: Number(values.rating) };
    if (editing.id) {
      await updateItem('testimonials', editing.id, payload);
      pushToast('Testimonial updated.', { type: 'success' });
    } else {
      await createItem('testimonials', payload);
      pushToast('Testimonial added.', { type: 'success' });
    }
    setEditing(null);
    load();
  }

  async function handleConfirmDelete() {
    await deleteItem('testimonials', pendingDelete.id);
    pushToast('Testimonial deleted.', { type: 'success' });
    setPendingDelete(null);
    load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Testimonials</h1>
        <button type="button" onClick={openNew} className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark">
          + Add Testimonial
        </button>
      </div>

      <CmsTable columns={COLUMNS} rows={testimonials} onEdit={openEdit} onDelete={(row) => setPendingDelete(row)} />

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 font-display text-lg text-ink">{editing.id ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
            <div className="space-y-4">
              <FormField label="Client Name" required error={errors.clientName}>
                <input value={values.clientName} onChange={(e) => setValues((v) => ({ ...v, clientName: e.target.value }))} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
              </FormField>
              <FormField label="Designation">
                <input value={values.designation} onChange={(e) => setValues((v) => ({ ...v, designation: e.target.value }))} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
              </FormField>
              <FormField label="Feedback" required error={errors.feedback}>
                <textarea rows={3} value={values.feedback} onChange={(e) => setValues((v) => ({ ...v, feedback: e.target.value }))} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
              </FormField>
              <FormField label="Rating (1–5)">
                <select value={values.rating} onChange={(e) => setValues((v) => ({ ...v, rating: e.target.value }))} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm">
                  {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </FormField>
              <FormField label="Client Photo Path (Optional)">
                <input value={values.clientPhoto} onChange={(e) => setValues((v) => ({ ...v, clientPhoto: e.target.value }))} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
              </FormField>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setEditing(null)} className="rounded-md px-4 py-2 text-sm text-ink/70 hover:bg-ink/5">Cancel</button>
              <button type="submit" className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark">Save</button>
            </div>
          </form>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete Testimonial"
        message={`"${pendingDelete?.clientName}"-এর টেস্টিমোনিয়াল মুছে ফেলা হবে।`}
        confirmLabel="Delete"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}