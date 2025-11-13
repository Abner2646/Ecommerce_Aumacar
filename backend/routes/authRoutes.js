const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verificarToken } = require('../middlewares/authMiddleware');
const { validarLogin, validarRegistro } = require('../middlewares/validationMiddleware');

/**
 * @route   POST /api/auth/register
 * @desc    Registro de nuevo usuario
 * @access  Público
 * 
 * @body {
 *   "email": "nuevo@concesionaria.com",
 *   "password": "password123",
 *   "nombre": "Juan",
 *   "apellido": "Pérez"  // Opcional
 * }
 * 
 * @response {
 *   "mensaje": "Usuario registrado exitosamente",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "usuario": {
 *     "id": 2,
 *     "email": "nuevo@concesionaria.com",
 *     "nombre": "Juan",
 *     "apellido": "Pérez"
 *   }
 * }
 */
router.post('/register', validarRegistro, authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Login de usuario
 * @access  Público
 * 
 * @body {
 *   "email": "admin@concesionaria.com",
 *   "password": "admin123"
 * }
 * 
 * @response {
 *   "mensaje": "Login exitoso",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "usuario": {
 *     "id": 1,
 *     "email": "admin@concesionaria.com",
 *     "nombre": "Administrador",
 *     "apellido": "Principal"
 *   }
 * }
 */
router.post('/login', validarLogin, authController.login);

/**
 * @route   GET /api/auth/perfil
 * @desc    Obtener perfil del usuario autenticado
 * @access  Privado
 * @headers Authorization: Bearer <token>
 * 
 * @response {
 *   "usuario": {
 *     "id": 1,
 *     "email": "admin@concesionaria.com",
 *     "nombre": "Administrador",
 *     "apellido": "Principal",
 *     "activo": true,
 *     "ultimoAcceso": "2024-11-04T14:30:00.000Z",
 *     "createdAt": "2024-01-01T00:00:00.000Z",
 *     "updatedAt": "2024-11-04T14:30:00.000Z"
 *   }
 * }
 */
router.get('/perfil', verificarToken, authController.obtenerPerfil);

/**
 * @route   GET /api/auth/verificar
 * @desc    Verificar si el token es válido
 * @access  Privado
 * @headers Authorization: Bearer <token>
 * 
 * @response {
 *   "autenticado": true,
 *   "usuario": {
 *     "id": 1,
 *     "email": "admin@concesionaria.com",
 *     "nombre": "Administrador",
 *     "apellido": "Principal",
 *     "activo": true
 *   }
 * }
 */
router.get('/verificar', verificarToken, authController.verificarAuth);

module.exports = router;
