const jwt = require('jsonwebtoken');
const db = require('../models');

/**
 * Registro de nuevo usuario
 */
const register = async (req, res) => {
  try {
    const { email, password, nombre, apellido } = req.body;

    // Verificar si el email ya existe
    const usuarioExistente = await db.Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).json({
        error: 'El email ya está registrado'
      });
    }

    // Crear usuario (el password se hashea automáticamente en el modelo)
    const usuario = await db.Usuario.create({
      email,
      password,
      nombre,
      apellido: apellido || null,
      activo: true
    });

    // Generar token JWT
    const token = jwt.sign(
      { 
        id: usuario.id,
        email: usuario.email
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(201).json({
      mensaje: 'Usuario registrado exitosamente',
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      error: 'Error al registrar usuario'
    });
  }
};

/**
 * Login de usuario
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const usuario = await db.Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      });
    }

    // Verificar si está activo
    if (!usuario.activo) {
      return res.status(401).json({
        error: 'Usuario inactivo'
      });
    }

    // Verificar password
    const passwordValido = await usuario.verificarPassword(password);

    if (!passwordValido) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      });
    }

    // Actualizar último acceso
    await usuario.update({ ultimoAcceso: new Date() });

    // Generar token JWT
    const token = jwt.sign(
      { 
        id: usuario.id,
        email: usuario.email
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.json({
      mensaje: 'Login exitoso',
      token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      error: 'Error al procesar login'
    });
  }
};

/**
 * Obtener perfil del usuario autenticado
 */
const obtenerPerfil = async (req, res) => {
  try {
    res.json({
      usuario: req.usuario
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({
      error: 'Error al obtener perfil'
    });
  }
};

/**
 * Verificar si el token es válido
 */
const verificarAuth = async (req, res) => {
  try {
    res.json({
      autenticado: true,
      usuario: req.usuario
    });
  } catch (error) {
    console.error('Error al verificar autenticación:', error);
    res.status(500).json({
      error: 'Error al verificar autenticación'
    });
  }
};

module.exports = {
  register,
  login,
  obtenerPerfil,
  verificarAuth
};
