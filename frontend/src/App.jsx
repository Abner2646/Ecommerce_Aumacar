// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext.jsx';
import Layout from './components/layout/Layout.jsx';

// Páginas públicas
import Login from './pages/public/Login.jsx';
import SubaruShowcase from './pages/public/SubaruShowcase.jsx';
import SuzukiHomeConAPI from './pages/public/SuzukiHome.jsx';

import './globals.css';
import './styles/main.css';

// Configurar QueryClient
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
            {/* Rutas con Layout (Navbar + Footer) */}
            <Route element={<Layout />}>
              <Route path="/" element={<div className="cns-section"><div className="cns-container"><h1>Home</h1></div></div>} />
              <Route path="/showcase" element={<SubaruShowcase />} />
              <Route path="/login" element={<Login />} />
              <Route path="/prueba" element={<SuzukiHomeConAPI />} />
              {/* Agregar más rutas públicas aquí */}
            </Route>

            {/* Rutas Admin sin Layout (si es necesario) */}
            {/* O crear AdminLayout separado */}

            {/* 404 - Redirect a Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Toast Notifications */}
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

      {/* React Query Devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;