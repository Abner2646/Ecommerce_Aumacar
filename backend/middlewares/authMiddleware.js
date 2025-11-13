const jwt = require('jsonwebtoken');
const db = require('../models');

/**
 * Middleware para verificar token JWT
 * Acepta token con o sin prefijo "Bearer"
 */
const verificarToken = async (req, res, next) => {
  try {
    // Obtener token del header
    let token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({
        error: 'Acceso denegado. No se proporcionó token de autenticación'
      });
    }

    // Si el token tiene el prefijo "Bearer " o "bearer ", extraerlo
    if (token.startsWith('Bearer ')) {
      token = token.substring(7); // "Bearer " tiene 7 caracteres
    } else if (token.startsWith('bearer ')) {
      token = token.substring(7); // Case insensitive
    }
    // Si no tiene prefijo, asumir que es el token directamente

    // Limpiar espacios en blanco
    token = token.trim();

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar usuario
    const usuario = await db.Usuario.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });

    if (!usuario) {
      return res.status(401).json({
        error: 'Token inválido. Usuario no encontrado'
      });
    }

    if (!usuario.activo) {
      return res.status(401).json({
        error: 'Usuario inactivo'
      });
    }

    // Agregar usuario al request
    req.usuario = usuario;
    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Token inválido'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expirado'
      });
    }
    
    return res.status(500).json({
      error: 'Error al verificar autenticación'
    });
  }
};

module.exports = {
  verificarToken
};