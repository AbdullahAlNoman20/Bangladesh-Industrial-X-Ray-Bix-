// FILE: admin/src/Router.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom';

import Root from './Root';
import Home from './Pages/Home/Home';
import NotFound from './Components/Shared/NotFound';
import Forbidden from './Components/Shared/Forbidden';
import ErrorPage from './Components/Shared/ErrorPage';
import Maintenance from './Components/Shared/Maintenance';
import ComingSoon from './Components/Shared/ComingSoon';
import ProtectedRoute from './Components/Shared/ProtectedRoute';
import AdminLogin from './Pages/Admin/AdminLogin';
import About from './Pages/About/About';
import ServicesList from './Pages/Services/ServicesList';
import ServiceDetail from './Pages/Services/ServiceDetail';

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
      { path: 'equipment', element: <ComingSoon title="Equipment" /> },
      { path: 'equipment/:slug', element: <ComingSoon title="Equipment Detail" /> },
      { path: 'certifications', element: <ComingSoon title="Certifications" /> },
      { path: 'gallery', element: <ComingSoon title="Gallery" /> },
      { path: 'gallery/:category', element: <ComingSoon title="Gallery Category" /> },
      { path: 'projects', element: <ComingSoon title="Previous Projects" /> },
      { path: 'projects/:slug', element: <ComingSoon title="Project Detail" /> },
      { path: 'training', element: <ComingSoon title="Training & Certification" /> },
      { path: 'partners', element: <ComingSoon title="Partners" /> },
      { path: 'testimonials', element: <ComingSoon title="Testimonials" /> },
      { path: 'contact', element: <ComingSoon title="Contact" /> },
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
        <ComingSoon title="Admin Dashboard" />
      </ProtectedRoute>
    ),
  },
  { path: '*', element: <Navigate to="/404" replace /> },
]);

export default Router;