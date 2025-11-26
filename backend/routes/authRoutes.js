// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verificarToken } = require('../middlewares/authMiddleware');
const { validarLogin, validarRegistro, validarCambioPassword, validarResetPassword } = require('../middlewares/validationMiddleware');

// ==================== AUTENTICACIÓN ====================

router.post('/register', validarRegistro, authController.register);

router.post('/login', validarLogin, authController.login);


// ==================== PERFIL ====================

router.get('/perfil', verificarToken, authController.obtenerPerfil);

router.get('/verificar', verificarToken, authController.verificarAuth);

module.exports = router;