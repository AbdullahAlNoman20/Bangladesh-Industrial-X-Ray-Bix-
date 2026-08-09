// FILE: admin/src/Pages/Admin/Dashboard/Gallery/GalleryTable.jsx
import { useEffect, useState } from 'react';
import CmsTable from '../../../../Components/Shared/CmsTable';
import ConfirmDialog from '../../../../Components/Shared/ConfirmDialog';
import Badge from '../../../../Components/Shared/Badge';
import FormField from '../../../../Components/Shared/FormField';
import { fetchAll, createItem, updateItem, deleteItem, GALLERY_CATEGORIES } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';
import { isRequired, validateForm, rule } from '../../../../Components/utils/validators';

const EMPTY = { category: GALLERY_CATEGORIES[0], title: '', type: 'image', src: '', thumbnail: '' };
const SCHEMA = {
  title: [rule(isRequired, 'Title is required.')],
  src: [rule(isRequired, 'File path is required.')],
};
const COLUMNS = [
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'type', label: 'Type', render: (row) => <Badge tone={row.type === 'video' ? 'info' : 'neutral'}>{row.type}</Badge> },
];

export default function GalleryTable() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [pendingDelete, setPendingDelete] = useState(null);
  const { pushToast } = useToast();

  async function load() { setItems(await fetchAll('galleryItems')); }
  useEffect(() => { load(); }, []);

  function openNew() { setValues(EMPTY); setErrors({}); setEditing({}); }
  function openEdit(row) { setValues(row); setErrors({}); setEditing(row); }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(values, SCHEMA);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    const payload = { ...values, thumbnail: values.thumbnail || values.src };
    if (editing.id) {
      await updateItem('galleryItems', editing.id, payload);
      pushToast('Gallery item updated.', { type: 'success' });
    } else {
      await createItem('galleryItems', payload);
      pushToast('Gallery item added.', { type: 'success' });
    }
    setEditing(null);
    load();
  }

  async function handleConfirmDelete() {
    await deleteItem('galleryItems', pendingDelete.id);
    pushToast('Gallery item deleted.', { type: 'success' });
    setPendingDelete(null);
    load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Gallery</h1>
        <button type="button" onClick={openNew} className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark">
          + Add Item
        </button>
      </div>

      <CmsTable
        columns={COLUMNS}
        rows={items}
        onPreview={(row) => window.open(row.src, '_blank', 'noopener,noreferrer')}
        onEdit={openEdit}
        onDelete={(row) => setPendingDelete(row)}
      />

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 font-display text-lg text-ink">{editing.id ? 'Edit Item' : 'Add Item'}</h2>

            <div className="space-y-4">
              <FormField label="Title" required error={errors.title}>
                <input value={values.title} onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
              </FormField>

              <FormField label="Category">
                <select value={values.category} onChange={(e) => setValues((v) => ({ ...v, category: e.target.value }))} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm">
                  {GALLERY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </FormField>

              <FormField label="Type">
                <select value={values.type} onChange={(e) => setValues((v) => ({ ...v, type: e.target.value }))} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm">
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </FormField>

              <FormField label="File Path" required error={errors.src} hint="/assets/images/... or /assets/videos/...">
                <input value={values.src} onChange={(e) => setValues((v) => ({ ...v, src: e.target.value }))} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
              </FormField>

              <FormField label="Thumbnail Path" hint="ভিডিওর জন্য থাম্বনেইল আলাদা দিন; খালি রাখলে src ব্যবহার হবে।">
                <input value={values.thumbnail} onChange={(e) => setValues((v) => ({ ...v, thumbnail: e.target.value }))} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
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
        title="Delete Gallery Item"
        message={`"${pendingDelete?.title}" মুছে ফেলা হবে।`}
        confirmLabel="Delete"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}