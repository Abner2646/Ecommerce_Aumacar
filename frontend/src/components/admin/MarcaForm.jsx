// /src/components/admin/MarcaForm.jsx 

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateMarca, useUpdateMarca } from '../../hooks/useMarcas';

const marcaSchema = z.object({
  nombre: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  slug: z.string()
    .min(2, 'Slug debe tener al menos 2 caracteres')
    .regex(/^[a-z0-9-]+$/, 'Solo minúsculas, números y guiones'),
  descripcion: z.string().optional(),
  activa: z.boolean(),
  orden: z.number().min(0, 'Orden debe ser mayor o igual a 0'),
  colorPrimario: z.string().optional(),
  colorSecundario: z.string().optional()
});

const MarcaForm = ({ marca, onSuccess }) => {
  const [logoPreview, setLogoPreview] = useState(marca?.logo || null);
  const [logoFile, setLogoFile] = useState(null);
  
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
      orden: 0,
      colorPrimario: '#000000',
      colorSecundario: '#FFFFFF'
    }
  });

  // Auto-generar slug desde nombre
  const nombre = watch('nombre');
  const handleNombreChange = (e) => {
    const value = e.target.value;
    setValue('nombre', value);
    
    // Solo auto-generar si no estamos editando o si el slug está vacío
    if (!isEditing || !marca?.slug) {
      const slug = value
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Quitar acentos
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
      setValue('slug', slug);
    }
  };

  // Manejar cambio de logo
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar que sea imagen
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen válida');
        return;
      }

      // Validar tamaño (máx 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen no debe superar 2MB');
        return;
      }

      setLogoFile(file);
      
      // Generar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remover logo
  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(marca?.logo || null);
  };

  const onSubmit = async (data) => {
    try {
      // Preparar FormData si hay logo nuevo
      const formData = {
        ...data,
        logo: logoFile
      };

      if (isEditing) {
        await updateMarca.mutateAsync({ id: marca.id, data: formData });
      } else {
        await createMarca.mutateAsync(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Logo Upload */}
      <div>
        <label className="adm-form-label">
          Logo de la Marca
        </label>
        
        {/* Preview del logo */}
        {logoPreview && (
          <div className="adm-logo-preview mb-4">
            <img 
              src={logoPreview} 
              alt="Preview logo" 
              className="adm-logo-preview-img"
            />
            {/*<button
              type="button"
              onClick={handleRemoveLogo}
              className="adm-logo-preview-remove"
              title="Remover logo"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>*/}
          </div>
        )}

        {/* Input de archivo */}
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="adm-file-input"
        />
        <p className="text-xs text-gray-500 mt-2">
          Formato: JPG, PNG, SVG. Tamaño máximo: 2MB. Recomendado: 400x400px
        </p>
      </div>

      {/* Nombre */}
      <div>
        <label className="adm-form-label">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('nombre')}
          onChange={handleNombreChange}
          className={`adm-form-input ${errors.nombre ? 'adm-form-input-error' : ''}`}
          placeholder="Ej: Toyota, Subaru"
        />
        {errors.nombre && (
          <p className="adm-form-error">{errors.nombre.message}</p>
        )}
      </div>

      {/* Slug */}
      <div>
        <label className="adm-form-label">
          Slug (URL) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('slug')}
          className={`adm-form-input ${errors.slug ? 'adm-form-input-error' : ''}`}
          placeholder="toyota, subaru"
        />
        {errors.slug && (
          <p className="adm-form-error">{errors.slug.message}</p>
        )}
        <p className="text-xs text-gray-500 mt-2">
          La URL será: /{watch('slug') || 'marca'}
        </p>
      </div>

      {/* Descripción */}
      <div>
        <label className="adm-form-label">
          Descripción
        </label>
        <textarea
          {...register('descripcion')}
          rows={4}
          className="adm-form-input"
          placeholder="Descripción breve de la marca..."
        />
      </div>

      {/* Grid de 2 columnas para Orden y Activa */}
      <div className="grid grid-cols-2 gap-4">
        {/* Orden */}
        <div>
          <label className="adm-form-label">
            Orden <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register('orden', { valueAsNumber: true })}
            className={`adm-form-input ${errors.orden ? 'adm-form-input-error' : ''}`}
            min="0"
          />
          {errors.orden && (
            <p className="adm-form-error">{errors.orden.message}</p>
          )}
          <p className="text-xs text-gray-500 mt-2">
            Orden de aparición en el sitio
          </p>
        </div>

        {/* Activa */}
        <div>
          <label className="adm-form-label">Estado</label>
          <div className="flex items-center h-[42px]">
            <input
              type="checkbox"
              {...register('activa')}
              className="adm-form-checkbox"
              id="activa"
            />
            <label htmlFor="activa" className="ml-2 text-gray-700">
              Marca activa
            </label>
          </div>
        </div>
      </div>

      {/* Colores */}
      <div className="grid grid-cols-2 gap-4">
        {/* Color Primario */}
        <div>
          <label className="adm-form-label">
            Color Primario
          </label>
          <div className="adm-color-picker">
            <input
              type="color"
              {...register('colorPrimario')}
              className="adm-color-input"
            />
            <input
              type="text"
              {...register('colorPrimario')}
              className="adm-form-input"
              placeholder="#000000"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Color principal de la marca
          </p>
        </div>

        {/* Color Secundario */}
        <div>
          <label className="adm-form-label">
            Color Secundario
          </label>
          <div className="adm-color-picker">
            <input
              type="color"
              {...register('colorSecundario')}
              className="adm-color-input"
            />
            <input
              type="text"
              {...register('colorSecundario')}
              className="adm-form-input"
              placeholder="#FFFFFF"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Color secundario de la marca
          </p>
        </div>
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
              {isEditing ? 'Actualizar Marca' : 'Crear Marca'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default MarcaForm;