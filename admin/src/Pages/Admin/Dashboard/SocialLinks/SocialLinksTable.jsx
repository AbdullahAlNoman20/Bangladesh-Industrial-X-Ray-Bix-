// FILE: admin/src/Pages/Admin/Dashboard/SocialLinks/SocialLinksTable.jsx
import { useEffect, useState } from 'react';
import CmsTable from '../../../../Components/Shared/CmsTable';
import ConfirmDialog from '../../../../Components/Shared/ConfirmDialog';
import FormField from '../../../../Components/Shared/FormField';
import { fetchAll, createItem, updateItem, deleteItem } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';
import { isRequired, validateForm, rule } from '../../../../Components/utils/validators';

const SCHEMA = {
  platform: [rule(isRequired, 'Platform name is required.')],
  url: [rule(isRequired, 'URL is required.')],
};
const EMPTY = { platform: '', url: '' };
const COLUMNS = [
  { key: 'platform', label: 'Platform' },
  { key: 'url', label: 'URL' },
];

export default function SocialLinksTable() {
  const [links, setLinks] = useState([]);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...} = edit
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [pendingDelete, setPendingDelete] = useState(null);
  const { pushToast } = useToast();

  async function load() { setLinks(await fetchAll('socialLinks')); }
  useEffect(() => { load(); }, []);

  function openNew() { setValues(EMPTY); setErrors({}); setEditing({}); }
  function openEdit(row) { setValues(row); setErrors({}); setEditing(row); }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(values, SCHEMA);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    if (editing.id) {
      await updateItem('socialLinks', editing.id, values);
      pushToast('Social link updated.', { type: 'success' });
    } else {
      await createItem('socialLinks', values);
      pushToast('Social link added.', { type: 'success' });
    }
    setEditing(null);
    load();
  }

  async function handleConfirmDelete() {
    await deleteItem('socialLinks', pendingDelete.id);
    pushToast('Social link deleted.', { type: 'success' });
    setPendingDelete(null);
    load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Social Media Links</h1>
        <button type="button" onClick={openNew} className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark">
          + Add Link
        </button>
      </div>

      <CmsTable columns={COLUMNS} rows={links} onEdit={openEdit} onDelete={(row) => setPendingDelete(row)} />

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 font-display text-lg text-ink">{editing.id ? 'Edit Link' : 'Add Link'}</h2>

            <div className="space-y-4">
              <FormField label="Platform" required error={errors.platform}>
                <input value={values.platform} onChange={(e) => setValues((v) => ({ ...v, platform: e.target.value }))} placeholder="facebook / linkedin / youtube / whatsapp" className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
              </FormField>
              <FormField label="URL" required error={errors.url}>
                <input value={values.url} onChange={(e) => setValues((v) => ({ ...v, url: e.target.value }))} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
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
        title="Delete Social Link"
        message={`"${pendingDelete?.platform}" লিংকটি মুছে ফেলা হবে।`}
        confirmLabel="Delete"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}