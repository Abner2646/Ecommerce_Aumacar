# 🚀 PROMPT MAESTRO - Sistema de Concesionaria React

## 📋 ÍNDICE
1. [Arquitectura General](#arquitectura-general)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Estructura de Carpetas](#estructura-de-carpetas)
4. [Routing y Navegación](#routing-y-navegación)
5. [Autenticación JWT](#autenticación-jwt)
6. [Data Fetching con TanStack Query](#data-fetching-con-tanstack-query)
7. [Servicios API](#servicios-api)
8. [Custom Hooks](#custom-hooks)
9. [Componentes y Patterns](#componentes-y-patterns)
10. [Upload de Archivos](#upload-de-archivos)
11. [Formularios](#formularios)
12. [Manejo de Errores](#manejo-de-errores)

---

## 🏗️ ARQUITECTURA GENERAL

### Descripción del Sistema
Sistema de concesionaria con dos áreas principales:
- **Vista Pública**: Landing, catálogo de vehículos por marca, detalle de vehículo, contacto
- **Dashboard Admin**: CRUD completo de marcas, vehículos, características, gestión de imágenes/videos

**Características técnicas:**
- Single Page Application (SPA) con React
- Autenticación JWT con token en todas las requests
- Data fetching optimizado con TanStack Query
- Upload de múltiples imágenes y videos a Cloudinary
- Routing con React Router v6

---

## 🛠️ STACK TECNOLÓGICO

```
Core:
- React 18+
- Create React App (CRA)
- React Router v6
- TanStack Query v4/v5

State Management:
- TanStack Query (server state)
- Context API (auth state)
- useState/useReducer (local state)

HTTP Client:
- Fetch API nativo
- TanStack Query para caché y sincronización

UI/Styling:
- Tailwind CSS

Formularios:
- React Hook Form
- Zod (validación)

Utilities:
- date-fns (manejo de fechas)
- react-hot-toast (notificaciones)
```

---

## 📁 ESTRUCTURA DE CARPETAS

```
src/
├── api/                    # Servicios API y configuración
│   ├── client.js          # Cliente HTTP configurado
│   ├── auth.api.js        # Endpoints de autenticación
│   ├── marcas.api.js      # Endpoints de marcas
│   ├── vehiculos.api.js   # Endpoints de vehículos
│   └── caracteristicas.api.js
│
├── hooks/                  # Custom hooks
│   ├── useAuth.js         # Hook de autenticación
│   ├── useMarcas.js       # Hook para marcas (TanStack Query)
│   ├── useVehiculos.js    # Hook para vehículos (TanStack Query)
│   └── useUpload.js       # Hook para upload de archivos
│
├── context/                # Context providers
│   └── AuthContext.jsx    # Contexto de autenticación
│
├── components/             # Componentes reutilizables
│   ├── layout/            # Componentes de layout
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── AdminLayout.jsx
│   │   └── PublicLayout.jsx
│   │
│   ├── common/            # Componentes comunes
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   ├── Spinner.jsx
│   │   └── ImageUploader.jsx
│   │
│   ├── features/          # Componentes específicos de features
│   │   ├── vehiculos/
│   │   │   ├── VehiculoCard.jsx
│   │   │   ├── VehiculoList.jsx
│   │   │   ├── VehiculoForm.jsx
│   │   │   └── VehiculoFilters.jsx
│   │   │
│   │   └── marcas/
│   │       ├── MarcaCard.jsx
│   │       └── MarcaSelector.jsx
│   │
│   └── admin/             # Componentes del dashboard admin
│       ├── Sidebar.jsx
│       ├── DataTable.jsx
│       └── StatsCard.jsx
│
├── pages/                  # Páginas/Vistas
│   ├── public/            # Páginas públicas
│   │   ├── Home.jsx
│   │   ├── Catalogo.jsx
│   │   ├── VehiculoDetalle.jsx
│   │   └── Contacto.jsx
│   │
│   └── admin/             # Páginas del dashboard
│       ├── Login.jsx
│       ├── Dashboard.jsx
│       ├── MarcasManage.jsx
│       ├── VehiculosManage.jsx
│       └── CaracteristicasManage.jsx
│
├── utils/                  # Utilidades y helpers
│   ├── constants.js       # Constantes de la app
│   ├── formatters.js      # Formateadores (precio, fecha, etc.)
│   └── validators.js      # Validaciones personalizadas
│
├── routes/                 # Configuración de rutas
│   ├── AppRoutes.jsx      # Router principal
│   ├── PublicRoutes.jsx   # Rutas públicas
│   ├── AdminRoutes.jsx    # Rutas protegidas admin
│   └── ProtectedRoute.jsx # HOC para rutas protegidas
│
├── App.jsx
└── index.js
```

---

## 🛣️ ROUTING Y NAVEGACIÓN

### Configuración de React Router v6

**AppRoutes.jsx**
```javascript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import AdminLayout from '../components/layout/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

// Public pages
import Home from '../pages/public/Home';
import Catalogo from '../pages/public/Catalogo';
import VehiculoDetalle from '../pages/public/VehiculoDetalle';
import Contacto from '../pages/public/Contacto';

// Admin pages
import Login from '../pages/admin/Login';
import Dashboard from '../pages/admin/Dashboard';
import MarcasManage from '../pages/admin/MarcasManage';
import VehiculosManage from '../pages/admin/VehiculosManage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/marcas/:slug" element={<Catalogo />} />
          <Route path="/vehiculos/:slug" element={<VehiculoDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>

        {/* Rutas de Admin */}
        <Route path="/admin/login" element={<Login />} />
        
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="marcas" element={<MarcasManage />} />
          <Route path="vehiculos" element={<VehiculosManage />} />
          <Route path="caracteristicas" element={<CaracteristicasManage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
```

### ProtectedRoute Component

**ProtectedRoute.jsx**
```javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // O tu spinner component
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

---

## 🔐 AUTENTICACIÓN JWT

### AuthContext

**context/AuthContext.jsx**
```javascript
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar token al cargar
    if (token) {
      verifyToken();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/verificar', {
        headers: {
          'Authorization': token.startsWith('Bearer') ? token : `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.usuario);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error verificando token:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error en login');
      }

      const data = await response.json();
      const tokenWithBearer = `Bearer ${data.token}`;
      
      setToken(tokenWithBearer);
      setUser(data.usuario);
      localStorage.setItem('token', tokenWithBearer);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    token,
    user,
    isAuthenticated: !!token,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

### useAuth Hook

**hooks/useAuth.js**
```javascript
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  
  return context;
};
```

---

## 📡 DATA FETCHING CON TANSTACK QUERY

### Configuración de TanStack Query

**App.jsx**
```javascript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

// Configurar QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      cacheTime: 10 * 60 * 1000, // 10 minutos
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
```

### Cliente HTTP Configurado

**api/client.js**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Cliente HTTP con configuración base
 * SIEMPRE incluye Authorization header si hay token
 */
export const apiClient = async (endpoint, options = {}) => {
  // Obtener token de localStorage
  const token = localStorage.getItem('token');
  
  // Configurar headers por defecto
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  // SIEMPRE agregar Authorization si existe token
  if (token) {
    headers['Authorization'] = token.startsWith('Bearer') ? token : `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });

    // Si es 401, token inválido - hacer logout
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
      throw new Error('Sesión expirada');
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error en la petición');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Cliente para FormData (uploads)
 */
export const apiClientFormData = async (endpoint, formData) => {
  const token = localStorage.getItem('token');
  
  const headers = {};
  
  // SIEMPRE agregar Authorization si existe token
  if (token) {
    headers['Authorization'] = token.startsWith('Bearer') ? token : `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
      throw new Error('Sesión expirada');
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error en la petición');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
```

---

## 🔌 SERVICIOS API

### Marcas API

**api/marcas.api.js**
```javascript
import { apiClient, apiClientFormData } from './client';

export const marcasApi = {
  // GET /api/marcas
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient(`/marcas${queryString ? `?${queryString}` : ''}`);
  },

  // GET /api/marcas/:id
  getById: async (id) => {
    return apiClient(`/marcas/${id}`);
  },

  // GET /api/marcas/slug/:slug
  getBySlug: async (slug) => {
    return apiClient(`/marcas/slug/${slug}`);
  },

  // POST /api/marcas (con logo)
  create: async (data) => {
    const formData = new FormData();
    formData.append('nombre', data.nombre);
    formData.append('slug', data.slug);
    formData.append('descripcion', data.descripcion || '');
    formData.append('activa', data.activa);
    formData.append('orden', data.orden || 0);
    
    if (data.colorPrimario) formData.append('colorPrimario', data.colorPrimario);
    if (data.colorSecundario) formData.append('colorSecundario', data.colorSecundario);
    if (data.logo) formData.append('logo', data.logo);

    return apiClientFormData('/marcas', formData);
  },

  // PUT /api/marcas/:id
  update: async (id, data) => {
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    return apiClientFormData(`/marcas/${id}`, formData);
  },

  // DELETE /api/marcas/:id
  delete: async (id) => {
    return apiClient(`/marcas/${id}`, { method: 'DELETE' });
  }
};
```

### Vehículos API

**api/vehiculos.api.js**
```javascript
import { apiClient, apiClientFormData } from './client';

export const vehiculosApi = {
  // GET /api/vehiculos (con filtros)
  getAll: async (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    return apiClient(`/vehiculos${queryString ? `?${queryString}` : ''}`);
  },

  // GET /api/vehiculos/:id
  getById: async (id) => {
    return apiClient(`/vehiculos/${id}`);
  },

  // GET /api/vehiculos/slug/:slug
  getBySlug: async (slug) => {
    return apiClient(`/vehiculos/slug/${slug}`);
  },

  // POST /api/vehiculos
  create: async (data) => {
    return apiClient('/vehiculos', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // PUT /api/vehiculos/:id
  update: async (id, data) => {
    return apiClient(`/vehiculos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // DELETE /api/vehiculos/:id
  delete: async (id) => {
    return apiClient(`/vehiculos/${id}`, { method: 'DELETE' });
  },

  // POST /api/vehiculos/:id/imagenes
  addImages: async (vehiculoId, images, options = {}) => {
    const formData = new FormData();
    
    images.forEach(image => {
      formData.append('imagenes', image);
    });
    
    if (options.esPrincipal !== undefined) {
      formData.append('esPrincipal', options.esPrincipal);
    }
    if (options.orden !== undefined) {
      formData.append('orden', options.orden);
    }

    return apiClientFormData(`/vehiculos/${vehiculoId}/imagenes`, formData);
  },

  // DELETE /api/vehiculos/imagenes/:imagenId
  deleteImage: async (imagenId) => {
    return apiClient(`/vehiculos/imagenes/${imagenId}`, { method: 'DELETE' });
  },

  // POST /api/vehiculos/:id/videos
  addVideo: async (vehiculoId, video, metadata = {}) => {
    const formData = new FormData();
    formData.append('video', video);
    
    if (metadata.titulo) formData.append('titulo', metadata.titulo);
    if (metadata.descripcion) formData.append('descripcion', metadata.descripcion);
    if (metadata.esPrincipal !== undefined) {
      formData.append('esPrincipal', metadata.esPrincipal);
    }
    if (metadata.orden !== undefined) {
      formData.append('orden', metadata.orden);
    }

    return apiClientFormData(`/vehiculos/${vehiculoId}/videos`, formData);
  },

  // DELETE /api/vehiculos/videos/:videoId
  deleteVideo: async (videoId) => {
    return apiClient(`/vehiculos/videos/${videoId}`, { method: 'DELETE' });
  },

  // POST /api/vehiculos/:id/caracteristicas
  assignCaracteristicas: async (vehiculoId, caracteristicasIds) => {
    return apiClient(`/vehiculos/${vehiculoId}/caracteristicas`, {
      method: 'POST',
      body: JSON.stringify({ caracteristicasIds })
    });
  }
};
```

### Características API

**api/caracteristicas.api.js**
```javascript
import { apiClient } from './client';

export const caracteristicasApi = {
  // GET /api/caracteristicas
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient(`/caracteristicas${queryString ? `?${queryString}` : ''}`);
  },

  // GET /api/caracteristicas/:id
  getById: async (id) => {
    return apiClient(`/caracteristicas/${id}`);
  },

  // POST /api/caracteristicas
  create: async (data) => {
    return apiClient('/caracteristicas', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  // PUT /api/caracteristicas/:id
  update: async (id, data) => {
    return apiClient(`/caracteristicas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },

  // DELETE /api/caracteristicas/:id
  delete: async (id) => {
    return apiClient(`/caracteristicas/${id}`, { method: 'DELETE' });
  }
};
```

---

## 🪝 CUSTOM HOOKS

### useMarcas Hook

**hooks/useMarcas.js**
```javascript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { marcasApi } from '../api/marcas.api';
import toast from 'react-hot-toast';

export const useMarcas = (filters = {}) => {
  return useQuery({
    queryKey: ['marcas', filters],
    queryFn: () => marcasApi.getAll(filters)
  });
};

export const useMarca = (id) => {
  return useQuery({
    queryKey: ['marca', id],
    queryFn: () => marcasApi.getById(id),
    enabled: !!id
  });
};

export const useMarcaBySlug = (slug) => {
  return useQuery({
    queryKey: ['marca', 'slug', slug],
    queryFn: () => marcasApi.getBySlug(slug),
    enabled: !!slug
  });
};

export const useCreateMarca = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: marcasApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['marcas']);
      toast.success('Marca creada exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al crear marca');
    }
  });
};

export const useUpdateMarca = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => marcasApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['marcas']);
      queryClient.invalidateQueries(['marca', variables.id]);
      toast.success('Marca actualizada exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al actualizar marca');
    }
  });
};

export const useDeleteMarca = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: marcasApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['marcas']);
      toast.success('Marca eliminada exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al eliminar marca');
    }
  });
};
```

### useVehiculos Hook

**hooks/useVehiculos.js**
```javascript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { vehiculosApi } from '../api/vehiculos.api';
import toast from 'react-hot-toast';

export const useVehiculos = (filters = {}) => {
  return useQuery({
    queryKey: ['vehiculos', filters],
    queryFn: () => vehiculosApi.getAll(filters)
  });
};

export const useVehiculo = (id) => {
  return useQuery({
    queryKey: ['vehiculo', id],
    queryFn: () => vehiculosApi.getById(id),
    enabled: !!id
  });
};

export const useVehiculoBySlug = (slug) => {
  return useQuery({
    queryKey: ['vehiculo', 'slug', slug],
    queryFn: () => vehiculosApi.getBySlug(slug),
    enabled: !!slug
  });
};

export const useCreateVehiculo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: vehiculosApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['vehiculos']);
      toast.success('Vehículo creado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al crear vehículo');
    }
  });
};

export const useUpdateVehiculo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => vehiculosApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['vehiculos']);
      queryClient.invalidateQueries(['vehiculo', variables.id]);
      toast.success('Vehículo actualizado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al actualizar vehículo');
    }
  });
};

export const useDeleteVehiculo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: vehiculosApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['vehiculos']);
      toast.success('Vehículo eliminado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al eliminar vehículo');
    }
  });
};

export const useAddImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ vehiculoId, images, options }) => 
      vehiculosApi.addImages(vehiculoId, images, options),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['vehiculo', variables.vehiculoId]);
      toast.success('Imágenes agregadas exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al agregar imágenes');
    }
  });
};

export const useDeleteImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: vehiculosApi.deleteImage,
    onSuccess: () => {
      queryClient.invalidateQueries(['vehiculo']);
      toast.success('Imagen eliminada exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al eliminar imagen');
    }
  });
};

export const useAddVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ vehiculoId, video, metadata }) => 
      vehiculosApi.addVideo(vehiculoId, video, metadata),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['vehiculo', variables.vehiculoId]);
      toast.success('Video agregado exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al agregar video');
    }
  });
};

export const useAssignCaracteristicas = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ vehiculoId, caracteristicasIds }) => 
      vehiculosApi.assignCaracteristicas(vehiculoId, caracteristicasIds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['vehiculo', variables.vehiculoId]);
      toast.success('Características asignadas exitosamente');
    },
    onError: (error) => {
      toast.error(error.message || 'Error al asignar características');
    }
  });
};
```

---

## 📦 COMPONENTES Y PATTERNS

### Layout Components

**PublicLayout.jsx**
```javascript
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
```

**AdminLayout.jsx**
```javascript
import { Outlet } from 'react-router-dom';
import Sidebar from '../admin/Sidebar';
import { useAuth } from '../../hooks/useAuth';

const AdminLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen">
      <Sidebar user={user} onLogout={logout} />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
```

### Ejemplo de Página Pública

**pages/public/Catalogo.jsx**
```javascript
import { useParams } from 'react-router-dom';
import { useMarcaBySlug } from '../../hooks/useMarcas';
import { useVehiculos } from '../../hooks/useVehiculos';
import VehiculoCard from '../../components/features/vehiculos/VehiculoCard';
import Spinner from '../../components/common/Spinner';

const Catalogo = () => {
  const { slug } = useParams();
  
  // Obtener marca por slug
  const { data: marcaData, isLoading: marcaLoading } = useMarcaBySlug(slug);
  
  // Obtener vehículos de la marca
  const { data: vehiculosData, isLoading: vehiculosLoading } = useVehiculos({
    marcaId: marcaData?.marca?.id,
    disponible: true
  });

  if (marcaLoading || vehiculosLoading) {
    return <Spinner />;
  }

  const marca = marcaData?.marca;
  const vehiculos = vehiculosData?.vehiculos || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">{marca?.nombre}</h1>
        <p className="text-gray-600 mt-2">{marca?.descripcion}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehiculos.map(vehiculo => (
          <VehiculoCard key={vehiculo.id} vehiculo={vehiculo} />
        ))}
      </div>

      {vehiculos.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          No hay vehículos disponibles en este momento
        </p>
      )}
    </div>
  );
};

export default Catalogo;
```

### Ejemplo de Página Admin

**pages/admin/MarcasManage.jsx**
```javascript
import { useState } from 'react';
import { useMarcas, useDeleteMarca } from '../../hooks/useMarcas';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import MarcaForm from '../../components/features/marcas/MarcaForm';

const MarcasManage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMarca, setSelectedMarca] = useState(null);

  const { data, isLoading } = useMarcas();
  const deleteMarca = useDeleteMarca();

  const marcas = data?.marcas || [];

  const handleEdit = (marca) => {
    setSelectedMarca(marca);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta marca?')) {
      await deleteMarca.mutateAsync(id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMarca(null);
  };

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Marcas</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          Nueva Marca
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {marcas.map(marca => (
          <div key={marca.id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{marca.nombre}</h3>
            <p className="text-gray-600 mt-2">{marca.slug}</p>
            <div className="flex gap-2 mt-4">
              <Button size="sm" onClick={() => handleEdit(marca)}>
                Editar
              </Button>
              <Button 
                size="sm" 
                variant="danger"
                onClick={() => handleDelete(marca.id)}
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={selectedMarca ? 'Editar Marca' : 'Nueva Marca'}
      >
        <MarcaForm 
          marca={selectedMarca} 
          onSuccess={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default MarcasManage;
```

---

## 📤 UPLOAD DE ARCHIVOS

### ImageUploader Component

**components/common/ImageUploader.jsx**
```javascript
import { useState } from 'react';

const ImageUploader = ({ 
  onFilesSelected, 
  multiple = false,
  accept = "image/*",
  maxFiles = 10 
}) => {
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > maxFiles) {
      alert(`Máximo ${maxFiles} archivos permitidos`);
      return;
    }

    // Generar previews
    const newPreviews = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));

    setPreviews(newPreviews);
    onFilesSelected(files);
  };

  const removePreview = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    
    const newFiles = newPreviews.map(p => p.file);
    onFilesSelected(newFiles);
  };

  return (
    <div>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <img 
                src={preview.url} 
                alt={`Preview ${index}`}
                className="w-full h-32 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => removePreview(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
```

### Uso en Formulario

```javascript
import { useState } from 'react';
import { useAddImages } from '../../hooks/useVehiculos';
import ImageUploader from '../common/ImageUploader';

const AddImagesForm = ({ vehiculoId, onSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const addImages = useAddImages();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedFiles.length === 0) {
      alert('Selecciona al menos una imagen');
      return;
    }

    await addImages.mutateAsync({
      vehiculoId,
      images: selectedFiles,
      options: {
        esPrincipal: false,
        orden: 0
      }
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <ImageUploader 
        multiple={true}
        maxFiles={10}
        onFilesSelected={setSelectedFiles}
      />
      
      <button 
        type="submit"
        disabled={addImages.isLoading || selectedFiles.length === 0}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {addImages.isLoading ? 'Subiendo...' : 'Subir Imágenes'}
      </button>
    </form>
  );
};
```

---

## 📝 FORMULARIOS

### Ejemplo con React Hook Form + Zod

**components/features/marcas/MarcaForm.jsx**
```javascript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateMarca, useUpdateMarca } from '../../../hooks/useMarcas';
import Input from '../../common/Input';
import Button from '../../common/Button';

const marcaSchema = z.object({
  nombre: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  slug: z.string().min(2, 'Slug debe tener al menos 2 caracteres'),
  descripcion: z.string().optional(),
  activa: z.boolean(),
  orden: z.number().min(0).optional(),
  colorPrimario: z.string().optional(),
  colorSecundario: z.string().optional()
});

const MarcaForm = ({ marca, onSuccess }) => {
  const createMarca = useCreateMarca();
  const updateMarca = useUpdateMarca();
  
  const isEditing = !!marca;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(marcaSchema),
    defaultValues: marca || {
      nombre: '',
      slug: '',
      descripcion: '',
      activa: true,
      orden: 0
    }
  });

  // Auto-generar slug desde nombre
  const nombre = watch('nombre');
  const handleNombreChange = (e) => {
    const value = e.target.value;
    setValue('nombre', value);
    
    // Generar slug automáticamente
    const slug = value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
    setValue('slug', slug);
  };

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await updateMarca.mutateAsync({ id: marca.id, data });
      } else {
        await createMarca.mutateAsync(data);
      }
      onSuccess();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Nombre"
        {...register('nombre')}
        onChange={handleNombreChange}
        error={errors.nombre?.message}
      />

      <Input
        label="Slug"
        {...register('slug')}
        error={errors.slug?.message}
        placeholder="toyota"
      />

      <div>
        <label className="block text-sm font-medium mb-2">
          Descripción
        </label>
        <textarea
          {...register('descripcion')}
          rows={4}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('activa')}
          className="mr-2"
        />
        <label>Marca activa</label>
      </div>

      <Input
        label="Orden"
        type="number"
        {...register('orden', { valueAsNumber: true })}
        error={errors.orden?.message}
      />

      <Input
        label="Color Primario"
        type="color"
        {...register('colorPrimario')}
      />

      <Input
        label="Color Secundario"
        type="color"
        {...register('colorSecundario')}
      />

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}
        </Button>
      </div>
    </form>
  );
};

export default MarcaForm;
```

---

## ⚠️ MANEJO DE ERRORES

### Error Boundary

**components/ErrorBoundary.jsx**
```javascript
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Algo salió mal</h1>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message || 'Error desconocido'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

## 📋 CHECKLIST DE IMPLEMENTACIÓN

### Setup Inicial
- [ ] Inicializar proyecto con CRA
- [ ] Instalar dependencias (React Router, TanStack Query, etc.)
- [ ] Configurar Tailwind CSS
- [ ] Crear estructura de carpetas
- [ ] Configurar variables de entorno (.env)

### Autenticación
- [ ] Crear AuthContext
- [ ] Implementar useAuth hook
- [ ] Crear ProtectedRoute component
- [ ] Implementar Login page
- [ ] Configurar persistencia de token en localStorage

### Servicios API
- [ ] Configurar cliente HTTP (api/client.js)
- [ ] Implementar servicios de marcas
- [ ] Implementar servicios de vehículos
- [ ] Implementar servicios de características
- [ ] Configurar Authorization header en todas las requests

### TanStack Query
- [ ] Configurar QueryClient en App.jsx
- [ ] Crear hooks de marcas (useMarcas, useCreateMarca, etc.)
- [ ] Crear hooks de vehículos
- [ ] Crear hooks de características
- [ ] Configurar invalidación de caché

### Routing
- [ ] Configurar React Router
- [ ] Crear rutas públicas (Home, Catálogo, Detalle, Contacto)
- [ ] Crear rutas admin protegidas
- [ ] Implementar layouts (Public, Admin)
- [ ] Configurar navegación entre vistas

### Componentes
- [ ] Crear componentes de layout (Navbar, Footer, Sidebar)
- [ ] Crear componentes comunes (Button, Input, Card, Modal)
- [ ] Crear componentes específicos (VehiculoCard, MarcaCard, etc.)
- [ ] Implementar ImageUploader component
- [ ] Crear formularios con React Hook Form

### Páginas Públicas
- [ ] Implementar Home (selector de marcas)
- [ ] Implementar Catálogo (listado de vehículos por marca)
- [ ] Implementar Detalle de Vehículo
- [ ] Implementar página de Contacto

### Dashboard Admin
- [ ] Implementar página de Dashboard
- [ ] Implementar gestión de Marcas (CRUD)
- [ ] Implementar gestión de Vehículos (CRUD)
- [ ] Implementar gestión de Características (CRUD)
- [ ] Implementar upload de imágenes
- [ ] Implementar upload de videos

### Testing & Deployment
- [ ] Probar flujo de autenticación
- [ ] Probar CRUD de todas las entidades
- [ ] Probar upload de archivos
- [ ] Verificar responsiveness
- [ ] Build de producción
- [ ] Deploy

---

**Este prompt garantiza una arquitectura sólida, escalable y mantenible para el sistema de concesionaria. 🚀**
