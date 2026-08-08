// FILE: admin/src/Components/services/dataStore.js
import api from './api';

const CACHE_PREFIX = 'bix_data_';
const cacheKey = (resource) => `${CACHE_PREFIX}${resource}`;

function readCache(resource) {
  const raw = localStorage.getItem(cacheKey(resource));
  return raw ? JSON.parse(raw) : null;
}
function writeCache(resource, data) {
  localStorage.setItem(cacheKey(resource), JSON.stringify(data));
}

export async function fetchAll(resource, { forceRefresh = false } = {}) {
  if (!forceRefresh) {
    const cached = readCache(resource);
    if (cached) return cached;
  }
  const { data } = await api.get(`/${resource}.json`);
  writeCache(resource, data);
  return data;
}

export async function fetchOne(resource, id) {
  const all = await fetchAll(resource);
  return all.find((item) => String(item.id) === String(id)) ?? null;
}

export async function fetchBySlug(resource, slug) {
  const all = await fetchAll(resource);
  return all.find((item) => item.slug === slug) ?? null;
}

export async function createItem(resource, payload) {
  const all = await fetchAll(resource);
  const newItem = { id: payload.id ?? crypto.randomUUID(), ...payload };
  writeCache(resource, [...all, newItem]);
  return newItem;
}

export async function updateItem(resource, id, patch) {
  const all = await fetchAll(resource);
  let updated = null;
  const next = all.map((item) => {
    if (String(item.id) === String(id)) {
      updated = { ...item, ...patch };
      return updated;
    }
    return item;
  });
  writeCache(resource, next);
  return updated;
}

export async function deleteItem(resource, id) {
  const all = await fetchAll(resource);
  writeCache(resource, all.filter((item) => String(item.id) !== String(id)));
  return true;
}

export async function resetResource(resource) {
  localStorage.removeItem(cacheKey(resource));
  return fetchAll(resource, { forceRefresh: true });
}

export const RESOURCES = Object.freeze({
  ABOUT: 'about',
  SERVICES: 'services',
  EQUIPMENT: 'equipment',
  CERTIFICATIONS: 'certifications',
  GALLERY: 'galleryItems',
  CONTACT_SUBMISSIONS: 'contactSubmissions',
  PROJECTS: 'projects',
  TRAININGS: 'trainings',
  PARTNERS: 'partners',
  TESTIMONIALS: 'testimonials',
  FAQS: 'faqs',
  CONTACT_INFO: 'contactInfo',
  SEO_SETTINGS: 'seoSettings',
  SOCIAL_LINKS: 'socialLinks',
  ADMIN: 'admin',
});

export const GALLERY_CATEGORIES = Object.freeze([
  'Field Operations',
  'Equipment',
  'Certificates & Events',
  'Team',
]);