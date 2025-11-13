'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    await queryInterface.bulkInsert('usuarios', [
      {
        email: 'admin@concesionaria.com',
        password: hashedPassword,
        nombre: 'Administrador',
        apellido: 'Principal',
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuarios', {
      email: 'admin@concesionaria.com'
    });
  }
};
