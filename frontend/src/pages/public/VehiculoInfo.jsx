
import React, { useState } from 'react';
import GaleriaVehiculo from '../../components/GaleriaVehiculo';
import { useParams, useNavigate } from 'react-router-dom';
import { useVehiculos } from '../../hooks/useVehiculos';
import { useColoresVehiculo } from '../../hooks/useColores';
import '../../styles/VehiculoInfo.css';


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
    <section className="vehiculo-info-section">
      <div className="vehiculo-info-grid">
        {/* Imagen principal */}
        <div className="vehiculo-galeria-container">
          {(vehiculo.imagenes?.length > 0 || vehiculo.videos?.length > 0) ? (
            (() => {
              const galeriaImages = [...(vehiculo.imagenes || [])]
                .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
                .map(img => img.url);
              console.log('IMAGENES PARA GALERIA:', galeriaImages);
              return (
                <GaleriaVehiculo
                  images={galeriaImages}
                  videos={vehiculo.videos?.map(vid => vid.url) || []}
                  etiqueta={"★ Buenas valoraciones"}
                />
              );
            })()
          ) : (
            <img
              src={vehiculo.imagen || 'https://via.placeholder.com/600x400'}
              alt={vehiculo.modelo || vehiculo.nombre}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
            />
          )}
        </div>
        {/* Info principal */}
        <div className="vehiculo-info-main">
          <div className="vehiculo-info-card">
            <h1 className="vehiculo-info-title">
              <span>{vehiculo.modelo}</span>
            </h1>
            {vehiculo.nombre && (
              <div className="vehiculo-info-subtitle" style={{ marginTop: 0 }}>{vehiculo.nombre}</div>
            )}
            {vehiculo.version && (
              <div className="vehiculo-info-subtitle">{vehiculo.version}</div>
            )}
            <hr style={{ margin: '16px 0', borderColor: '#e5e7eb' }} />
            <div style={{ marginBottom: 24 }}>
              <span style={{ display: 'block', color: '#555', marginBottom: 4 }}>Desde:</span>
              <span className="vehiculo-info-price">${Number(vehiculo.precio).toLocaleString('es-AR', { maximumFractionDigits: 0 })}</span>
              {vehiculo.precioUsd && (
                <span className="vehiculo-info-price-usd">/ usd {Number(vehiculo.precioUsd).toLocaleString('en-US')}</span>
              )}
            </div>
            <div className="vehiculo-info-btns">
              <button
                className="vehiculo-info-btn"
                onClick={() => navigate(`/comprar/${vehiculo.id}`)}
              >
                Comprar
              </button>
              <a
                href="https://wa.me/5492914277849?text=Hola%20quiero%20informaci%C3%B3n%20sobre%20el%20veh%C3%ADculo%20"
                target="_blank"
                rel="noopener noreferrer"
                className="vehiculo-info-btn vehiculo-info-btn-outline"
              >
                Contactar con un asesor
              </a>
            </div>
            <div className="vehiculo-info-colores">
              {colores.length > 0 ? (
                colores.map((color, idx) => {
                  const isSelected = colorSeleccionado === color.colorId;
                  return (
                    <button
                      key={color.colorId}
                      type="button"
                      className={`vehiculo-info-color-btn${isSelected ? ' selected' : ''}`}
                      onClick={() => setColorSeleccionado(color.colorId)}
                    >
                      <span
                        className="vehiculo-info-color-circle"
                        style={{ background: color.codigoHex }}
                        title={color.nombre}
                      ></span>
                      <span className="vehiculo-info-color-label">{color.nombre}</span>
                    </button>
                  );
                })
              ) : (
                <span style={{ color: '#bbb' }}>Sin colores asignados</span>
              )}
            </div>
            <div className="vehiculo-info-specs">
              <div><span style={{ fontWeight: 'bold' }}>Motor:</span> {vehiculo.motor || vehiculo.specs?.motor || '-'}</div>
              <div><span style={{ fontWeight: 'bold' }}>Potencia:</span> {vehiculo.potencia || vehiculo.specs?.potencia || '-'}</div>
              <div><span style={{ fontWeight: 'bold' }}>Consumo:</span> {vehiculo.consumo || vehiculo.specs?.consumo || '-'}</div>
              <div><span style={{ fontWeight: 'bold' }}>Transmisión:</span> {vehiculo.transmision || vehiculo.specs?.transmision || '-'}</div>
            </div>
          </div>
          {/* Características destacadas si existen */}
          {vehiculo.caracteristicas && vehiculo.caracteristicas.length > 0 && (
            <div className="vehiculo-info-features">
              <h3 className="vehiculo-info-features-title">Características destacadas</h3>
              <ul className="vehiculo-info-features-list">
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
