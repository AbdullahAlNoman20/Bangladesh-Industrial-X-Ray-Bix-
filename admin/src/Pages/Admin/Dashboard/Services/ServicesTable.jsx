// FILE: admin/src/Pages/Admin/Dashboard/Services/ServicesTable.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CmsTable from '../../../../Components/Shared/CmsTable';
import ConfirmDialog from '../../../../Components/Shared/ConfirmDialog';
import Badge from '../../../../Components/Shared/Badge';
import { fetchAll, deleteItem } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';

const COLUMNS = [
  { key: 'name', label: 'Service Name' },
  { key: 'category', label: 'Category' },
  {
    key: 'featured',
    label: 'Featured',
    render: (row) => <Badge tone={row.featured ? 'brand' : 'neutral'}>{row.featured ? 'Featured' : 'Standard'}</Badge>,
  },
];

export default function ServicesTable() {
  const [services, setServices] = useState([]);
  const [pendingDelete, setPendingDelete] = useState(null);
  const navigate = useNavigate();
  const { pushToast } = useToast();

  async function load() {
    setServices(await fetchAll('services'));
  }

  useEffect(() => { load(); }, []);

  async function handleConfirmDelete() {
    await deleteItem('services', pendingDelete.id);
    pushToast(`"${pendingDelete.name}" deleted.`, { type: 'success' });
    setPendingDelete(null);
    load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Services</h1>
        <Link to="/admin/dashboard/services/new" className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark">
          + Add Service
        </Link>
      </div>

      <CmsTable
        columns={COLUMNS}
        rows={services}
        onPreview={(row) => window.open(`/services/${row.slug}`, '_blank', 'noopener,noreferrer')}
        onEdit={(row) => navigate(`/admin/dashboard/services/${row.id}/edit`)}
        onDelete={(row) => setPendingDelete(row)}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete Service"
        message={`"${pendingDelete?.name}" স্থায়ীভাবে মুছে ফেলা হবে। এই কাজটি ফিরিয়ে নেওয়া যাবে না।`}
        confirmLabel="Delete"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}