// /src/pages/admin/VehiculoEdit.jsx

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  useVehiculo,
  useUpdateVehiculo, 
  useAddImages, 
  useAddVideo,
  useDeleteImage,
  useDeleteVideo,
  useAssignCaracteristicas 
} from '../../hooks/useVehiculos';
import StepIndicator from '../../components/admin/StepIndicator';
import Step1Info from '../../components/admin/VehiculoForm/Step1Info';
import Step2Images from '../../components/admin/VehiculoForm/Step2Images';
import Step3Videos from '../../components/admin/VehiculoForm/Step3Videos';
import Step4Caracteristicas from '../../components/admin/VehiculoForm/Step4Caracteristicas';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 'info', label: 'Información', description: 'Datos básicos' },
  { id: 'images', label: 'Imágenes', description: 'Fotos del vehículo' },
  { id: 'videos', label: 'Videos', description: 'Videos (opcional)' },
  { id: 'caracteristicas', label: 'Características', description: 'Features incluidas' }
];

const VehiculoEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  // Cargar datos del vehículo
  const { data: vehiculoData, isLoading } = useVehiculo(id);
  const vehiculo = vehiculoData?.vehiculo;

  const updateVehiculo = useUpdateVehiculo();
  const addImages = useAddImages();
  const addVideo = useAddVideo();
  const deleteImage = useDeleteImage();
  const deleteVideo = useDeleteVideo();
  const assignCaracteristicas = useAssignCaracteristicas();

  // Cargar datos iniciales cuando se obtiene el vehículo
  useEffect(() => {
    if (vehiculo) {
      setFormData({
        step1: {
          marcaId: vehiculo.marcaId,
          modelo: vehiculo.modelo,
          version: vehiculo.version,
          año: vehiculo.año,
          precio: parseFloat(vehiculo.precio),
          categoria: vehiculo.categoria,
          stock: vehiculo.stock,
          disponible: vehiculo.disponible,
          destacado: vehiculo.destacado,
          motor: vehiculo.motor,
          combustible: vehiculo.combustible,
          transmision: vehiculo.transmision,
          traccion: vehiculo.traccion,
          puertas: vehiculo.puertas,
          pasajeros: vehiculo.pasajeros,
          cilindrada: vehiculo.cilindrada || '',
          potencia: vehiculo.potencia || '',
          torque: vehiculo.torque || '',
          descripcionCorta: vehiculo.descripcionCorta,
          descripcionCompleta: vehiculo.descripcionCompleta,
          slug: vehiculo.slug,
          metaTitle: vehiculo.metaTitle || '',
          metaDescription: vehiculo.metaDescription || ''
        }
      });
    }
  }, [vehiculo]);

  // Step 1: Actualizar info y avanzar
  const handleStep1Next = async (data) => {
    try {
      await updateVehiculo.mutateAsync({ id, data });
      setFormData(prev => ({ ...prev, step1: data }));
      setCurrentStep(2);
    } catch (error) {
      console.error('Error actualizando vehículo:', error);
    }
  };

  // Step 2: Manejar imágenes
  const handleStep2Next = async (data) => {
    try {
      // Subir nuevas imágenes si hay
      if (data.images?.length > 0) {
        const imagesToUpload = data.images.map(img => img.file);
        await addImages.mutateAsync({
          vehiculoId: id,
          images: imagesToUpload,
          options: { esPrincipal: false, orden: 0 }
        });
      }
      
      setFormData(prev => ({ ...prev, step2: data }));
      setCurrentStep(3);
    } catch (error) {
      console.error('Error subiendo imágenes:', error);
    }
  };

  const handleDeleteImage = async (imagenId) => {
    try {
      await deleteImage.mutateAsync(imagenId);
      toast.success('Imagen eliminada');
    } catch (error) {
      console.error('Error eliminando imagen:', error);
    }
  };

  // Step 3: Manejar videos
  const handleStep3Next = async (data) => {
    try {
      // Subir nuevos videos si hay
      if (data.videos?.length > 0) {
        for (const videoData of data.videos) {
          if (videoData.status === 'pending') {
            await addVideo.mutateAsync({
              vehiculoId: id,
              video: videoData.file,
              metadata: videoData.metadata
            });
          }
        }
      }
      
      setFormData(prev => ({ ...prev, step3: data }));
      setCurrentStep(4);
    } catch (error) {
      console.error('Error subiendo videos:', error);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await deleteVideo.mutateAsync(videoId);
      toast.success('Video eliminado');
    } catch (error) {
      console.error('Error eliminando video:', error);
    }
  };

  // Step 4: Actualizar características
  const handleFinalSubmit = async (data) => {
    try {
      if (data.caracteristicasIds) {
        await assignCaracteristicas.mutateAsync({
          vehiculoId: id,
          caracteristicasIds: data.caracteristicasIds
        });
      }

      toast.success('¡Vehículo actualizado exitosamente!');
      navigate('/admin/vehiculos');
      
    } catch (error) {
      console.error('Error actualizando características:', error);
      toast.error('Error al actualizar el vehículo');
    }
  };

  // Navegación
  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleCancel = () => {
    if (window.confirm('¿Estás seguro de cancelar? Los cambios no guardados se perderán.')) {
      navigate('/admin/vehiculos');
    }
  };

  const isSubmitting = 
    updateVehiculo.isLoading || 
    addImages.isLoading || 
    addVideo.isLoading || 
    deleteImage.isLoading ||
    deleteVideo.isLoading ||
    assignCaracteristicas.isLoading;

  if (isLoading) {
    return (
      <div className="adm-table-loading">
        <i className="fa-solid fa-spinner fa-spin text-4xl text-gray-400"></i>
        <p className="text-gray-600 mt-4">Cargando vehículo...</p>
      </div>
    );
  }

  if (!vehiculo) {
    return (
      <div className="adm-table-empty">
        <i className="fa-solid fa-exclamation-triangle text-6xl text-red-400"></i>
        <p className="text-gray-600 mt-4">Vehículo no encontrado</p>
        <button
          onClick={() => navigate('/admin/vehiculos')}
          className="adm-btn adm-btn-primary mt-4"
        >
          Volver a vehículos
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Editar Vehículo</h1>
          <p className="text-gray-600 mt-2">
            {vehiculo.marca?.nombre} {vehiculo.modelo} {vehiculo.version} ({vehiculo.año})
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="mb-8">
        <StepIndicator currentStep={currentStep} steps={STEPS} />
      </div>

      {/* Form Container */}
      <div className="adm-form-container">
        {currentStep === 1 && (
          <Step1Info
            data={formData.step1}
            onNext={handleStep1Next}
            onCancel={handleCancel}
          />
        )}

        {currentStep === 2 && (
          <Step2Images
            data={formData.step2}
            onNext={handleStep2Next}
            onBack={handleBack}
            vehiculoId={id}
            existingImages={vehiculo.imagenes || []}
            onDeleteExisting={handleDeleteImage}
          />
        )}

        {currentStep === 3 && (
          <Step3Videos
            data={formData.step3}
            onNext={handleStep3Next}
            onBack={handleBack}
            vehiculoId={id}
            existingVideos={vehiculo.videos || []}
            onDeleteExisting={handleDeleteVideo}
          />
        )}

        {currentStep === 4 && (
          <Step4Caracteristicas
            data={formData.step4}
            onSubmit={handleFinalSubmit}
            onBack={handleBack}
            existingCaracteristicas={vehiculo.caracteristicas || []}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default VehiculoEdit;