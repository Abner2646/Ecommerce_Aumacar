// controllers/fotoClienteRegionController.js

const db = require('../models');
const { Op } = require('sequelize');
const { subirImagen, eliminarArchivo } = require('../utils/cloudinary');
const { extraerPublicId } = require('../utils/helpers');

/**
 * Crear nueva foto de cliente por región
 */
const crearFotoRegion = async (req, res) => {
  try {
    const {
      ciudad,
      provincia,
      pais,
      latitud,
      longitud,
      radioKm,
      textoDescriptivo, // ← NUEVO
      titulo,
      descripcion,
      orden,
      activo
    } = req.body;

    if (!ciudad) {
      return res.status(400).json({
        error: 'La ciudad es requerida'
      });
    }

    if (!req.file && !req.body.urlImagen) {
      return res.status(400).json({
        error: 'Se requiere una imagen'
      });
    }

    let urlImagen, publicIdCloudinary;

    // Si hay archivo subido, usar Cloudinary
    if (req.file) {
      const resultado = await subirImagen(
        req.file.buffer,
        'fotos-clientes-regiones'
      );
      urlImagen = resultado.secure_url;
      publicIdCloudinary = resultado.public_id;
    } else {
      // Si se proporciona URL directa
      urlImagen = req.body.urlImagen;
      publicIdCloudinary = req.body.publicIdCloudinary || null;
    }

    const nuevaFoto = await db.FotoClienteRegion.create({
      ciudad,
      provincia: provincia || null,
      pais: pais || 'Argentina',
      latitud: latitud ? parseFloat(latitud) : null,
      longitud: longitud ? parseFloat(longitud) : null,
      radioKm: radioKm ? parseInt(radioKm) : 50,
      urlImagen,
      publicIdCloudinary,
      textoDescriptivo: textoDescriptivo || null, // ← NUEVO
      titulo: titulo || null,
      descripcion: descripcion || null,
      orden: orden ? parseInt(orden) : 0,
      activo: activo !== undefined ? activo : true
    });

    res.status(201).json({
      mensaje: 'Foto de región creada exitosamente',
      foto: nuevaFoto
    });

  } catch (error) {
    console.error('Error al crear foto de región:', error);
    res.status(500).json({
      error: 'Error al crear foto de región'
    });
  }
};

/**
 * Obtener todas las fotos (para admin)
 */
const obtenerTodasLasFotos = async (req, res) => {
  try {
    const fotos = await db.FotoClienteRegion.findAll({
      order: [
        ['ciudad', 'ASC'],
        ['orden', 'ASC']
      ]
    });

    res.json({
      fotos,
      total: fotos.length
    });

  } catch (error) {
    console.error('Error al obtener fotos:', error);
    res.status(500).json({
      error: 'Error al obtener fotos'
    });
  }
};

/**
 * Obtener fotos por ciudad específica
 */
const obtenerFotosPorCiudad = async (req, res) => {
  try {
    const { ciudad } = req.params;

    const fotos = await db.FotoClienteRegion.findAll({
      where: {
        ciudad: {
          [Op.iLike]: ciudad
        },
        activo: true
      },
      order: [['orden', 'ASC']]
    });

    res.json({
      ciudad,
      fotos,
      total: fotos.length
    });

  } catch (error) {
    console.error('Error al obtener fotos por ciudad:', error);
    res.status(500).json({
      error: 'Error al obtener fotos por ciudad'
    });
  }
};

/**
 * Obtener fotos cercanas a coordenadas (para frontend público)
 */
const obtenerFotosPorCoordenadas = async (req, res) => {
  try {
    const { latitud, longitud, radio } = req.query;

    if (!latitud || !longitud) {
      return res.status(400).json({
        error: 'Se requieren latitud y longitud'
      });
    }

    const lat = parseFloat(latitud);
    const lng = parseFloat(longitud);
    const radioMaxKm = radio ? parseInt(radio) : 100;

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({
        error: 'Coordenadas inválidas'
      });
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({
        error: 'Coordenadas fuera de rango'
      });
    }

    const fotos = await db.FotoClienteRegion.buscarPorCoordenadas(
      lat,
      lng,
      radioMaxKm
    );

    res.json({
      coordenadas: { latitud: lat, longitud: lng },
      radioMaxKm,
      fotos,
      total: fotos.length
    });

  } catch (error) {
    console.error('Error al obtener fotos por coordenadas:', error);
    res.status(500).json({
      error: 'Error al obtener fotos por coordenadas'
    });
  }
};

/**
 * Obtener una foto por ID
 */
const obtenerFotoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const foto = await db.FotoClienteRegion.findByPk(id);

    if (!foto) {
      return res.status(404).json({
        error: 'Foto no encontrada'
      });
    }

    res.json({ foto });

  } catch (error) {
    console.error('Error al obtener foto:', error);
    res.status(500).json({
      error: 'Error al obtener foto'
    });
  }
};

/**
 * Actualizar foto
 */
const actualizarFoto = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizar = { ...req.body };

    const foto = await db.FotoClienteRegion.findByPk(id);

    if (!foto) {
      return res.status(404).json({
        error: 'Foto no encontrada'
      });
    }

    // Si hay nueva imagen
    if (req.file) {
      // Eliminar imagen anterior de Cloudinary si existe
      if (foto.publicIdCloudinary) {
        try {
          await eliminarArchivo(foto.publicIdCloudinary, 'image');
        } catch (error) {
          console.error('Error al eliminar imagen de Cloudinary:', error);
        }
      }

      // Subir nueva imagen
      const resultado = await subirImagen(
        req.file.buffer,
        'fotos-clientes-regiones'
      );

      datosActualizar.urlImagen = resultado.secure_url;
      datosActualizar.publicIdCloudinary = resultado.public_id;
    }

    // Convertir tipos de datos numéricos
    if (datosActualizar.latitud) {
      datosActualizar.latitud = parseFloat(datosActualizar.latitud);
    }
    if (datosActualizar.longitud) {
      datosActualizar.longitud = parseFloat(datosActualizar.longitud);
    }
    if (datosActualizar.radioKm) {
      datosActualizar.radioKm = parseInt(datosActualizar.radioKm);
    }
    if (datosActualizar.orden !== undefined) {
      datosActualizar.orden = parseInt(datosActualizar.orden);
    }

    await foto.update(datosActualizar);

    res.json({
      mensaje: 'Foto actualizada exitosamente',
      foto
    });

  } catch (error) {
    console.error('Error al actualizar foto:', error);
    res.status(500).json({
      error: 'Error al actualizar foto'
    });
  }
};

/**
 * Eliminar foto
 */
const eliminarFoto = async (req, res) => {
  try {
    const { id } = req.params;

    const foto = await db.FotoClienteRegion.findByPk(id);

    if (!foto) {
      return res.status(404).json({
        error: 'Foto no encontrada'
      });
    }

    // Eliminar de Cloudinary si existe
    if (foto.publicIdCloudinary) {
      try {
        await eliminarArchivo(foto.publicIdCloudinary, 'image');
      } catch (error) {
        console.error('Error al eliminar imagen de Cloudinary:', error);
      }
    }

    await foto.destroy();

    res.json({
      mensaje: 'Foto eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar foto:', error);
    res.status(500).json({
      error: 'Error al eliminar foto'
    });
  }
};

/**
 * Obtener lista de ciudades con fotos
 */
const obtenerCiudadesDisponibles = async (req, res) => {
  try {
    const ciudades = await db.FotoClienteRegion.obtenerCiudadesDisponibles();

    res.json({
      ciudades,
      total: ciudades.length
    });

  } catch (error) {
    console.error('Error al obtener ciudades:', error);
    res.status(500).json({
      error: 'Error al obtener ciudades'
    });
  }
};

/**
 * Reordenar fotos de una ciudad
 */
const reordenarFotos = async (req, res) => {
  try {
    const { ciudad } = req.params;
    const { ordenes } = req.body;

    if (!Array.isArray(ordenes)) {
      return res.status(400).json({
        error: 'Se requiere un array de órdenes'
      });
    }

    // Verificar que todas las fotos pertenecen a la ciudad
    const fotosIds = ordenes.map(o => o.id);
    const fotos = await db.FotoClienteRegion.findAll({
      where: {
        id: fotosIds,
        ciudad: {
          [Op.iLike]: ciudad
        }
      }
    });

    if (fotos.length !== ordenes.length) {
      return res.status(400).json({
        error: 'Una o más fotos no pertenecen a esta ciudad'
      });
    }

    // Actualizar órdenes en una transacción
    await db.sequelize.transaction(async (t) => {
      for (const item of ordenes) {
        await db.FotoClienteRegion.update(
          { orden: item.orden },
          {
            where: { id: item.id },
            transaction: t
          }
        );
      }
    });

    res.json({
      mensaje: 'Orden actualizado exitosamente',
      total: ordenes.length
    });

  } catch (error) {
    console.error('Error al reordenar fotos:', error);
    res.status(500).json({
      error: 'Error al reordenar fotos'
    });
  }
};

module.exports = {
  crearFotoRegion,
  obtenerTodasLasFotos,
  obtenerFotosPorCiudad,
  obtenerFotosPorCoordenadas,
  obtenerFotoPorId,
  actualizarFoto,
  eliminarFoto,
  obtenerCiudadesDisponibles,
  reordenarFotos
};