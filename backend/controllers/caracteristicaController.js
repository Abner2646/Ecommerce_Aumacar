const db = require('../models');

/**
 * Obtener todas las características
 */
const obtenerCaracteristicas = async (req, res) => {
  try {
    const { activa, tipo } = req.query;
    
    const where = {};
    if (activa !== undefined) {
      where.activa = activa === 'true';
    }
    if (tipo) {
      where.tipo = tipo;
    }

    const caracteristicas = await db.Caracteristica.findAll({
      where,
      order: [['tipo', 'ASC'], ['nombre', 'ASC']],
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    });

    res.json({
      caracteristicas,
      total: caracteristicas.length
    });

  } catch (error) {
    console.error('Error al obtener características:', error);
    res.status(500).json({
      error: 'Error al obtener características'
    });
  }
};

/**
 * Obtener característica por ID
 */
const obtenerCaracteristicaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const caracteristica = await db.Caracteristica.findByPk(id);

    if (!caracteristica) {
      return res.status(404).json({
        error: 'Característica no encontrada'
      });
    }

    res.json({ caracteristica });

  } catch (error) {
    console.error('Error al obtener característica:', error);
    res.status(500).json({
      error: 'Error al obtener característica'
    });
  }
};

/**
 * Crear nueva característica
 */
const crearCaracteristica = async (req, res) => {
  try {
    const { nombre, icono, tipo, activa } = req.body;

    const caracteristica = await db.Caracteristica.create({
      nombre,
      icono,
      tipo,
      activa: activa !== undefined ? activa : true
    });

    res.status(201).json({
      mensaje: 'Característica creada exitosamente',
      caracteristica
    });

  } catch (error) {
    console.error('Error al crear característica:', error);
    res.status(500).json({
      error: 'Error al crear característica'
    });
  }
};

/**
 * Actualizar característica
 */
const actualizarCaracteristica = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, icono, tipo, activa } = req.body;

    const caracteristica = await db.Caracteristica.findByPk(id);

    if (!caracteristica) {
      return res.status(404).json({
        error: 'Característica no encontrada'
      });
    }

    await caracteristica.update({
      nombre: nombre || caracteristica.nombre,
      icono: icono !== undefined ? icono : caracteristica.icono,
      tipo: tipo || caracteristica.tipo,
      activa: activa !== undefined ? activa : caracteristica.activa
    });

    res.json({
      mensaje: 'Característica actualizada exitosamente',
      caracteristica
    });

  } catch (error) {
    console.error('Error al actualizar característica:', error);
    res.status(500).json({
      error: 'Error al actualizar característica'
    });
  }
};

/**
 * Eliminar característica
 */
const eliminarCaracteristica = async (req, res) => {
  try {
    const { id } = req.params;

    const caracteristica = await db.Caracteristica.findByPk(id);

    if (!caracteristica) {
      return res.status(404).json({
        error: 'Característica no encontrada'
      });
    }

    // Eliminar relaciones con vehículos
    await db.VehiculoCaracteristica.destroy({
      where: { caracteristicaId: id }
    });

    await caracteristica.destroy();

    res.json({
      mensaje: 'Característica eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar característica:', error);
    res.status(500).json({
      error: 'Error al eliminar característica'
    });
  }
};

module.exports = {
  obtenerCaracteristicas,
  obtenerCaracteristicaPorId,
  crearCaracteristica,
  actualizarCaracteristica,
  eliminarCaracteristica
};
