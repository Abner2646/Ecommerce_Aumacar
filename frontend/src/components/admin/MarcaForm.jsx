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
  colorSecundario: z.string().optional(),
  plantilla: z.number().min(1).max(3)
});

const MarcaForm = ({ marca, onSuccess }) => {
  const [logoPreview, setLogoPreview] = useState(marca?.logo || null);
  const [logoFile, setLogoFile] = useState(null);
  // Presentación media states
  const [fotoPresentacionPreview, setFotoPresentacionPreview] = useState(marca?.fotoPresentacion || null);
  const [fotoPresentacionFile, setFotoPresentacionFile] = useState(null);
  // Foto del medio states
  const [fotoDelMedioPreview, setFotoDelMedioPreview] = useState(marca?.fotoDelMedio || null);
  const [fotoDelMedioFile, setFotoDelMedioFile] = useState(null);
      // Manejar cambio de fotoDelMedio
      const handleFotoDelMedioChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona una imagen válida');
            return;
          }
          if (file.size > 5 * 1024 * 1024) {
            alert('La imagen no debe superar 5MB');
            return;
          }
          setFotoDelMedioFile(file);
          const reader = new FileReader();
          reader.onloadend = () => {
            setFotoDelMedioPreview(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
  const [videoPresentacionPreview, setVideoPresentacionPreview] = useState(marca?.videoPresentacion || null);
  const [videoPresentacionFile, setVideoPresentacionFile] = useState(null);
  const [videoPortadaPreview, setVideoPortadaPreview] = useState(marca?.videoPortada || null);
  const [videoPortadaFile, setVideoPortadaFile] = useState(null);
    // Manejar cambio de fotoPresentacion
    const handleFotoPresentacionChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          alert('Por favor selecciona una imagen válida');
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          alert('La imagen no debe superar 5MB');
          return;
        }
        setFotoPresentacionFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFotoPresentacionPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    // Manejar cambio de videoPresentacion
    const handleVideoPresentacionChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        if (!file.type.startsWith('video/')) {
          alert('Por favor selecciona un video válido');
          return;
        }
        if (file.size > 20 * 1024 * 1024) {
          alert('El video no debe superar 20MB');
          return;
        }
        setVideoPresentacionFile(file);
        setVideoPresentacionPreview(URL.createObjectURL(file));
      }
    };

    // Manejar cambio de videoPortada
    const handleVideoPortadaChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        if (!file.type.startsWith('video/')) {
          alert('Por favor selecciona un video válido');
          return;
        }
        if (file.size > 20 * 1024 * 1024) {
          alert('El video no debe superar 20MB');
          return;
        }
        setVideoPortadaFile(file);
        setVideoPortadaPreview(URL.createObjectURL(file));
      }
    };
  
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
      colorSecundario: '#FFFFFF',
      plantilla: 1
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
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
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
      // Validación extra antes de enviar
      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
      if (data.colorPrimario && !hexColorRegex.test(data.colorPrimario)) {
        alert('Color primario debe tener formato #RRGGBB');
        return;
      }
      if (data.colorSecundario && !hexColorRegex.test(data.colorSecundario)) {
        alert('Color secundario debe tener formato #RRGGBB');
        return;
      }
      if (!data.slug || !/^[a-z0-9-]+$/.test(data.slug)) {
        alert('Slug solo puede contener minúsculas, números y guiones');
        return;
      }

      // Preparar FormData solo con datos válidos
      const formData = new FormData();
      if (data.nombre) formData.append('nombre', data.nombre);
      if (data.slug) formData.append('slug', data.slug);
      if (data.descripcion) formData.append('descripcion', data.descripcion);
      formData.append('activa', typeof data.activa === 'boolean' ? data.activa : Boolean(data.activa));
      formData.append('orden', typeof data.orden === 'number' ? data.orden : Number(data.orden) || 0);
      if (data.colorPrimario && hexColorRegex.test(data.colorPrimario)) formData.append('colorPrimario', data.colorPrimario);
      if (data.colorSecundario && hexColorRegex.test(data.colorSecundario)) formData.append('colorSecundario', data.colorSecundario);
      if (logoFile) formData.append('logo', logoFile);
      if (fotoPresentacionFile) formData.append('fotoPresentacion', fotoPresentacionFile);
      if (fotoDelMedioFile) formData.append('fotoDelMedio', fotoDelMedioFile);
      if (videoPresentacionFile) formData.append('videoPresentacion', videoPresentacionFile);
      if (videoPortadaFile) formData.append('videoPortada', videoPortadaFile);
      if (data.plantilla) formData.append('plantilla', data.plantilla);

      if (isEditing) {
        await updateMarca.mutateAsync({ id: marca.id, data: formData });
      } else {
        await createMarca.mutateAsync(formData);
      }
      onSuccess();
    } catch (error) {
      // Mostrar mensaje de error del backend si existe
      let errorMsg = 'Error al crear/actualizar la marca';
      if (error?.response?.data?.error) {
        errorMsg = error.response.data.error;
      } else if (error?.response?.data) {
        errorMsg = JSON.stringify(error.response.data);
      } else if (error?.message) {
        errorMsg = error.message;
      }
      alert(errorMsg);
      if (window?.toast) {
        window.toast.error(errorMsg);
      }
      console.error('Error:', errorMsg, error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" encType="multipart/form-data">
      {/* Foto del Medio */}
      <div>
        <label className="adm-form-label">Foto del Medio</label>
        {fotoDelMedioPreview && (
          <div className="adm-logo-preview mb-4">
            <img src={fotoDelMedioPreview} alt="Preview foto del medio" className="adm-logo-preview-img" />
            <button
              type="button"
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => {
                setFotoDelMedioPreview(null);
                setFotoDelMedioFile(null);
              }}
            >Quitar imagen</button>
          </div>
        )}
        {!fotoDelMedioPreview && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleFotoDelMedioChange}
              className="adm-file-input"
            />
            <p className="text-xs text-gray-500 mt-2">Formato: JPG, PNG. Máx: 5MB. Recomendado: 800x400px</p>
          </>
        )}
      </div>
            {/* Foto Presentación */}
            <div>
              <label className="adm-form-label">Foto Presentación</label>
              {fotoPresentacionPreview && (
                <div className="adm-logo-preview mb-4">
                  <img src={fotoPresentacionPreview} alt="Preview foto presentación" className="adm-logo-preview-img" />
                  <button
                    type="button"
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => {
                      setFotoPresentacionPreview(null);
                      setFotoPresentacionFile(null);
                    }}
                  >Quitar imagen</button>
                </div>
              )}
              {!fotoPresentacionPreview && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFotoPresentacionChange}
                    className="adm-file-input"
                  />
                  <p className="text-xs text-gray-500 mt-2">Formato: JPG, PNG. Máx: 5MB. Recomendado: 800x400px</p>
                </>
              )}
            </div>

            {/* Video Presentación */}
            <div>
              <label className="adm-form-label">Video Presentación</label>
              {videoPresentacionPreview && (
                <div className="adm-logo-preview mb-4">
                  <video src={videoPresentacionPreview} controls className="adm-logo-preview-img" style={{ maxHeight: 200 }} />
                  <button
                    type="button"
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => {
                      setVideoPresentacionPreview(null);
                      setVideoPresentacionFile(null);
                    }}
                  >Quitar video</button>
                </div>
              )}
              {!videoPresentacionPreview && (
                <>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoPresentacionChange}
                    className="adm-file-input"
                  />
                  <p className="text-xs text-gray-500 mt-2">Formato: MP4, WebM. Máx: 20MB</p>
                </>
              )}
            </div>

            {/* Video Portada */}
            <div>
              <label className="adm-form-label">Video Portada</label>
              {videoPortadaPreview && (
                <div className="adm-logo-preview mb-4">
                  <video src={videoPortadaPreview} controls className="adm-logo-preview-img" style={{ maxHeight: 200 }} />
                  <button
                    type="button"
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => {
                      setVideoPortadaPreview(null);
                      setVideoPortadaFile(null);
                    }}
                  >Quitar video</button>
                </div>
              )}
              {!videoPortadaPreview && (
                <>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoPortadaChange}
                    className="adm-file-input"
                  />
                  <p className="text-xs text-gray-500 mt-2">Formato: MP4, WebM. Máx: 20MB</p>
                </>
              )}
            </div>
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
            <button
              type="button"
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => {
                setLogoPreview(null);
                setLogoFile(null);
              }}
            >Quitar logo</button>
          </div>
        )}
        {!logoPreview && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="adm-file-input"
            />
            <p className="text-xs text-gray-500 mt-2">
              Formato: JPG, PNG, SVG. Tamaño máximo: 2MB. Recomendado: 400x400px
            </p>
          </>
        )}
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

      {/* Grid de 2 columnas para Orden, Activa y Plantilla */}
      <div className="grid grid-cols-3 gap-4">
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

        {/* Plantilla */}
        <div>
          <label className="adm-form-label">Plantilla</label>
          <select {...register('plantilla', { valueAsNumber: true })} className="adm-form-input">
            <option value={1}>Plantilla 1</option>
            <option value={2}>Plantilla 2</option>
            <option value={3}>Plantilla 3</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">Elige el diseño que prefieras para la marca</p>
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