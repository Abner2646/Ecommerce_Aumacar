// /src/components/layout/AdminLayout.jsx

import { Outlet } from 'react-router-dom';
import Sidebar from '../admin/Sidebar';

const AdminLayout = () => {
  return (
    <div className="adm-layout">
      <Sidebar />
      
      <main className="adm-main">
        <div className="adm-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;