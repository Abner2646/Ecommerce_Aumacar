// /src/pages/public/VehiculoInfo.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useVehiculoBySlug } from '../../hooks/useVehiculos';
import { TemplateSelector } from '../../components/vehicle-templates';

function VehiculoInfo() {
  const { t } = useTranslation();
  const { nombre } = useParams(); // slug de la URL
  
  // ✅ CORRECTO: Usar useVehiculoBySlug para obtener vehículo COMPLETO
  const { data, isLoading, error } = useVehiculoBySlug(nombre);
  
  const vehiculo = data?.vehiculo; // El backend devuelve { vehiculo: {...} }

  // Estados de carga
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent mb-4"></div>
          <p className="text-xl font-semibold text-gray-600">{t('vehiclePage.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-2xl font-bold text-gray-900 mb-2">{t('vehiclePage.error')}</p>
          <p className="text-lg text-gray-600">
            {error.message || t('vehiclePage.errorMessage')}
          </p>
        </div>
      </div>
    );
  }

  if (!vehiculo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🚗</div>
          <p className="text-2xl font-bold text-gray-900 mb-2">{t('vehiclePage.notFound')}</p>
          <p className="text-lg text-gray-600">
            {t('vehiclePage.notFoundMessage')} "{nombre}"
          </p>
        </div>
      </div>
    );
  }

  // DEBUG: Verificar datos completos
  //console.log('✅ Vehículo completo:', vehiculo);
  //console.log('✅ Videos:', vehiculo.videos);
  //console.log('✅ Características:', vehiculo.caracteristicas);

  // Renderizar plantilla
  return <TemplateSelector vehiculo={vehiculo} />;
}

export default VehiculoInfo;