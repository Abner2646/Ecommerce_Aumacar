// controllers/vehiculoController.js

const db = require('../models');
const { Op } = require('sequelize');
const { subirImagen, subirVideo, eliminarArchivo } = require('../utils/cloudinary');
const { extraerPublicId, construirFiltros, construirOrden } = require('../utils/helpers');

/**
 * Obtener todos los vehículos con filtros
 */
const obtenerVehiculos = async (req, res) => {
  try {
    const { ordenar } = req.query;
    
    const where = construirFiltros(req.query);
    const order = construirOrden(ordenar);

    const vehiculos = await db.Vehiculo.findAll({
      where,
      include: [
        {
          model: db.Marca,
          as: 'marca',
          attributes: ['id', 'nombre', 'slug', 'logo']
        },
        {
          model: db.ImagenVehiculo,
          as: 'imagenes',
          required: false,
          order: [['orden', 'ASC']]
        }
      ],
      order,
      attributes: { exclude: ['descripcionCompleta', 'createdAt', 'updatedAt'] }
    });

    res.json({
      vehiculos,
      total: vehiculos.length
    });

  } catch (error) {
    console.error('Error al obtener vehículos:', error);
    res.status(500).json({
      error: 'Error al obtener vehículos'
    });
  }
};

/**
 * Obtener vehículo por ID
 */
const obtenerVehiculoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const vehiculo = await db.Vehiculo.findByPk(id, {
      include: [
        {
          model: db.Marca,
          as: 'marca',
          attributes: ['id', 'nombre', 'slug', 'logo', 'colorPrimario', 'colorSecundario']
        },
        {
          model: db.ImagenVehiculo,
          as: 'imagenes',
          include: [{
            model: db.ColorVehiculo,
            as: 'colorVehiculo',
            required: false,
            include: [{
              model: db.Color,
              as: 'color',
              attributes: ['id', 'nombre', 'codigoHex']
            }]
          }]
        },
        {
          model: db.VideoVehiculo,
          as: 'videos',
          required: false,
          separate: true
        },
        {
          model: db.Caracteristica,
          as: 'caracteristicas',
          through: { attributes: [] },
          where: { activa: true },
          required: false
        },
        {
          model: db.ColorVehiculo,
          as: 'coloresVehiculo',
          required: false,
          include: [{
            model: db.Color,
            as: 'color',
            attributes: ['id', 'nombre', 'codigoHex']
          }]
        }
      ],
      order: [
        [{ model: db.ImagenVehiculo, as: 'imagenes' }, 'orden', 'ASC'],
        [{ model: db.ColorVehiculo, as: 'coloresVehiculo' }, 'orden', 'ASC']
      ]
    });

    if (!vehiculo) {
      return res.status(404).json({
        error: 'Vehículo no encontrado'
      });
    }

    // Formatear respuesta
    const respuesta = vehiculo.toJSON();
    
    // Filtrar videos activos y ordenar
    respuesta.videos = respuesta.videos
      ?.filter(v => v.activo === true)
      .sort((a, b) => a.orden - b.orden) || [];
    
    respuesta.colores = respuesta.coloresVehiculo?.map(cv => ({
      colorVehiculoId: cv.id,
      colorId: cv.color.id,
      nombre: cv.color.nombre,
      codigoHex: cv.color.codigoHex,
      orden: cv.orden
    })) || [];
    delete respuesta.coloresVehiculo;

    res.json({ vehiculo: respuesta });

  } catch (error) {
    console.error('Error al obtener vehículo:', error);
    res.status(500).json({
      error: 'Error al obtener vehículo'
    });
  }
};

/**
 * Obtener vehículo por slug
 */
const obtenerVehiculoPorSlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const vehiculo = await db.Vehiculo.findOne({
      where: { slug },
      include: [
        {
          model: db.Marca,
          as: 'marca',
          attributes: ['id', 'nombre', 'slug', 'logo', 'colorPrimario', 'colorSecundario']
        },
        {
          model: db.ImagenVehiculo,
          as: 'imagenes',
          include: [{
            model: db.ColorVehiculo,
            as: 'colorVehiculo',
            required: false,
            include: [{
              model: db.Color,
              as: 'color',
              attributes: ['id', 'nombre', 'codigoHex']
            }]
          }]
        },
        {
          model: db.VideoVehiculo,
          as: 'videos',
          required: false,
          separate: true
        },
        {
          model: db.Caracteristica,
          as: 'caracteristicas',
          through: { attributes: [] },
          where: { activa: true },
          required: false
        },
        {
          model: db.ColorVehiculo,
          as: 'coloresVehiculo',
          required: false,
          include: [{
            model: db.Color,
            as: 'color',
            attributes: ['id', 'nombre', 'codigoHex']
          }]
        }
      ],
      order: [
        [{ model: db.ImagenVehiculo, as: 'imagenes' }, 'orden', 'ASC'],
        [{ model: db.ColorVehiculo, as: 'coloresVehiculo' }, 'orden', 'ASC']
      ]
    });

    if (!vehiculo) {
      return res.status(404).json({
        error: 'Vehículo no encontrado'
      });
    }

    // Formatear respuesta
    const respuesta = vehiculo.toJSON();
    
    // Filtrar videos activos y ordenar
    respuesta.videos = respuesta.videos
      ?.filter(v => v.activo === true)
      .sort((a, b) => a.orden - b.orden) || [];
    
    respuesta.colores = respuesta.coloresVehiculo?.map(cv => ({
      colorVehiculoId: cv.id,
      colorId: cv.color.id,
      nombre: cv.color.nombre,
      codigoHex: cv.color.codigoHex,
      orden: cv.orden
    })) || [];
    delete respuesta.coloresVehiculo;

    res.json({ vehiculo: respuesta });

  } catch (error) {
    console.error('Error al obtener vehículo:', error);
    res.status(500).json({
      error: 'Error al obtener vehículo'
    });
  }
};

/**
 * Crear nuevo vehículo
 */
const crearVehiculo = async (req, res) => {
  try {
    const vehiculoData = req.body;

    // Verificar si existe la marca
    const marca = await db.Marca.findByPk(vehiculoData.marcaId);
    if (!marca) {
      return res.status(404).json({
        error: 'Marca no encontrada'
      });
    }

    // Verificar si ya existe un vehículo con ese slug
    const vehiculoExistente = await db.Vehiculo.findOne({ where: { slug: vehiculoData.slug } });
    if (vehiculoExistente) {
      return res.status(400).json({
        error: 'Ya existe un vehículo con ese slug'
      });
    }

    // Si no viene el campo favorito, por defecto es false
    if (typeof vehiculoData.favorito === 'undefined') {
      vehiculoData.favorito = false;
    }
    
    const vehiculo = await db.Vehiculo.create(vehiculoData);

    res.status(201).json({
      mensaje: 'Vehículo creado exitosamente',
      vehiculo
    });

  } catch (error) {
    console.error('Error al crear vehículo:', error);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        error: 'Ya existe un vehículo con ese slug'
      });
    }

    res.status(500).json({
      error: 'Error al crear vehículo'
    });
  }
};

/**
 * Actualizar vehículo
 */
const actualizarVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculoData = req.body;

    const vehiculo = await db.Vehiculo.findByPk(id);

    if (!vehiculo) {
      return res.status(404).json({
        error: 'Vehículo no encontrado'
      });
    }

    // Si cambia la marca, verificar que existe
    if (vehiculoData.marcaId && vehiculoData.marcaId !== vehiculo.marcaId) {
      const marca = await db.Marca.findByPk(vehiculoData.marcaId);
      if (!marca) {
        return res.status(404).json({
          error: 'Marca no encontrada'
        });
      }
    }

    // Si no viene el campo favorito, mantener el valor actual
    if (typeof vehiculoData.favorito === 'undefined') {
      delete vehiculoData.favorito;
    }
    
    await vehiculo.update(vehiculoData);

    res.json({
      mensaje: 'Vehículo actualizado exitosamente',
      vehiculo
    });

  } catch (error) {
    console.error('Error al actualizar vehículo:', error);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        error: 'Ya existe un vehículo con ese slug'
      });
    }

    res.status(500).json({
      error: 'Error al actualizar vehículo'
    });
  }
};

/**
 * Eliminar vehículo
 */
const eliminarVehiculo = async (req, res) => {
  try {
    const { id } = req.params;

    const vehiculo = await db.Vehiculo.findByPk(id, {
      include: [
        { model: db.ImagenVehiculo, as: 'imagenes' },
        { model: db.VideoVehiculo, as: 'videos' }
      ]
    });

    if (!vehiculo) {
      return res.status(404).json({
        error: 'Vehículo no encontrado'
      });
    }

    // Eliminar imágenes de Cloudinary
    if (vehiculo.imagenes && vehiculo.imagenes.length > 0) {
      for (const imagen of vehiculo.imagenes) {
        const publicId = extraerPublicId(imagen.url);
        if (publicId) {
          await eliminarArchivo(publicId, 'image');
        }
      }
    }

    // Eliminar videos de Cloudinary
    if (vehiculo.videos && vehiculo.videos.length > 0) {
      for (const video of vehiculo.videos) {
        const publicId = extraerPublicId(video.urlVideo);
        if (publicId) {
          await eliminarArchivo(publicId, 'video');
        }
      }
    }

    await vehiculo.destroy();

    res.json({
      mensaje: 'Vehículo eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar vehículo:', error);
    res.status(500).json({
      error: 'Error al eliminar vehículo'
    });
  }
};

/**
 * Agregar imágenes a un vehículo
 */
const agregarImagenes = async (req, res) => {
  try {
    const { id } = req.params;
    const { esPrincipal, orden, colorVehiculoId } = req.body;

    const vehiculo = await db.Vehiculo.findByPk(id);

    if (!vehiculo) {
      return res.status(404).json({
        error: 'Vehículo no encontrado'
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        error: 'No se proporcionaron imágenes'
      });
    }

    // Validar colorVehiculoId si se proporciona
    let colorVehiculoValido = null;
    if (colorVehiculoId) {
      colorVehiculoValido = await db.ColorVehiculo.findOne({
        where: { 
          id: colorVehiculoId,
          vehiculoId: id
        }
      });

      if (!colorVehiculoValido) {
        return res.status(400).json({
          error: 'El color especificado no está asignado a este vehículo'
        });
      }
    }

    // Si se marca como principal, desmarcar las demás
    if (esPrincipal === 'true' || esPrincipal === true) {
      await db.ImagenVehiculo.update(
        { esPrincipal: false },
        { where: { vehiculoId: id } }
      );
    }

    const imagenes = [];
    
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      
      // Subir imagen a Cloudinary
      const resultado = await subirImagen(file.buffer, `vehiculos/${vehiculo.slug}`);
      
      const imagen = await db.ImagenVehiculo.create({
        vehiculoId: id,
        colorVehiculoId: colorVehiculoValido ? colorVehiculoValido.id : null,
        url: resultado.secure_url,
        alt: `${vehiculo.modelo} ${vehiculo.version || ''} - Imagen ${i + 1}`,
        orden: orden ? parseInt(orden) + i : i,
        esPrincipal: i === 0 && (esPrincipal === 'true' || esPrincipal === true)
      });

      imagenes.push(imagen);
    }

    res.status(201).json({
      mensaje: `${imagenes.length} imagen(es) agregada(s) exitosamente`,
      imagenes
    });

  } catch (error) {
    console.error('Error al agregar imágenes:', error);
    res.status(500).json({
      error: 'Error al agregar imágenes'
    });
  }
};

/**
 * Actualizar imagen
 */
const actualizarImagen = async (req, res) => {
  try {
    const { imagenId } = req.params;
    const { colorVehiculoId, orden, esPrincipal, alt } = req.body;

    const imagen = await db.ImagenVehiculo.findByPk(imagenId);

    if (!imagen) {
      return res.status(404).json({
        error: 'Imagen no encontrada'
      });
    }

    // Validar colorVehiculoId si se proporciona
    if (colorVehiculoId !== undefined) {
      if (colorVehiculoId === null || colorVehiculoId === '') {
        imagen.colorVehiculoId = null;
      } else {
        const colorVehiculo = await db.ColorVehiculo.findOne({
          where: { 
            id: colorVehiculoId,
            vehiculoId: imagen.vehiculoId
          }
        });

        if (!colorVehiculo) {
          return res.status(400).json({
            error: 'El color especificado no está asignado a este vehículo'
          });
        }
        imagen.colorVehiculoId = colorVehiculoId;
      }
    }

    // Si se marca como principal, desmarcar las demás
    if (esPrincipal === true || esPrincipal === 'true') {
      await db.ImagenVehiculo.update(
        { esPrincipal: false },
        { where: { vehiculoId: imagen.vehiculoId } }
      );
      imagen.esPrincipal = true;
    } else if (esPrincipal === false || esPrincipal === 'false') {
      imagen.esPrincipal = false;
    }

    if (orden !== undefined) imagen.orden = parseInt(orden);
    if (alt !== undefined) imagen.alt = alt;

    await imagen.save();

    res.json({
      mensaje: 'Imagen actualizada exitosamente',
      imagen
    });

  } catch (error) {
    console.error('Error al actualizar imagen:', error);
    res.status(500).json({
      error: 'Error al actualizar imagen'
    });
  }
};

/**
 * Eliminar imagen de un vehículo
 */
const eliminarImagen = async (req, res) => {
  try {
    const { imagenId } = req.params;

    const imagen = await db.ImagenVehiculo.findByPk(imagenId);

    if (!imagen) {
      return res.status(404).json({
        error: 'Imagen no encontrada'
      });
    }

    // Eliminar de Cloudinary
    const publicId = extraerPublicId(imagen.url);
    if (publicId) {
      await eliminarArchivo(publicId, 'image');
    }

    await imagen.destroy();

    res.json({
      mensaje: 'Imagen eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    res.status(500).json({
      error: 'Error al eliminar imagen'
    });
  }
};

/**
 * Obtener imágenes por color
 */
const obtenerImagenesPorColor = async (req, res) => {
  try {
    const { id, colorVehiculoId } = req.params;
    const { incluirGenericas } = req.query;

    const vehiculo = await db.Vehiculo.findByPk(id);
    if (!vehiculo) {
      return res.status(404).json({
        error: 'Vehículo no encontrado'
      });
    }

    const whereCondition = { vehiculoId: id };
    
    if (incluirGenericas === 'true') {
      whereCondition[Op.or] = [
        { colorVehiculoId: colorVehiculoId },
        { colorVehiculoId: null }
      ];
    } else {
      whereCondition.colorVehiculoId = colorVehiculoId;
    }

    const imagenes = await db.ImagenVehiculo.findAll({
      where: whereCondition,
      include: [{
        model: db.ColorVehiculo,
        as: 'colorVehiculo',
        include: [{
          model: db.Color,
          as: 'color',
          attributes: ['id', 'nombre', 'codigoHex']
        }]
      }],
      order: [
        ['colorVehiculoId', 'ASC NULLS FIRST'],
        ['orden', 'ASC']
      ]
    });

    res.json({
      vehiculoId: parseInt(id),
      colorVehiculoId: parseInt(colorVehiculoId),
      imagenes,
      total: imagenes.length
    });

  } catch (error) {
    console.error('Error al obtener imágenes por color:', error);
    res.status(500).json({
      error: 'Error al obtener imágenes por color'
    });
  }
};

/**
 * Agregar video a un vehículo
 */
const agregarVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, esPrincipal, orden } = req.body;

    const vehiculo = await db.Vehiculo.findByPk(id);

    if (!vehiculo) {
      return res.status(404).json({
        error: 'Vehículo no encontrado'
      });
    }

    if (!req.file) {
      console.error('No se recibió archivo en req.file');
      return res.status(400).json({
        error: 'No se proporcionó video'
      });
    }

    console.log('Archivo recibido para video:', {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    // Si se marca como principal, desmarcar los demás
    if (esPrincipal === 'true' || esPrincipal === true) {
      await db.VideoVehiculo.update(
        { esPrincipal: false },
        { where: { vehiculoId: id } }
      );
    }

    // Subir video a Cloudinary
    try {
      console.log('Iniciando subida a Cloudinary...');
      const resultado = await subirVideo(req.file.buffer, `vehiculos/${vehiculo.slug}`);
      
      console.log('Respuesta de Cloudinary:', {
        secure_url: resultado.secure_url,
        thumbnail_url: resultado.thumbnail_url,
        duration: resultado.duration,
        bytes: resultado.bytes,
        format: resultado.format,
        resource_type: resultado.resource_type
      });

      const videoData = {
        vehiculoId: id,
        titulo: titulo || `Video ${vehiculo.modelo}`,
        descripcion,
        urlVideo: resultado.secure_url,
        urlThumbnail: resultado.thumbnail_url || null,
        duracion: resultado.duration ? Math.round(resultado.duration) : null, // Redondear a entero
        tamano: resultado.bytes || null,
        formato: resultado.format || 'mp4',
        orden: orden || 0,
        esPrincipal: esPrincipal === 'true' || esPrincipal === true,
        activo: true
      };

      console.log('Creando registro en BD con datos:', videoData);

      const video = await db.VideoVehiculo.create(videoData);

      console.log('Video creado exitosamente:', {
        id: video.id,
        titulo: video.titulo,
        activo: video.activo
      });

      res.status(201).json({
        mensaje: 'Video agregado exitosamente',
        video
      });
    } catch (cloudinaryError) {
      console.error('Error completo:', {
        message: cloudinaryError.message,
        stack: cloudinaryError.stack,
        name: cloudinaryError.name
      });
      return res.status(500).json({
        error: `Error al procesar el video: ${cloudinaryError.message}`
      });
    }

  } catch (error) {
    console.error('Error al agregar video:', error);
    res.status(500).json({
      error: 'Error al agregar video. Asegúrate de que el archivo es un video válido.'
    });
  }
};

/**
 * Eliminar video de un vehículo
 */
const eliminarVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await db.VideoVehiculo.findByPk(videoId);

    if (!video) {
      return res.status(404).json({
        error: 'Video no encontrado'
      });
    }

    // Eliminar de Cloudinary
    const publicId = extraerPublicId(video.urlVideo);
    if (publicId) {
      await eliminarArchivo(publicId, 'video');
    }

    await video.destroy();

    res.json({
      mensaje: 'Video eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar video:', error);
    res.status(500).json({
      error: 'Error al eliminar video'
    });
  }
};

/**
 * Asignar características a un vehículo
 */
const asignarCaracteristicas = async (req, res) => {
  try {
    const { id } = req.params;
    const { caracteristicasIds } = req.body;

    if (!Array.isArray(caracteristicasIds)) {
      return res.status(400).json({
        error: 'caracteristicasIds debe ser un array'
      });
    }

    const vehiculo = await db.Vehiculo.findByPk(id);

    if (!vehiculo) {
      return res.status(404).json({
        error: 'Vehículo no encontrado'
      });
    }

    // Verificar que todas las características existen
    const caracteristicas = await db.Caracteristica.findAll({
      where: { id: caracteristicasIds }
    });

    if (caracteristicas.length !== caracteristicasIds.length) {
      return res.status(400).json({
        error: 'Una o más características no existen'
      });
    }

    // Eliminar relaciones existentes
    await db.VehiculoCaracteristica.destroy({
      where: { vehiculoId: id }
    });

    // Crear nuevas relaciones
    const relaciones = caracteristicasIds.map(caracteristicaId => ({
      vehiculoId: id,
      caracteristicaId
    }));

    await db.VehiculoCaracteristica.bulkCreate(relaciones);

    res.json({
      mensaje: 'Características asignadas exitosamente',
      total: relaciones.length
    });

  } catch (error) {
    console.error('Error al asignar características:', error);
    res.status(500).json({
      error: 'Error al asignar características'
    });
  }
};

module.exports = {
  obtenerVehiculos,
  obtenerVehiculoPorId,
  obtenerVehiculoPorSlug,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
  agregarImagenes,
  actualizarImagen,
  eliminarImagen,
  obtenerImagenesPorColor,
  agregarVideo,
  eliminarVideo,
  asignarCaracteristicas
};