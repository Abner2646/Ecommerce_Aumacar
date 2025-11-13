'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const caracteristicas = [
      // Seguridad
      { nombre: 'ABS', tipo: 'seguridad', icono: 'fa-shield-alt', activa: true },
      { nombre: 'Airbags frontales', tipo: 'seguridad', icono: 'fa-shield', activa: true },
      { nombre: 'Airbags laterales', tipo: 'seguridad', icono: 'fa-shield', activa: true },
      { nombre: 'Control de estabilidad (ESP)', tipo: 'seguridad', icono: 'fa-shield-check', activa: true },
      { nombre: 'Control de tracción', tipo: 'seguridad', icono: 'fa-road', activa: true },
      { nombre: 'Frenos de disco en las 4 ruedas', tipo: 'seguridad', icono: 'fa-circle-notch', activa: true },
      { nombre: 'Alarma', tipo: 'seguridad', icono: 'fa-bell', activa: true },
      { nombre: 'Sensor de estacionamiento trasero', tipo: 'seguridad', icono: 'fa-parking', activa: true },
      { nombre: 'Sensor de estacionamiento delantero', tipo: 'seguridad', icono: 'fa-parking', activa: true },
      { nombre: 'Cámara de retroceso', tipo: 'seguridad', icono: 'fa-video', activa: true },
      { nombre: 'Asistente de arranque en pendiente', tipo: 'seguridad', icono: 'fa-angle-up', activa: true },
      
      // Confort
      { nombre: 'Aire acondicionado', tipo: 'confort', icono: 'fa-snowflake', activa: true },
      { nombre: 'Climatizador automático', tipo: 'confort', icono: 'fa-temperature-high', activa: true },
      { nombre: 'Asientos de cuero', tipo: 'confort', icono: 'fa-chair', activa: true },
      { nombre: 'Asientos eléctricos', tipo: 'confort', icono: 'fa-couch', activa: true },
      { nombre: 'Asientos con calefacción', tipo: 'confort', icono: 'fa-fire', activa: true },
      { nombre: 'Volante regulable en altura', tipo: 'confort', icono: 'fa-arrows-alt-v', activa: true },
      { nombre: 'Volante regulable en profundidad', tipo: 'confort', icono: 'fa-arrows-alt-h', activa: true },
      { nombre: 'Volante multifunción', tipo: 'confort', icono: 'fa-cog', activa: true },
      { nombre: 'Computadora de a bordo', tipo: 'confort', icono: 'fa-desktop', activa: true },
      { nombre: 'Techo solar', tipo: 'confort', icono: 'fa-sun', activa: true },
      
      // Tecnología
      { nombre: 'Pantalla táctil', tipo: 'tecnologia', icono: 'fa-mobile-alt', activa: true },
      { nombre: 'GPS/Navegador', tipo: 'tecnologia', icono: 'fa-map-marked-alt', activa: true },
      { nombre: 'Bluetooth', tipo: 'tecnologia', icono: 'fa-bluetooth', activa: true },
      { nombre: 'USB', tipo: 'tecnologia', icono: 'fa-usb', activa: true },
      { nombre: 'Apple CarPlay', tipo: 'tecnologia', icono: 'fa-apple', activa: true },
      { nombre: 'Android Auto', tipo: 'tecnologia', icono: 'fa-android', activa: true },
      { nombre: 'Sistema de sonido premium', tipo: 'tecnologia', icono: 'fa-volume-up', activa: true },
      { nombre: 'Cargador inalámbrico', tipo: 'tecnologia', icono: 'fa-charging-station', activa: true },
      { nombre: 'Control de crucero', tipo: 'tecnologia', icono: 'fa-tachometer-alt', activa: true },
      { nombre: 'Control de crucero adaptativo', tipo: 'tecnologia', icono: 'fa-gauge-high', activa: true },
      
      // Exterior
      { nombre: 'Llantas de aleación', tipo: 'exterior', icono: 'fa-circle', activa: true },
      { nombre: 'Faros de niebla', tipo: 'exterior', icono: 'fa-lightbulb', activa: true },
      { nombre: 'Faros LED', tipo: 'exterior', icono: 'fa-star', activa: true },
      { nombre: 'Faros bi-xenón', tipo: 'exterior', icono: 'fa-adjust', activa: true },
      { nombre: 'Espejos eléctricos', tipo: 'exterior', icono: 'fa-mirror', activa: true },
      { nombre: 'Espejos con calefacción', tipo: 'exterior', icono: 'fa-fire-alt', activa: true },
      { nombre: 'Barras portaequipaje', tipo: 'exterior', icono: 'fa-bars', activa: true },
      { nombre: 'Sensor de lluvia', tipo: 'exterior', icono: 'fa-cloud-rain', activa: true },
      { nombre: 'Sensor de luz', tipo: 'exterior', icono: 'fa-sun', activa: true },
      
      // Interior
      { nombre: 'Cierre centralizado', tipo: 'interior', icono: 'fa-lock', activa: true },
      { nombre: 'Apertura sin llave', tipo: 'interior', icono: 'fa-key', activa: true },
      { nombre: 'Arranque sin llave', tipo: 'interior', icono: 'fa-power-off', activa: true },
      { nombre: 'Cristales eléctricos', tipo: 'interior', icono: 'fa-window-maximize', activa: true },
      { nombre: 'Levantavidrios traseros', tipo: 'interior', icono: 'fa-window-restore', activa: true },
      { nombre: 'Tercera fila de asientos', tipo: 'interior', icono: 'fa-users', activa: true },
      { nombre: 'Asientos traseros rebatibles', tipo: 'interior', icono: 'fa-compress', activa: true },
      
      // Performance
      { nombre: 'Turbo', tipo: 'performance', icono: 'fa-bolt', activa: true },
      { nombre: 'Motor V6', tipo: 'performance', icono: 'fa-engine', activa: true },
      { nombre: 'Motor V8', tipo: 'performance', icono: 'fa-car-side', activa: true },
      { nombre: 'Modo Sport', tipo: 'performance', icono: 'fa-flag-checkered', activa: true },
      { nombre: 'Suspensión deportiva', tipo: 'performance', icono: 'fa-car-crash', activa: true }
    ];

    const caracteristicasConFechas = caracteristicas.map(c => ({
      ...c,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('caracteristicas', caracteristicasConFechas);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('caracteristicas', null, {});
  }
};
