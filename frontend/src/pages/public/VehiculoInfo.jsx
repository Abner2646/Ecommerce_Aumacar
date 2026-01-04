// /src/pages/VehiculoInfo.jsx - VERSIÓN CORREGIDA

import React from 'react';
import { useParams } from 'react-router-dom';
import { useVehiculoBySlug } from '../../hooks/useVehiculos';
import { TemplateSelector } from '../../components/vehicle-templates';

function VehiculoInfo() {
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
          <p className="text-xl font-semibold text-gray-600">Cargando vehículo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-2xl font-bold text-gray-900 mb-2">Error al cargar</p>
          <p className="text-lg text-gray-600">
            {error.message || 'No se pudo cargar el vehículo'}
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
          <p className="text-2xl font-bold text-gray-900 mb-2">Vehículo no encontrado</p>
          <p className="text-lg text-gray-600">
            No encontramos un vehículo con el nombre "{nombre}"
          </p>
        </div>
      </div>
    );
  }

  // DEBUG: Verificar datos completos
  console.log('✅ Vehículo completo:', vehiculo);
  console.log('✅ Videos:', vehiculo.videos);
  console.log('✅ Características:', vehiculo.caracteristicas);

  // Renderizar plantilla
  return <TemplateSelector vehiculo={vehiculo} />;
}

export default VehiculoInfo;