// models/ColorVehiculo.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ColorVehiculo = sequelize.define('ColorVehiculo', {
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
    colorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'colores',
        key: 'id'
      }
    },
    orden: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  }, {
    tableName: 'color_vehiculo',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['vehiculoId', 'colorId']
      }
    ]
  });

  ColorVehiculo.associate = (models) => {
    ColorVehiculo.belongsTo(models.Vehiculo, {
      foreignKey: 'vehiculoId',
      as: 'vehiculo'
    });

    ColorVehiculo.belongsTo(models.Color, {
      foreignKey: 'colorId',
      as: 'color'
    });

    ColorVehiculo.hasMany(models.ImagenVehiculo, {
      foreignKey: 'colorVehiculoId',
      as: 'imagenes'
    });
  };

  return ColorVehiculo;
};