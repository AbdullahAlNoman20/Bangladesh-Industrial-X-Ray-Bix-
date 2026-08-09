// FILE: admin/src/Pages/Admin/Dashboard/Projects/ProjectsTable.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CmsTable from '../../../../Components/Shared/CmsTable';
import ConfirmDialog from '../../../../Components/Shared/ConfirmDialog';
import { fetchAll, deleteItem } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';

const COLUMNS = [
  { key: 'title', label: 'Project' },
  { key: 'client', label: 'Client' },
  { key: 'sector', label: 'Sector' },
  { key: 'year', label: 'Year' },
];

export default function ProjectsTable() {
  const [projects, setProjects] = useState([]);
  const [pendingDelete, setPendingDelete] = useState(null);
  const navigate = useNavigate();
  const { pushToast } = useToast();

  async function load() { setProjects(await fetchAll('projects')); }
  useEffect(() => { load(); }, []);

  async function handleConfirmDelete() {
    await deleteItem('projects', pendingDelete.id);
    pushToast(`"${pendingDelete.title}" deleted.`, { type: 'success' });
    setPendingDelete(null);
    load();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Previous Projects</h1>
        <Link to="/admin/dashboard/projects/new" className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark">
          + Add Project
        </Link>
      </div>

      <CmsTable
        columns={COLUMNS}
        rows={projects}
        onPreview={(row) => window.open(`/projects/${row.slug}`, '_blank', 'noopener,noreferrer')}
        onEdit={(row) => navigate(`/admin/dashboard/projects/${row.id}/edit`)}
        onDelete={(row) => setPendingDelete(row)}
      />

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete Project"
        message={`"${pendingDelete?.title}" স্থায়ীভাবে মুছে ফেলা হবে।`}
        confirmLabel="Delete"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}