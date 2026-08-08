// FILE: admin/src/Components/utils/validators.js
export const isRequired = (value) => value !== undefined && value !== null && String(value).trim() !== '';
export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? ''));
export const isPhoneBD = (value) => /^(?:\+?880|0)1[3-9]\d{8}$/.test(String(value ?? '').replace(/[\s-]/g, ''));

export function validateForm(values, schema) {
  const errors = {};
  Object.entries(schema).forEach(([field, rules]) => {
    for (const r of rules) {
      if (!r.test(values[field])) {
        errors[field] = r.message;
        break;
      }
    }
  });
  return errors;
}

export const rule = (test, message) => ({ test, message });