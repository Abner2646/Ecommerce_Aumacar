// SuzukiHome.jsx - VERSIÓN CON FUNCIONALIDAD (Referencia)
// Esta versión muestra cómo integrar la página con el backend y TanStack Query

import React from 'react';
import { useVehiculos } from '../../hooks/useVehiculos';
import { useMarcaBySlug } from '../../hooks/useMarcas';
import { Link } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';

const SuzukiHomeConAPI = () => {
  // Obtener datos de la marca Suzuki
  const { data: marcaData, isLoading: marcaLoading } = useMarcaBySlug('suzuki');
  
  // Obtener vehículos de Suzuki (disponibles, ordenados)
  const { data: vehiculosData, isLoading: vehiculosLoading } = useVehiculos({
    marcaSlug: 'suzuki',
    disponible: true,
    limit: 3
  });

  // Estados de carga
  if (marcaLoading || vehiculosLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const marca = marcaData?.marca;
  const modelos = vehiculosData?.vehiculos || [];

  return (
    <div className="min-h-screen bg-white">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="cns-hero relative h-screen">
        {/* Video/Imagen de fondo - desde BD */}
        <div className="cns-media-container">
          {marca?.imagenHero ? (
            <img 
              src={marca.imagenHero}
              alt={`${marca.nombre} Hero`}
              className="w-full h-full object-cover"
            />
          ) : (
            <img 
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&h=1080&fit=crop"
              alt="Suzuki Hero"
              className="w-full h-full object-cover"
            />
          )}
          <div className="cns-overlay"></div>
        </div>

        {/* Contenido Hero */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-6">
            <h1 className="szk-hero-title text-hero-mobile lg:text-hero-desktop text-white mb-6">
              {marca?.nombre || 'Suzuki'}
            </h1>
            <p className="szk-body text-body-mobile lg:text-body-desktop text-white/90 mb-8 max-w-2xl mx-auto">
              {marca?.descripcion || 'Innovación, confiabilidad y diseño que se adapta a tu estilo de vida'}
            </p>
            <Link to="/suzuki/catalogo" className="cns-btn-primary">
              Explorar Modelos
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== MODELOS DESTACADOS ==================== */}
      <section className="cns-section bg-gray-50">
        <div className="cns-container">
          {/* Header de Sección */}
          <div className="text-center mb-16">
            <h2 className="szk-heading text-h1-mobile lg:text-h1-desktop text-gray-900 mb-4">
              Nuestros Modelos
            </h2>
            <p className="szk-body text-body-mobile lg:text-body-desktop text-gray-600 max-w-2xl mx-auto">
              Descubre la gama completa de vehículos Suzuki diseñados para cada aventura
            </p>
          </div>

          {/* Grid de Vehículos */}
          {modelos.length > 0 ? (
            <div className="cns-vehicle-grid">
              {modelos.map((vehiculo) => (
                <article key={vehiculo.id} className="cns-vehicle-card">
                  {/* Imagen del vehículo - Imagen principal */}
                  <div className="relative overflow-hidden rounded-lg mb-6">
                    <img 
                      src={vehiculo.imagenPrincipal || vehiculo.imagenes?.[0]?.url}
                      alt={vehiculo.nombre}
                      className="cns-card-image w-full h-64 object-cover"
                    />
                    {vehiculo.categoria && (
                      <span className="absolute top-4 right-4 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                        {vehiculo.categoria}
                      </span>
                    )}
                  </div>

                  {/* Información del vehículo */}
                  <div className="space-y-4">
                    <h3 className="szk-heading text-h2-mobile lg:text-h2-desktop text-gray-900">
                      {vehiculo.nombre}
                    </h3>
                    
                    <p className="szk-body text-body-mobile text-gray-600 line-clamp-2">
                      {vehiculo.descripcionCorta || vehiculo.descripcion}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <span className="text-small text-gray-400 block">Desde</span>
                        <span className="szk-heading text-2xl text-gray-900">
                          ${vehiculo.precioBase?.toLocaleString('es-AR')}
                        </span>
                      </div>
                      <Link 
                        to={`/suzuki/${vehiculo.slug}`}
                        className="cns-btn-secondary"
                      >
                        Ver Detalles
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="szk-body text-body-mobile text-gray-600">
                No hay modelos disponibles en este momento
              </p>
            </div>
          )}

          {/* Ver todos los modelos */}
          <div className="text-center mt-12">
            <Link to="/suzuki/catalogo" className="cns-btn-primary">
              Ver Todos los Modelos
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== CARACTERÍSTICAS DESTACADAS ==================== */}
      <section className="cns-section bg-white">
        <div className="cns-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Imagen */}
            <div className="order-2 lg:order-1">
              <img 
                src={marca?.imagenTecnologia || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop'}
                alt="Tecnología Suzuki"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Contenido */}
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="szk-heading text-h1-mobile lg:text-h1-desktop text-gray-900">
                Tecnología que te Impulsa
              </h2>
              
              <p className="szk-body text-body-mobile lg:text-body-desktop text-gray-600">
                Cada Suzuki está equipado con tecnología de vanguardia diseñada para brindarte 
                la mejor experiencia de conducción, seguridad y eficiencia.
              </p>

              {/* Características desde la base de datos */}
              <div className="space-y-4">
                {marca?.caracteristicasDestacadas?.slice(0, 3).map((feature) => (
                  <div key={feature.id} className="flex gap-4">
                    <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="szk-heading text-lg text-gray-900 mb-1">
                        {feature.nombre}
                      </h4>
                      <p className="szk-body text-small text-gray-600">
                        {feature.descripcion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/suzuki/tecnologia" className="cns-btn-primary inline-block mt-6">
                Conocer Más
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="cns-section bg-gray-900 text-white">
        <div className="cns-container text-center">
          <h2 className="szk-heading text-h1-mobile lg:text-h1-desktop mb-6">
            Agenda tu Test Drive
          </h2>
          
          <p className="szk-body text-body-mobile lg:text-body-desktop text-white/80 mb-10 max-w-2xl mx-auto">
            Experimenta la diferencia Suzuki. Reserva tu prueba de manejo hoy y descubre 
            por qué millones confían en nosotros.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contacto?tipo=test-drive" className="bg-white text-gray-900 px-8 py-4 rounded-md font-semibold hover:opacity-90 transition-opacity duration-250">
              Agendar Ahora
            </Link>
            <Link to="/concesionarios" className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-gray-900 transition-all duration-250">
              Ver Concesionarios
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== GALERÍA DE IMÁGENES ==================== */}
      <section className="py-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {marca?.galeriaHome?.slice(0, 4).map((imagen, index) => (
            <div key={imagen.id || index} className="relative overflow-hidden aspect-square">
              <img 
                src={imagen.url}
                alt={imagen.alt || `Suzuki Gallery ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default SuzukiHomeConAPI;

/* 
==================== NOTAS DE IMPLEMENTACIÓN ====================

1. HOOKS USADOS:
   - useMarcaBySlug('suzuki') → Obtiene datos de la marca
   - useVehiculos({ marcaSlug: 'suzuki' }) → Obtiene vehículos

2. ESTADOS DE CARGA:
   - Mostrar Spinner mientras carga
   - Fallbacks para datos opcionales

3. DATOS DINÁMICOS:
   - Hero: marca.imagenHero, marca.nombre, marca.descripcion
   - Modelos: vehiculos.map() con datos reales
   - Características: marca.caracteristicasDestacadas
   - Galería: marca.galeriaHome

4. NAVEGACIÓN:
   - Links con React Router
   - Slugs dinámicos para detalles
   - Query params para formularios

5. OPTIMIZACIONES:
   - Lazy load de imágenes (agregar en producción)
   - Límite de 3 modelos destacados
   - line-clamp-2 para descripciones

6. MANEJO DE ERRORES:
   - Verificar datos antes de renderizar
   - Fallbacks para imágenes/textos
   - Mensaje cuando no hay modelos

7. ESCALABILIDAD:
   - Fácil de replicar para Subaru
   - Solo cambiar 'suzuki' → 'subaru'
   - Clases szk-* → sbr-*
*/