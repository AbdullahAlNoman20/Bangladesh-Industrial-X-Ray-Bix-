// FILE: admin/src/Pages/Admin/Dashboard/Contact/ContactSubmissions.jsx
import { useEffect, useState } from 'react';
import CmsTable from '../../../../Components/Shared/CmsTable';
import ConfirmDialog from '../../../../Components/Shared/ConfirmDialog';
import Modal from '../../../../Components/Shared/Modal';
import { fetchAll, deleteItem } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';

function formatDate(d) {
  return new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

const COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'submittedAt', label: 'Submitted', render: (row) => formatDate(row.submittedAt) },
];

export default function ContactSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [preview, setPreview] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const { pushToast } = useToast();

  async function load() {
    const all = await fetchAll('contactSubmissions');
    setSubmissions(all.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)));
  }

  useEffect(() => { load(); }, []);

  async function handleConfirmDelete() {
    await deleteItem('contactSubmissions', pendingDelete.id);
    pushToast('Submission deleted.', { type: 'success' });
    setPendingDelete(null);
    load();
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl text-ink">Contact Form Submissions</h1>

      <CmsTable
        columns={COLUMNS}
        rows={submissions}
        onPreview={(row) => setPreview(row)}
        onDelete={(row) => setPendingDelete(row)}
        emptyLabel="No submissions yet."
      />

      <Modal open={Boolean(preview)} onClose={() => setPreview(null)} title="Submission Details" size="md">
        {preview && (
          <div className="space-y-2 text-sm">
            <p><span className="text-ink/50">Name:</span> {preview.name}</p>
            <p><span className="text-ink/50">Email:</span> {preview.email}</p>
            <p><span className="text-ink/50">Phone:</span> {preview.phone}</p>
            <p><span className="text-ink/50">Company:</span> {preview.company || '—'}</p>
            <p><span className="text-ink/50">Submitted:</span> {formatDate(preview.submittedAt)}</p>
            <p className="mt-3 whitespace-pre-wrap rounded-lg bg-surface p-3">{preview.message}</p>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete Submission"
        message="এই সাবমিশনটি স্থায়ীভাবে মুছে ফেলা হবে।"
        confirmLabel="Delete"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}