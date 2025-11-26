const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoController');
const { verificarToken } = require('../middlewares/authMiddleware');
const { validarVehiculo, validarId } = require('../middlewares/validationMiddleware');
const { upload } = require('../utils/cloudinary');

/**
 * @route   GET /api/vehiculos
 * @desc    Obtener todos los vehículos con filtros
 * @access  Público
 * @query   ?marcaId=1 (opcional - filtrar por marca)
 * @query   ?categoria=sedan (opcional - sedan, suv, pickup, hatchback, coupe, minivan, deportivo, otro)
 * @query   ?combustible=nafta (opcional - nafta, diesel, hibrido, electrico, gnc)
 * @query   ?transmision=automatica (opcional - manual, automatica, cvt)
 * @query   ?traccion=delantera (opcional - delantera, trasera, 4x4, awd)
 * @query   ?disponible=true (opcional)
 * @query   ?destacado=true (opcional)
 * @query   ?precioMin=20000000 (opcional)
 * @query   ?precioMax=30000000 (opcional)
 * @query   ?añoMin=2020 (opcional)
 * @query   ?añoMax=2024 (opcional)
 * @query   ?ordenar=precio-asc (opcional - precio-asc, precio-desc, año-asc, año-desc, modelo-asc, createdAt-desc)
 * 
 * @response {
 *   "vehiculos": [
 *     {
 *       "id": 1,
 *       "marcaId": 1,
 *       "modelo": "Corolla",
 *       "version": "XEI 2.0",
 *       "año": 2024,
 *       "precio": "25000000.00",
 *       "categoria": "sedan",
 *       "stock": 5,
 *       "disponible": true,
 *       "destacado": false,
 *       "motor": "2.0L",
 *       "combustible": "nafta",
 *       "transmision": "automatica",
 *       "traccion": "delantera",
 *       "puertas": 4,
 *       "pasajeros": 5,
 *       "slug": "toyota-corolla-xei-2024",
 *       "marca": {
 *         "id": 1,
 *         "nombre": "Toyota",
 *         "slug": "toyota",
 *         "logo": "https://res.cloudinary.com/.../logo.jpg"
 *       },
 *       "imagenes": [
 *         {
 *           "id": 1,
 *           "url": "https://res.cloudinary.com/.../imagen.jpg",
 *           "esPrincipal": true
 *         }
 *       ]
 *     }
 *   ],
 *   "total": 1
 * }
 */
router.get('/', vehiculoController.obtenerVehiculos);

/**
 * @route   GET /api/vehiculos/:id
 * @desc    Obtener vehículo por ID (completo con imágenes, videos, características)
 * @access  Público
 * @params  id: 1
 * 
 * @response {
 *   "vehiculo": {
 *     "id": 1,
 *     "marcaId": 1,
 *     "modelo": "Corolla",
 *     "version": "XEI 2.0",
 *     "año": 2024,
 *     "precio": "25000000.00",
 *     "categoria": "sedan",
 *     "stock": 5,
 *     "disponible": true,
 *     "destacado": false,
 *     "motor": "2.0L",
 *     "combustible": "nafta",
 *     "transmision": "automatica",
 *     "traccion": "delantera",
 *     "puertas": 4,
 *     "pasajeros": 5,
 *     "cilindrada": "2000cc",
 *     "potencia": "170 CV",
 *     "torque": "210 Nm",
 *     "descripcionCorta": "El sedán más vendido del mundo",
 *     "descripcionCompleta": "Descripción completa...",
 *     "slug": "toyota-corolla-xei-2024",
 *     "metaTitle": "Toyota Corolla XEI 2.0 2024",
 *     "metaDescription": "Comprá el Toyota Corolla XEI...",
 *     "marca": {
 *       "id": 1,
 *       "nombre": "Toyota",
 *       "slug": "toyota",
 *       "logo": "https://res.cloudinary.com/.../logo.jpg",
 *       "colorPrimario": "#EB0A1E",
 *       "colorSecundario": "#000000"
 *     },
 *     "imagenes": [
 *       {
 *         "id": 1,
 *         "vehiculoId": 1,
 *         "url": "https://res.cloudinary.com/.../imagen1.jpg",
 *         "alt": "Toyota Corolla - Imagen 1",
 *         "orden": 0,
 *         "esPrincipal": true
 *       }
 *     ],
 *     "videos": [
 *       {
 *         "id": 1,
 *         "vehiculoId": 1,
 *         "titulo": "Test drive Toyota Corolla 2024",
 *         "descripcion": "Video de prueba del vehículo",
 *         "urlVideo": "https://res.cloudinary.com/.../video.mp4",
 *         "urlThumbnail": "https://res.cloudinary.com/.../thumb.jpg",
 *         "duracion": 180,
 *         "orden": 0,
 *         "esPrincipal": true,
 *         "activo": true
 *       }
 *     ],
 *     "caracteristicas": [
 *       {
 *         "id": 1,
 *         "nombre": "ABS",
 *         "icono": "fa-shield-alt",
 *         "tipo": "seguridad"
 *       },
 *       {
 *         "id": 12,
 *         "nombre": "Aire acondicionado",
 *         "icono": "fa-snowflake",
 *         "tipo": "confort"
 *       }
 *     ]
 *   }
 * }
 */
router.get('/:id', validarId, vehiculoController.obtenerVehiculoPorId);

/**
 * @route   GET /api/vehiculos/slug/:slug
 * @desc    Obtener vehículo por slug (completo con imágenes, videos, características)
 * @access  Público
 * @params  slug: "toyota-corolla-xei-2024"
 * 
 * @response (igual que GET /api/vehiculos/:id)
 */
router.get('/slug/:slug', vehiculoController.obtenerVehiculoPorSlug);

/**
 * @route   POST /api/vehiculos
 * @desc    Crear nuevo vehículo
 * @access  Privado
 * @headers Authorization: Bearer <token>
 * 
 * @body {
 *   "marcaId": 1,
 *   "modelo": "Corolla",
 *   "version": "XEI 2.0",
 *   "año": 2024,
 *   "precio": 25000000.00,
 *   "categoria": "sedan",
 *   "stock": 5,
 *   "disponible": true,
 *   "destacado": false,
 *   "motor": "2.0L",
 *   "combustible": "nafta",
 *   "transmision": "automatica",
 *   "traccion": "delantera",
 *   "puertas": 4,
 *   "pasajeros": 5,
 *   "cilindrada": "2000cc",
 *   "potencia": "170 CV",
 *   "torque": "210 Nm",
 *   "descripcionCorta": "El sedán más vendido del mundo",
 *   "descripcionCompleta": "Descripción completa del vehículo...",
 *   "slug": "toyota-corolla-xei-2024",
 *   "metaTitle": "Toyota Corolla XEI 2.0 2024",
 *   "metaDescription": "Comprá el Toyota Corolla XEI..."
 * }
 * 
 * @response {
 *   "mensaje": "Vehículo creado exitosamente",
 *   "vehiculo": {
 *     "id": 1,
 *     "marcaId": 1,
 *     "modelo": "Corolla",
 *     "version": "XEI 2.0",
 *     "año": 2024,
 *     "precio": "25000000.00",
 *     "slug": "toyota-corolla-xei-2024",
 *     "createdAt": "2024-11-04T14:30:00.000Z",
 *     "updatedAt": "2024-11-04T14:30:00.000Z"
 *   }
 * }
 */
router.post(
  '/',
  verificarToken,
  validarVehiculo,
  vehiculoController.crearVehiculo
);

/**
 * @route   PUT /api/vehiculos/:id
 * @desc    Actualizar vehículo
 * @access  Privado
 * @headers Authorization: Bearer <token>
 * @params  id: 1
 * 
 * @body (mismos campos que POST, todos opcionales)
 * 
 * @response {
 *   "mensaje": "Vehículo actualizado exitosamente",
 *   "vehiculo": {...}
 * }
 */
router.put(
  '/:id',
  verificarToken,
  validarId,
  validarVehiculo,
  vehiculoController.actualizarVehiculo
);

/**
 * @route   DELETE /api/vehiculos/:id
 * @desc    Eliminar vehículo (también elimina imágenes y videos de Cloudinary)
 * @access  Privado
 * @headers Authorization: Bearer <token>
 * @params  id: 1
 * 
 * @response {
 *   "mensaje": "Vehículo eliminado exitosamente"
 * }
 */
router.delete(
  '/:id',
  verificarToken,
  validarId,
  vehiculoController.eliminarVehiculo
);

/**
 * @route   POST /api/vehiculos/:id/imagenes
 * @desc    Agregar imágenes a un vehículo (máximo 10 por vez)
 * @access  Privado
 * @headers Authorization: Bearer <token>
 * @params  id: 1
 * @body    multipart/form-data
 * 
 * @formData {
 *   "imagenes": [<archivo1>, <archivo2>, <archivo3>],
 *   "esPrincipal": "true",
 *   "orden": "0"
 * }
 * 
 * @response {
 *   "mensaje": "3 imagen(es) agregada(s) exitosamente",
 *   "imagenes": [
 *     {
 *       "id": 1,
 *       "vehiculoId": 1,
 *       "url": "https://res.cloudinary.com/.../imagen1.jpg",
 *       "alt": "Toyota Corolla XEI 2.0 - Imagen 1",
 *       "orden": 0,
 *       "esPrincipal": true,
 *       "createdAt": "2024-11-04T14:30:00.000Z",
 *       "updatedAt": "2024-11-04T14:30:00.000Z"
 *     }
 *   ]
 * }
 */
router.post(
  '/:id/imagenes',
  verificarToken,
  validarId,
  upload.array('imagenes', 10),
  vehiculoController.agregarImagenes
);

/**
 * @route   DELETE /api/vehiculos/imagenes/:imagenId
 * @desc    Eliminar imagen de un vehículo (también de Cloudinary)
 * @access  Privado
 * @headers Authorization: Bearer <token>
 * @params  imagenId: 1
 * 
 * @response {
 *   "mensaje": "Imagen eliminada exitosamente"
 * }
 */
router.delete(
  '/imagenes/:imagenId',
  verificarToken,
  validarId,
  vehiculoController.eliminarImagen
);

/**
 * @route   POST /api/vehiculos/:id/videos
 * @desc    Agregar video a un vehículo
 * @access  Privado
 * @headers Authorization: Bearer <token>
 * @params  id: 1
 * @body    multipart/form-data
 * 
 * @formData {
 *   "video": <archivo_video>,
 *   "titulo": "Test drive Toyota Corolla 2024",
 *   "descripcion": "Video de prueba del vehículo en ruta",
 *   "esPrincipal": "true",
 *   "orden": "0"
 * }
 * 
 * @response {
 *   "mensaje": "Video agregado exitosamente",
 *   "video": {
 *     "id": 1,
 *     "vehiculoId": 1,
 *     "titulo": "Test drive Toyota Corolla 2024",
 *     "descripcion": "Video de prueba del vehículo en ruta",
 *     "urlVideo": "https://res.cloudinary.com/.../video.mp4",
 *     "urlThumbnail": "https://res.cloudinary.com/.../thumb.jpg",
 *     "duracion": 180,
 *     "tamano": 52428800,
 *     "formato": "mp4",
 *     "orden": 0,
 *     "esPrincipal": true,
 *     "activo": true,
 *     "createdAt": "2024-11-04T14:30:00.000Z",
 *     "updatedAt": "2024-11-04T14:30:00.000Z"
 *   }
 * }
 */
router.post(
  '/:id/videos',
  verificarToken,
  validarId,
  upload.single('video'),
  vehiculoController.agregarVideo
);

/**
 * @route   DELETE /api/vehiculos/videos/:videoId
 * @desc    Eliminar video de un vehículo (también de Cloudinary)
 * @access  Privado
 * @headers Authorization: Bearer <token>
 * @params  videoId: 1
 * 
 * @response {
 *   "mensaje": "Video eliminado exitosamente"
 * }
 */
router.delete(
  '/videos/:videoId',
  verificarToken,
  validarId,
  vehiculoController.eliminarVideo
);

/**
 * @route   POST /api/vehiculos/:id/caracteristicas
 * @desc    Asignar características a un vehículo (reemplaza las existentes)
 * @access  Privado
 * @headers Authorization: Bearer <token>
 * @params  id: 1
 * 
 * @body {
 *   "caracteristicasIds": [1, 2, 3, 12, 22, 24]
 * }
 * 
 * @response {
 *   "mensaje": "Características asignadas exitosamente",
 *   "total": 6
 * }
 */
router.post(
  '/:id/caracteristicas',
  verificarToken,
  validarId,
  vehiculoController.asignarCaracteristicas
);

// ==========================================
// AGREGAR estas rutas a tu archivo routes/vehiculoRoutes.js existente
// ==========================================

// 1. Agregar este import arriba del archivo:
const colorController = require('../controllers/colorController');

// 2. Agregar estas rutas (después de las rutas de imágenes existentes):

// ==========================================
// Rutas de colores del vehículo
// ==========================================

// GET /api/vehiculos/:vehiculoId/colores - Obtener colores del vehículo
router.get('/:vehiculoId/colores', colorController.obtenerColoresVehiculo);

// POST /api/vehiculos/:vehiculoId/colores - Asignar colores al vehículo (admin)
router.post('/:vehiculoId/colores', verificarToken, colorController.asignarColoresVehiculo);

// DELETE /api/vehiculos/:vehiculoId/colores/:colorId - Quitar un color del vehículo (admin)
router.delete('/:vehiculoId/colores/:colorId', verificarToken, colorController.quitarColorVehiculo);

// ==========================================
// Rutas de imágenes por color
// ==========================================

// GET /api/vehiculos/:id/colores/:colorVehiculoId/imagenes - Obtener imágenes de un color específico
// Query params: incluirGenericas=true para incluir imágenes sin color asignado
router.get('/:id/colores/:colorVehiculoId/imagenes', vehiculoController.obtenerImagenesPorColor);

// ==========================================
// Actualizar imagen (para cambiar color, orden, etc.)
// ==========================================

// PUT /api/vehiculos/imagenes/:imagenId - Actualizar imagen (admin)
router.put('/imagenes/:imagenId', verificarToken, vehiculoController.actualizarImagen);

// ==========================================
// NOTA: La ruta POST de agregarImagenes ya existente ahora acepta
// un campo opcional 'colorVehiculoId' en el body para asociar 
// las imágenes a un color específico del vehículo.
// ==========================================

module.exports = router;
