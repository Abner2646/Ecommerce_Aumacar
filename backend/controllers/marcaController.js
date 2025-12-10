const db = require('../models');
const { subirImagen, subirVideo, eliminarArchivo } = require('../utils/cloudinary');
const { extraerPublicId } = require('../utils/helpers');

/**
 * Obtener todas las marcas
 */
const obtenerMarcas = async (req, res) => {
  try {
    const { activa } = req.query;
    
    const where = {};
    if (activa !== undefined) {
      where.activa = activa === 'true';
    }

    const marcas = await db.Marca.findAll({
      where,
      order: [['orden', 'ASC'], ['nombre', 'ASC']],
      attributes: {
        include: ['plantilla']
      }
    });
    // Forzar plantilla en el JSON
    const marcasConPlantilla = marcas.map(m => ({
      ...m.toJSON(),
      plantilla: m.plantilla
    }));
    res.json({ marcas: marcasConPlantilla });
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    res.status(500).json({ error: 'Error al obtener marcas' });
  }
};

/**
 * Obtener marca por ID
 */
        // ...existing code...
const obtenerMarcaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const marca = await db.Marca.findByPk(id, {
      include: [{
        model: db.Vehiculo,
        as: 'vehiculos',
        where: { disponible: true },
        required: false,
        attributes: ['id', 'modelo', 'version', 'año', 'precio', 'slug']
      }]
    });

    if (!marca) {
      return res.status(404).json({
        error: 'Marca no encontrada'
      });
    }

    res.json({ marca });

  } catch (error) {
    console.error('Error al obtener marca:', error);
    res.status(500).json({
      error: 'Error al obtener marca'
    });
  }
};

/**
 * Obtener marca por slug
 */
const obtenerMarcaPorSlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const marca = await db.Marca.findOne({
      where: { slug },
      include: [{
        model: db.Vehiculo,
        as: 'vehiculos',
        where: { disponible: true },
        required: false,
        attributes: ['id', 'modelo', 'version', 'año', 'precio', 'slug', 'categoria', 'destacado']
      }]
    });

    if (!marca) {
      return res.status(404).json({
        error: 'Marca no encontrada'
      });
    }

    res.json({ marca });

  } catch (error) {
    console.error('Error al obtener marca:', error);
    res.status(500).json({
      error: 'Error al obtener marca'
    });
  }
};

/**
 * Crear nueva marca
 */
const crearMarca = async (req, res) => {
  try {
    let { nombre, slug, descripcion, activa, orden, colorPrimario, colorSecundario, plantilla } = req.body;

    // Normalizar valores para evitar 'undefined' en campos booleanos y numéricos
    if (typeof activa === 'undefined' || activa === '' || activa === null) {
      activa = true;
    } else if (typeof activa === 'string') {
      activa = activa === 'true' || activa === '1';
    }
    if (typeof orden === 'undefined' || orden === '' || orden === null) {
      orden = 0;
    } else {
      orden = Number(orden);
      if (isNaN(orden)) orden = 0;
    }

    // Verificar si ya existe una marca con ese slug
    const marcaExistente = await db.Marca.findOne({ where: { slug } });
    if (marcaExistente) {
      return res.status(400).json({
        error: 'Ya existe una marca con ese slug'
      });
    }


    // Subir logo si existe
    let logoUrl = null;
    if (req.files && req.files.logo && req.files.logo[0]) {
      const resultado = await subirImagen(req.files.logo[0].buffer, 'marcas');
      logoUrl = resultado.secure_url;
    }

    // Subir fotoPresentacion si existe
    let fotoPresentacionUrl = null;
    if (req.files && req.files.fotoPresentacion && req.files.fotoPresentacion[0]) {
      const resultado = await subirImagen(req.files.fotoPresentacion[0].buffer, 'marcas/presentacion');
      fotoPresentacionUrl = resultado.secure_url;
    }

    // Subir fotoDelMedio si existe
    let fotoDelMedioUrl = null;
    if (req.files && req.files.fotoDelMedio && req.files.fotoDelMedio[0]) {
      const resultado = await subirImagen(req.files.fotoDelMedio[0].buffer, 'marcas/fotoDelMedio');
      fotoDelMedioUrl = resultado.secure_url;
    }

    // Subir videoPresentacion si existe
    let videoPresentacionUrl = null;
    if (req.files && req.files.videoPresentacion && req.files.videoPresentacion[0]) {
      const resultado = await subirVideo(req.files.videoPresentacion[0].buffer, 'marcas/presentacion');
      videoPresentacionUrl = resultado.secure_url;
    }

    // Subir videoPortada si existe
    let videoPortadaUrl = null;
    if (req.files && req.files.videoPortada && req.files.videoPortada[0]) {
      const resultado = await subirVideo(req.files.videoPortada[0].buffer, 'marcas/portada');
      videoPortadaUrl = resultado.secure_url;
    }

    const marca = await db.Marca.create({
      nombre,
      slug,
      descripcion,
      logo: logoUrl,
      fotoPresentacion: fotoPresentacionUrl,
      fotoDelMedio: fotoDelMedioUrl,
      videoPresentacion: videoPresentacionUrl,
      videoPortada: videoPortadaUrl,
      activa,
      orden,
      colorPrimario,
      colorSecundario,
      plantilla: plantilla !== undefined ? Number(plantilla) : 1
    });

    res.status(201).json({
      mensaje: 'Marca creada exitosamente',
      marca
    });

  } catch (error) {
    console.error('Error al crear marca:', error);
    if (error.errors && error.errors.length) {
      return res.status(400).json({
        error: error.errors[0].message
      });
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        error: 'Ya existe una marca con ese nombre o slug'
      });
    }
    res.status(500).json({
      error: 'Error al crear marca'
    });
  }
};

/**
 * Actualizar marca
 */
const actualizarMarca = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, slug, descripcion, activa, orden, colorPrimario, colorSecundario, plantilla } = req.body;

    const marca = await db.Marca.findByPk(id);

    if (!marca) {
      return res.status(404).json({
        error: 'Marca no encontrada'
      });
    }

    // Si hay un nuevo logo, subir y eliminar el anterior
    let logoUrl = marca.logo;
    if (req.file) {
      // Eliminar logo anterior si existe
      if (marca.logo) {
        const publicId = extraerPublicId(marca.logo);
        if (publicId) {
          await eliminarArchivo(publicId, 'image');
        }
      }
      
      // Subir nuevo logo
      const resultado = await subirImagen(req.file.buffer, 'marcas');
      logoUrl = resultado.secure_url;
    }

    await marca.update({
      nombre: nombre || marca.nombre,
      slug: slug || marca.slug,
      descripcion: descripcion !== undefined ? descripcion : marca.descripcion,
      logo: logoUrl,
      activa: activa !== undefined ? activa : marca.activa,
      orden: orden !== undefined ? orden : marca.orden,
      colorPrimario: colorPrimario || marca.colorPrimario,
      colorSecundario: colorSecundario || marca.colorSecundario,
      plantilla: plantilla !== undefined ? Number(plantilla) : marca.plantilla
    });

    res.json({
      mensaje: 'Marca actualizada exitosamente',
      marca
    });

  } catch (error) {
    console.error('Error al actualizar marca:', error);
    if (error.errors && error.errors.length) {
      return res.status(400).json({
        error: error.errors[0].message
      });
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        error: 'Ya existe una marca con ese nombre o slug'
      });
    }
    res.status(500).json({
      error: 'Error al actualizar marca'
    });
  }
};

/**
 * Eliminar marca
 */
const eliminarMarca = async (req, res) => {
  try {
    const { id } = req.params;

    const marca = await db.Marca.findByPk(id);

    if (!marca) {
      return res.status(404).json({
        error: 'Marca no encontrada'
      });
    }

    // Verificar si tiene vehículos asociados
    const vehiculosCount = await db.Vehiculo.count({ where: { marcaId: id } });
    
    if (vehiculosCount > 0) {
      return res.status(400).json({
        error: 'No se puede eliminar la marca porque tiene vehículos asociados'
      });
    }

    // Eliminar logo de Cloudinary si existe
    if (marca.logo) {
      const publicId = extraerPublicId(marca.logo);
      if (publicId) {
        await eliminarArchivo(publicId, 'image');
      }
    }

    await marca.destroy();

    res.json({
      mensaje: 'Marca eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar marca:', error);
    res.status(500).json({
      error: 'Error al eliminar marca'
    });
  }
};

module.exports = {
  obtenerMarcas,
  obtenerMarcaPorId,
  obtenerMarcaPorSlug,
  crearMarca,
  actualizarMarca,
  eliminarMarca
};
