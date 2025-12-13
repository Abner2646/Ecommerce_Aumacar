import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useParams, useNavigate } from 'react-router-dom';
import { useVehiculos } from '../../hooks/useVehiculos';
import { useColoresVehiculo } from '../../hooks/useColores';
import { Info, DollarSign, Zap, Settings } from 'react-feather';


function VehiculoInfo() {
  const navigate = useNavigate();
  const { nombre } = useParams();
  const { data, isLoading, error } = useVehiculos();
  const [colorSeleccionado, setColorSeleccionado] = useState(null);
  const vehiculo = data?.vehiculos?.find(v => v.modelo?.replace(/\s+/g, '-').toLowerCase() === nombre || v.nombre?.replace(/\s+/g, '-').toLowerCase() === nombre);
  const { data: coloresVehiculoData } = useColoresVehiculo(vehiculo?.id);

  // Colores reales asociados al vehículo
  const colores = coloresVehiculoData?.colores || [];

  // Inicializar color seleccionado cuando haya colores disponibles
  React.useEffect(() => {
    if (colores.length > 0 && !colorSeleccionado) {
      setColorSeleccionado(colores[0].colorId);
    }
  }, [colores, colorSeleccionado]);

  if (isLoading) return <div className="text-center py-20 text-xl">Cargando...</div>;
  if (error) return <div className="text-center py-20 text-xl text-red-600">Error al cargar el vehículo</div>;
  if (!vehiculo) return <div className="text-center py-20 text-xl text-gray-600">Vehículo no encontrado</div>;

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-between">
        {/* Imagen principal */}
        <div className="flex justify-center items-center">
          <div className="bg-white rounded-3xl shadow-2xl p-6 flex items-center justify-center w-full" style={{ minHeight: '340px', minWidth: '320px' }}>
            {vehiculo.imagenes && vehiculo.imagenes.length > 0 ? (
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                style={{ width: '100%', maxWidth: '600px' }}
              >
                {vehiculo.imagenes.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img.url}
                      alt={`Imagen ${idx + 1} de ${vehiculo.modelo || vehiculo.nombre}`}
                      className="rounded-2xl shadow-xl w-full object-contain transition-all duration-300"
                      style={{ background: '#f8f8f8', padding: '12px', maxHeight: '340px' }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img
                src={vehiculo.imagen || 'https://via.placeholder.com/600x400'}
                alt={vehiculo.modelo || vehiculo.nombre}
                className="rounded-2xl shadow-xl max-w-lg w-full object-contain transition-all duration-300"
                style={{ background: '#f8f8f8', padding: '12px' }}
              />
            )}
          </div>
        </div>
        {/* Info principal */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-2 leading-tight">
              <span className="text-black">{vehiculo.modelo}</span>
              {vehiculo.nombre && <span className="block text-3xl md:text-4xl font-bold text-black mt-2">{vehiculo.nombre}</span>}
              {vehiculo.version && <span className="block text-3xl md:text-4xl font-bold text-black mt-2">{vehiculo.version}</span>}
            </h1>
            <hr className="my-4 border-gray-200" />
            <div className="text-gray-500 mb-2 text-base">Imagen referencial: {vehiculo.modelo || vehiculo.nombre} {vehiculo.version || ''}</div>
            <div className="mb-6">
              <span className="block text-lg text-gray-700 mb-1">Desde:</span>
              <span className="text-4xl md:text-5xl font-extrabold text-gray-900">${Number(vehiculo.precio).toLocaleString('es-AR', { maximumFractionDigits: 0 })}</span>
              {vehiculo.precioUsd && (
                <span className="ml-2 text-2xl text-gray-500">/ usd {Number(vehiculo.precioUsd).toLocaleString('en-US')}</span>
              )}
            </div>
            <div className="flex gap-4 mb-8">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all duration-300"
                onClick={() => navigate(`/comprar/${vehiculo.id}`)}
              >
                Comprar
              </button>
              <a
                href="https://wa.me/5492914277849?text=Hola%20quiero%20informaci%C3%B3n%20sobre%20el%20veh%C3%ADculo%20"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-blue-600 hover:bg-blue-50 text-blue-700 font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                Contactar con un asesor
              </a>
            </div>
            <div className="flex gap-3 mb-6 flex-wrap">
              {colores.length > 0 ? (
                colores.map((color, idx) => {
                  const isSelected = colorSeleccionado === color.colorId;
                  return (
                    <button
                      key={color.colorId}
                      type="button"
                      className={`flex flex-col items-center focus:outline-none ${isSelected ? 'ring-2 ring-gray-300' : ''}`}
                      onClick={() => setColorSeleccionado(color.colorId)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                      <span
                        className={`w-8 h-8 rounded-full border-4 ${isSelected ? 'border-gray-300' : 'border-gray-300'} inline-block shadow`}
                        style={{ background: color.codigoHex, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                        title={color.nombre}
                      ></span>
                      <span className="text-xs text-gray-600 mt-1">{color.nombre}</span>
                    </button>
                  );
                })
              ) : (
                <span className="text-gray-400">Sin colores asignados</span>
              )}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-base text-gray-700"><span className="font-bold">Motor:</span> {vehiculo.motor || vehiculo.specs?.motor || '-'}</div>
              <div className="text-base text-gray-700"><span className="font-bold">Potencia:</span> {vehiculo.potencia || vehiculo.specs?.potencia || '-'}</div>
              <div className="text-base text-gray-700"><span className="font-bold">Consumo:</span> {vehiculo.consumo || vehiculo.specs?.consumo || '-'}</div>
              <div className="text-base text-gray-700"><span className="font-bold">Transmisión:</span> {vehiculo.transmision || vehiculo.specs?.transmision || '-'}</div>
            </div>
          </div>
          {/* Características destacadas si existen */}
          {vehiculo.caracteristicas && vehiculo.caracteristicas.length > 0 && (
            <div className="bg-blue-50 rounded-xl shadow p-6 mt-4">
              <h3 className="text-xl font-bold text-blue-700 mb-4">Características destacadas</h3>
              <ul className="list-disc pl-6 text-base text-blue-900">
                {vehiculo.caracteristicas.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default VehiculoInfo;
