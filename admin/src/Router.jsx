// FILE: admin/src/Router.jsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import Root from './Root';
import LoadingScreen from './Components/Shared/LoadingScreen';
import NotFound from './Components/Shared/NotFound';
import Forbidden from './Components/Shared/Forbidden';
import ErrorPage from './Components/Shared/ErrorPage';
import Maintenance from './Components/Shared/Maintenance';
import ProtectedRoute from './Components/Shared/ProtectedRoute';
import AdminLayout from './Components/layout/AdminLayout';

// ---- Public Pages (lazy) ----
const Home = lazy(() => import('./Pages/Home/Home'));
const About = lazy(() => import('./Pages/About/About'));
const ServicesList = lazy(() => import('./Pages/Services/ServicesList'));
const ServiceDetail = lazy(() => import('./Pages/Services/ServiceDetail'));
const EquipmentList = lazy(() => import('./Pages/Equipment/EquipmentList'));
const EquipmentDetail = lazy(() => import('./Pages/Equipment/EquipmentDetail'));
const Certifications = lazy(() => import('./Pages/Certifications/Certifications'));
const Gallery = lazy(() => import('./Pages/Gallery/Gallery'));
const GalleryCategory = lazy(() => import('./Pages/Gallery/GalleryCategory'));
const ProjectsList = lazy(() => import('./Pages/Projects/ProjectsList'));
const ProjectDetail = lazy(() => import('./Pages/Projects/ProjectDetail'));
const Training = lazy(() => import('./Pages/Training/Training'));
const Partners = lazy(() => import('./Pages/Partners/Partners'));
const Testimonials = lazy(() => import('./Pages/Testimonials/Testimonials'));
const Contact = lazy(() => import('./Pages/Contact/Contact'));

// ---- Admin (lazy) ----
const AdminLogin = lazy(() => import('./Pages/Admin/AdminLogin'));
const DashboardHome = lazy(() => import('./Pages/Admin/Dashboard/DashboardHome'));
const HomeContentForm = lazy(() => import('./Pages/Admin/Dashboard/Home/HomeContentForm'));
const AboutForm = lazy(() => import('./Pages/Admin/Dashboard/About/AboutForm'));
const ServicesTable = lazy(() => import('./Pages/Admin/Dashboard/Services/ServicesTable'));
const ServiceForm = lazy(() => import('./Pages/Admin/Dashboard/Services/ServiceForm'));
const EquipmentTable = lazy(() => import('./Pages/Admin/Dashboard/Equipment/EquipmentTable'));
const EquipmentForm = lazy(() => import('./Pages/Admin/Dashboard/Equipment/EquipmentForm'));
const CertificationsTable = lazy(() => import('./Pages/Admin/Dashboard/Certifications/CertificationsTable'));
const CertificationForm = lazy(() => import('./Pages/Admin/Dashboard/Certifications/CertificationForm'));
const GalleryTable = lazy(() => import('./Pages/Admin/Dashboard/Gallery/GalleryTable'));
const ProjectsTable = lazy(() => import('./Pages/Admin/Dashboard/Projects/ProjectsTable'));
const ProjectForm = lazy(() => import('./Pages/Admin/Dashboard/Projects/ProjectForm'));
const TrainingTable = lazy(() => import('./Pages/Admin/Dashboard/Training/TrainingTable'));
const TrainingForm = lazy(() => import('./Pages/Admin/Dashboard/Training/TrainingForm'));
const PartnersTable = lazy(() => import('./Pages/Admin/Dashboard/Partners/PartnersTable'));
const TestimonialsTable = lazy(() => import('./Pages/Admin/Dashboard/Testimonials/TestimonialsTable'));
const ContactInfoForm = lazy(() => import('./Pages/Admin/Dashboard/Contact/ContactInfoForm'));
const ContactSubmissions = lazy(() => import('./Pages/Admin/Dashboard/Contact/ContactSubmissions'));
const SeoSettingsForm = lazy(() => import('./Pages/Admin/Dashboard/Seo/SeoSettingsForm'));
const SocialLinksTable = lazy(() => import('./Pages/Admin/Dashboard/SocialLinks/SocialLinksTable'));

// প্রতিটা lazy element কে Suspense দিয়ে র‍্যাপ করে LoadingScreen দেখানোর হেল্পার
const withSuspense = (Component) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component />
  </Suspense>
);

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: withSuspense(Home) },
      { path: 'about', element: withSuspense(About) },
      { path: 'services', element: withSuspense(ServicesList) },
      { path: 'services/:slug', element: withSuspense(ServiceDetail) },
      { path: 'equipment', element: withSuspense(EquipmentList) },
      { path: 'equipment/:slug', element: withSuspense(EquipmentDetail) },
      { path: 'certifications', element: withSuspense(Certifications) },
      { path: 'gallery', element: withSuspense(Gallery) },
      { path: 'gallery/:category', element: withSuspense(GalleryCategory) },
      { path: 'projects', element: withSuspense(ProjectsList) },
      { path: 'projects/:slug', element: withSuspense(ProjectDetail) },
      { path: 'training', element: withSuspense(Training) },
      { path: 'partners', element: withSuspense(Partners) },
      { path: 'testimonials', element: withSuspense(Testimonials) },
      { path: 'contact', element: withSuspense(Contact) },
      { path: '403', element: <Forbidden /> },
      { path: 'maintenance', element: <Maintenance /> },
      { path: '*', element: <NotFound /> },
    ],
  },

  { path: '/admin', element: withSuspense(AdminLogin) },
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute redirectTo="/admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: withSuspense(DashboardHome) },
      { path: 'home', element: withSuspense(HomeContentForm) },
      { path: 'about', element: withSuspense(AboutForm) },
      { path: 'services', element: withSuspense(ServicesTable) },
      { path: 'services/new', element: withSuspense(ServiceForm) },
      { path: 'services/:id/edit', element: withSuspense(ServiceForm) },
      { path: 'equipment', element: withSuspense(EquipmentTable) },
      { path: 'equipment/new', element: withSuspense(EquipmentForm) },
      { path: 'equipment/:id/edit', element: withSuspense(EquipmentForm) },
      { path: 'certifications', element: withSuspense(CertificationsTable) },
      { path: 'certifications/new', element: withSuspense(CertificationForm) },
      { path: 'certifications/:id/edit', element: withSuspense(CertificationForm) },
      { path: 'gallery', element: withSuspense(GalleryTable) },
      { path: 'projects', element: withSuspense(ProjectsTable) },
      { path: 'projects/new', element: withSuspense(ProjectForm) },
      { path: 'projects/:id/edit', element: withSuspense(ProjectForm) },
      { path: 'training', element: withSuspense(TrainingTable) },
      { path: 'training/new', element: withSuspense(TrainingForm) },
      { path: 'training/:id/edit', element: withSuspense(TrainingForm) },
      { path: 'partners', element: withSuspense(PartnersTable) },
      { path: 'testimonials', element: withSuspense(TestimonialsTable) },
      { path: 'contact', element: withSuspense(ContactInfoForm) },
      { path: 'contact-submissions', element: withSuspense(ContactSubmissions) },
      { path: 'seo', element: withSuspense(SeoSettingsForm) },
      { path: 'social-links', element: withSuspense(SocialLinksTable) },
    ],
  },

  { path: '*', element: <Navigate to="/404" replace /> },
]);

export default Router;