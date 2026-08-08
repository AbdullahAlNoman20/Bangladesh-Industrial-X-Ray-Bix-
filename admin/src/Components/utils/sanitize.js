// FILE: admin/src/Components/utils/sanitize.js
export function sanitizeInput(value) {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim();
}