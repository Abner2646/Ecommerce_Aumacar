// models/Color.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Color = sequelize.define('Color', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    codigoHex: {
      type: DataTypes.STRING(7),
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^#[0-9A-Fa-f]{6}$/
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    tableName: 'colores',
    timestamps: true
  });

  Color.associate = (models) => {
    Color.belongsToMany(models.Vehiculo, {
      through: models.ColorVehiculo,
      foreignKey: 'colorId',
      otherKey: 'vehiculoId',
      as: 'vehiculos'
    });

    Color.hasMany(models.ColorVehiculo, {
      foreignKey: 'colorId',
      as: 'vehiculoColores'
    });
  };

  return Color;
};