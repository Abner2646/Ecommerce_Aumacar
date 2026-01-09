// /src/pages/public/ComprarForm.jsx

import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useVehiculo } from "../../hooks/useVehiculos";
import { useColoresVehiculo } from "../../hooks/useColores";

const ComprarForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: vehiculoData, isLoading } = useVehiculo(id);
  const { data: coloresData } = useColoresVehiculo(id);
  const colores = coloresData?.colores || [];
  const vehiculo = vehiculoData?.vehiculo;
  const formRef = useRef();

  // Estado del formulario
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

  // Color seleccionado
  const getColorPreseleccionado = () => {
    const guardado = window.localStorage.getItem(`colorSeleccionadoVehiculo_${id}`);
    if (guardado && colores.some(c => String(c.colorId) === String(guardado))) {
      return String(guardado);
    }
    return colores[0]?.colorId ? String(colores[0].colorId) : "";
  };

  const [colorSeleccionado, setColorSeleccionado] = useState(getColorPreseleccionado());
  const [showModal, setShowModal] = useState(false);

  // Actualizar color cuando se cargan los datos
  useEffect(() => {
    if (colores.length > 0 && !colorSeleccionado) {
      setColorSeleccionado(String(colores[0].colorId));
    }
  }, [colores, colorSeleccionado]);

  // Guardar color en localStorage
  useEffect(() => {
    if (colorSeleccionado) {
      window.localStorage.setItem(`colorSeleccionadoVehiculo_${id}`, colorSeleccionado);
    }
  }, [colorSeleccionado, id]);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const colorActual = colores.find(c => String(c.colorId) === String(colorSeleccionado));

  // Determinar marca para tipografía
  const marcaNombre = vehiculo?.marca?.nombre?.toLowerCase() || "";
  const isSubaru = marcaNombre.includes("subaru");
  const isSuzuki = marcaNombre.includes("suzuki");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">
            {t('purchaseForm.loading')}
          </div>
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!vehiculo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">
            {t('purchaseForm.notFound')}
          </div>
          <button
            onClick={() => navigate(-1)}
            className="cns-btn-secondary mt-4"
          >
            {t('purchaseForm.back')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="cns-section bg-gray-50">
        <div className="cns-container">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 lg:mb-16">
              <h1 className={`text-h1-mobile lg:text-h1-desktop mb-4 ${
                isSubaru ? 'sbr-heading' : isSuzuki ? 'szk-heading' : ''
              }`}>
                {t('purchaseForm.title')}
              </h1>
              <p className="text-body-mobile lg:text-body-desktop text-gray-600 max-w-2xl mx-auto">
                {t('purchaseForm.subtitle')}
              </p>
            </div>

            {/* Vehículo Seleccionado */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8 mb-8 lg:mb-12">
              <h2 className="text-h2-mobile lg:text-h2-desktop mb-6">
                {t('purchaseForm.selectedVehicle.title')}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Info del vehículo */}
                <div className="space-y-4">
                  <div>
                    <div className="text-small text-gray-600 mb-1">{t('purchaseForm.selectedVehicle.brand')}</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {vehiculo.marca?.nombre || '-'}
                    </div>
                  </div>
                  <div>
                    <div className="text-small text-gray-600 mb-1">{t('purchaseForm.selectedVehicle.model')}</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {vehiculo.modelo || '-'}
                    </div>
                  </div>
                  {vehiculo.anio && (
                    <div>
                      <div className="text-small text-gray-600 mb-1">{t('purchaseForm.selectedVehicle.year')}</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {vehiculo.anio}
                      </div>
                    </div>
                  )}
                  {vehiculo.precioUSD && (
                    <div>
                      <div className="text-small text-gray-600 mb-1">{t('purchaseForm.selectedVehicle.price')}</div>
                      <div className="text-2xl font-bold text-gray-900">
                        ${vehiculo.precioUSD.toLocaleString('es-AR')} USD
                      </div>
                    </div>
                  )}
                </div>

                {/* Selector de color */}
                <div>
                  <div className="text-small text-gray-600 mb-3">{t('purchaseForm.selectedVehicle.color')}</div>
                  {colores.length > 0 ? (
                    <div className="space-y-3">
                      <select
                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                        value={colorSeleccionado}
                        onChange={(e) => setColorSeleccionado(e.target.value)}
                      >
                        {colores.map(color => (
                          <option key={color.colorId} value={String(color.colorId)}>
                            {color.nombre}
                          </option>
                        ))}
                      </select>
                      
                      {/* Vista previa del color */}
                      {colorActual && (
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-md">
                          <div
                            className="w-16 h-16 rounded-md border-2 border-gray-300 shadow-sm"
                            style={{ backgroundColor: colorActual.codigoHex || '#eee' }}
                          />
                          <div>
                            <div className="font-semibold text-gray-900">{colorActual.nombre}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-600">{t('purchaseForm.selectedVehicle.noColors')}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Formulario */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              {/* Datos Personales */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8">
                <h2 className="text-h2-mobile lg:text-h2-desktop mb-6">
                  {t('purchaseForm.personalData.title')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-small text-gray-600 mb-2">
                      {t('purchaseForm.personalData.fullName')} *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      placeholder={t('purchaseForm.personalData.fullNamePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-small text-gray-600 mb-2">
                      {t('purchaseForm.personalData.email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      placeholder={t('purchaseForm.personalData.emailPlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-small text-gray-600 mb-2">
                      {t('purchaseForm.personalData.phone')} *
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      placeholder={t('purchaseForm.personalData.phonePlaceholder')}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-small text-gray-600 mb-2">
                      {t('purchaseForm.personalData.dni')} *
                    </label>
                    <input
                      type="text"
                      name="dni"
                      value={formData.dni}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      placeholder={t('purchaseForm.personalData.dniPlaceholder')}
                    />
                  </div>
                </div>
              </div>

              {/* Dirección */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8">
                <h2 className="text-h2-mobile lg:text-h2-desktop mb-6">
                  {t('purchaseForm.address.title')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-small text-gray-600 mb-2">
                      {t('purchaseForm.address.street')} *
                    </label>
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      placeholder={t('purchaseForm.address.streetPlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-small text-gray-600 mb-2">
                      {t('purchaseForm.address.city')} *
                    </label>
                    <input
                      type="text"
                      name="ciudad"
                      value={formData.ciudad}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      placeholder={t('purchaseForm.address.cityPlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-small text-gray-600 mb-2">
                      {t('purchaseForm.address.province')} *
                    </label>
                    <input
                      type="text"
                      name="provincia"
                      value={formData.provincia}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      placeholder={t('purchaseForm.address.provincePlaceholder')}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-small text-gray-600 mb-2">
                      {t('purchaseForm.address.postalCode')} *
                    </label>
                    <input
                      type="text"
                      name="codigoPostal"
                      value={formData.codigoPostal}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                      placeholder={t('purchaseForm.address.postalCodePlaceholder')}
                    />
                  </div>
                </div>
              </div>

              {/* Detalles de Compra */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8">
                <h2 className="text-h2-mobile lg:text-h2-desktop mb-6">
                  {t('purchaseForm.purchaseDetails.title')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-small text-gray-600 mb-2">
                      {t('purchaseForm.purchaseDetails.paymentMethod')} *
                    </label>
                    <select
                      name="metodoPago"
                      value={formData.metodoPago}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    >
                      <option value="">{t('purchaseForm.purchaseDetails.paymentMethodPlaceholder')}</option>
                      <option value="transferencia">{t('purchaseForm.purchaseDetails.paymentOptions.transfer')}</option>
                      <option value="efectivo">{t('purchaseForm.purchaseDetails.paymentOptions.cash')}</option>
                      <option value="financiacion">{t('purchaseForm.purchaseDetails.paymentOptions.financing')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-small text-gray-600 mb-2">
                      {t('purchaseForm.purchaseDetails.deliveryType')} *
                    </label>
                    <select
                      name="tipoEntrega"
                      value={formData.tipoEntrega}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    >
                      <option value="">{t('purchaseForm.purchaseDetails.deliveryTypePlaceholder')}</option>
                      <option value="retiro">{t('purchaseForm.purchaseDetails.deliveryOptions.pickup')}</option>
                      <option value="envio">{t('purchaseForm.purchaseDetails.deliveryOptions.delivery')}</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-small text-gray-600 mb-2">
                      {t('purchaseForm.purchaseDetails.comments')}
                    </label>
                    <textarea
                      name="comentarios"
                      value={formData.comentarios}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                      placeholder={t('purchaseForm.purchaseDetails.commentsPlaceholder')}
                    />
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="cns-btn-secondary"
                >
                  {t('purchaseForm.actions.cancel')}
                </button>
                <button
                  type="submit"
                  className="cns-btn-primary"
                >
                  {t('purchaseForm.actions.continue')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <ModalPago
          onClose={() => setShowModal(false)}
          formData={formData}
          vehiculo={vehiculo}
          color={colorActual}
        />
      )}
    </div>
  );
};

// Continúa en la siguiente parte...
// ===========================
// Modal de Pago (continuación del archivo ComprarForm.jsx)
// ===========================

function ModalPago({ onClose, formData, vehiculo, color }) {
  const { t } = useTranslation();
  
  // Mensaje personalizado para WhatsApp
  const mensajeWpp = encodeURIComponent(
    `*ORDEN DE COMPRA - VEHÍCULO NUEVO*\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `*DATOS DEL COMPRADOR*\n` +
    `Nombre: ${formData.nombre}\n` +
    `Email: ${formData.email}\n` +
    `Teléfono: ${formData.telefono}\n` +
    `DNI: ${formData.dni}\n\n` +
    `*DIRECCIÓN*\n` +
    `${formData.direccion}\n` +
    `${formData.ciudad}, ${formData.provincia}\n` +
    `CP: ${formData.codigoPostal}\n\n` +
    `*VEHÍCULO SELECCIONADO*\n` +
    `Marca: ${vehiculo?.marca?.nombre || '-'}\n` +
    `Modelo: ${vehiculo?.modelo || '-'}\n` +
    `Color: ${color?.nombre || '-'}\n` +
    (vehiculo?.anio ? `Año: ${vehiculo.anio}\n` : '') +
    (vehiculo?.precioUSD ? `Precio: USD $${vehiculo.precioUSD.toLocaleString('es-AR')}\n` : '') +
    `\n*PREFERENCIAS DE COMPRA*\n` +
    `Método de pago: ${formData.metodoPago}\n` +
    `Tipo de entrega: ${formData.tipoEntrega}\n` +
    (formData.comentarios ? `\n*COMENTARIOS ADICIONALES*\n${formData.comentarios}\n` : '') +
    `\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `Aguardo su contacto para coordinar los próximos pasos.`
  );

  const wppUrl = `https://wa.me/5492914277849?text=${mensajeWpp}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 lg:px-8 py-6 flex justify-between items-center z-10">
          <h3 className="text-h2-mobile lg:text-h2-desktop">
            {t('purchaseForm.modal.title')}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-3xl leading-none transition-colors"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8 space-y-8">
          {/* Resumen */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              {t('purchaseForm.modal.summary.title')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">{t('purchaseForm.modal.summary.buyer')}</span>
                <span className="ml-2 font-semibold text-gray-900">{formData.nombre}</span>
              </div>
              <div>
                <span className="text-gray-600">{t('purchaseForm.modal.summary.vehicle')}</span>
                <span className="ml-2 font-semibold text-gray-900">
                  {vehiculo?.marca?.nombre} {vehiculo?.modelo}
                </span>
              </div>
              <div>
                <span className="text-gray-600">{t('purchaseForm.modal.summary.color')}</span>
                <span className="ml-2 font-semibold text-gray-900">{color?.nombre || '-'}</span>
              </div>
              {vehiculo?.precioUSD && (
                <div>
                  <span className="text-gray-600">{t('purchaseForm.modal.summary.price')}</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    ${vehiculo.precioUSD.toLocaleString('es-AR')} USD
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Enviar por WhatsApp */}
          <div className="border border-gray-200 rounded-lg p-8 hover:border-gray-900 transition-colors">
            <div className="text-center space-y-6">
              <div className="text-xl font-semibold text-gray-900">
                {t('purchaseForm.modal.whatsapp.title')}
              </div>

              <div className="space-y-2 text-small text-gray-600">
                <p>{t('purchaseForm.modal.whatsapp.description')}</p>
                <p>{t('purchaseForm.modal.whatsapp.helpWith')}</p>
              </div>

              <ul className="text-left space-y-2 text-small text-gray-900 max-w-md mx-auto">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('purchaseForm.modal.whatsapp.benefits.availability')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('purchaseForm.modal.whatsapp.benefits.financing')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('purchaseForm.modal.whatsapp.benefits.testDrive')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('purchaseForm.modal.whatsapp.benefits.delivery')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('purchaseForm.modal.whatsapp.benefits.tradeIn')}</span>
                </li>
              </ul>

              <a
                href={wppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full max-w-md mx-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-md transition-colors text-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('purchaseForm.modal.whatsapp.button')}
              </a>

              <div className="text-xs text-gray-500 mt-4">
                {t('purchaseForm.modal.whatsapp.hint')}
              </div>
            </div>
          </div>

          {/* Nota informativa */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-small text-blue-900">
                <p className="font-semibold mb-1">{t('purchaseForm.modal.info.title')}</p>
                <p>
                  {t('purchaseForm.modal.info.text')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComprarForm;