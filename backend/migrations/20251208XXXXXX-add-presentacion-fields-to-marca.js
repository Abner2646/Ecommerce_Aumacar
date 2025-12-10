'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('marcas', 'fotoPresentacion', {
      type: Sequelize.STRING(500),
      allowNull: true
    });
    await queryInterface.addColumn('marcas', 'videoPresentacion', {
      type: Sequelize.STRING(500),
      allowNull: true
    });
    await queryInterface.addColumn('marcas', 'videoPortada', {
      type: Sequelize.STRING(500),
      allowNull: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('marcas', 'fotoPresentacion');
    await queryInterface.removeColumn('marcas', 'videoPresentacion');
    await queryInterface.removeColumn('marcas', 'videoPortada');
  }
};
