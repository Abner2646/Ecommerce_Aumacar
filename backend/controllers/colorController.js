// controllers/colorController.js

const db = require('../models');
const { Op } = require('sequelize');

/**
 * Obtener todos los colores
 */
const obtenerColores = async (req, res) => {
  try {
    const { activo } = req.query;

    const where = {};
    if (activo !== undefined) {
      where.activo = activo === 'true';
    }

    const colores = await db.Color.findAll({
      where,
      order: [['nombre', 'ASC']]
    });

    res.json({
      colores,
      total: colores.length
    });

  } catch (error) {
    console.error('Error al obtener colores:', error);
    res.status(500).json({
      error: 'Error al obtener colores'
    });
  }
};

/**
 * Obtener color por ID
 */
const obtenerColorPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const color = await db.Color.findByPk(id);

    if (!color) {
      return res.status(404).json({
        error: 'Color no encontrado'
      });
    }

    res.json({ color });

  } catch (error) {
    console.error('Error al obtener color:', error);
    res.status(500).json({
      error: 'Error al obtener color'
    });
  }
};

/**
 * Crear nuevo color
 */
const crearColor = async (req, res) => {
  try {
    const { nombre, codigoHex } = req.body;

    if (!nombre || !codigoHex) {
      return res.status(400).json({
        error: 'Nombre y código hexadecimal son requeridos'
      });
    }

    // Validar formato hex
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    if (!hexRegex.test(codigoHex)) {
      return res.status(400).json({
        error: 'Código hexadecimal inválido. Formato esperado: #RRGGBB'
      });
    }

    const color = await db.Color.create({
      nombre,
      codigoHex: codigoHex.toUpperCase()
    });

    res.status(201).json({
      mensaje: 'Color creado exitosamente',
      color
    });

  } catch (error) {
    console.error('Error al crear color:', error);
    res.status(500).json({
      error: 'Error al crear color'
    });
  }
};

/**
 * Actualizar color
 */
const actualizarColor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, codigoHex, activo } = req.body;

    const color = await db.Color.findByPk(id);

    if (!color) {
      return res.status(404).json({
        error: 'Color no encontrado'
      });
    }

    // Validar formato hex si se proporciona
    if (codigoHex) {
      const hexRegex = /^#[0-9A-Fa-f]{6}$/;
      if (!hexRegex.test(codigoHex)) {
        return res.status(400).json({
          error: 'Código hexadecimal inválido. Formato esperado: #RRGGBB'
        });
      }
    }

    await color.update({
      nombre: nombre !== undefined ? nombre : color.nombre,
      codigoHex: codigoHex ? codigoHex.toUpperCase() : color.codigoHex,
      activo: activo !== undefined ? activo : color.activo
    });

    res.json({
      mensaje: 'Color actualizado exitosamente',
      color
    });

  } catch (error) {
    console.error('Error al actualizar color:', error);
    res.status(500).json({
      error: 'Error al actualizar color'
    });
  }
};

/**
 * Eliminar color
 */
const eliminarColor = async (req, res) => {
  try {
    const { id } = req.params;

    const color = await db.Color.findByPk(id);

    if (!color) {
      return res.status(404).json({
        error: 'Color no encontrado'
      });
    }

    // Verificar si el color está siendo usado
    const colorEnUso = await db.ColorVehiculo.findOne({
      where: { colorId: id }
    });

    if (colorEnUso) {
      return res.status(400).json({
        error: 'No se puede eliminar el color porque está asignado a uno o más vehículos'
      });
    }

    await color.destroy();

    res.json({
      mensaje: 'Color eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar color:', error);
    res.status(500).json({
      error: 'Error al eliminar color'
    });
  }
};

/**
 * Obtener colores de un vehículo
 */
const obtenerColoresVehiculo = async (req, res) => {
  try {
    const { vehiculoId } = req.params;

    const vehiculo = await db.Vehiculo.findByPk(vehiculoId);
    if (!vehiculo) {
      return res.status(404).json({
        error: 'Vehículo no encontrado'
      });
    }

    const coloresVehiculo = await db.ColorVehiculo.findAll({
      where: { vehiculoId },
      include: [
        {
          model: db.Color,
          as: 'color',
          attributes: ['id', 'nombre', 'codigoHex']
        }
      ],
      order: [['orden', 'ASC']]
    });

    res.json({
      vehiculoId: parseInt(vehiculoId),
      colores: coloresVehiculo.map(cv => ({
        colorVehiculoId: cv.id,
        colorId: cv.color.id,
        nombre: cv.color.nombre,
        codigoHex: cv.color.codigoHex,
        orden: cv.orden
      })),
      total: coloresVehiculo.length
    });

  } catch (error) {
    console.error('Error al obtener colores del vehículo:', error);
    res.status(500).json({
      error: 'Error al obtener colores del vehículo'
    });
  }
};

/**
 * Asignar colores a un vehículo
 */
const asignarColoresVehiculo = async (req, res) => {
  try {
    const { vehiculoId } = req.params;
    const { colorIds } = req.body;

    if (!Array.isArray(colorIds)) {
      return res.status(400).json({
        error: 'colorIds debe ser un array'
      });
    }

    const vehiculo = await db.Vehiculo.findByPk(vehiculoId);
    if (!vehiculo) {
      return res.status(404).json({
        error: 'Vehículo no encontrado'
      });
    }

    // Verificar que todos los colores existen
    const colores = await db.Color.findAll({
      where: { id: colorIds, activo: true }
    });

    if (colores.length !== colorIds.length) {
      return res.status(400).json({
        error: 'Uno o más colores no existen o no están activos'
      });
    }

    // Obtener colores actuales para no perder imágenes asociadas
    const coloresActuales = await db.ColorVehiculo.findAll({
      where: { vehiculoId }
    });

    const idsActuales = coloresActuales.map(c => c.colorId);
    const idsNuevos = colorIds;

    // Colores a eliminar (están en actuales pero no en nuevos)
    const idsAEliminar = idsActuales.filter(id => !idsNuevos.includes(id));

    // Verificar si algún color a eliminar tiene imágenes asociadas
    if (idsAEliminar.length > 0) {
      const coloresConImagenes = await db.ColorVehiculo.findAll({
        where: { 
          vehiculoId,
          colorId: idsAEliminar
        },
        include: [{
          model: db.ImagenVehiculo,
          as: 'imagenes'
        }]
      });

      const tieneImagenes = coloresConImagenes.some(cv => cv.imagenes && cv.imagenes.length > 0);
      
      if (tieneImagenes) {
        return res.status(400).json({
          error: 'No se pueden quitar colores que tienen imágenes asociadas. Elimina las imágenes primero.'
        });
      }
    }

    // Eliminar relaciones que ya no existen
    if (idsAEliminar.length > 0) {
      await db.ColorVehiculo.destroy({
        where: { 
          vehiculoId,
          colorId: idsAEliminar
        }
      });
    }

    // Agregar nuevas relaciones
    const idsAAgregar = idsNuevos.filter(id => !idsActuales.includes(id));
    
    for (let i = 0; i < idsAAgregar.length; i++) {
      await db.ColorVehiculo.create({
        vehiculoId,
        colorId: idsAAgregar[i],
        orden: idsActuales.length + i
      });
    }

    // Obtener resultado final
    const resultado = await db.ColorVehiculo.findAll({
      where: { vehiculoId },
      include: [{
        model: db.Color,
        as: 'color',
        attributes: ['id', 'nombre', 'codigoHex']
      }],
      order: [['orden', 'ASC']]
    });

    res.json({
      mensaje: 'Colores asignados exitosamente',
      colores: resultado.map(cv => ({
        colorVehiculoId: cv.id,
        colorId: cv.color.id,
        nombre: cv.color.nombre,
        codigoHex: cv.color.codigoHex,
        orden: cv.orden
      })),
      total: resultado.length
    });

  } catch (error) {
    console.error('Error al asignar colores:', error);
    res.status(500).json({
      error: 'Error al asignar colores'
    });
  }
};

/**
 * Quitar un color de un vehículo
 */
const quitarColorVehiculo = async (req, res) => {
  try {
    const { vehiculoId, colorId } = req.params;

    const colorVehiculo = await db.ColorVehiculo.findOne({
      where: { vehiculoId, colorId },
      include: [{
        model: db.ImagenVehiculo,
        as: 'imagenes'
      }]
    });

    if (!colorVehiculo) {
      return res.status(404).json({
        error: 'El vehículo no tiene asignado ese color'
      });
    }

    // Verificar si tiene imágenes asociadas
    if (colorVehiculo.imagenes && colorVehiculo.imagenes.length > 0) {
      return res.status(400).json({
        error: `No se puede quitar el color porque tiene ${colorVehiculo.imagenes.length} imagen(es) asociada(s). Elimina las imágenes primero.`
      });
    }

    await colorVehiculo.destroy();

    res.json({
      mensaje: 'Color quitado del vehículo exitosamente'
    });

  } catch (error) {
    console.error('Error al quitar color del vehículo:', error);
    res.status(500).json({
      error: 'Error al quitar color del vehículo'
    });
  }
};

module.exports = {
  obtenerColores,
  obtenerColorPorId,
  crearColor,
  actualizarColor,
  eliminarColor,
  obtenerColoresVehiculo,
  asignarColoresVehiculo,
  quitarColorVehiculo
};