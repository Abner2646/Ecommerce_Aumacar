// src/components/admin/FotoClienteRegionForm.jsx

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateFotoClienteRegion, useUpdateFotoClienteRegion } from '../../hooks/useFotosClientesRegion';

const fotoClienteRegionSchema = z.object({
  ciudad: z.string().min(2, 'Ciudad debe tener al menos 2 caracteres'),
  provincia: z.string().optional(),
  pais: z.string().optional(),
  latitud: z.string().optional(),
  longitud: z.string().optional(),
  radioKm: z.number().min(1, 'Radio debe ser al menos 1 km').max(500, 'Radio máximo 500 km'),
  textoDescriptivo: z.string().max(300, 'Máximo 300 caracteres').optional(),
  titulo: z.string().optional(),
  descripcion: z.string().optional(),
  orden: z.number().min(0, 'Orden debe ser mayor o igual a 0'),
  activo: z.boolean()
});

const FotoClienteRegionForm = ({ foto, onSuccess }) => {
  const [imagenPreview, setImagenPreview] = useState(foto?.urlImagen || null);
  const [imagenFile, setImagenFile] = useState(null);
  
  const createFoto = useCreateFotoClienteRegion();
  const updateFoto = useUpdateFotoClienteRegion();
  
  const isEditing = !!foto;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm({
    resolver: zodResolver(fotoClienteRegionSchema),
    defaultValues: foto || {
      ciudad: '',
      provincia: '',
      pais: 'Argentina',
      latitud: '',
      longitud: '',
      radioKm: 50,
      textoDescriptivo: '',
      titulo: '',
      descripcion: '',
      orden: 0,
      activo: true
    }
  });

  const handleImagenChange = (e) => {
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
      setImagenFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    if (!data.ciudad) {
      alert('Por favor completa la ciudad');
      return;
    }

    if (!isEditing && !imagenFile) {
      alert('Por favor selecciona una imagen');
      return;
    }

    try {
      const formData = new FormData();
      
      if (data.ciudad) formData.append('ciudad', data.ciudad);
      if (data.provincia) formData.append('provincia', data.provincia);
      if (data.pais) formData.append('pais', data.pais);
      if (data.latitud) formData.append('latitud', data.latitud);
      if (data.longitud) formData.append('longitud', data.longitud);
      formData.append('radioKm', data.radioKm);
      if (data.textoDescriptivo) formData.append('textoDescriptivo', data.textoDescriptivo);
      if (data.titulo) formData.append('titulo', data.titulo);
      if (data.descripcion) formData.append('descripcion', data.descripcion);
      formData.append('orden', data.orden);
      formData.append('activo', data.activo);
      
      if (imagenFile) formData.append('imagen', imagenFile);

      if (isEditing) {
        await updateFoto.mutateAsync({ id: foto.id, data: formData });
      } else {
        await createFoto.mutateAsync(formData);
      }
      onSuccess();
    } catch (error) {
      let errorMsg = 'Error al crear/actualizar la foto';
      if (error?.response?.data?.error) {
        errorMsg = error.response.data.error;
      } else if (error?.message) {
        errorMsg = error.message;
      }
      alert(errorMsg);
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" encType="multipart/form-data">
      {/* Imagen Upload */}
      <div>
        <label className="adm-form-label">
          Imagen {!isEditing && <span className="text-red-500">*</span>}
        </label>
        
        {imagenPreview && (
          <div className="adm-logo-preview mb-4">
            <img 
              src={imagenPreview} 
              alt="Preview imagen cliente" 
              className="adm-logo-preview-img"
            />
            <button
              type="button"
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => {
                setImagenPreview(null);
                setImagenFile(null);
              }}
            >Quitar imagen</button>
          </div>
        )}
        {!imagenPreview && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagenChange}
              className="adm-file-input"
            />
            <p className="text-xs text-gray-500 mt-2">
              Formato: JPG, PNG. Tamaño máximo: 5MB. Recomendado: 1200x800px
            </p>
          </>
        )}
      </div>

      {/* Ciudad */}
      <div>
        <label className="adm-form-label">
          Ciudad <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('ciudad')}
          className={`adm-form-input ${errors.ciudad ? 'adm-form-input-error' : ''}`}
          placeholder="Ej: Buenos Aires, Córdoba"
        />
        {errors.ciudad && (
          <p className="adm-form-error">{String(errors.ciudad.message)}</p>
        )}
      </div>

      {/* Grid de Provincia y País */}
      <div className="grid grid-cols-2 gap-4">
        {/* Provincia */}
        <div>
          <label className="adm-form-label">Provincia</label>
          <input
            type="text"
            {...register('provincia')}
            className="adm-form-input"
            placeholder="Ej: Buenos Aires"
          />
        </div>

        {/* País */}
        <div>
          <label className="adm-form-label">País</label>
          <input
            type="text"
            {...register('pais')}
            className="adm-form-input"
            placeholder="Argentina"
          />
        </div>
      </div>

      {/* Texto Descriptivo */}
      <div>
        <label className="adm-form-label">
          Texto Descriptivo
        </label>
        <input
          type="text"
          {...register('textoDescriptivo')}
          className="adm-form-input"
          placeholder='Ej: "Juan y María, de Buenos Aires"'
          maxLength={300}
        />
        <p className="text-xs text-gray-500 mt-2">
          Este texto se mostrará sobre la imagen (máximo 300 caracteres)
        </p>
      </div>

      {/* Grid de Coordenadas y Radio */}
      <div className="grid grid-cols-3 gap-4">
        {/* Latitud */}
        <div>
          <label className="adm-form-label">Latitud</label>
          <input
            type="text"
            {...register('latitud')}
            className="adm-form-input"
            placeholder="-34.6037"
          />
          <p className="text-xs text-gray-500 mt-1">Ej: -34.6037</p>
        </div>

        {/* Longitud */}
        <div>
          <label className="adm-form-label">Longitud</label>
          <input
            type="text"
            {...register('longitud')}
            className="adm-form-input"
            placeholder="-58.3816"
          />
          <p className="text-xs text-gray-500 mt-1">Ej: -58.3816</p>
        </div>

        {/* Radio */}
        <div>
          <label className="adm-form-label">Radio (km)</label>
          <input
            type="number"
            {...register('radioKm', { valueAsNumber: true })}
            className={`adm-form-input ${errors.radioKm ? 'adm-form-input-error' : ''}`}
            min="1"
            max="500"
          />
          {errors.radioKm && (
            <p className="adm-form-error">{String(errors.radioKm.message)}</p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded p-3">
        <p className="text-sm text-blue-800">
          <i className="fa-solid fa-info-circle mr-2"></i>
          Las coordenadas y el radio determinan en qué ubicaciones se mostrará esta imagen. 
          Puedes obtener coordenadas en <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="underline">Google Maps</a>.
        </p>
      </div>

      {/* Título */}
      <div>
        <label className="adm-form-label">Título (interno)</label>
        <input
          type="text"
          {...register('titulo')}
          className="adm-form-input"
          placeholder="Ej: Cliente satisfecho en Buenos Aires"
        />
        <p className="text-xs text-gray-500 mt-2">
          Solo para identificación interna
        </p>
      </div>

      {/* Descripción */}
      <div>
        <label className="adm-form-label">Descripción (interna)</label>
        <textarea
          {...register('descripcion')}
          rows={3}
          className="adm-form-input"
          placeholder="Notas internas sobre esta foto..."
        />
      </div>

      {/* Grid de Orden y Activo */}
      <div className="grid grid-cols-2 gap-4">
        {/* Orden */}
        <div>
          <label className="adm-form-label">Orden</label>
          <input
            type="number"
            {...register('orden', { valueAsNumber: true })}
            className={`adm-form-input ${errors.orden ? 'adm-form-input-error' : ''}`}
            min="0"
          />
          {errors.orden && (
            <p className="adm-form-error">{String(errors.orden.message)}</p>
          )}
          <p className="text-xs text-gray-500 mt-2">
            Orden de aparición (menor = primero)
          </p>
        </div>

        {/* Activo */}
        <div>
          <label className="adm-form-label">Estado</label>
          <div className="flex items-center h-[42px]">
            <input
              type="checkbox"
              {...register('activo')}
              className="adm-form-checkbox"
              id="activo"
            />
            <label htmlFor="activo" className="ml-2 text-gray-700">
              Foto activa
            </label>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="adm-btn adm-btn-primary flex-1"
        >
          {isSubmitting ? 'Guardando...' : (isEditing ? 'Actualizar Foto' : 'Crear Foto')}
        </button>
      </div>
    </form>
  );
};

export default FotoClienteRegionForm;