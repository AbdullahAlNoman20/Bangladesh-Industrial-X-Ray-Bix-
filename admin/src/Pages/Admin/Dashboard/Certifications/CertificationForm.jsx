// FILE: admin/src/Pages/Admin/Dashboard/Certifications/CertificationForm.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormField from '../../../../Components/Shared/FormField';
import { fetchOne, createItem, updateItem } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';
import { sanitizeInput } from '../../../../Components/utils/sanitize';
import { isRequired, validateForm, rule } from '../../../../Components/utils/validators';

const EMPTY = { title: '', description: '', issuedBy: '', certificateNo: '', issueDate: '', expiryDate: '', image: '' };

const SCHEMA = {
  title: [rule(isRequired, 'Title is required.')],
  issuedBy: [rule(isRequired, 'Issuing authority is required.')],
  certificateNo: [rule(isRequired, 'Certificate number is required.')],
  issueDate: [rule(isRequired, 'Issue date is required.')],
  expiryDate: [rule(isRequired, 'Expiry date is required.')],
  image: [rule(isRequired, 'Certificate image path is required.')],
};

export default function CertificationForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { pushToast } = useToast();

  useEffect(() => {
    if (isEdit) fetchOne('certifications', id).then((data) => data && setValues(data));
  }, [id, isEdit]);

  function setField(field, value) { setValues((v) => ({ ...v, [field]: value })); }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(values, SCHEMA);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;
    if (new Date(values.expiryDate) < new Date(values.issueDate)) {
      setErrors((prev) => ({ ...prev, expiryDate: 'Expiry date issue date-এর আগে হতে পারবে না।' }));
      return;
    }

    setSubmitting(true);
    const payload = {
      ...values,
      title: sanitizeInput(values.title),
      description: sanitizeInput(values.description),
      issuedBy: sanitizeInput(values.issuedBy),
      certificateNo: sanitizeInput(values.certificateNo),
    };

    if (isEdit) {
      await updateItem('certifications', id, payload);
      pushToast('Certificate updated.', { type: 'success' });
    } else {
      await createItem('certifications', payload);
      pushToast('Certificate created.', { type: 'success' });
    }
    setSubmitting(false);
    navigate('/admin/dashboard/certifications');
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl text-ink">{isEdit ? 'Edit Certificate' : 'Add Certificate'}</h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormField label="Title" required error={errors.title}>
          <input value={values.title} onChange={(e) => setField('title', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <FormField label="Description">
          <textarea rows={3} value={values.description} onChange={(e) => setField('description', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Issued By" required error={errors.issuedBy}>
            <input value={values.issuedBy} onChange={(e) => setField('issuedBy', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>

          <FormField label="Certificate No." required error={errors.certificateNo}>
            <input value={values.certificateNo} onChange={(e) => setField('certificateNo', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>

          <FormField label="Issue Date" required error={errors.issueDate}>
            <input type="date" value={values.issueDate} onChange={(e) => setField('issueDate', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>

          <FormField label="Expiry Date" required error={errors.expiryDate}>
            <input type="date" value={values.expiryDate} onChange={(e) => setField('expiryDate', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>
        </div>

        <FormField label="Certificate Image Path" required error={errors.image} hint="/assets/images/certificates/your-file.jpg">
          <input value={values.image} onChange={(e) => setField('image', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <div className="flex gap-3 border-t border-ink/10 pt-6">
          <button type="submit" disabled={submitting} className="rounded-md bg-brand px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60">
            {submitting ? 'Saving…' : isEdit ? 'Update Certificate' : 'Publish Certificate'}
          </button>
          <button type="button" onClick={() => navigate('/admin/dashboard/certifications')} className="rounded-md border border-ink/10 px-6 py-2.5 text-sm font-medium text-ink hover:bg-ink/5">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}