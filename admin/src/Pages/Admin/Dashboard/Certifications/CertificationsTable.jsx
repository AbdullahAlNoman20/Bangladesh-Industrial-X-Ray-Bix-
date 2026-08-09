// FILE: admin/src/Pages/Admin/Dashboard/Certifications/CertificationsTable.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CmsTable from '../../../../Components/Shared/CmsTable';
import ConfirmDialog from '../../../../Components/Shared/ConfirmDialog';
import Badge from '../../../../Components/Shared/Badge';
import { fetchAll, deleteItem } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';

function daysUntil(dateStr) {
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
}

const COLUMNS = [
  { key: 'title', label: 'Certificate' },
  { key: 'issuedBy', label: 'Issued By' },
  { key: 'expiryDate', label: 'Expiry' },
  {
    key: 'status',
    label: 'Status',
    render: (row) => {
      const d = daysUntil(row.expiryDate);
      const tone = d < 0 ? 'danger' : d < 90 ? 'warning' : 'success';
      const label = d < 0 ? 'Expired' : d < 90 ? `Expiring in ${d}d` : 'Valid';
      return <Badge tone={tone}>{label}</Badge>;
    },
  },
];

export default function CertificationsTable() {
  const [certs, setCerts] = useState([]);
  const [pendingDelete, setPendingDelete] = useState(null);
  const navigate = useNavigate();
  const { pushToast } = useToast();

  async function load() { setCerts(await fetchAll('certifications')); }
  useEffect(() => { load(); }, []);

  async function handleConfirmDelete() {
    await deleteItem('certifications', pendingDelete.id);
    pushToast(`"${pendingDelete.title}" deleted.`, { type: 'success' });
    setPendingDelete(null);
    load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Certifications</h1>
        <Link to="/admin/dashboard/certifications/new" className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark">
          + Add Certificate
        </Link>
      </div>

      <CmsTable
        columns={COLUMNS}
        rows={certs}
        onEdit={(row) => navigate(`/admin/dashboard/certifications/${row.id}/edit`)}
        onDelete={(row) => setPendingDelete(row)}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete Certificate"
        message={`"${pendingDelete?.title}" স্থায়ীভাবে মুছে ফেলা হবে।`}
        confirmLabel="Delete"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}