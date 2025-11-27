// /src/pages/admin/VehiculoCreate.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  useCreateVehiculo, 
  useAddImages, 
  useAddVideo,
  useAssignCaracteristicas,
  useUpdateVehiculo,
  useUpdateVehiculoPartial
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

const VehiculoCreate = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [createdVehiculoId, setCreatedVehiculoId] = useState(null);
  const [assignedColores, setAssignedColores] = useState([]);

  // Mutations
  const createVehiculo = useCreateVehiculo();
  const updateVehiculo = useUpdateVehiculoPartial();
  const assignColores = useAssignColoresVehiculo();
  const addImages = useAddImages();
  const addVideo = useAddVideo();
  const assignCaracteristicas = useAssignCaracteristicas();

  // Step 1: Crear vehículo con info básica
  const handleStep1Next = async (data) => { // <-----------
    try {
      const response = await createVehiculo.mutateAsync(data);
      setCreatedVehiculoId(response.vehiculo.id);
      setFormData(prev => ({ ...prev, step1: data }));
      setCurrentStep(2);
    } catch (error) {
      console.error('Error creando vehículo:', error);
    }
  };

  // Step 2: Asignar colores
  const handleStep2Next = async (data) => {
    try {
      if (data.colorIds?.length > 0 && createdVehiculoId) {
        const response = await assignColores.mutateAsync({
          vehiculoId: createdVehiculoId,
          colorIds: data.colorIds
        });
        // Guardar los colores asignados con sus colorVehiculoId
        setAssignedColores(response.colores || []);
      }
      setFormData(prev => ({ ...prev, step2: data }));
      setCurrentStep(3);
    } catch (error) {
      console.error('Error asignando colores:', error);
    }
  };

  // Step 3: Subir imágenes
  const handleStep3Next = async (data) => {
    try {
      if (data.images?.length > 0 && createdVehiculoId) {
        // Agrupar imágenes por colorVehiculoId
        const imagesByColor = data.images.reduce((acc, img) => {
          const key = img.colorVehiculoId || 'generic';
          if (!acc[key]) acc[key] = [];
          acc[key].push(img);
          return acc;
        }, {});

        // Subir cada grupo
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
            vehiculoId: createdVehiculoId,
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

  // Step 4: Subir videos
  const handleStep4Next = async (data) => {
    try {
      if (data.videos?.length > 0 && createdVehiculoId) {
        for (const video of data.videos) {
          if (video.status === 'pending') {
            await addVideo.mutateAsync({
              vehiculoId: createdVehiculoId,
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

  // Step 5: Características y plantilla
  const handleFinalSubmit = async (data) => {
    try {
      // Asignar características
      if (data.caracteristicasIds?.length > 0 && createdVehiculoId) {
        await assignCaracteristicas.mutateAsync({
          vehiculoId: createdVehiculoId,
          caracteristicasIds: data.caracteristicasIds
        });
      }

      // Actualizar plantilla
      if (data.plantilla && createdVehiculoId) {
       await updateVehiculo.mutateAsync({
         id: createdVehiculoId,
         data: { plantilla: data.plantilla }
       });
     }

      toast.success('¡Vehículo creado exitosamente!');
      navigate('/admin/vehiculos');
    } catch (error) {
      console.error('Error finalizando:', error);
      toast.error('Error al guardar el vehículo');
    }
  };

  // Navigation
  const handleBack = () => setCurrentStep(prev => Math.max(1, prev - 1));

  const handleCancel = () => {
    if (window.confirm('¿Cancelar? Se perderán los datos no guardados.')) {
      navigate('/admin/vehiculos');
    }
  };

  const isSubmitting = 
    createVehiculo.isPending || 
    assignColores.isPending ||
    addImages.isPending || 
    addVideo.isPending || 
    assignCaracteristicas.isPending ||
    updateVehiculo.isPending;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Crear Nuevo Vehículo</h1>
        <p className="text-gray-600 mt-1">Completa el proceso en 5 pasos</p>
      </div>

      {/* Step Indicator */}
      <div className="mb-8 bg-white rounded-lg shadow-sm p-4">
        <StepIndicator currentStep={currentStep} steps={STEPS} />
      </div>

      {/* Form Steps */}
      {currentStep === 1 && (
        <Step1Info
          data={formData.step1}
          onNext={handleStep1Next}
          onCancel={handleCancel}
          isSubmitting={createVehiculo.isPending}
        />
      )}

      {currentStep === 2 && (
        <Step2Colores
          data={formData.step2}
          onNext={handleStep2Next}
          onBack={handleBack}
          isSubmitting={assignColores.isPending}
        />
      )}

      {currentStep === 3 && (
        <Step3Images
          data={formData.step3}
          onNext={handleStep3Next}
          onBack={handleBack}
          selectedColores={assignedColores}
          isSubmitting={addImages.isPending}
        />
      )}

      {currentStep === 4 && (
        <Step4Videos
          data={formData.step4}
          onNext={handleStep4Next}
          onBack={handleBack}
          isSubmitting={addVideo.isPending}
        />
      )}

      {currentStep === 5 && (
        <Step5Final
          data={formData.step5}
          onSubmit={handleFinalSubmit}
          onBack={handleBack}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default VehiculoCreate;