// /src/components/admin/CaracteristicaForm.jsx

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateCaracteristica, useUpdateCaracteristica } from '../../hooks/useCaracteristicas';

const caracteristicaSchema = z.object({
  nombre: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  icono: z.string().min(2, 'Icono es requerido'),
  tipo: z.enum(['seguridad', 'confort', 'tecnologia', 'exterior', 'interior', 'performance'], {
    errorMap: () => ({ message: 'Tipo inválido' })
  }),
  activa: z.boolean()
});

const TIPOS_CARACTERISTICA = [
  { value: 'seguridad', label: 'Seguridad' },
  { value: 'confort', label: 'Confort' },
  { value: 'tecnologia', label: 'Tecnología' },
  { value: 'exterior', label: 'Exterior' },
  { value: 'interior', label: 'Interior' },
  { value: 'performance', label: 'Performance' }
];

const ICONOS_COMUNES = [
  { value: 'fa-shield-alt', label: 'Escudo (Seguridad)', preview: 'fa-shield-alt' },
  { value: 'fa-snowflake', label: 'Aire Acondicionado', preview: 'fa-snowflake' },
  { value: 'fa-gauge-high', label: 'Velocímetro', preview: 'fa-gauge-high' },
  { value: 'fa-wifi', label: 'WiFi/Conectividad', preview: 'fa-wifi' },
  { value: 'fa-bluetooth', label: 'Bluetooth', preview: 'fa-bluetooth' },
  { value: 'fa-camera', label: 'Cámara', preview: 'fa-camera' },
  { value: 'fa-volume-high', label: 'Audio/Sonido', preview: 'fa-volume-high' },
  { value: 'fa-sun', label: 'Techo Solar', preview: 'fa-sun' },
  { value: 'fa-car-side', label: 'Auto (Lateral)', preview: 'fa-car-side' },
  { value: 'fa-bolt', label: 'Potencia/Eléctrico', preview: 'fa-bolt' },
  { value: 'fa-mountain', label: 'Todo Terreno', preview: 'fa-mountain' },
  { value: 'fa-award', label: 'Premio/Destacado', preview: 'fa-award' },
  { value: 'fa-steering-wheel', label: 'Volante', preview: 'fa-steering-wheel' },
  { value: 'fa-key', label: 'Llave/Encendido', preview: 'fa-key' },
  { value: 'fa-gears', label: 'Engranajes/Mecánica', preview: 'fa-gears' }
];

const CaracteristicaForm = ({ caracteristica, onSuccess }) => {
  const createCaracteristica = useCreateCaracteristica();
  const updateCaracteristica = useUpdateCaracteristica();
  
  const isEditing = !!caracteristica;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm({
    resolver: zodResolver(caracteristicaSchema),
    defaultValues: caracteristica || {
      nombre: '',
      icono: 'fa-shield-alt',
      tipo: 'seguridad',
      activa: true
    }
  });

  const iconoSeleccionado = watch('icono');

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await updateCaracteristica.mutateAsync({ id: caracteristica.id, data });
      } else {
        await createCaracteristica.mutateAsync(data);
      }
      onSuccess();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Nombre */}
      <div>
        <label className="adm-form-label">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('nombre')}
          className={`adm-form-input ${errors.nombre ? 'adm-form-input-error' : ''}`}
          placeholder="Ej: ABS, Control de crucero"
        />
        {errors.nombre && (
          <p className="adm-form-error">{errors.nombre.message}</p>
        )}
      </div>

      {/* Tipo */}
      <div>
        <label className="adm-form-label">
          Tipo <span className="text-red-500">*</span>
        </label>
        <select
          {...register('tipo')}
          className={`adm-form-input ${errors.tipo ? 'adm-form-input-error' : ''}`}
        >
          {TIPOS_CARACTERISTICA.map((tipo) => (
            <option key={tipo.value} value={tipo.value}>
              {tipo.label}
            </option>
          ))}
        </select>
        {errors.tipo && (
          <p className="adm-form-error">{errors.tipo.message}</p>
        )}
      </div>

      {/* Icono */}
      <div>
        <label className="adm-form-label">
          Icono (FontAwesome) <span className="text-red-500">*</span>
        </label>
        
        {/* Preview del icono seleccionado */}
        <div className="adm-icon-preview mb-4">
          <i className={`fa-solid ${iconoSeleccionado} text-4xl`}></i>
          <span className="text-sm text-gray-600 ml-4">{iconoSeleccionado}</span>
        </div>

        {/* Select de iconos */}
        <select
          {...register('icono')}
          className={`adm-form-input ${errors.icono ? 'adm-form-input-error' : ''}`}
        >
          {ICONOS_COMUNES.map((icono) => (
            <option key={icono.value} value={icono.value}>
              {icono.label}
            </option>
          ))}
        </select>

        {/* Input manual (por si quieren otro icono) */}
        <div className="mt-2">
          <input
            type="text"
            {...register('icono')}
            className="adm-form-input"
            placeholder="O ingresa manualmente: fa-car, fa-shield, etc."
          />
        </div>

        {errors.icono && (
          <p className="adm-form-error">{errors.icono.message}</p>
        )}

        <p className="text-xs text-gray-500 mt-2">
          Busca más iconos en{' '}
          <a 
            href="https://fontawesome.com/icons" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            FontAwesome
          </a>
        </p>
      </div>

      {/* Activa */}
      <div className="flex items-center">
        <input
          type="checkbox"
          {...register('activa')}
          className="adm-form-checkbox"
          id="activa"
        />
        <label htmlFor="activa" className="ml-2 text-gray-700">
          Característica activa
        </label>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="adm-btn adm-btn-primary flex-1"
        >
          {isSubmitting ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i>
              Guardando...
            </>
          ) : (
            <>
              <i className="fa-solid fa-check"></i>
              {isEditing ? 'Actualizar' : 'Crear'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CaracteristicaForm;