// Migración para agregar fotoDelMedio a marcas y favorito a vehiculos
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Solo agregar fotoDelMedio si no existe
    const tableInfo = await queryInterface.describeTable('marcas');
    if (!tableInfo.fotoDelMedio) {
      await queryInterface.addColumn('marcas', 'fotoDelMedio', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
    // Solo agregar favorito si no existe
    const vehiculoInfo = await queryInterface.describeTable('vehiculos');
    if (!vehiculoInfo.favorito) {
      await queryInterface.addColumn('vehiculos', 'favorito', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('marcas', 'fotoDelMedio');
    await queryInterface.removeColumn('vehiculos', 'favorito');
  }
};
