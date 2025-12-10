"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("vehiculos", "favorito", {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Indica si el vehículo es favorito"
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("vehiculos", "favorito");
  }
};