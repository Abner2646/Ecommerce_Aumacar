// /src/pages/admin/VehiculoCreate.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  useCreateVehiculo, 
  useAddImages, 
  useAddVideo,
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

const VehiculoCreate = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [createdVehiculoId, setCreatedVehiculoId] = useState(null);

  const createVehiculo = useCreateVehiculo();
  const addImages = useAddImages();
  const addVideo = useAddVideo();
  const assignCaracteristicas = useAssignCaracteristicas();

  // Step 1: Guardar info y avanzar
  const handleStep1Next = (data) => {
    setFormData(prev => ({ ...prev, step1: data }));
    setCurrentStep(2);
  };

  // Step 2: Guardar imágenes y avanzar
  const handleStep2Next = (data) => {
    setFormData(prev => ({ ...prev, step2: data }));
    setCurrentStep(3);
  };

  // Step 3: Guardar videos y avanzar
  const handleStep3Next = (data) => {
    setFormData(prev => ({ ...prev, step3: data }));
    setCurrentStep(4);
  };

  // Step 4: Submit final
  const handleFinalSubmit = async (data) => {
    try {
      // 1. Crear el vehículo con la info básica
      const vehiculoResponse = await createVehiculo.mutateAsync(formData.step1);
      const vehiculoId = vehiculoResponse.vehiculo.id;
      
      setCreatedVehiculoId(vehiculoId);

      // 2. Subir imágenes si hay
      if (formData.step2?.images?.length > 0) {
        const imagesToUpload = formData.step2.images.map(img => img.file);
        const esPrincipal = true; // La primera será principal
        
        await addImages.mutateAsync({
          vehiculoId,
          images: imagesToUpload,
          options: { esPrincipal, orden: 0 }
        });
      }

      // 3. Subir videos si hay
      if (formData.step3?.videos?.length > 0) {
        for (const videoData of formData.step3.videos) {
          if (videoData.status === 'pending') {
            await addVideo.mutateAsync({
              vehiculoId,
              video: videoData.file,
              metadata: videoData.metadata
            });
          }
        }
      }

      // 4. Asignar características si hay
      if (data.caracteristicasIds?.length > 0) {
        await assignCaracteristicas.mutateAsync({
          vehiculoId,
          caracteristicasIds: data.caracteristicasIds
        });
      }

      // Éxito total
      toast.success('¡Vehículo creado exitosamente!');
      navigate('/admin/vehiculos');
      
    } catch (error) {
      console.error('Error creando vehículo:', error);
      toast.error('Error al crear el vehículo. Por favor intenta nuevamente.');
    }
  };

  // Navegación
  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleCancel = () => {
    if (window.confirm('¿Estás seguro de cancelar? Se perderán todos los datos ingresados.')) {
      navigate('/admin/vehiculos');
    }
  };

  const isSubmitting = 
    createVehiculo.isLoading || 
    addImages.isLoading || 
    addVideo.isLoading || 
    assignCaracteristicas.isLoading;

  return (
    <div>
      {/* Header */}
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Crear Nuevo Vehículo</h1>
          <p className="text-gray-600 mt-2">
            Completa el proceso en 4 pasos simples
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
            vehiculoId={createdVehiculoId}
          />
        )}

        {currentStep === 3 && (
          <Step3Videos
            data={formData.step3}
            onNext={handleStep3Next}
            onBack={handleBack}
            vehiculoId={createdVehiculoId}
          />
        )}

        {currentStep === 4 && (
          <Step4Caracteristicas
            data={formData.step4}
            onSubmit={handleFinalSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default VehiculoCreate;