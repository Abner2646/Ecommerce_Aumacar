// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import RequireEmailVerified from './components/common/RequireEmailVerified.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';

// Páginas públicas


// Páginas protegidas


import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.css';

// Crear QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

function App() {
  return (


  );
}

export default App;