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
  const [fotoPresentacionPreview, setFotoPresentacionPreview] = useState(marca?.fotoPresentacion || null);
  const [fotoPresentacionFile, setFotoPresentacionFile] = useState(null);
  const [fotoDelMedioPreview, setFotoDelMedioPreview] = useState(marca?.fotoDelMedio || null);
  const [fotoDelMedioFile, setFotoDelMedioFile] = useState(null);
  const [videoPresentacionPreview, setVideoPresentacionPreview] = useState(marca?.videoPresentacion || null);
  const [videoPresentacionFile, setVideoPresentacionFile] = useState(null);
  const [videoPortadaPreview, setVideoPortadaPreview] = useState(marca?.videoPortada || null);
  const [videoPortadaFile, setVideoPortadaFile] = useState(null);
  
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

  const handleNombreChange = (e) => {
    const value = e.target.value;
    setValue('nombre', value);
    
    if (!isEditing || !marca?.slug) {
      const slug = value
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
      setValue('slug', slug);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen válida');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen no debe superar 2MB');
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const onSubmit = async (data) => {
    if (!data.nombre || !data.slug) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    if (!isEditing && !logoFile) {
      alert('Por favor selecciona un logo para la marca');
      return;
    }

    try {
      if (!data.slug || !/^[a-z0-9-]+$/.test(data.slug)) {
        alert('Slug solo puede contener minúsculas, números y guiones');
        return;
      }

      const formData = new FormData();
      formData.append('nombre', data.nombre);
      formData.append('slug', data.slug);
      if (data.descripcion) formData.append('descripcion', data.descripcion);
      
      // Campos ocultos con valores por defecto
      formData.append('activa', true);
      formData.append('orden', 0);
      formData.append('colorPrimario', '#000000');
      formData.append('colorSecundario', '#FFFFFF');
      formData.append('plantilla', data.plantilla);
      
      if (logoFile) formData.append('logo', logoFile);
      if (fotoPresentacionFile) formData.append('fotoPresentacion', fotoPresentacionFile);
      if (fotoDelMedioFile) formData.append('fotoDelMedio', fotoDelMedioFile);
      if (videoPresentacionFile) formData.append('videoPresentacion', videoPresentacionFile);
      if (videoPortadaFile) formData.append('videoPortada', videoPortadaFile);

      if (isEditing) {
        await updateMarca.mutateAsync({ id: marca.id, data: formData });
      } else {
        await createMarca.mutateAsync(formData);
      }
      onSuccess();
    } catch (error) {
      let errorMsg = 'Error al crear/actualizar la marca';
      if (error?.response?.data?.error) {
        errorMsg = error.response.data.error;
      } else if (error?.response?.data) {
        errorMsg = JSON.stringify(error.response.data);
      } else if (error?.message) {
        errorMsg = error.message;
      }
      alert(errorMsg);
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" encType="multipart/form-data">
      {/* Campos ocultos que se envían automáticamente */}
      <input type="hidden" {...register('activa')} />
      <input type="hidden" {...register('orden')} />
      <input type="hidden" {...register('colorPrimario')} />
      <input type="hidden" {...register('colorSecundario')} />
      
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
        <label className="adm-form-label">Foto Presentación (se ve desde la página principal)</label>
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
        <label className="adm-form-label">Video Presentación (se ve cuando se pone el mouse por encima en la foto de presentación)</label>
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
        <label className="adm-form-label">Video Portada (se ve cuando entras a una marca)</label>
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
          Logo de la Marca {!isEditing && <span className="text-red-500">*</span>}
        </label>
        
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
          <p className="adm-form-error">{String(errors.nombre.message)}</p>
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
          <p className="adm-form-error">{String(errors.slug.message)}</p>
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

      {/* Plantilla */}
      <div>
        <label className="adm-form-label">Plantilla</label>
        <select {...register('plantilla', { valueAsNumber: true })} className="adm-form-input">
          <option value={1}>Plantilla 1 (Subaru)</option>
          <option value={2}>Plantilla 2 (Suzuki)</option>
          <option value={3}>Plantilla 3 (Estándar) </option>
        </select>
        <p className="text-xs text-gray-500 mt-2">Elige el diseño que prefieras para la marca</p>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="adm-btn adm-btn-primary flex-1"
        >
          {isSubmitting ? 'Guardando...' : (isEditing ? 'Actualizar Marca' : 'Crear Marca')}
        </button>
      </div>
    </form>
  );
};

export default MarcaForm;