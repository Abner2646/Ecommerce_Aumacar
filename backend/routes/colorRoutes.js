// routes/colorRoutes.js

const express = require('express');
const router = express.Router();
const colorController = require('../controllers/colorController');
const { verificarToken } = require('../middlewares/authMiddleware');

// ==========================================
// Rutas de colores globales (solo admin)
// ==========================================

// GET /api/colores - Obtener todos los colores
router.get('/', colorController.obtenerColores);

// GET /api/colores/:id - Obtener color por ID
router.get('/:id', colorController.obtenerColorPorId);

// POST /api/colores - Crear nuevo color (admin)
router.post('/', verificarToken, colorController.crearColor);

// PUT /api/colores/:id - Actualizar color (admin)
router.put('/:id', verificarToken, colorController.actualizarColor);

// DELETE /api/colores/:id - Eliminar color (admin)
router.delete('/:id', verificarToken, colorController.eliminarColor);

module.exports = router;