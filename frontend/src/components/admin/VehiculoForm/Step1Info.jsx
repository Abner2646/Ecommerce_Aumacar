// /src/components/admin/VehiculoForm/Step1Info.jsx 

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMarcas } from '../../../hooks/useMarcas';

const step1Schema = z.object({
  marcaId: z.number().min(1, 'Marca es requerida'),
  modelo: z.string().min(2, 'Modelo debe tener al menos 2 caracteres'),
  version: z.string().min(2, 'Versión debe tener al menos 2 caracteres'),
  año: z.number()
    .min(1990, 'Año debe ser mayor a 1990')
    .max(new Date().getFullYear() + 1, 'Año inválido'),
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

const Step1Info = ({ data, onNext, onCancel }) => {
  const { data: marcasData, isLoading: marcasLoading } = useMarcas({ activa: true });
  const marcas = marcasData?.marcas || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
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

  // Auto-generar slug
  const modelo = watch('modelo');
  const version = watch('version');
  const año = watch('año');
  const marcaId = watch('marcaId');

  const handleModeloChange = (e) => {
    const value = e.target.value;
    setValue('modelo', value);
    generarSlug();
  };

  const handleVersionChange = (e) => {
    const value = e.target.value;
    setValue('version', value);
    generarSlug();
  };

  const handleAñoChange = (e) => {
    const value = parseInt(e.target.value);
    setValue('año', value);
    generarSlug();
  };

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
    // Convertir marcaId a número
    formData.marcaId = parseInt(formData.marcaId);
    onNext(formData);
  };

  if (marcasLoading) {
    return <div className="adm-table-loading">Cargando marcas...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="adm-step-form">
      <div className="adm-step-header">
        <h3 className="adm-step-title">Paso 1: Información Básica</h3>
        <p className="adm-step-description">
          Completa los datos principales del vehículo
        </p>
      </div>

      <div className="adm-step-body">
        {/* Grid 2 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Marca */}
          <div>
            <label className="adm-form-label">
              Marca <span className="text-red-500">*</span>
            </label>
            <select
              {...register('marcaId', { valueAsNumber: true })}
              className={`adm-form-input ${errors.marcaId ? 'adm-form-input-error' : ''}`}
              onChange={(e) => {
                setValue('marcaId', parseInt(e.target.value));
                generarSlug();
              }}
            >
              <option value="">Selecciona una marca</option>
              {marcas.map(marca => (
                <option key={marca.id} value={marca.id}>
                  {marca.nombre}
                </option>
              ))}
            </select>
            {errors.marcaId && (
              <p className="adm-form-error">{errors.marcaId.message}</p>
            )}
          </div>

          {/* Modelo */}
          <div>
            <label className="adm-form-label">
              Modelo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('modelo')}
              onChange={handleModeloChange}
              className={`adm-form-input ${errors.modelo ? 'adm-form-input-error' : ''}`}
              placeholder="Ej: Corolla, Outback"
            />
            {errors.modelo && (
              <p className="adm-form-error">{errors.modelo.message}</p>
            )}
          </div>

          {/* Versión */}
          <div>
            <label className="adm-form-label">
              Versión <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('version')}
              onChange={handleVersionChange}
              className={`adm-form-input ${errors.version ? 'adm-form-input-error' : ''}`}
              placeholder="Ej: XEI 2.0, Premium"
            />
            {errors.version && (
              <p className="adm-form-error">{errors.version.message}</p>
            )}
          </div>

          {/* Año */}
          <div>
            <label className="adm-form-label">
              Año <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('año', { valueAsNumber: true })}
              onChange={handleAñoChange}
              className={`adm-form-input ${errors.año ? 'adm-form-input-error' : ''}`}
            />
            {errors.año && (
              <p className="adm-form-error">{errors.año.message}</p>
            )}
          </div>

          {/* Precio */}
          <div>
            <label className="adm-form-label">
              Precio (ARS) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register('precio', { valueAsNumber: true })}
              className={`adm-form-input ${errors.precio ? 'adm-form-input-error' : ''}`}
              placeholder="25000000.00"
            />
            {errors.precio && (
              <p className="adm-form-error">{errors.precio.message}</p>
            )}
          </div>

          {/* Categoría */}
          <div>
            <label className="adm-form-label">
              Categoría <span className="text-red-500">*</span>
            </label>
            <select
              {...register('categoria')}
              className={`adm-form-input ${errors.categoria ? 'adm-form-input-error' : ''}`}
            >
              {CATEGORIAS.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.categoria && (
              <p className="adm-form-error">{errors.categoria.message}</p>
            )}
          </div>

          {/* Stock */}
          <div>
            <label className="adm-form-label">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('stock', { valueAsNumber: true })}
              className={`adm-form-input ${errors.stock ? 'adm-form-input-error' : ''}`}
            />
            {errors.stock && (
              <p className="adm-form-error">{errors.stock.message}</p>
            )}
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('disponible')}
                className="adm-form-checkbox"
                id="disponible"
              />
              <label htmlFor="disponible" className="ml-2 text-gray-700">
                Disponible
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('destacado')}
                className="adm-form-checkbox"
                id="destacado"
              />
              <label htmlFor="destacado" className="ml-2 text-gray-700">
                Destacado
              </label>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="adm-section-divider">
          <span>Especificaciones Técnicas</span>
        </div>

        {/* Grid 3 columnas para specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Motor */}
          <div>
            <label className="adm-form-label">
              Motor <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('motor')}
              className={`adm-form-input ${errors.motor ? 'adm-form-input-error' : ''}`}
              placeholder="Ej: 2.0L, 1.6L Turbo"
            />
            {errors.motor && (
              <p className="adm-form-error">{errors.motor.message}</p>
            )}
          </div>

          {/* Combustible */}
          <div>
            <label className="adm-form-label">
              Combustible <span className="text-red-500">*</span>
            </label>
            <select
              {...register('combustible')}
              className="adm-form-input"
            >
              {COMBUSTIBLES.map(comb => (
                <option key={comb.value} value={comb.value}>
                  {comb.label}
                </option>
              ))}
            </select>
          </div>

          {/* Transmisión */}
          <div>
            <label className="adm-form-label">
              Transmisión <span className="text-red-500">*</span>
            </label>
            <select
              {...register('transmision')}
              className="adm-form-input"
            >
              {TRANSMISIONES.map(trans => (
                <option key={trans.value} value={trans.value}>
                  {trans.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tracción */}
          <div>
            <label className="adm-form-label">
              Tracción <span className="text-red-500">*</span>
            </label>
            <select
              {...register('traccion')}
              className="adm-form-input"
            >
              {TRACCIONES.map(tracc => (
                <option key={tracc.value} value={tracc.value}>
                  {tracc.label}
                </option>
              ))}
            </select>
          </div>

          {/* Puertas */}
          <div>
            <label className="adm-form-label">
              Puertas <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('puertas', { valueAsNumber: true })}
              className={`adm-form-input ${errors.puertas ? 'adm-form-input-error' : ''}`}
              min="2"
              max="5"
            />
            {errors.puertas && (
              <p className="adm-form-error">{errors.puertas.message}</p>
            )}
          </div>

          {/* Pasajeros */}
          <div>
            <label className="adm-form-label">
              Pasajeros <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('pasajeros', { valueAsNumber: true })}
              className={`adm-form-input ${errors.pasajeros ? 'adm-form-input-error' : ''}`}
              min="2"
              max="9"
            />
            {errors.pasajeros && (
              <p className="adm-form-error">{errors.pasajeros.message}</p>
            )}
          </div>

          {/* Cilindrada */}
          <div>
            <label className="adm-form-label">Cilindrada</label>
            <input
              type="text"
              {...register('cilindrada')}
              className="adm-form-input"
              placeholder="Ej: 2000cc"
            />
          </div>

          {/* Potencia */}
          <div>
            <label className="adm-form-label">Potencia</label>
            <input
              type="text"
              {...register('potencia')}
              className="adm-form-input"
              placeholder="Ej: 170 CV"
            />
          </div>

          {/* Torque */}
          <div>
            <label className="adm-form-label">Torque</label>
            <input
              type="text"
              {...register('torque')}
              className="adm-form-input"
              placeholder="Ej: 210 Nm"
            />
          </div>
        </div>

        {/* Separador */}
        <div className="adm-section-divider">
          <span>Descripciones</span>
        </div>

        {/* Descripciones */}
        <div className="space-y-6">
          {/* Descripción Corta */}
          <div>
            <label className="adm-form-label">
              Descripción Corta <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('descripcionCorta')}
              rows={2}
              className={`adm-form-input ${errors.descripcionCorta ? 'adm-form-input-error' : ''}`}
              placeholder="Descripción breve para cards y listados (máx 150 caracteres)"
              maxLength={150}
            />
            {errors.descripcionCorta && (
              <p className="adm-form-error">{errors.descripcionCorta.message}</p>
            )}
          </div>

          {/* Descripción Completa */}
          <div>
            <label className="adm-form-label">
              Descripción Completa <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('descripcionCompleta')}
              rows={6}
              className={`adm-form-input ${errors.descripcionCompleta ? 'adm-form-input-error' : ''}`}
              placeholder="Descripción detallada del vehículo para la página de detalle"
            />
            {errors.descripcionCompleta && (
              <p className="adm-form-error">{errors.descripcionCompleta.message}</p>
            )}
          </div>
        </div>

        {/* Separador */}
        <div className="adm-section-divider">
          <span>SEO</span>
        </div>

        {/* SEO */}
        <div className="space-y-6">
          {/* Slug */}
          <div>
            <label className="adm-form-label">
              Slug (URL) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('slug')}
              className={`adm-form-input ${errors.slug ? 'adm-form-input-error' : ''}`}
              placeholder="toyota-corolla-xei-2024"
            />
            {errors.slug && (
              <p className="adm-form-error">{errors.slug.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-2">
              URL: /vehiculos/{watch('slug') || 'slug-del-vehiculo'}
            </p>
          </div>

          {/* Meta Title */}
          <div>
            <label className="adm-form-label">Meta Title (SEO)</label>
            <input
              type="text"
              {...register('metaTitle')}
              className="adm-form-input"
              placeholder="Título para buscadores (opcional)"
              maxLength={60}
            />
            <p className="text-xs text-gray-500 mt-2">
              Recomendado: 50-60 caracteres
            </p>
          </div>

          {/* Meta Description */}
          <div>
            <label className="adm-form-label">Meta Description (SEO)</label>
            <textarea
              {...register('metaDescription')}
              rows={2}
              className="adm-form-input"
              placeholder="Descripción para buscadores (opcional)"
              maxLength={160}
            />
            <p className="text-xs text-gray-500 mt-2">
              Recomendado: 150-160 caracteres
            </p>
          </div>
        </div>
      </div>

      {/* Footer con botones */}
      <div className="adm-step-footer">
        <button
          type="button"
          onClick={onCancel}
          className="adm-btn adm-btn-secondary"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="adm-btn adm-btn-primary"
        >
          Siguiente: Imágenes
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </form>
  );
};

export default Step1Info;