// models/VehiculoCaracteristicas
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const VehiculoCaracteristica = sequelize.define('VehiculoCaracteristica', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    vehiculoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vehiculos',
        key: 'id'
      }
    },
    caracteristicaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'caracteristicas',
        key: 'id'
      }
    }
  }, {
    tableName: 'vehiculo_caracteristicas',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['vehiculoId', 'caracteristicaId']
      }
    ]
  });

  // No necesita asociaciones explícitas ya que es tabla intermedia
  VehiculoCaracteristica.associate = () => {};

  return VehiculoCaracteristica;
};
