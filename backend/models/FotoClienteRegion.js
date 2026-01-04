// models/FotoClienteRegion.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const FotoClienteRegion = sequelize.define('FotoClienteRegion', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ciudad: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    provincia: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    pais: {
      type: DataTypes.STRING(100),
      defaultValue: 'Argentina',
      allowNull: false
    },
    latitud: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
      validate: {
        min: -90,
        max: 90
      }
    },
    longitud: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
      validate: {
        min: -180,
        max: 180
      }
    },
    radioKm: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
      allowNull: false,
      validate: {
        min: 1,
        max: 500
      }
    },
    urlImagen: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        isUrl: true
      }
    },
    publicIdCloudinary: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    // ========== NUEVO CAMPO ==========
    textoDescriptivo: {
      type: DataTypes.STRING(300),
      allowNull: true,
      validate: {
        len: [0, 300]
      },
      comment: 'Texto descriptivo del cliente. Ej: "Juan y María, de Buenos Aires"'
    },
    // ================================
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    orden: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    tableName: 'fotos_clientes_region',
    timestamps: true
  });

  // Métodos de instancia
  FotoClienteRegion.prototype.calcularDistancia = function(lat, lng) {
    if (!this.latitud || !this.longitud) return null;
    
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.toRad(lat - this.latitud);
    const dLon = this.toRad(lng - this.longitud);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(this.latitud)) * Math.cos(this.toRad(lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  FotoClienteRegion.prototype.toRad = function(valor) {
    return valor * Math.PI / 180;
  };

  // Métodos estáticos
  FotoClienteRegion.buscarPorCoordenadas = async function(lat, lng, radioMaxKm = 100) {
    const todasLasFotos = await this.findAll({
      where: {
        activo: true,
        latitud: { [sequelize.Sequelize.Op.not]: null },
        longitud: { [sequelize.Sequelize.Op.not]: null }
      }
    });

    const fotosEnRango = todasLasFotos
      .map(foto => {
        const distancia = foto.calcularDistancia(lat, lng);
        return {
          ...foto.toJSON(),
          distanciaKm: distancia
        };
      })
      .filter(foto => foto.distanciaKm <= Math.min(foto.radioKm, radioMaxKm))
      .sort((a, b) => {
        if (a.distanciaKm !== b.distanciaKm) {
          return a.distanciaKm - b.distanciaKm;
        }
        return a.orden - b.orden;
      });

    return fotosEnRango;
  };

  FotoClienteRegion.obtenerCiudadesDisponibles = async function() {
    const fotos = await this.findAll({
      where: { activo: true },
      attributes: [
        'ciudad',
        'provincia',
        'pais',
        [sequelize.fn('COUNT', sequelize.col('id')), 'cantidadFotos']
      ],
      group: ['ciudad', 'provincia', 'pais'],
      order: [['ciudad', 'ASC']]
    });

    return fotos;
  };

  return FotoClienteRegion;
};