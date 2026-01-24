// src/components/public/ClientesCercanos.jsx

import { useState, useEffect, useRef } from 'react';
import { MapPin, CheckCircle, X, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const ClientesCercanos = () => {
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [fotoSeleccionada, setFotoSeleccionada] = useState(null);
  const [indiceActual, setIndiceActual] = useState(0);
  const [timeoutError, setTimeoutError] = useState(false);
  const timeoutRef = useRef(null);
  const [intentos, setIntentos] = useState(0);

  useEffect(() => {
    let cancelado = false;
    const obtenerFotosCercanas = async (reintento = 0) => {
      if (!("geolocation" in navigator)) {
        setError("Tu navegador no soporta geolocalización");
        setLoading(false);
        return;
      }
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          });
        });
        const { latitude, longitude } = position.coords;
        setUbicacion({ latitud: latitude, longitud: longitude });
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
        const url = `${API_URL}/fotos-clientes-region/coordenadas?latitud=${latitude}&longitud=${longitude}&radio=250`;
        const response = await fetch(url);
        if (!response.ok) {
          const errorText = await response.text();
          if (response.status === 429) {
            setError("Límite de la API alcanzado (rate limit)");
          } else if (response.status === 403) {
            setError("Acceso prohibido a la API (forbidden)");
          } else {
            setError(`Error al obtener fotos: ${response.status}`);
          }
          setLoading(false);
          return;
        }
        const data = await response.json();
        setFotos(data.fotos || []);
      } catch (err) {
        if (reintento < 2 && !cancelado) {
          setTimeout(() => {
            setIntentos(prev => prev + 1);
            obtenerFotosCercanas(reintento + 1);
          }, 2000);
        } else {
          if (err.code === 1) {
            setError("Permiso de ubicación denegado");
          } else {
            setError("No se pudo obtener la ubicación o hubo un error de red");
          }
          setLoading(false);
        }
      } finally {
        if (!cancelado && !error) setLoading(false);
      }
    };

    timeoutRef.current = setTimeout(() => {
      if (loading) {
        setTimeoutError(true);
      }
    }, 7000);

    obtenerFotosCercanas(0);
    return () => {
      clearTimeout(timeoutRef.current);
      cancelado = true;
    };
  }, []);

  // Función para abrir modal
  const abrirModal = (foto, index) => {
    setFotoSeleccionada(foto);
    setIndiceActual(index);
  };

  // Función para cerrar modal
  const cerrarModal = () => {
    setFotoSeleccionada(null);
  };

  // Navegación en modal
  const irSiguiente = () => {
    const nuevoIndice = (indiceActual + 1) % fotos.length;
    setIndiceActual(nuevoIndice);
    setFotoSeleccionada(fotos[nuevoIndice]);
  };

  const irAnterior = () => {
    const nuevoIndice = (indiceActual - 1 + fotos.length) % fotos.length;
    setIndiceActual(nuevoIndice);
    setFotoSeleccionada(fotos[nuevoIndice]);
  };

  // Manejar teclas del teclado en modal
  useEffect(() => {
    if (!fotoSeleccionada) return;

    const manejarTecla = (e) => {
      if (e.key === 'Escape') cerrarModal();
      if (e.key === 'ArrowRight') irSiguiente();
      if (e.key === 'ArrowLeft') irAnterior();
    };

    window.addEventListener('keydown', manejarTecla);
    return () => window.removeEventListener('keydown', manejarTecla);
  }, [fotoSeleccionada, indiceActual]);

  // Estado de carga
  if (loading) {
    return (
      <section className="cns-section bg-gradient-to-b from-gray-50 to-white">
        <div className="cns-container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-200 animate-pulse rounded-full h-10 w-40"></div>
            <div className="h-12 bg-gray-200 animate-pulse rounded-lg max-w-md mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 animate-pulse rounded-lg max-w-lg mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[1, 2].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-[16/10] rounded-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // NO RENDERIZAR SI NO HAY FOTOS
  if (error || !fotos || fotos.length === 0) {
    return null;
  }

  return (
    <>
      <section className="cns-section bg-gradient-to-b from-gray-50 to-white">
        <div className="cns-container">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-900 text-white rounded-full shadow-lg">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">
                En tu región
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Clientes Cerca de Ti
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Familias de tu zona que ya confían en nosotros
            </p>
          </div>

          {/* Grid de Fotos - Optimizado para 1-2 fotos grandes */}
          <div className={`grid gap-8 max-w-5xl mx-auto ${
            fotos.length === 1 
              ? 'grid-cols-1 max-w-3xl' 
              : 'grid-cols-1 md:grid-cols-2'
          }`}>
            {fotos.map((foto, index) => (
              <div 
                key={foto.id}
                style={{ animationDelay: `${index * 150}ms` }}
                className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 animate-fade-in-up"
              >
                {/* Badge de reciente (si la foto tiene menos de 30 días) */}
                {foto.esReciente && (
                  <div className="absolute top-6 right-6 z-10">
                    <span className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg">
                      Reciente
                    </span>
                  </div>
                )}

                {/* Imagen con aspecto ratio más grande */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={foto.urlImagen}
                    alt={foto.textoDescriptivo || foto.ciudad}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay gradient sutil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent"></div>
                  
                  {/* Contenido de texto */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    {/* Texto descriptivo */}
                    {foto.textoDescriptivo && (
                      <p className="text-white text-xl md:text-2xl font-medium mb-3 leading-tight">
                        {foto.textoDescriptivo}
                      </p>
                    )}

                    {/* Nombre del cliente */}
                    {foto.nombreCliente && (
                      <p className="text-white/80 text-sm font-medium mb-3">
                        {foto.nombreCliente}
                      </p>
                    )}

                    {/* Ubicación y distancia - Responsive */}
                    <div className="text-white/90 text-base">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span className="font-medium">
                          {foto.ciudad}
                          {foto.provincia && `, ${foto.provincia}`}
                        </span>
                      </div>
                        {foto.distanciaKm && (
                          <span className="inline mt-2 ml-[3px] px-4 py-1.5 bg-white/25 backdrop-blur-md rounded-full text-sm font-semibold border border-white/30 md:ml-6 md:relative md:top-[10px]">
                            A {Math.round(foto.distanciaKm)} km de ti
                        </span>
                      )}
                    </div>

                    {/* Testimonio (si está disponible) */}
                    {foto.testimonio && (
                      <p className="text-white/80 text-base mt-4 italic leading-relaxed line-clamp-2">
                        {foto.testimonio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mensaje motivacional */}
          <div className="text-center mt-16">
            <p className="text-gray-600 text-lg">
              Únete a nuestra comunidad de clientes satisfechos
            </p>
          </div>
        </div>
      </section>

      {/* Modal de Ampliación */}
      {fotoSeleccionada && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={cerrarModal}
        >
          {/* Botón cerrar */}
          <button
            onClick={cerrarModal}
            className="absolute top-6 right-6 z-50 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navegación anterior */}
          {fotos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                irAnterior();
              }}
              className="absolute left-6 z-50 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors backdrop-blur-sm hidden md:block"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Navegación siguiente */}
          {fotos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                irSiguiente();
              }}
              className="absolute right-6 z-50 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors backdrop-blur-sm hidden md:block"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Contenedor del modal */}
          <div 
            className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Imagen */}
              <div className="relative aspect-square md:aspect-auto">
                <img
                  src={fotoSeleccionada.urlImagen}
                  alt={fotoSeleccionada.textoDescriptivo || fotoSeleccionada.ciudad}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Contenido */}
              <div className="p-8 md:p-12 flex flex-col justify-center bg-gray-50">
                {/* Badge verificado */}
                <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold w-fit mb-6">
                  <CheckCircle className="w-4 h-4" />
                  Cliente Verificado
                </div>

                {/* Estrellas */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-6 h-6 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Texto descriptivo */}
                {fotoSeleccionada.textoDescriptivo && (
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    "{fotoSeleccionada.textoDescriptivo}"
                  </h3>
                )}

                {/* Nombre */}
                {fotoSeleccionada.nombreCliente && (
                  <p className="text-xl text-gray-700 font-semibold mb-6">
                    — {fotoSeleccionada.nombreCliente}
                  </p>
                )}

                {/* Testimonio completo */}
                {fotoSeleccionada.testimonio && (
                  <p className="text-gray-600 text-lg mb-8 italic leading-relaxed">
                    {fotoSeleccionada.testimonio}
                  </p>
                )}

                {/* Ubicación */}
                <div className="flex items-center gap-3 text-gray-700 mb-8">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg font-medium">
                    {fotoSeleccionada.ciudad}
                    {fotoSeleccionada.provincia && `, ${fotoSeleccionada.provincia}`}
                  </span>
                  {fotoSeleccionada.distanciaKm && (
                    <span className="ml-auto px-4 py-2 bg-gray-200 rounded-full text-sm font-semibold">
                      {Math.round(fotoSeleccionada.distanciaKm)} km
                    </span>
                  )}
                </div>

                {/* Fecha (si está disponible) */}
                {fotoSeleccionada.fecha && (
                  <p className="text-gray-500 text-sm">
                    {new Date(fotoSeleccionada.fecha).toLocaleDateString('es-AR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}

                {/* Indicador de posición */}
                {fotos.length > 1 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-gray-500 text-sm text-center">
                      {indiceActual + 1} de {fotos.length}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Indicador de navegación mobile */}
          {fotos.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 md:hidden">
              {fotos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIndiceActual(idx);
                    setFotoSeleccionada(fotos[idx]);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === indiceActual 
                      ? 'bg-white w-8' 
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Estilos para animaciones */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default ClientesCercanos;