const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Caracteristica = sequelize.define('Caracteristica', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 150]
      }
    },
    icono: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: 'URL o nombre de Font Awesome'
    },
    tipo: {
      type: DataTypes.ENUM('seguridad', 'confort', 'tecnologia', 'exterior', 'interior', 'performance'),
      allowNull: true
    },
    activa: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    tableName: 'caracteristicas',
    timestamps: true
  });

  Caracteristica.associate = (models) => {
    Caracteristica.belongsToMany(models.Vehiculo, {
      through: models.VehiculoCaracteristica,
      foreignKey: 'caracteristicaId',
      otherKey: 'vehiculoId',
      as: 'vehiculos'
    });
  };

  return Caracteristica;
};
