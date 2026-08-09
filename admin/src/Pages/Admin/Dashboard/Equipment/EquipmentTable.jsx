// FILE: admin/src/Pages/Admin/Dashboard/Equipment/EquipmentTable.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CmsTable from '../../../../Components/Shared/CmsTable';
import ConfirmDialog from '../../../../Components/Shared/ConfirmDialog';
import { fetchAll, deleteItem } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';

const COLUMNS = [
  { key: 'name', label: 'Equipment Name' },
  { key: 'category', label: 'Category' },
  { key: 'manufacturer', label: 'Manufacturer' },
  { key: 'quantity', label: 'Quantity' },
];

export default function EquipmentTable() {
  const [equipment, setEquipment] = useState([]);
  const [pendingDelete, setPendingDelete] = useState(null);
  const navigate = useNavigate();
  const { pushToast } = useToast();

  async function load() {
    setEquipment(await fetchAll('equipment'));
  }

  useEffect(() => { load(); }, []);

  async function handleConfirmDelete() {
    await deleteItem('equipment', pendingDelete.id);
    pushToast(`"${pendingDelete.name}" deleted.`, { type: 'success' });
    setPendingDelete(null);
    load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Equipment</h1>
        <Link to="/admin/dashboard/equipment/new" className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark">
          + Add Equipment
        </Link>
      </div>

      <CmsTable
        columns={COLUMNS}
        rows={equipment}
        onPreview={(row) => window.open(`/equipment/${row.slug}`, '_blank', 'noopener,noreferrer')}
        onEdit={(row) => navigate(`/admin/dashboard/equipment/${row.id}/edit`)}
        onDelete={(row) => setPendingDelete(row)}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete Equipment"
        message={`"${pendingDelete?.name}" স্থায়ীভাবে মুছে ফেলা হবে। এই কাজটি ফিরিয়ে নেওয়া যাবে না।`}
        confirmLabel="Delete"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}