const express = require('express');
const router = express.Router();
const marcaController = require('../controllers/marcaController');
const { verificarToken } = require('../middlewares/authMiddleware');
const { validarMarca, validarId } = require('../middlewares/validationMiddleware');
const { upload } = require('../utils/cloudinary');

/**
 * @route   GET /api/marcas
 * @desc    Obtener todas las marcas
 * @access  Público
 * @query   ?activa=true (opcional - filtrar por activas)
 * 
 * @response {
 *   "marcas": [
 *     {
 *       "id": 1,
 *       "nombre": "Toyota",
 *       "logo": "https://res.cloudinary.com/.../logo.jpg",
 *       "descripcion": "Marca japonesa de automóviles",
 *       "slug": "toyota",
 *       "activa": true,
 *       "orden": 1,
 *       "colorPrimario": "#EB0A1E",
 *       "colorSecundario": "#000000"
 *     }
 *   ],
 *   "total": 1
 * }
 */
router.get('/', marcaController.obtenerMarcas);

/**
 * @route   GET /api/marcas/:id
 * @desc    Obtener marca por ID
 * @access  Público
 * @params  id: 1
 * 
 * @response {
 *   "marca": {
 *     "id": 1,
 *     "nombre": "Toyota",
 *     "logo": "https://res.cloudinary.com/.../logo.jpg",
 *     "descripcion": "Marca japonesa de automóviles",
 *     "slug": "toyota",
 *     "activa": true,
 *     "orden": 1,
 *     "colorPrimario": "#EB0A1E",
 *     "colorSecundario": "#000000",
 *     "vehiculos": [
 *       {
 *         "id": 1,
 *         "modelo": "Corolla",
 *         "version": "XEI 2.0",
 *         "año": 2024,
 *         "precio": "25000000.00",
 *         "slug": "toyota-corolla-xei-2024"
 *       }
 *     ]
 *   }
 * }
 */
router.get('/:id', validarId, marcaController.obtenerMarcaPorId);

/**
 * @route   GET /api/marcas/slug/:slug
 * @desc    Obtener marca por slug
 * @access  Público
 * @params  slug: "toyota"
 * 
 * @response {
 *   "marca": {
 *     "id": 1,
 *     "nombre": "Toyota",
 *     "logo": "https://res.cloudinary.com/.../logo.jpg",
 *     "descripcion": "Marca japonesa de automóviles",
 *     "slug": "toyota",
 *     "activa": true,
 *     "orden": 1,
 *     "colorPrimario": "#EB0A1E",
 *     "colorSecundario": "#000000",
 *     "vehiculos": [...]
 *   }
 * }
 */
router.get('/slug/:slug', marcaController.obtenerMarcaPorSlug);

/**
 * @route   POST /api/marcas
 * @desc    Crear nueva marca
 * @access  Privado
 * @headers Authorization: Bearer <token>
 * @body    multipart/form-data
 * 
 * @formData {
 *   "nombre": "Toyota",
 *   "slug": "toyota",
 *   "descripcion": "Marca japonesa de automóviles",
 *   "activa": true,
 *   "orden": 1,
 *   "colorPrimario": "#EB0A1E",
 *   "colorSecundario": "#000000",
 *   "logo": <archivo_imagen>  // Opcional
 * }
 * 
 * @response {
 *   "mensaje": "Marca creada exitosamente",
 *   "marca": {
 *     "id": 1,
 *     "nombre": "Toyota",
 *     "logo": "https://res.cloudinary.com/.../logo.jpg",
 *     "descripcion": "Marca japonesa de automóviles",
 *     "slug": "toyota",
 *     "activa": true,
 *     "orden": 1,
 *     "colorPrimario": "#EB0A1E",
 *     "colorSecundario": "#000000",
 *     "createdAt": "2024-11-04T14:30:00.000Z",
 *     "updatedAt": "2024-11-04T14:30:00.000Z"
 *   }
 * }
 */
router.post(
  '/',
  verificarToken,
  upload.single('logo'),
  validarMarca,
  marcaController.crearMarca
);

/**
 * @route   PUT /api/marcas/:id
 * @desc    Actualizar marca
 * @access  Privado
 * @headers Authorization: Bearer <token>
 * @params  id: 1
 * @body    multipart/form-data
 * 
 * @formData {
 *   "nombre": "Toyota Motor Corporation",
 *   "slug": "toyota",
 *   "descripcion": "Marca japonesa líder en automóviles",
 *   "activa": true,
 *   "orden": 1,
 *   "colorPrimario": "#EB0A1E",
 *   "colorSecundario": "#000000",
 *   "logo": <archivo_imagen>  // Opcional - si se envía reemplaza el anterior
 * }
 * 
 * @response {
 *   "mensaje": "Marca actualizada exitosamente",
 *   "marca": {
 *     "id": 1,
 *     "nombre": "Toyota Motor Corporation",
 *     "logo": "https://res.cloudinary.com/.../logo-nuevo.jpg",
 *     "descripcion": "Marca japonesa líder en automóviles",
 *     "slug": "toyota",
 *     "activa": true,
 *     "orden": 1,
 *     "colorPrimario": "#EB0A1E",
 *     "colorSecundario": "#000000",
 *     "updatedAt": "2024-11-04T15:00:00.000Z"
 *   }
 * }
 */
router.put(
  '/:id',
  verificarToken,
  validarId,
  upload.single('logo'),
  validarMarca,
  marcaController.actualizarMarca
);

/**
 * @route   DELETE /api/marcas/:id
 * @desc    Eliminar marca
 * @access  Privado
 * @headers Authorization: Bearer <token>
 * @params  id: 1
 * 
 * @response {
 *   "mensaje": "Marca eliminada exitosamente"
 * }
 * 
 * @error {
 *   "error": "No se puede eliminar la marca porque tiene vehículos asociados"
 * }
 */
router.delete('/:id', verificarToken, validarId, marcaController.eliminarMarca);

module.exports = router;
