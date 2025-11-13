const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configurar Multer para recibir archivos en memoria
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Filtro para imágenes
  if (file.fieldname === 'imagen' || file.fieldname === 'imagenes' || file.fieldname === 'logo') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'), false);
    }
  }
  // Filtro para videos
  else if (file.fieldname === 'video') {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de video'), false);
    }
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 200 * 1024 * 1024 // 200MB límite (ajustable)
  },
  fileFilter: fileFilter
});

/**
 * Sube una imagen a Cloudinary
 * @param {Buffer} fileBuffer - Buffer del archivo
 * @param {String} folder - Carpeta en Cloudinary
 * @returns {Promise<Object>} - Resultado de Cloudinary
 */
const subirImagen = (fileBuffer, folder = 'vehiculos') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'image',
        transformation: [
          { width: 1920, height: 1080, crop: 'limit', quality: 'auto' }
        ]
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

/**
 * Sube un video a Cloudinary
 * @param {Buffer} fileBuffer - Buffer del archivo
 * @param {String} folder - Carpeta en Cloudinary
 * @returns {Promise<Object>} - Resultado de Cloudinary
 */
const subirVideo = (fileBuffer, folder = 'vehiculos/videos') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'video',
        chunk_size: 6000000, // 6MB chunks
        eager: [
          { quality: 'auto', format: 'mp4' }
        ],
        eager_async: true
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

/**
 * Elimina un archivo de Cloudinary
 * @param {String} publicId - ID público del archivo
 * @param {String} resourceType - Tipo de recurso ('image' o 'video')
 * @returns {Promise<Object>} - Resultado de la eliminación
 */
const eliminarArchivo = (publicId, resourceType = 'image') => {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};

module.exports = {
  cloudinary,
  upload,
  subirImagen,
  subirVideo,
  eliminarArchivo
};
