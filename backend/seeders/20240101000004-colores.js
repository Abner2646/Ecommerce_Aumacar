'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    await queryInterface.bulkInsert('colores', [
      { nombre: 'Blanco Perla', codigoHex: '#F5F5F5', activo: true, createdAt: now, updatedAt: now },
      { nombre: 'Negro Onix', codigoHex: '#111111', activo: true, createdAt: now, updatedAt: now },
      { nombre: 'Gris Plata', codigoHex: '#9EA3A8', activo: true, createdAt: now, updatedAt: now },
      { nombre: 'Rojo Metalico', codigoHex: '#B11226', activo: true, createdAt: now, updatedAt: now },
      { nombre: 'Azul Marino', codigoHex: '#1D3C78', activo: true, createdAt: now, updatedAt: now },
      { nombre: 'Verde Oliva', codigoHex: '#556B2F', activo: true, createdAt: now, updatedAt: now }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('colores', {
      nombre: [
        'Blanco Perla',
        'Negro Onix',
        'Gris Plata',
        'Rojo Metalico',
        'Azul Marino',
        'Verde Oliva'
      ]
    });
  }
};
