// FILE: admin/src/Root.jsx
import { Outlet } from 'react-router-dom';
import ScrollToTop from './Components/ScrollToTop';

export default function Root() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}