// FILE: admin/src/Pages/Admin/Dashboard/Training/TrainingTable.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CmsTable from '../../../../Components/Shared/CmsTable';
import ConfirmDialog from '../../../../Components/Shared/ConfirmDialog';
import { fetchAll, deleteItem } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';

const COLUMNS = [
  { key: 'title', label: 'Course' },
  { key: 'level', label: 'Level' },
  { key: 'duration', label: 'Duration' },
];

export default function TrainingTable() {
  const [trainings, setTrainings] = useState([]);
  const [pendingDelete, setPendingDelete] = useState(null);
  const navigate = useNavigate();
  const { pushToast } = useToast();

  async function load() { setTrainings(await fetchAll('trainings')); }
  useEffect(() => { load(); }, []);

  async function handleConfirmDelete() {
    await deleteItem('trainings', pendingDelete.id);
    pushToast(`"${pendingDelete.title}" deleted.`, { type: 'success' });
    setPendingDelete(null);
    load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Training Courses</h1>
        <Link to="/admin/dashboard/training/new" className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark">
          + Add Course
        </Link>
      </div>

      <CmsTable columns={COLUMNS} rows={trainings} onEdit={(row) => navigate(`/admin/dashboard/training/${row.id}/edit`)} onDelete={(row) => setPendingDelete(row)} />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete Course"
        message={`"${pendingDelete?.title}" মুছে ফেলা হবে।`}
        confirmLabel="Delete"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}