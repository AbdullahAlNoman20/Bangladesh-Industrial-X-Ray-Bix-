// FILE: admin/src/Router.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom';

import Root from './Root';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import ServicesList from './Pages/Services/ServicesList';
import ServiceDetail from './Pages/Services/ServiceDetail';
import EquipmentList from './Pages/Equipment/EquipmentList';
import EquipmentDetail from './Pages/Equipment/EquipmentDetail';
import Certifications from './Pages/Certifications/Certifications';
import Gallery from './Pages/Gallery/Gallery';
import GalleryCategory from './Pages/Gallery/GalleryCategory';
import ProjectsList from './Pages/Projects/ProjectsList';
import ProjectDetail from './Pages/Projects/ProjectDetail';
import Training from './Pages/Training/Training';
import Partners from './Pages/Partners/Partners';
import Testimonials from './Pages/Testimonials/Testimonials';
import Contact from './Pages/Contact/Contact';
import NotFound from './Components/Shared/NotFound';
import Forbidden from './Components/Shared/Forbidden';
import ErrorPage from './Components/Shared/ErrorPage';
import Maintenance from './Components/Shared/Maintenance';
import ComingSoon from './Components/Shared/ComingSoon';
import ProtectedRoute from './Components/Shared/ProtectedRoute';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminLayout from './Components/layout/AdminLayout';
import DashboardHome from './Pages/Admin/Dashboard/DashboardHome';
import ServicesTable from './Pages/Admin/Dashboard/Services/ServicesTable';
import ServiceForm from './Pages/Admin/Dashboard/Services/ServiceForm';


const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <ServicesList /> },
      { path: 'services/:slug', element: <ServiceDetail /> },
      { path: 'equipment', element: <EquipmentList /> },
      { path: 'equipment/:slug', element: <EquipmentDetail /> },
      { path: 'certifications', element: <Certifications /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'gallery/:category', element: <GalleryCategory /> },
      { path: 'projects', element: <ProjectsList /> },
      { path: 'projects/:slug', element: <ProjectDetail /> },
      { path: 'training', element: <Training /> },
      { path: 'partners', element: <Partners /> },
      { path: 'testimonials', element: <Testimonials /> },
      { path: 'contact', element: <Contact /> },
      { path: '403', element: <Forbidden /> },
      { path: 'maintenance', element: <Maintenance /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  { path: '/admin', element: <AdminLogin /> },
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute redirectTo="/admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: 'home', element: <ComingSoon title="Home Page CMS" /> },
      { path: 'about', element: <ComingSoon title="About CMS" /> },
      { path: 'services', element: <ServicesTable /> },
      { path: 'services/new', element: <ServiceForm /> },
      { path: 'services/:id/edit', element: <ServiceForm /> },
      { path: 'equipment', element: <ComingSoon title="Equipment CMS" /> },
      { path: 'certifications', element: <ComingSoon title="Certifications CMS" /> },
      { path: 'gallery', element: <ComingSoon title="Gallery CMS" /> },
      { path: 'projects', element: <ComingSoon title="Projects CMS" /> },
      { path: 'training', element: <ComingSoon title="Training CMS" /> },
      { path: 'partners', element: <ComingSoon title="Partners CMS" /> },
      { path: 'testimonials', element: <ComingSoon title="Testimonials CMS" /> },
      { path: 'contact', element: <ComingSoon title="Contact CMS" /> },
      { path: 'seo', element: <ComingSoon title="SEO Settings" /> },
      { path: 'social-links', element: <ComingSoon title="Social Links CMS" /> },
    ],
  },
  { path: '*', element: <Navigate to="/404" replace /> },
]);

export default Router;