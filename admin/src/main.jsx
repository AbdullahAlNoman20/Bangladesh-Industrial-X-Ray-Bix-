// FILE: admin/src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';

import Router from './Router';
import { AuthProvider } from './Components/context/AuthContext';
import { ToastProvider } from './Components/context/ToastContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ToastProvider>
        <AuthProvider>
          <RouterProvider router={Router} />
        </AuthProvider>
      </ToastProvider>
    </HelmetProvider>
  </StrictMode>
);