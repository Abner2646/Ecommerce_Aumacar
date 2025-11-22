// /src/pages/public/SubaruShowcase.jsx

import { useState } from 'react';

const SubaruShowcase = () => {
  const [activeTab, setActiveTab] = useState('specs');

  // Datos mock de vehículos
  const vehiculos = [
    {
      id: 1,
      nombre: 'Forester',
      categoria: 'SUV',
      descripcion: 'Versatilidad y aventura con tecnología AWD simétrica',
      imagen: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
      precio: '45.990',
      specs: {
        motor: '2.5L BOXER',
        potencia: '182 HP',
        transmision: 'CVT',
        traccion: 'AWD'
      }
    },
    {
      id: 2,
      nombre: 'Outback',
      categoria: 'Wagon',
      descripcion: 'La perfecta combinación entre elegancia y capacidad todoterreno',
      imagen: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
      precio: '52.990',
      specs: {
        motor: '2.4L Turbo',
        potencia: '260 HP',
        transmision: 'CVT',
        traccion: 'AWD'
      }
    },
    {
      id: 3,
      nombre: 'Crosstrek',
      categoria: 'Crossover',
      descripcion: 'Compacto, eficiente y preparado para cualquier aventura',
      imagen: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80',
      precio: '38.990',
      specs: {
        motor: '2.0L BOXER',
        potencia: '152 HP',
        transmision: 'CVT',
        traccion: 'AWD'
      }
    },
    {
      id: 4,
      nombre: 'Impreza',
      categoria: 'Sedan',
      descripcion: 'Deportividad y eficiencia para el día a día',
      imagen: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
      precio: '32.990',
      specs: {
        motor: '2.0L BOXER',
        potencia: '152 HP',
        transmision: 'CVT',
        traccion: 'AWD'
      }
    },
    {
      id: 5,
      nombre: 'Ascent',
      categoria: 'SUV 7 Pasajeros',
      descripcion: 'Espacio, confort y seguridad para toda la familia',
      imagen: 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800&q=80',
      precio: '58.990',
      specs: {
        motor: '2.4L Turbo',
        potencia: '260 HP',
        transmision: 'CVT',
        traccion: 'AWD'
      }
    },
    {
      id: 6,
      nombre: 'WRX',
      categoria: 'Deportivo',
      descripcion: 'Pura emoción y rendimiento en estado puro',
      imagen: 'https://images.unsplash.com/photo-1610768764270-790fbec18178?w=800&q=80',
      precio: '62.990',
      specs: {
        motor: '2.4L Turbo',
        potencia: '271 HP',
        transmision: 'Manual 6V',
        traccion: 'AWD'
      }
    }
  ];

  const caracteristicas = [
    {
      titulo: 'Tecnología AWD Simétrica',
      descripcion: 'Sistema de tracción en las cuatro ruedas que proporciona máxima estabilidad y control en cualquier condición.',
      icono: '⚙️'
    },
    {
      titulo: 'Motor BOXER',
      descripcion: 'Diseño horizontalmente opuesto que reduce vibración y mejora el centro de gravedad del vehículo.',
      icono: '🔧'
    },
    {
      titulo: 'EyeSight',
      descripcion: 'Sistema avanzado de asistencia al conductor con detección de peatones y frenado automático.',
      icono: '👁️'
    },
    {
      titulo: 'Máxima Seguridad',
      descripcion: 'Certificación Top Safety Pick+ del IIHS en todos nuestros modelos principales.',
      icono: '🛡️'
    }
  ];

  return (
    <main className="subaru-showcase">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="cns-hero">
        <div className="cns-media-container">
          <img 
            src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&q=80"
            alt="Subaru Hero"
            className="showcase-hero-image"
          />
          <div className="cns-overlay"></div>
        </div>
        
        <div className="showcase-hero-content">
          <div className="cns-container">
            <div className="showcase-hero-text">
              <span className="sbr-body showcase-hero-subtitle">
                Performance y Confiabilidad
              </span>
              <h1 className="sbr-hero-title showcase-hero-title">
                Subaru
              </h1>
              <p className="sbr-body showcase-hero-description">
                Más de 50 años de innovación en tracción total y seguridad
              </p>
              <div className="showcase-hero-actions">
                <button className="cns-btn-primary">
                  Ver Modelos
                </button>
                <button className="cns-btn-secondary showcase-btn-secondary-light">
                  Agendar Test Drive
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== DESTACADOS ==================== */}
      <section className="cns-section showcase-featured-section">
        <div className="cns-container">
          <div className="showcase-section-header">
            <h2 className="sbr-heading text-h1-mobile lg:text-h1-desktop text-gray-900">
              Modelos Destacados
            </h2>
            <p className="sbr-body text-body-mobile lg:text-body-desktop text-gray-600">
              Descubre nuestra línea completa de vehículos diseñados para cada estilo de vida
            </p>
          </div>

          <div className="cns-vehicle-grid">
            {vehiculos.slice(0, 3).map((vehiculo) => (
              <article key={vehiculo.id} className="cns-vehicle-card showcase-vehicle-card">
                <div className="showcase-card-image-wrapper">
                  <img 
                    src={vehiculo.imagen} 
                    alt={vehiculo.nombre}
                    className="cns-card-image"
                  />
                  <div className="showcase-card-badge">
                    {vehiculo.categoria}
                  </div>
                </div>
                <div className="showcase-card-content">
                  <h3 className="sbr-heading text-h2-mobile lg:text-h2-desktop text-gray-900">
                    {vehiculo.nombre}
                  </h3>
                  <p className="sbr-body text-body-mobile text-gray-600 showcase-card-description">
                    {vehiculo.descripcion}
                  </p>
                  
                  <div className="showcase-card-specs">
                    <div className="showcase-spec-item">
                      <span className="showcase-spec-label">Motor</span>
                      <span className="showcase-spec-value">{vehiculo.specs.motor}</span>
                    </div>
                    <div className="showcase-spec-item">
                      <span className="showcase-spec-label">Potencia</span>
                      <span className="showcase-spec-value">{vehiculo.specs.potencia}</span>
                    </div>
                  </div>

                  <div className="showcase-card-footer">
                    <div className="showcase-card-price">
                      <span className="showcase-price-label">Desde</span>
                      <span className="sbr-heading showcase-price-value">
                        ${vehiculo.precio}
                      </span>
                    </div>
                    <button className="cns-btn-primary showcase-card-btn">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PARALLAX SECTION ==================== */}
      <section className="showcase-parallax-section">
        <div className="showcase-parallax-image">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
            alt="Subaru en carretera"
          />
          <div className="cns-overlay"></div>
        </div>
        <div className="showcase-parallax-content">
          <div className="cns-container">
            <div className="showcase-parallax-text">
              <h2 className="sbr-hero-title text-white">
                Confianza en cada kilómetro
              </h2>
              <p className="sbr-body showcase-parallax-description">
                La tracción simétrica AWD de Subaru te brinda el control total que necesitas en cualquier superficie y condición climática
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CARACTERÍSTICAS ==================== */}
      <section className="cns-section">
        <div className="cns-container">
          <div className="showcase-section-header">
            <h2 className="sbr-heading text-h1-mobile lg:text-h1-desktop text-gray-900">
              Tecnología Subaru
            </h2>
            <p className="sbr-body text-body-mobile lg:text-body-desktop text-gray-600">
              Innovación que marca la diferencia
            </p>
          </div>

          <div className="showcase-features-grid">
            {caracteristicas.map((caracteristica, index) => (
              <div key={index} className="showcase-feature-card">
                <div className="showcase-feature-icon">
                  {caracteristica.icono}
                </div>
                <h3 className="sbr-heading text-h2-mobile text-gray-900">
                  {caracteristica.titulo}
                </h3>
                <p className="sbr-body text-body-mobile text-gray-600">
                  {caracteristica.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== LÍNEA COMPLETA ==================== */}
      <section className="cns-section showcase-all-models-section">
        <div className="cns-container">
          <div className="showcase-section-header">
            <h2 className="sbr-heading text-h1-mobile lg:text-h1-desktop text-gray-900">
              Línea Completa 2024
            </h2>
            <p className="sbr-body text-body-mobile lg:text-body-desktop text-gray-600">
              Encuentra el Subaru perfecto para ti
            </p>
          </div>

          {/* Tabs */}
          <div className="showcase-tabs">
            <button 
              className={`showcase-tab ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Especificaciones
            </button>
            <button 
              className={`showcase-tab ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveTab('gallery')}
            >
              Galería
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'specs' && (
            <div className="showcase-models-list">
              {vehiculos.map((vehiculo) => (
                <div key={vehiculo.id} className="showcase-model-row">
                  <div className="showcase-model-image">
                    <img src={vehiculo.imagen} alt={vehiculo.nombre} />
                  </div>
                  <div className="showcase-model-info">
                    <div>
                      <h3 className="sbr-heading text-h2-mobile text-gray-900">
                        {vehiculo.nombre}
                      </h3>
                      <span className="showcase-model-category">
                        {vehiculo.categoria}
                      </span>
                    </div>
                    <p className="sbr-body text-body-mobile text-gray-600">
                      {vehiculo.descripcion}
                    </p>
                  </div>
                  <div className="showcase-model-specs-grid">
                    <div className="showcase-model-spec">
                      <span className="showcase-spec-label">Motor</span>
                      <span className="sbr-body showcase-spec-value">{vehiculo.specs.motor}</span>
                    </div>
                    <div className="showcase-model-spec">
                      <span className="showcase-spec-label">Potencia</span>
                      <span className="sbr-body showcase-spec-value">{vehiculo.specs.potencia}</span>
                    </div>
                    <div className="showcase-model-spec">
                      <span className="showcase-spec-label">Transmisión</span>
                      <span className="sbr-body showcase-spec-value">{vehiculo.specs.transmision}</span>
                    </div>
                    <div className="showcase-model-spec">
                      <span className="showcase-spec-label">Tracción</span>
                      <span className="sbr-body showcase-spec-value">{vehiculo.specs.traccion}</span>
                    </div>
                  </div>
                  <div className="showcase-model-action">
                    <div className="showcase-model-price">
                      <span className="showcase-price-label">Desde</span>
                      <span className="sbr-heading text-h2-mobile text-gray-900">
                        ${vehiculo.precio}
                      </span>
                    </div>
                    <button className="cns-btn-secondary">
                      Más Info
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="cns-vehicle-grid">
              {vehiculos.map((vehiculo) => (
                <div key={vehiculo.id} className="showcase-gallery-item">
                  <img 
                    src={vehiculo.imagen} 
                    alt={vehiculo.nombre}
                    className="cns-card-image"
                  />
                  <div className="showcase-gallery-overlay">
                    <h4 className="sbr-heading text-h2-mobile text-white">
                      {vehiculo.nombre}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="showcase-cta-section">
        <div className="cns-container">
          <div className="showcase-cta-content">
            <h2 className="sbr-hero-title text-white showcase-cta-title">
              Agenda tu Test Drive
            </h2>
            <p className="sbr-body showcase-cta-description">
              Experimenta la diferencia Subaru. Visita nuestro concesionario y prueba el modelo que más te guste
            </p>
            <div className="showcase-cta-actions">
              <button className="cns-btn-primary showcase-cta-btn">
                Agendar Ahora
              </button>
              <button className="cns-btn-secondary showcase-btn-secondary-light">
                Contactar Asesor
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default SubaruShowcase;