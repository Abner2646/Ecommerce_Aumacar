
import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useVehiculo } from "../../hooks/useVehiculos";
import { useColoresVehiculo } from "../../hooks/useColores";

const ComprarForm = () => {
  const { id } = useParams();
  const { data: vehiculoData, isLoading } = useVehiculo(id);
  const { data: coloresData } = useColoresVehiculo(id);
  const colores = coloresData?.colores || [];
  // Buscar si hay color preseleccionado en localStorage o en query param (puedes ajustar la lógica según tu app)
  const getColorPreseleccionado = () => {
    // Ejemplo: buscar en localStorage
    const guardado = window.localStorage.getItem(`colorSeleccionadoVehiculo_${id}`);
    if (guardado && colores.some(c => String(c.colorId) === String(guardado))) return String(guardado);
    return colores[0]?.colorId ? String(colores[0].colorId) : "";
  };
  const [colorSeleccionado, setColorSeleccionado] = useState(getColorPreseleccionado());
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    dni: "",
    direccion: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",
    metodoPago: "",
    tipoEntrega: "",
    comentarios: "",
  });
  const formRef = useRef();

  React.useEffect(() => {
    if (colores.length > 0 && !colorSeleccionado) {
      setColorSeleccionado(colores[0].colorId);
    }
  }, [colores]);

  // Guardar selección en localStorage para persistencia entre páginas
  React.useEffect(() => {
    if (colorSeleccionado) {
      window.localStorage.setItem(`colorSeleccionadoVehiculo_${id}`, colorSeleccionado);
    }
  }, [colorSeleccionado, id]);

  if (isLoading) {
    return <div className="text-center py-20 text-xl">Cargando información del vehículo...</div>;
  }

  const vehiculo = vehiculoData?.vehiculo;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Formulario de compra</h2>
        {/* Info del vehículo */}
        {vehiculo && (
          <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-100">
            <div className="font-semibold text-lg text-blue-900 mb-1">Vehículo seleccionado:</div>
            <div className="text-base text-gray-800">Marca: <span className="font-bold">{vehiculo.marca?.nombre || '-'}</span></div>
            <div className="text-base text-gray-800">Modelo: <span className="font-bold">{vehiculo.modelo || '-'}</span></div>
            <div className="text-base text-gray-800 flex items-center gap-2 mt-2">
              Color:
              <div className="flex items-center gap-2 ml-2">
                <select
                  className="border rounded-lg px-2 py-1 pr-8 appearance-none"
                  value={colorSeleccionado}
                  onChange={e => setColorSeleccionado(e.target.value)}
                  style={{ background: 'transparent' }}
                >
                  {colores.length > 0 ? (
                    colores.map(color => (
                      <option key={color.colorId} value={String(color.colorId)}>
                        {color.nombre}
                      </option>
                    ))
                  ) : (
                    <option value="">Sin colores disponibles</option>
                  )}
                </select>
                {/* círculo color literal al lado del select */}
                {colores.length > 0 && (
                  <span
                    className="w-6 h-6 rounded-full border inline-block"
                    style={{ background: (colores.find(c => String(c.colorId) === String(colorSeleccionado))?.codigoHex) || '#eee', minWidth: 24, minHeight: 24 }}
                    title={colores.find(c => String(c.colorId) === String(colorSeleccionado))?.nombre}
                  ></span>
                )}
              </div>
            </div>
          </div>
        )}
        <form className="flex flex-col gap-4" ref={formRef} onSubmit={e => {
          e.preventDefault();
          setShowModal(true);
        }}>
          <input className="border rounded-lg px-4 py-2" type="text" placeholder="Nombre completo" required name="nombre" value={formData.nombre} onChange={e => setFormData(f => ({ ...f, nombre: e.target.value }))} />
          <input className="border rounded-lg px-4 py-2" type="email" placeholder="Correo electrónico" required name="email" value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} />
          <input className="border rounded-lg px-4 py-2" type="tel" placeholder="Teléfono" required name="telefono" value={formData.telefono} onChange={e => setFormData(f => ({ ...f, telefono: e.target.value }))} />
          <input className="border rounded-lg px-4 py-2" type="text" placeholder="DNI" required name="dni" value={formData.dni} onChange={e => setFormData(f => ({ ...f, dni: e.target.value }))} />
          <input className="border rounded-lg px-4 py-2" type="text" placeholder="Dirección" required name="direccion" value={formData.direccion} onChange={e => setFormData(f => ({ ...f, direccion: e.target.value }))} />
          <input className="border rounded-lg px-4 py-2" type="text" placeholder="Ciudad" required name="ciudad" value={formData.ciudad} onChange={e => setFormData(f => ({ ...f, ciudad: e.target.value }))} />
          <input className="border rounded-lg px-4 py-2" type="text" placeholder="Provincia" required name="provincia" value={formData.provincia} onChange={e => setFormData(f => ({ ...f, provincia: e.target.value }))} />
          <input className="border rounded-lg px-4 py-2" type="text" placeholder="Código Postal" required name="codigoPostal" value={formData.codigoPostal} onChange={e => setFormData(f => ({ ...f, codigoPostal: e.target.value }))} />
          <select className="border rounded-lg px-4 py-2" required name="metodoPago" value={formData.metodoPago} onChange={e => setFormData(f => ({ ...f, metodoPago: e.target.value }))}>
            <option value="">Método de pago</option>
            <option value="transferencia">Transferencia bancaria</option>
            <option value="tarjeta">Tarjeta de crédito/débito</option>
            <option value="efectivo">Efectivo</option>
          </select>
          <select className="border rounded-lg px-4 py-2" required name="tipoEntrega" value={formData.tipoEntrega} onChange={e => setFormData(f => ({ ...f, tipoEntrega: e.target.value }))}>
            <option value="">Tipo de entrega</option>
            <option value="retiro">Retiro en concesionaria</option>
            <option value="envio">Envío a domicilio</option>
          </select>
          <textarea className="border rounded-lg px-4 py-2" placeholder="Comentarios adicionales" rows={3} name="comentarios" value={formData.comentarios} onChange={e => setFormData(f => ({ ...f, comentarios: e.target.value }))}></textarea>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" required className="accent-blue-600" />
            Acepto los <a href="#" className="text-blue-600 underline">términos y condiciones</a>
          </label>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition-all duration-300 mt-4">Siguiente paso</button>
        </form>
        <p className="text-gray-400 text-xs mt-4 text-center">Estás comprando el vehículo con ID: <span className="font-bold">{id}</span></p>
      </div>
      {/* Modal */}
      {showModal && (
        <ModalPago
          onClose={() => setShowModal(false)}
          formData={formData}
          vehiculo={vehiculo}
          color={colores.find(c => String(c.colorId) === String(colorSeleccionado))}
        />
      )}
    </div>
  );
};


// ModalPago Component
function ModalPago({ onClose, formData, vehiculo, color }) {
  // Generar CVU random (22 dígitos)
  const randomCVU = () => Array.from({length: 22}, () => Math.floor(Math.random()*10)).join("");
  const cvu = randomCVU();
  // Mensaje personalizado para WhatsApp
  const mensajeWpp = encodeURIComponent(
    `¡Hola! Quiero avanzar con la compra de un vehículo.\n\n` +
    `Datos del comprador:\n` +
    `- Nombre: ${formData.nombre}\n` +
    `- Email: ${formData.email}\n` +
    `- Teléfono: ${formData.telefono}\n` +
    `- DNI: ${formData.dni}\n` +
    `- Dirección: ${formData.direccion}\n` +
    `- Ciudad: ${formData.ciudad}\n` +
    `- Provincia: ${formData.provincia}\n` +
    `- Código Postal: ${formData.codigoPostal}\n` +
    `\nVehículo seleccionado:\n` +
    `- Marca: ${vehiculo?.marca?.nombre || '-'}\n` +
    `- Modelo: ${vehiculo?.modelo || '-'}\n` +
    `- Color: ${color?.nombre || '-'}\n` +
    `\nMétodo de pago: ${formData.metodoPago}\n` +
    `Tipo de entrega: ${formData.tipoEntrega}\n` +
    (formData.comentarios ? `Comentarios: ${formData.comentarios}\n` : "")
  );
  const wppUrl = `https://wa.me/5492914044550?text=${mensajeWpp}`;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{background: 'rgba(30,30,30,0.15)', backdropFilter: 'blur(6px)'}}>
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold">Siguiente paso</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">×</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center justify-center border rounded-lg p-4 bg-gray-50">
            <div className="font-semibold text-lg mb-2">Transferencia bancaria</div>
            <div className="text-sm text-gray-700 mb-1">CVU:</div>
            <div className="text-xl font-mono bg-white border rounded px-3 py-2 select-all">{cvu}</div>
            <div className="text-xs text-gray-500 mt-2">Usa este CVU para transferir el pago.</div>
            <div className="text-xs text-blue-700 mt-2 text-center">
              Enviar comprobante por <a href="https://wa.me/5492914044550" target="_blank" rel="noopener noreferrer" className="underline text-green-600 hover:text-green-800">wpp</a>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border rounded-lg p-4 bg-gray-50">
            <div className="font-semibold text-lg mb-2">¿Prefieres hablar con un vendedor?</div>
            <a
              href={wppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg transition-all duration-300 flex items-center gap-2 mt-2"
            >
              Contactar por WhatsApp
            </a>
            <div className="text-xs text-gray-500 mt-2 text-center">Te contactaremos para finalizar la compra.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComprarForm;
