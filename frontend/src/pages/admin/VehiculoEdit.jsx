// /src/pages/admin/VehiculoEdit.jsx

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  useVehiculo,
  useUpdateVehiculo, 
  useUpdateVehiculoPartial,
  useAddImages, 
  useAddVideo,
  useDeleteImage,
  useDeleteVideo,
  useAssignCaracteristicas 
} from '../../hooks/useVehiculos';
import { useAssignColoresVehiculo } from '../../hooks/useColores';
import StepIndicator from '../../components/admin/StepIndicator';
import Step1Info from '../../components/admin/VehiculoForm/Step1Info';
import Step2Colores from '../../components/admin/VehiculoForm/Step2Colores';
import Step3Images from '../../components/admin/VehiculoForm/Step3Images';
import Step4Videos from '../../components/admin/VehiculoForm/Step4Videos';
import Step5Final from '../../components/admin/VehiculoForm/Step5Final';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 'info', label: 'Información', description: 'Datos básicos' },
  { id: 'colores', label: 'Colores', description: 'Colores disponibles' },
  { id: 'images', label: 'Imágenes', description: 'Fotos del vehículo' },
  { id: 'videos', label: 'Videos', description: 'Videos (opcional)' },
  { id: 'final', label: 'Finalizar', description: 'Características y plantilla' }
];

const VehiculoEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  // Cargar vehículo
  const { data: vehiculoData, isLoading, refetch } = useVehiculo(id);
  const vehiculo = vehiculoData?.vehiculo;

  // Mutations
  const updateVehiculo = useUpdateVehiculo();
  const updateVehiculoPartial = useUpdateVehiculoPartial();
  const assignColores = useAssignColoresVehiculo();
  const addImages = useAddImages();
  const addVideo = useAddVideo();
  const deleteImage = useDeleteImage();
  const deleteVideo = useDeleteVideo();
  const assignCaracteristicas = useAssignCaracteristicas();

  // Cargar datos iniciales
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
          slug: vehiculo.slug
        }
      });
    }
  }, [vehiculo]);

  // Navegación libre por StepIndicator (siempre permitida en edición)
  const handleStepClick = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  // Step 1: Actualizar info
  const handleStep1Next = async (data) => {
    try {
      await updateVehiculo.mutateAsync({ id, data });
      setFormData(prev => ({ ...prev, step1: data }));
      setCurrentStep(2);
    } catch (error) {
      console.error('Error actualizando vehículo:', error);
    }
  };

  // Step 2: Actualizar colores
  const handleStep2Next = async (data) => {
    try {
      if (data.colorIds) {
        await assignColores.mutateAsync({
          vehiculoId: id,
          colorIds: data.colorIds
        });
        await refetch(); // Recargar para obtener los colorVehiculoId actualizados
      }
      setFormData(prev => ({ ...prev, step2: data }));
      setCurrentStep(3);
    } catch (error) {
      console.error('Error actualizando colores:', error);
    }
  };

  // Step 3: Subir nuevas imágenes
  const handleStep3Next = async (data) => {
    try {
      if (data.images?.length > 0) {
        // Agrupar imágenes por colorVehiculoId
        const imagesByColor = data.images.reduce((acc, img) => {
          const key = img.colorVehiculoId || 'generic';
          if (!acc[key]) acc[key] = [];
          acc[key].push(img);
          return acc;
        }, {});

        for (const [colorKey, images] of Object.entries(imagesByColor)) {
          const files = images.map(img => img.file);
          const options = {
            esPrincipal: images.some(img => img.esPrincipal),
            orden: 0
          };
          
          if (colorKey !== 'generic') {
            options.colorVehiculoId = colorKey;
          }

          await addImages.mutateAsync({
            vehiculoId: id,
            images: files,
            options
          });
        }
      }
      setFormData(prev => ({ ...prev, step3: data }));
      setCurrentStep(4);
    } catch (error) {
      console.error('Error subiendo imágenes:', error);
    }
  };

  const handleDeleteImage = async (imagenId) => {
    if (!window.confirm('¿Eliminar esta imagen?')) return;
    try {
      await deleteImage.mutateAsync(imagenId);
      await refetch();
    } catch (error) {
      console.error('Error eliminando imagen:', error);
    }
  };

  // Step 4: Subir nuevos videos
  const handleStep4Next = async (data) => {
    try {
      if (data.videos?.length > 0) {
        for (const video of data.videos) {
          if (video.status === 'pending') {
            await addVideo.mutateAsync({
              vehiculoId: id,
              video: video.file,
              metadata: {
                titulo: video.titulo,
                descripcion: video.descripcion
              }
            });
          }
        }
      }
      setFormData(prev => ({ ...prev, step4: data }));
      setCurrentStep(5);
    } catch (error) {
      console.error('Error subiendo videos:', error);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (!window.confirm('¿Eliminar este video?')) return;
    try {
      await deleteVideo.mutateAsync(videoId);
      await refetch();
    } catch (error) {
      console.error('Error eliminando video:', error);
    }
  };

  // Step 5: Características y plantilla
  const handleFinalSubmit = async (data) => {
    try {
      // Asignar características
      if (data.caracteristicasIds) {
        await assignCaracteristicas.mutateAsync({
          vehiculoId: id,
          caracteristicasIds: data.caracteristicasIds
        });
      }

      // Actualizar plantilla
      if (data.plantilla) {
        await updateVehiculoPartial.mutateAsync({
          id,
          data: { plantilla: data.plantilla }
        });
      }

      toast.success('¡Vehículo actualizado exitosamente!');
      navigate('/admin/vehiculos');
    } catch (error) {
      console.error('Error finalizando:', error);
      toast.error('Error al actualizar el vehículo');
    }
  };

  // Navigation
  const handleBack = () => setCurrentStep(prev => Math.max(1, prev - 1));

  const handleCancel = () => {
    if (window.confirm('¿Cancelar? Los cambios no guardados se perderán.')) {
      navigate('/admin/vehiculos');
    }
  };

  const isSubmitting = 
    updateVehiculo.isPending || 
    updateVehiculoPartial.isPending ||
    assignColores.isPending ||
    addImages.isPending || 
    addVideo.isPending || 
    deleteImage.isPending ||
    deleteVideo.isPending ||
    assignCaracteristicas.isPending;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <i className="fa-solid fa-spinner fa-spin text-3xl text-gray-400"></i>
      </div>
    );
  }

  if (!vehiculo) {
    return (
      <div className="text-center py-24">
        <i className="fa-solid fa-exclamation-triangle text-5xl text-red-400 mb-4"></i>
        <p className="text-gray-600 mb-4">Vehículo no encontrado</p>
        <button
          onClick={() => navigate('/admin/vehiculos')}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg"
        >
          Volver a vehículos
        </button>
      </div>
    );
  }

  // Preparar colores existentes
  const existingColores = vehiculo.colores || [];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Editar Vehículo</h1>
        <p className="text-gray-600 mt-1">
          {vehiculo.marca?.nombre} {vehiculo.modelo} {vehiculo.version} ({vehiculo.año})
        </p>
      </div>

      {/* Step Indicator - siempre navegable en edición */}
      <div className="mb-8 bg-white rounded-lg shadow-sm p-4">
        <StepIndicator 
          currentStep={currentStep} 
          steps={STEPS}
          canNavigate={true}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Form Steps */}
      {currentStep === 1 && (
        <Step1Info
          data={formData.step1}
          onNext={handleStep1Next}
          onCancel={handleCancel}
          isSubmitting={updateVehiculo.isPending}
        />
      )}

      {currentStep === 2 && (
        <Step2Colores
          data={formData.step2}
          onNext={handleStep2Next}
          onBack={handleBack}
          existingColores={existingColores}
          isSubmitting={assignColores.isPending}
        />
      )}

      {currentStep === 3 && (
        <Step3Images
          data={formData.step3}
          onNext={handleStep3Next}
          onBack={handleBack}
          selectedColores={existingColores}
          existingImages={vehiculo.imagenes || []}
          onDeleteExisting={handleDeleteImage}
          isSubmitting={addImages.isPending}
        />
      )}

      {currentStep === 4 && (
        <Step4Videos
          data={formData.step4}
          onNext={handleStep4Next}
          onBack={handleBack}
          existingVideos={vehiculo.videos || []}
          onDeleteExisting={handleDeleteVideo}
          isSubmitting={addVideo.isPending}
        />
      )}

      {currentStep === 5 && (
        <Step5Final
          data={formData.step5}
          onSubmit={handleFinalSubmit}
          onBack={handleBack}
          existingCaracteristicas={vehiculo.caracteristicas || []}
          currentPlantilla={vehiculo.plantilla}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default VehiculoEdit;