// /src/components/admin/VehiculoForm/Step1Info.jsx

import { useEffect } from 'react'; // <--- Importación agregada
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMarcas } from '../../../hooks/useMarcas';

const step1Schema = z.object({
  marcaId: z.number({ required_error: 'Marca es requerida' }).min(1, 'Marca es requerida'),
  modelo: z.string().min(2, 'Modelo debe tener al menos 2 caracteres'),
  version: z.string().min(2, 'Versión debe tener al menos 2 caracteres'),
  año: z.number().min(1990, 'Año debe ser mayor a 1990').max(new Date().getFullYear() + 1, 'Año inválido'),
  precio: z.number().min(0, 'Precio debe ser mayor a 0'),
  categoria: z.enum(['sedan', 'suv', 'pickup', 'hatchback', 'coupe', 'minivan', 'deportivo', 'otro']),
  stock: z.number().min(0, 'Stock debe ser 0 o mayor'),
  disponible: z.boolean(),
  destacado: z.boolean(),
  motor: z.string().min(1, 'Motor es requerido'),
  combustible: z.enum(['nafta', 'diesel', 'hibrido', 'electrico', 'gnc']),
  transmision: z.enum(['manual', 'automatica', 'cvt']),
  traccion: z.enum(['delantera', 'trasera', '4x4', 'awd']),
  puertas: z.number().min(2).max(5),
  pasajeros: z.number().min(2).max(9),
  cilindrada: z.string().optional(),
  potencia: z.string().optional(),
  torque: z.string().optional(),
  descripcionCorta: z.string().min(10, 'Descripción corta debe tener al menos 10 caracteres'),
  descripcionCompleta: z.string().min(50, 'Descripción completa debe tener al menos 50 caracteres'),
  slug: z.string().min(2, 'Slug es requerido').regex(/^[a-z0-9-]+$/, 'Solo minúsculas, números y guiones'),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional()
});

const CATEGORIAS = [
  { value: 'sedan', label: 'Sedán' },
  { value: 'suv', label: 'SUV' },
  { value: 'pickup', label: 'Pickup' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'coupe', label: 'Coupé' },
  { value: 'minivan', label: 'Minivan' },
  { value: 'deportivo', label: 'Deportivo' },
  { value: 'otro', label: 'Otro' }
];

const COMBUSTIBLES = [
  { value: 'nafta', label: 'Nafta' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'hibrido', label: 'Híbrido' },
  { value: 'electrico', label: 'Eléctrico' },
  { value: 'gnc', label: 'GNC' }
];

const TRANSMISIONES = [
  { value: 'manual', label: 'Manual' },
  { value: 'automatica', label: 'Automática' },
  { value: 'cvt', label: 'CVT' }
];

const TRACCIONES = [
  { value: 'delantera', label: 'Delantera' },
  { value: 'trasera', label: 'Trasera' },
  { value: '4x4', label: '4x4' },
  { value: 'awd', label: 'AWD' }
];

const Step1Info = ({ data, onNext, onCancel, isSubmitting = false }) => {
  const { data: marcasData, isLoading: marcasLoading } = useMarcas({ activa: true });
  const marcas = marcasData?.marcas || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: data || {
      marcaId: '',
      modelo: '',
      version: '',
      año: new Date().getFullYear(),
      precio: 0,
      categoria: 'sedan',
      stock: 1,
      disponible: true,
      destacado: false,
      motor: '',
      combustible: 'nafta',
      transmision: 'manual',
      traccion: 'delantera',
      puertas: 4,
      pasajeros: 5,
      cilindrada: '',
      potencia: '',
      torque: '',
      descripcionCorta: '',
      descripcionCompleta: '',
      slug: '',
      metaTitle: '',
      metaDescription: ''
    }
  });

  // --- NUEVO CODIGO AÑADIDO ---
  // Resetear formulario cuando llegan los datos (especialmente útil en edición asíncrona)
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      reset(data);
    }
  }, [data, reset]);
  // ----------------------------

  const modelo = watch('modelo');
  const version = watch('version');
  const año = watch('año');
  const marcaId = watch('marcaId');

  const generarSlug = () => {
    if (!modelo || !version || !año || !marcaId) return;

    const marca = marcas.find(m => m.id === parseInt(marcaId));
    if (!marca) return;

    const slug = `${marca.slug}-${modelo}-${version}-${año}`
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
    
    setValue('slug', slug);
  };

  const onSubmit = (formData) => {
    formData.marcaId = parseInt(formData.marcaId);
    onNext(formData);
  };

  if (marcasLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <i className="fa-solid fa-spinner fa-spin text-2xl text-gray-400"></i>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Información Básica</h3>
        <p className="text-sm text-gray-500 mt-1">Completa los datos principales del vehículo</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Marca */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Marca <span className="text-red-500">*</span>
            </label>
            <select
              {...register('marcaId', { valueAsNumber: true })}
              onChange={(e) => {
                setValue('marcaId', parseInt(e.target.value));
                generarSlug();
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.marcaId ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Selecciona una marca</option>
              {marcas.map(marca => (
                <option key={marca.id} value={marca.id}>{marca.nombre}</option>
              ))}
            </select>
            {errors.marcaId && <p className="text-red-500 text-sm mt-1">{errors.marcaId.message}</p>}
          </div>

          {/* Modelo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modelo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('modelo')}
              onChange={(e) => { setValue('modelo', e.target.value); generarSlug(); }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.modelo ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ej: Corolla, Outback"
            />
            {errors.modelo && <p className="text-red-500 text-sm mt-1">{errors.modelo.message}</p>}
          </div>

          {/* Versión */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Versión <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('version')}
              onChange={(e) => { setValue('version', e.target.value); generarSlug(); }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.version ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ej: XEI 2.0, Premium"
            />
            {errors.version && <p className="text-red-500 text-sm mt-1">{errors.version.message}</p>}
          </div>

          {/* Año */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Año <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('año', { valueAsNumber: true })}
              onChange={(e) => { setValue('año', parseInt(e.target.value)); generarSlug(); }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.año ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.año && <p className="text-red-500 text-sm mt-1">{errors.año.message}</p>}
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio (USD) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register('precio', { valueAsNumber: true })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.precio ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.precio && <p className="text-red-500 text-sm mt-1">{errors.precio.message}</p>}
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría <span className="text-red-500">*</span>
            </label>
            <select
              {...register('categoria')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              {CATEGORIAS.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
              type="number"
              {...register('stock', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6 items-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...register('disponible')} className="w-4 h-4 rounded" />
              <span className="text-sm text-gray-700">Disponible</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" {...register('destacado')} className="w-4 h-4 rounded" />
              <span className="text-sm text-gray-700">Destacado</span>
            </label>
          </div>
        </div>

        {/* Separator */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center"><span className="bg-white px-3 text-sm text-gray-500">Especificaciones Técnicas</span></div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Motor <span className="text-red-500">*</span></label>
            <input type="text" {...register('motor')} placeholder="Ej: 2.0L Turbo" className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.motor ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.motor && <p className="text-red-500 text-sm mt-1">{errors.motor.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Combustible</label>
            <select {...register('combustible')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent">
              {COMBUSTIBLES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transmisión</label>
            <select {...register('transmision')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent">
              {TRANSMISIONES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tracción</label>
            <select {...register('traccion')} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent">
              {TRACCIONES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Puertas</label>
            <input type="number" {...register('puertas', { valueAsNumber: true })} min="2" max="5" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pasajeros</label>
            <input type="number" {...register('pasajeros', { valueAsNumber: true })} min="2" max="9" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cilindrada</label>
            <input type="text" {...register('cilindrada')} placeholder="Ej: 2000cc" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Potencia</label>
            <input type="text" {...register('potencia')} placeholder="Ej: 170 CV" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Torque</label>
            <input type="text" {...register('torque')} placeholder="Ej: 210 Nm" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
          </div>
        </div>

        {/* Separator */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center"><span className="bg-white px-3 text-sm text-gray-500">Descripciones y SEO</span></div>
        </div>

        {/* Descripciones */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Corta <span className="text-red-500">*</span></label>
            <textarea {...register('descripcionCorta')} rows={2} maxLength={150} placeholder="Descripción breve para cards" className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.descripcionCorta ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.descripcionCorta && <p className="text-red-500 text-sm mt-1">{errors.descripcionCorta.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Completa <span className="text-red-500">*</span></label>
            <textarea {...register('descripcionCompleta')} rows={4} placeholder="Descripción detallada del vehículo" className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.descripcionCompleta ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.descripcionCompleta && <p className="text-red-500 text-sm mt-1">{errors.descripcionCompleta.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL) <span className="text-red-500">*</span></label>
            <input type="text" {...register('slug')} placeholder="toyota-corolla-xei-2024" className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.slug ? 'border-red-500' : 'border-gray-300'}`} />
            {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
            <p className="text-xs text-gray-500 mt-1">URL: /vehiculos/{watch('slug') || 'slug-del-vehiculo'}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title (SEO)</label>
              <input type="text" {...register('metaTitle')} maxLength={60} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description (SEO)</label>
              <input type="text" {...register('metaDescription')} maxLength={160} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          Cancelar
        </button>
        <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
          {isSubmitting ? <i className="fa-solid fa-spinner fa-spin"></i> : null}
          Siguiente: Colores
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </form>
  );
};

export default Step1Info;