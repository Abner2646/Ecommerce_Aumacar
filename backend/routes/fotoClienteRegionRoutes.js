// routes/fotoClienteRegionRoutes.js
const express = require('express');
const router = express.Router();
const fotoClienteRegionController = require('../controllers/fotoClienteRegionController');
const { verificarToken } = require('../middlewares/authMiddleware');
const { upload } = require('../utils/cloudinary');

/**
 * @route   GET /api/fotos-clientes-region/coordenadas
 * @desc    Obtener fotos cercanas a coordenadas específicas (PÚBLICO)
 * @access  Público
 * @query   ?latitud=-34.6037&longitud=-58.3816&radio=100
 * 
 * @response {
 *   "coordenadas": {
 *     "latitud": -34.6037,
 *     "longitud": -58.3816
 *   },
 *   "radioMaxKm": 100,
 *   "fotos": [
 *     {
 *       "id": 1,
 *       "ciudad": "Buenos Aires",
 *       "provincia": "Buenos Aires",
 *       "pais": "Argentina",
 *       "urlImagen": "https://res.cloudinary.com/.../imagen.jpg",
 *       "textoDescriptivo": "Juan y María, de Buenos Aires",
 *       "titulo": "Cliente satisfecho en Buenos Aires",
 *       "descripcion": "Entrega de Subaru Forester 2024",
 *       "distanciaKm": 5.2,
 *       "radioKm": 50,
 *       "orden": 0
 *     }
 *   ],
 *   "total": 1
 * }
 */
router.get('/coordenadas', fotoClienteRegionController.obtenerFotosPorCoordenadas);

/**
 * @route   GET /api/fotos-clientes-region/ciudades
 * @desc    Obtener lista de ciudades con fotos disponibles (PÚBLICO)
 * @access  Público
 * 
 * @response {
 *   "ciudades": [
 *     {
 *       "ciudad": "Buenos Aires",
 *       "provincia": "Buenos Aires",
 *       "pais": "Argentina",
 *       "cantidadFotos": 5
 *     },
 *     {
 *       "ciudad": "Córdoba",
 *       "provincia": "Córdoba",
 *       "pais": "Argentina",
 *       "cantidadFotos": 3
 *     }
 *   ],
 *   "total": 2
 * }
 */
router.get('/ciudades', fotoClienteRegionController.obtenerCiudadesDisponibles);

/**
 * @route   GET /api/fotos-clientes-region/ciudad/:ciudad
 * @desc    Obtener fotos de una ciudad específica (PÚBLICO)
 * @access  Público
 * @params  ciudad: "Buenos Aires"
 * 
 * @response {
 *   "ciudad": "Buenos Aires",
 *   "fotos": [...],
 *   "total": 5
 * }
 */
router.get('/ciudad/:ciudad', fotoClienteRegionController.obtenerFotosPorCiudad);

// ==========================================
// Rutas protegidas (solo administradores)
// ==========================================

/**
 * @route   POST /api/fotos-clientes-region
 * @desc    Crear nueva foto de cliente por región
 * @access  Privado (Admin)
 * @headers Authorization: Bearer <token>
 * @body    multipart/form-data
 * 
 * @formData {
 *   "imagen": <archivo>,
 *   "ciudad": "Buenos Aires",
 *   "provincia": "Buenos Aires",
 *   "pais": "Argentina",
 *   "latitud": "-34.6037",
 *   "longitud": "-58.3816",
 *   "radioKm": "50",
 *   "textoDescriptivo": "Juan y María, de Buenos Aires",
 *   "titulo": "Cliente satisfecho en Buenos Aires",
 *   "descripcion": "Entrega de Subaru Forester 2024",
 *   "orden": "0",
 *   "activo": "true"
 * }
 * 
 * @response {
 *   "mensaje": "Foto de región creada exitosamente",
 *   "foto": {
 *     "id": 1,
 *     "ciudad": "Buenos Aires",
 *     "provincia": "Buenos Aires",
 *     "pais": "Argentina",
 *     "latitud": "-34.6037",
 *     "longitud": "-58.3816",
 *     "radioKm": 50,
 *     "urlImagen": "https://res.cloudinary.com/.../imagen.jpg",
 *     "publicIdCloudinary": "fotos-clientes-regiones/abc123",
 *     "textoDescriptivo": "Juan y María, de Buenos Aires",
 *     "titulo": "Cliente satisfecho en Buenos Aires",
 *     "descripcion": "Entrega de Subaru Forester 2024",
 *     "orden": 0,
 *     "activo": true,
 *     "createdAt": "2024-11-04T14:30:00.000Z",
 *     "updatedAt": "2024-11-04T14:30:00.000Z"
 *   }
 * }
 */
router.post(
  '/',
  verificarToken,
  upload.single('imagen'),
  fotoClienteRegionController.crearFotoRegion
);

/**
 * @route   GET /api/fotos-clientes-region
 * @desc    Obtener todas las fotos (para panel admin)
 * @access  Privado (Admin)
 * @headers Authorization: Bearer <token>
 * 
 * @response {
 *   "fotos": [...],
 *   "total": 10
 * }
 */
router.get(
  '/',
  verificarToken,
  fotoClienteRegionController.obtenerTodasLasFotos
);

/**
 * @route   GET /api/fotos-clientes-region/:id
 * @desc    Obtener una foto por ID
 * @access  Privado (Admin)
 * @headers Authorization: Bearer <token>
 * @params  id: 1
 * 
 * @response {
 *   "foto": {...}
 * }
 */
router.get(
  '/:id',
  verificarToken,
  fotoClienteRegionController.obtenerFotoPorId
);

/**
 * @route   PUT /api/fotos-clientes-region/:id
 * @desc    Actualizar foto de región
 * @access  Privado (Admin)
 * @headers Authorization: Bearer <token>
 * @params  id: 1
 * @body    multipart/form-data (todos los campos opcionales)
 * 
 * @formData {
 *   "imagen": <archivo_opcional>,
 *   "ciudad": "Córdoba",
 *   "textoDescriptivo": "Martín y Laura, de Córdoba",
 *   "radioKm": "75",
 *   "activo": "false"
 * }
 * 
 * @response {
 *   "mensaje": "Foto actualizada exitosamente",
 *   "foto": {...}
 * }
 */
router.put(
  '/:id',
  verificarToken,
  upload.single('imagen'),
  fotoClienteRegionController.actualizarFoto
);

/**
 * @route   DELETE /api/fotos-clientes-region/:id
 * @desc    Eliminar foto (también de Cloudinary)
 * @access  Privado (Admin)
 * @headers Authorization: Bearer <token>
 * @params  id: 1
 * 
 * @response {
 *   "mensaje": "Foto eliminada exitosamente"
 * }
 */
router.delete(
  '/:id',
  verificarToken,
  fotoClienteRegionController.eliminarFoto
);

/**
 * @route   PUT /api/fotos-clientes-region/ciudad/:ciudad/reordenar
 * @desc    Reordenar fotos de una ciudad específica
 * @access  Privado (Admin)
 * @headers Authorization: Bearer <token>
 * @params  ciudad: "Buenos Aires"
 * 
 * @body {
 *   "ordenes": [
 *     { "id": 1, "orden": 0 },
 *     { "id": 2, "orden": 1 },
 *     { "id": 3, "orden": 2 }
 *   ]
 * }
 * 
 * @response {
 *   "mensaje": "Orden actualizado exitosamente",
 *   "total": 3
 * }
 */
router.put(
  '/ciudad/:ciudad/reordenar',
  verificarToken,
  fotoClienteRegionController.reordenarFotos
);

module.exports = router;