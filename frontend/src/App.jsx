// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

// Context
import { AuthProvider } from './context/AuthContext.jsx';

// Layouts
import Layout from './components/layout/Layout.jsx';
import AdminLayout from './components/layout/AdminLayout.jsx';

// Styles
import './globals.css';
import './styles/main.css';

// Páginas públicas
import Login from './pages/public/Login.jsx';
import SubaruShowcase from './pages/public/SubaruShowcase.jsx';
import SuzukiHomeConAPI from './pages/public/SuzukiHome.jsx';

// Páginas admin
import Dashboard from './pages/admin/Dashboard';
import VehiculosManage from './pages/admin/VehiculosManage';
import VehiculoCreate from './pages/admin/VehiculoCreate';
import VehiculoEdit from './pages/admin/VehiculoEdit';
import MarcasManage from './pages/admin/MarcasManage.jsx';
import CaracteristicasManage from './pages/admin/CaracteristicasManage.jsx';
import ColoresManage from './pages/admin/ColoresManage.jsx'

// Query Client Configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* ══════════════════════════════════════════════════════════
                RUTAS PÚBLICAS (con Layout principal)
            ══════════════════════════════════════════════════════════ */}
            <Route element={<Layout />}>
              <Route path="showcase" element={<SubaruShowcase />} />
              <Route path="prueba" element={<SuzukiHomeConAPI />} />
              <Route path="login" element={<Login />} />
            </Route>

            {/* ══════════════════════════════════════════════════════════
                RUTAS ADMIN (con AdminLayout)
                Todas las rutas hijas heredan el prefijo /admin
            ══════════════════════════════════════════════════════════ */}
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="colores" element={<ColoresManage />} />
              
              {/* Vehículos */}
              <Route path="vehiculos">
                <Route index element={<VehiculosManage />} />
                <Route path="nuevo" element={<VehiculoCreate />} />
                <Route path="editar/:id" element={<VehiculoEdit />} />
              </Route>

              {/* Catálogos */}
              <Route path="marcas" element={<MarcasManage />} />
              <Route path="caracteristicas" element={<CaracteristicasManage />} />
            </Route>

            {/* ══════════════════════════════════════════════════════════
                404 - Fallback
            ══════════════════════════════════════════════════════════ */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </BrowserRouter>
      </AuthProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;