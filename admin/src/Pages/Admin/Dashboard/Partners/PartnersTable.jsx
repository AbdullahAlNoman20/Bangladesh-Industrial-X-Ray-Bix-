// FILE: admin/src/Pages/Admin/Dashboard/Partners/PartnersTable.jsx
import { useEffect, useState } from 'react';
import CmsTable from '../../../../Components/Shared/CmsTable';
import ConfirmDialog from '../../../../Components/Shared/ConfirmDialog';
import FormField from '../../../../Components/Shared/FormField';
import { fetchAll, createItem, updateItem, deleteItem } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';
import { isRequired, validateForm, rule } from '../../../../Components/utils/validators';

const EMPTY = { name: '', logo: '', shortDescription: '', partnershipDetails: '' };
const SCHEMA = {
  name: [rule(isRequired, 'Partner name is required.')],
  logo: [rule(isRequired, 'Logo path is required.')],
};
const COLUMNS = [
  { key: 'logo', label: 'Logo', render: (row) => <img src={row.logo} alt={row.name} className="h-8 w-auto object-contain" /> },
  { key: 'name', label: 'Name' },
];

export default function PartnersTable() {
  const [partners, setPartners] = useState([]);
  const [editing, setEditing] = useState(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [pendingDelete, setPendingDelete] = useState(null);
  const { pushToast } = useToast();

  async function load() { setPartners(await fetchAll('partners')); }
  useEffect(() => { load(); }, []);

  function openNew() { setValues(EMPTY); setErrors({}); setEditing({}); }
  function openEdit(row) { setValues(row); setErrors({}); setEditing(row); }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(values, SCHEMA);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    if (editing.id) {
      await updateItem('partners', editing.id, values);
      pushToast('Partner updated.', { type: 'success' });
    } else {
      await createItem('partners', values);
      pushToast('Partner added.', { type: 'success' });
    }
    setEditing(null);
    load();
  }

  async function handleConfirmDelete() {
    await deleteItem('partners', pendingDelete.id);
    pushToast('Partner deleted.', { type: 'success' });
    setPendingDelete(null);
    load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Partners</h1>
        <button type="button" onClick={openNew} className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark">
          + Add Partner
        </button>
      </div>

      <CmsTable columns={COLUMNS} rows={partners} onEdit={openEdit} onDelete={(row) => setPendingDelete(row)} />

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 font-display text-lg text-ink">{editing.id ? 'Edit Partner' : 'Add Partner'}</h2>
            <div className="space-y-4">
              <FormField label="Name" required error={errors.name}>
                <input value={values.name} onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
              </FormField>
              <FormField label="Logo Path" required error={errors.logo} hint="/assets/images/customers/your-logo.png">
                <input value={values.logo} onChange={(e) => setValues((v) => ({ ...v, logo: e.target.value }))} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
              </FormField>
              <FormField label="Short Description">
                <textarea rows={2} value={values.shortDescription} onChange={(e) => setValues((v) => ({ ...v, shortDescription: e.target.value }))} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
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
        title="Delete Partner"
        message={`"${pendingDelete?.name}" মুছে ফেলা হবে।`}
        confirmLabel="Delete"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}