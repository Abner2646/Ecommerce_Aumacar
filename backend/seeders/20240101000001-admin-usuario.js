'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('aumacar123', salt);

    await queryInterface.bulkInsert('usuarios', [
      {
        email: 'aumacar@gmail.com',
        password: hashedPassword,
        nombre: 'Administrador',
        apellido: 'Aumacar',
        activo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuarios', {
      email: 'aumacar@gmail.com'
    });
  }
};
