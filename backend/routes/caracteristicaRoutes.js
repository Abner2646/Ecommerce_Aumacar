const express = require('express');
const router = express.Router();
const caracteristicaController = require('../controllers/caracteristicaController');
const { verificarToken } = require('../middlewares/authMiddleware');
const { validarCaracteristica, validarId } = require('../middlewares/validationMiddleware');

/**
 * @route   GET /api/caracteristicas
 * @desc    Obtener todas las características
 * @access  Público
 * @query   ?activa=true (opcional - filtrar por activas)
 * @query   ?tipo=seguridad (opcional - filtrar por tipo: seguridad, confort, tecnologia, exterior, interior, performance)
 * 
 * @response {
 *   "caracteristicas": [
 *     {
 *       "id": 1,
 *       "nombre": "ABS",
 *       "icono": "fa-shield-alt",
 *       "tipo": "seguridad",
 *       "activa": true
 *     },
 *     {
 *       "id": 2,
 *       "nombre": "Aire acondicionado",
 *       "icono": "fa-snowflake",
 *       "tipo": "confort",
 *       "activa": true
 *     }
 *   ],
 *   "total": 2
 * }
 */
router.get('/', caracteristicaController.obtenerCaracteristicas);

/**
 * @route   GET /api/caracteristicas/:id
 * @desc    Obtener característica por ID
 * @access  Público
 * @params  id: 1
 * 
 * @response {
 *   "caracteristica": {
 *     "id": 1,
 *     "nombre": "ABS",
 *     "icono": "fa-shield-alt",
 *     "tipo": "seguridad",
 *     "activa": true,
 *     "createdAt": "2024-01-01T00:00:00.000Z",
 *     "updatedAt": "2024-01-01T00:00:00.000Z"
 *   }
 * }
 */
router.get('/:id', validarId, caracteristicaController.obtenerCaracteristicaPorId);

/**
 * @route   POST /api/caracteristicas
 * @desc    Crear nueva característica
 * @access  Privado
 * @headers Authorization: Bearer <token>
 * 
 * @body {
 *   "nombre": "Control de crucero adaptativo",
 *   "icono": "fa-gauge-high",
 *   "tipo": "tecnologia",
 *   "activa": true
 * }
 * 
 * @response {
 *   "mensaje": "Característica creada exitosamente",
 *   "caracteristica": {
 *     "id": 51,
 *     "nombre": "Control de crucero adaptativo",
 *     "icono": "fa-gauge-high",
 *     "tipo": "tecnologia",
 *     "activa": true,
 *     "createdAt": "2024-11-04T14:30:00.000Z",
 *     "updatedAt": "2024-11-04T14:30:00.000Z"
 *   }
 * }
 */
router.post(
  '/',
  verificarToken,
  validarCaracteristica,
  caracteristicaController.crearCaracteristica
);

/**
 * @route   PUT /api/caracteristicas/:id
 * @desc    Actualizar característica
 * @access  Privado
 * @headers Authorization: Bearer <token>
 * @params  id: 51
 * 
 * @body {
 *   "nombre": "Control de crucero adaptativo con IA",
 *   "icono": "fa-robot",
 *   "tipo": "tecnologia",
 *   "activa": true
 * }
 * 
 * @response {
 *   "mensaje": "Característica actualizada exitosamente",
 *   "caracteristica": {
 *     "id": 51,
 *     "nombre": "Control de crucero adaptativo con IA",
 *     "icono": "fa-robot",
 *     "tipo": "tecnologia",
 *     "activa": true,
 *     "updatedAt": "2024-11-04T15:00:00.000Z"
 *   }
 * }
 */
router.put(
  '/:id',
  verificarToken,
  validarId,
  validarCaracteristica,
  caracteristicaController.actualizarCaracteristica
);

/**
 * @route   DELETE /api/caracteristicas/:id
 * @desc    Eliminar característica
 * @access  Privado
 * @headers Authorization: Bearer <token>
 * @params  id: 51
 * 
 * @response {
 *   "mensaje": "Característica eliminada exitosamente"
 * }
 */
router.delete(
  '/:id',
  verificarToken,
  validarId,
  caracteristicaController.eliminarCaracteristica
);

module.exports = router;
