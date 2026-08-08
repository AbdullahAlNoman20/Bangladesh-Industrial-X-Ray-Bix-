// FILE: admin/src/Components/Shared/CmsTable.jsx
export default function CmsTable({ columns, rows, onEdit, onPreview, onDelete, emptyLabel = 'No records found.' }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-ink/5 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-ink/5 text-xs uppercase text-ink/50">
          <tr>
            {columns.map((c) => <th key={c.key} className="px-4 py-3">{c.label}</th>)}
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-ink/5 hover:bg-ink/[0.02]">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 text-ink/80">
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
              <td className="px-4 py-3">
                <div className="flex justify-end gap-3 text-xs">
                  {onPreview && <button type="button" onClick={() => onPreview(row)} className="text-ink/50 hover:text-ink">Preview</button>}
                  {onEdit && <button type="button" onClick={() => onEdit(row)} className="font-medium text-brand hover:underline">Edit</button>}
                  {onDelete && <button type="button" onClick={() => onDelete(row)} className="text-red-600 hover:underline">Delete</button>}
                </div>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={columns.length + 1} className="px-4 py-8 text-center text-ink/40">{emptyLabel}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}