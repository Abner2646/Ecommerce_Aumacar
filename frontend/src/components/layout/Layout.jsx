// /src/components/layout/Layout.jsx

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const hideFooter = location.pathname === '/login' || location.pathname.startsWith('/vehiculo/');
  return (
    <div className="cns-layout-container">
      <Navbar />
      <main className="cns-layout-main">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;