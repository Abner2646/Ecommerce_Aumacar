// src/pages/public/Login.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

// Schema de validación con Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Ingresa un email válido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Si ya está autenticado, redirigir al dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await login(data.email, data.password);

      if (result.success) {
        toast.success('¡Bienvenido!');
        navigate('/admin/dashboard');
      } else {
        toast.error(result.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      toast.error('Error al iniciar sesión. Intenta nuevamente.');
      console.error('Error en login:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Lado izquierdo - Imagen/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16">
          {/* Logo o Marca */}
          <div>
            <h1 className="text-4xl xl:text-5xl font-bold text-white tracking-tight">
              Concesionaria
            </h1>
            <p className="text-gray-400 mt-2 text-lg">Panel de Administración</p>
          </div>

          {/* Mensaje motivacional */}
          <div className="space-y-6">
            <p className="text-gray-300 text-xl xl:text-2xl font-light leading-relaxed">
              "La excelencia en la gestión de tu concesionaria comienza aquí"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-gray-600" />
              <span className="text-gray-500 text-sm tracking-wider uppercase">Premium Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lado derecho - Formulario */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-md space-y-10">
          {/* Header */}
          <div className="space-y-3">
            <h2 className="text-h1-mobile lg:text-h1-desktop text-gray-900 font-semibold tracking-tight">
              Iniciar Sesión
            </h2>
            <p className="text-body-mobile lg:text-body-desktop text-gray-600">
              Accede a tu panel de administración
            </p>
          </div>

          {/* Formulario */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-900 tracking-wide"
              >
                Email
              </label>
              <input
                {...register('email')}
                id="email"
                type="email"
                autoComplete="email"
                className={`w-full px-4 py-3.5 bg-white border ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                } rounded-lg text-gray-900 placeholder-gray-400
                focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900
                transition-all duration-200 text-base`}
                placeholder="admin@concesionaria.com"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1.5 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-900 tracking-wide"
              >
                Contraseña
              </label>
              <input
                {...register('password')}
                id="password"
                type="password"
                autoComplete="current-password"
                className={`w-full px-4 py-3.5 bg-white border ${
                  errors.password ? 'border-red-500' : 'border-gray-200'
                } rounded-lg text-gray-900 placeholder-gray-400
                focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900
                transition-all duration-200 text-base`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1.5 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-lg font-medium text-base
                transition-all duration-200 tracking-wide
                ${isSubmitting
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-950'
                }
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                shadow-sm hover:shadow-md`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;