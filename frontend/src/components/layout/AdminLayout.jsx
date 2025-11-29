// /src/components/layout/AdminLayout.jsx

import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from '../admin/Sidebar';

const AdminLayout = () => {
  const { user, loading } = useAuth();

  // Mientras verifica autenticación
  if (loading) {
    return (
      <div className="adm-loading">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <p>Cargando...</p>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

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