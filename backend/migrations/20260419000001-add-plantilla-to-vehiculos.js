'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('vehiculos', 'plantilla', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: 'Número de plantilla de diseño para el vehículo'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('vehiculos', 'plantilla');
  }
};
