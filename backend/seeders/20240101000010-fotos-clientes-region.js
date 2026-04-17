'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    await queryInterface.bulkInsert('fotos_clientes_region', [
      {
        ciudad: 'Bahia Blanca',
        provincia: 'Buenos Aires',
        pais: 'Argentina',
        latitud: -38.7196,
        longitud: -62.2724,
        radioKm: 80,
        urlImagen: 'https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?auto=format&fit=crop&w=1200&q=80',
        publicIdCloudinary: null,
        textoDescriptivo: 'Familia de Bahia Blanca recibio su nuevo SUV.',
        titulo: 'Entrega en Bahia Blanca',
        descripcion: 'Cliente feliz con su unidad 0km.',
        orden: 1,
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        ciudad: 'Neuquen',
        provincia: 'Neuquen',
        pais: 'Argentina',
        latitud: -38.9516,
        longitud: -68.0591,
        radioKm: 100,
        urlImagen: 'https://images.unsplash.com/photo-1549399542-7e82138f4cf6?auto=format&fit=crop&w=1200&q=80',
        publicIdCloudinary: null,
        textoDescriptivo: 'Entrega de pickup para uso laboral y familiar.',
        titulo: 'Cliente en Neuquen',
        descripcion: 'Unidad entregada con garantia y servicio postventa.',
        orden: 2,
        activo: true,
        createdAt: now,
        updatedAt: now
      },
      {
        ciudad: 'Cordoba',
        provincia: 'Cordoba',
        pais: 'Argentina',
        latitud: -31.4201,
        longitud: -64.1888,
        radioKm: 120,
        urlImagen: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80',
        publicIdCloudinary: null,
        textoDescriptivo: 'Nuevo cliente recomienda la experiencia de compra.',
        titulo: 'Entrega en Cordoba',
        descripcion: 'Operacion finalizada con financiacion a medida.',
        orden: 3,
        activo: true,
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('fotos_clientes_region', {
      ciudad: ['Bahia Blanca', 'Neuquen', 'Cordoba']
    });
  }
};
