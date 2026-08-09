// FILE: admin/src/Pages/Admin/Dashboard/About/AboutForm.jsx
import { useEffect, useState } from 'react';
import FormField from '../../../../Components/Shared/FormField';
import { fetchAll, updateItem } from '../../../../Components/services/dataStore';
import { useToast } from '../../../../Components/hooks/useToast';
import { sanitizeInput } from '../../../../Components/utils/sanitize';
import { isRequired, validateForm, rule } from '../../../../Components/utils/validators';

const SCHEMA = {
  companyHistory: [rule(isRequired, 'Company history is required.')],
  mission: [rule(isRequired, 'Mission is required.')],
  vision: [rule(isRequired, 'Vision is required.')],
};

export default function AboutForm() {
  const [record, setRecord] = useState(null);
  const [values, setValues] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { pushToast } = useToast();

  useEffect(() => {
    fetchAll('about').then((data) => { setRecord(data[0]); setValues(data[0]); });
  }, []);

  function setField(field, value) { setValues((v) => ({ ...v, [field]: value })); }
  function setListItem(field, index, value) { setValues((v) => ({ ...v, [field]: v[field].map((it, i) => (i === index ? value : it)) })); }
  function addListItem(field) { setValues((v) => ({ ...v, [field]: [...v[field], ''] })); }
  function removeListItem(field, index) { setValues((v) => ({ ...v, [field]: v[field].filter((_, i) => i !== index) })); }

  function setAchievement(index, key, value) {
    setValues((v) => ({ ...v, achievements: v.achievements.map((a, i) => (i === index ? { ...a, [key]: value } : a)) }));
  }
  function addAchievement() {
    setValues((v) => ({ ...v, achievements: [...v.achievements, { id: crypto.randomUUID(), year: '', title: '', description: '' }] }));
  }
  function removeAchievement(index) {
    setValues((v) => ({ ...v, achievements: v.achievements.filter((_, i) => i !== index) }));
  }

  function setTeamMember(index, key, value) {
    setValues((v) => ({ ...v, team: v.team.map((m, i) => (i === index ? { ...m, [key]: value } : m)) }));
  }
  function addTeamMember() {
    setValues((v) => ({ ...v, team: [...v.team, { id: crypto.randomUUID(), name: '', designation: '', photo: '' }] }));
  }
  function removeTeamMember(index) {
    setValues((v) => ({ ...v, team: v.team.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(values, SCHEMA);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);
    const payload = {
      ...values,
      companyHistory: sanitizeInput(values.companyHistory),
      companyOverview: sanitizeInput(values.companyOverview),
      ceoMessage: sanitizeInput(values.ceoMessage),
      mission: sanitizeInput(values.mission),
      vision: sanitizeInput(values.vision),
      strengths: values.strengths.map(sanitizeInput).filter(Boolean),
    };
    await updateItem('about', record.id, payload);
    pushToast('About page updated.', { type: 'success' });
    setSubmitting(false);
  }

  if (!values) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 font-display text-2xl text-ink">About Page</h1>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <FormField label="Company History" required error={errors.companyHistory}>
          <textarea rows={4} value={values.companyHistory} onChange={(e) => setField('companyHistory', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <FormField label="Company Overview">
          <textarea rows={4} value={values.companyOverview} onChange={(e) => setField('companyOverview', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
        </FormField>

        <div className="rounded-lg border border-ink/10 p-4">
          <p className="mb-3 text-sm font-semibold text-ink">CEO Message</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="CEO Name">
              <input value={values.ceoName} onChange={(e) => setField('ceoName', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
            </FormField>
            <FormField label="CEO Designation">
              <input value={values.ceoDesignation} onChange={(e) => setField('ceoDesignation', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
            </FormField>
          </div>
          <FormField label="CEO Photo Path">
            <input value={values.ceoImage} onChange={(e) => setField('ceoImage', e.target.value)} className="mt-2 w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>
          <FormField label="Message">
            <textarea rows={3} value={values.ceoMessage} onChange={(e) => setField('ceoMessage', e.target.value)} className="mt-2 w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Mission" required error={errors.mission}>
            <textarea rows={4} value={values.mission} onChange={(e) => setField('mission', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>
          <FormField label="Vision" required error={errors.vision}>
            <textarea rows={4} value={values.vision} onChange={(e) => setField('vision', e.target.value)} className="w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
          </FormField>
        </div>

        {/* Strengths */}
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Company Strengths</p>
          <div className="space-y-2">
            {values.strengths.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input value={s} onChange={(e) => setListItem('strengths', i, e.target.value)} className="flex-1 rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                <button type="button" onClick={() => removeListItem('strengths', i)} className="rounded-md px-3 text-sm text-red-600 hover:bg-red-50">✕</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => addListItem('strengths')} className="mt-2 text-sm text-brand hover:underline">+ Add Strength</button>
        </div>

        {/* Achievements */}
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Achievements</p>
          <div className="space-y-3">
            {values.achievements.map((a, i) => (
              <div key={a.id} className="rounded-lg border border-ink/10 p-3">
                <div className="mb-2 flex justify-end">
                  <button type="button" onClick={() => removeAchievement(i)} className="text-xs text-red-600 hover:underline">Remove</button>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  <input placeholder="Year" value={a.year} onChange={(e) => setAchievement(i, 'year', e.target.value)} className="rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                  <input placeholder="Title" value={a.title} onChange={(e) => setAchievement(i, 'title', e.target.value)} className="sm:col-span-2 rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                </div>
                <textarea placeholder="Description" rows={2} value={a.description} onChange={(e) => setAchievement(i, 'description', e.target.value)} className="mt-2 w-full rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
              </div>
            ))}
          </div>
          <button type="button" onClick={addAchievement} className="mt-2 text-sm text-brand hover:underline">+ Add Achievement</button>
        </div>

        {/* Team */}
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Team Members</p>
          <div className="space-y-3">
            {values.team.map((m, i) => (
              <div key={m.id} className="rounded-lg border border-ink/10 p-3">
                <div className="mb-2 flex justify-end">
                  <button type="button" onClick={() => removeTeamMember(i)} className="text-xs text-red-600 hover:underline">Remove</button>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  <input placeholder="Name" value={m.name} onChange={(e) => setTeamMember(i, 'name', e.target.value)} className="rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                  <input placeholder="Designation" value={m.designation} onChange={(e) => setTeamMember(i, 'designation', e.target.value)} className="rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                  <input placeholder="Photo path" value={m.photo} onChange={(e) => setTeamMember(i, 'photo', e.target.value)} className="rounded-md border border-ink/10 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={addTeamMember} className="mt-2 text-sm text-brand hover:underline">+ Add Team Member</button>
        </div>

        <div className="border-t border-ink/10 pt-6">
          <button type="submit" disabled={submitting} className="rounded-md bg-brand px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-60">
            {submitting ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}