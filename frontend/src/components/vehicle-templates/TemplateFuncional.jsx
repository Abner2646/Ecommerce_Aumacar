// /src/components/vehicle-templates/Template01.jsx

import React, { useState, useRef, useEffect } from 'react';
import GaleriaVehiculo from '../GaleriaVehiculo';
import { useNavigate } from 'react-router-dom';
import { useColoresVehiculo } from '../../hooks/useColores';
import { useCaracteristicasVehiculo } from '../../hooks/useCaracteristicas';

export default function Template01({ vehiculo }) {
  const navigate = useNavigate();
  const [colorSeleccionado, setColorSeleccionado] = useState(null);
  const videoRef = useRef(null);

  // HOOKS - SIEMPRE PRIMERO
  const { data: coloresVehiculoData } = useColoresVehiculo(vehiculo?.id);
  const { data: caracteristicasData } = useCaracteristicasVehiculo(vehiculo?.id);

  const colores = coloresVehiculoData?.colores || [];
  const caracteristicas = caracteristicasData?.caracteristicas || [];

  // Inicializar color seleccionado
  useEffect(() => {
    if (colores.length > 0 && !colorSeleccionado) {
      setColorSeleccionado(colores[0].colorId);
    }
  }, [colores, colorSeleccionado]);

  // VALIDACIÓN - DESPUÉS DE HOOKS
  if (!vehiculo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gray-900 border-r-transparent mb-4"></div>
          <p className="text-xl font-semibold text-gray-600">Cargando vehículo...</p>
        </div>
      </div>
    );
  }

  // DEBUG: Ver qué llega
  console.log('🔍 DEBUG Template01 - vehiculo completo:', vehiculo);
  console.log('🔍 DEBUG Template01 - videos:', vehiculo.videos);
  console.log('🔍 DEBUG Template01 - videos length:', vehiculo.videos?.length);

  // DESTRUCTURING
  const { 
    imagenes = [], 
    videos = [], 
    modelo = '',
    nombre = '',
    version = '',
    precio = 0,
    precioUsd = null,
    motor = '',
    potencia = '',
    consumo = '',
    transmision = '',
    combustible = '',
    traccion = '',
    categoria = '',
    año = '',
    id
  } = vehiculo;

  // Preparar media
  const videoUrl = videos?.[0]?.urlVideo || null;
  const imagenPrincipal = imagenes
    .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))[0]?.url || null;

  const galeriaImages = [...imagenes]
    .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
    .map(img => img.url);

  const galeriaVideos = videos?.map(vid => vid.urlVideo) || [];

  // Formatear precio
  const precioFormateado = Number(precio).toLocaleString('es-AR', { 
    maximumFractionDigits: 0 
  });

  const precioUsdFormateado = precioUsd 
    ? Number(precioUsd).toLocaleString('en-US', { maximumFractionDigits: 0 })
    : null;

  return (
    <div className="bg-white">
      
      {/* ========================================
          HERO SECTION - VIDEO/IMAGEN FULLSCREEN
      ======================================== */}
      <section className="relative h-screen w-full overflow-hidden bg-gray-900">
        {/* Video o Imagen de fondo */}
        {videoUrl ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.7) contrast(1.1)' }}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : imagenPrincipal ? (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${imagenPrincipal})`,
              filter: 'brightness(0.7) contrast(1.1)'
            }}
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/30 to-gray-900/70" />

        {/* Contenido del hero */}
        <div className="relative h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto w-full">
            
            {/* Badges superiores */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {año && (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/95 text-gray-900 backdrop-blur-sm">
                  {año}
                </span>
              )}
              {categoria && (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/10 text-white backdrop-blur-md border border-white/20">
                  {categoria}
                </span>
              )}
            </div>

            {/* Título principal */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none mb-4">
              {modelo}
            </h1>
            
            {nombre && (
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90 mb-6 leading-tight">
                {nombre}
              </p>
            )}

            {version && (
              <p className="text-xl md:text-2xl font-medium text-white/70 mb-8 uppercase tracking-wide">
                {version}
              </p>
            )}

            {/* Precio */}
            <div className="inline-flex flex-col items-start bg-white/95 backdrop-blur-sm px-8 py-5 rounded-2xl mb-8">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">
                Desde
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl md:text-5xl font-bold text-gray-900">
                  ${precioFormateado}
                </span>
                {precioUsdFormateado && (
                  <span className="text-xl md:text-2xl font-semibold text-gray-500">
                    USD {precioUsdFormateado}
                  </span>
                )}
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="flex items-center gap-2 text-white/60 text-sm font-medium uppercase tracking-wider animate-bounce">
              <span>Explorar</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          ESPECIFICACIONES TÉCNICAS - GRID PREMIUM
      ======================================== */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Especificaciones
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Rendimiento y tecnología diseñados para la excelencia
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {motor && (
              <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Motor
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {motor}
                </div>
              </div>
            )}

            {potencia && (
              <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Potencia
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {potencia}
                </div>
              </div>
            )}

            {consumo && (
              <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Consumo
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {consumo}
                </div>
              </div>
            )}

            {transmision && (
              <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Transmisión
                </div>
                <div className="text-3xl font-bold text-gray-900 capitalize">
                  {transmision}
                </div>
              </div>
            )}

            {combustible && (
              <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                  </svg>
                </div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Combustible
                </div>
                <div className="text-3xl font-bold text-gray-900 capitalize">
                  {combustible}
                </div>
              </div>
            )}

            {traccion && (
              <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Tracción
                </div>
                <div className="text-3xl font-bold text-gray-900 capitalize">
                  {traccion}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================
          SELECTOR DE COLORES
      ======================================== */}
      {colores.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                Personaliza tu estilo
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Elige el color que mejor represente tu personalidad
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {colores.map((color) => {
                const isSelected = colorSeleccionado === color.colorId;
                return (
                  <button
                    key={color.colorId}
                    type="button"
                    onClick={() => setColorSeleccionado(color.colorId)}
                    className={`group flex flex-col items-center gap-4 transition-all duration-300 ${
                      isSelected ? 'scale-110' : 'hover:scale-105'
                    }`}
                  >
                    <div className="relative">
                      <div 
                        className={`w-24 h-24 rounded-full transition-all duration-300 ${
                          isSelected 
                            ? 'ring-4 ring-gray-900 ring-offset-4 shadow-2xl' 
                            : 'ring-2 ring-gray-200 shadow-lg group-hover:ring-gray-400'
                        }`}
                        style={{ backgroundColor: color.codigoHex }}
                      />
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-10 h-10 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <div className={`text-lg font-bold transition-colors ${
                        isSelected ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
                      }`}>
                        {color.nombre}
                      </div>
                      <div className="text-sm font-mono text-gray-400 uppercase">
                        {color.codigoHex}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ========================================
          GALERÍA DE IMÁGENES
      ======================================== */}
      {(galeriaImages.length > 0 || galeriaVideos.length > 0) && (
        <section className="py-24 bg-gray-900">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Galería
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Descubre cada detalle desde todos los ángulos
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <GaleriaVehiculo
                images={galeriaImages}
                videos={galeriaVideos}
                etiqueta="★ Ver todos los detalles"
              />
            </div>
          </div>
        </section>
      )}

      {/* ========================================
          CARACTERÍSTICAS DESTACADAS
      ======================================== */}
      {caracteristicas.length > 0 && (
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                Características destacadas
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Equipamiento diseñado para tu comodidad y seguridad
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {caracteristicas.map((caracteristica, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-lg font-semibold text-gray-900 leading-relaxed">
                        {caracteristica}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================
          SECCIÓN PARALLAX (Imagen fija de fondo)
      ======================================== */}
      {imagenes[1] && (
        <section 
          className="relative py-32 bg-fixed bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${imagenes[1].url})`,
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gray-900/60" />
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Diseñado para destacar
            </h2>
            <p className="text-2xl text-white/90 font-light leading-relaxed">
              Cada detalle pensado para ofrecer una experiencia de manejo excepcional
            </p>
          </div>
        </section>
      )}

      {/* ========================================
          CTA FINAL - COMPRA O CONTACTO
      ======================================== */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl p-12 md:p-16 text-center">
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              ¿Listo para la experiencia?
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Nuestro equipo de especialistas está listo para asesorarte y hacer realidad tu próxima aventura
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => navigate(`/comprar/${id}`)}
                className="group w-full sm:w-auto inline-flex items-center justify-center px-12 py-6 text-lg font-bold text-gray-900 bg-white rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
              >
                Iniciar compra
                <svg className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <a
                href={`https://wa.me/5492914277849?text=Hola%20quiero%20información%20sobre%20el%20${encodeURIComponent(modelo)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center px-12 py-6 text-lg font-bold text-white bg-gray-800 border-2 border-white/20 rounded-2xl hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
              >
                <svg className="mr-3 w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hablar con asesor
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                Financiamiento disponible • Entrega inmediata • Garantía oficial
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DEBUG INFO - Solo en desarrollo
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-green-400 px-4 py-3 rounded-xl shadow-2xl text-xs font-mono z-50 border border-green-900">
          <div className="font-bold text-green-300 mb-2 pb-2 border-b border-green-900">
            🎬 Template01 Debug
          </div>
          <div className="space-y-1">
            <div>Plantilla: <span className="text-white font-bold">{vehiculo.plantilla}</span></div>
            <div>Imágenes: <span className="text-white font-bold">{imagenes.length}</span></div>
            <div>Videos: <span className="text-white font-bold">{videos.length}</span></div>
            <div>Colores: <span className="text-white font-bold">{colores.length}</span></div>
            <div>Características: <span className="text-white font-bold">{caracteristicas.length}</span></div>
          </div>
        </div>
      )}*/}
    </div>
  );
}