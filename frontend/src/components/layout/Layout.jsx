// /src/components/layout/Layout.jsx

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="cns-layout-container">
      <Navbar />
      <main className="cns-layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;