const { validarEmail } = require('../utils/helpers');

/**
 * Valida datos de login
 */
const validarLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Email y password son requeridos'
    });
  }

  if (!validarEmail(email)) {
    return res.status(400).json({
      error: 'Email inválido'
    });
  }

  next();
};

/**
 * Valida datos de registro
 */
const validarRegistro = (req, res, next) => {
  const { email, password, nombre } = req.body;

  const errores = [];

  if (!email || email.trim().length === 0) {
    errores.push('El email es requerido');
  } else if (!validarEmail(email)) {
    errores.push('El email no es válido');
  }

  if (!password || password.length < 6) {
    errores.push('La contraseña es requerida y debe tener al menos 6 caracteres');
  }

  if (!nombre || nombre.trim().length < 2) {
    errores.push('El nombre es requerido y debe tener al menos 2 caracteres');
  }

  if (errores.length > 0) {
    return res.status(400).json({
      error: 'Errores de validación',
      detalles: errores
    });
  }

  next();
};

/**
 * Valida datos de marca
 */
const validarMarca = (req, res, next) => {
  const { nombre, slug } = req.body;

  const errores = [];

  if (!nombre || nombre.trim().length < 2) {
    errores.push('El nombre es requerido y debe tener al menos 2 caracteres');
  }

  if (!slug || slug.trim().length < 2) {
    errores.push('El slug es requerido y debe tener al menos 2 caracteres');
  }

  if (slug && !/^[a-z0-9-]+$/.test(slug)) {
    errores.push('El slug solo puede contener letras minúsculas, números y guiones');
  }

  if (errores.length > 0) {
    return res.status(400).json({
      error: 'Errores de validación',
      detalles: errores
    });
  }

  next();
};

/**
 * Valida datos de vehículo
 */
const validarVehiculo = (req, res, next) => {
  const { marcaId, modelo, año, precio, slug } = req.body;

  const errores = [];
/*
  if (!marcaId || isNaN(marcaId)) {
    errores.push('El ID de marca es requerido y debe ser un número');
  }

  if (!modelo || modelo.trim().length < 2) {
    errores.push('El modelo es requerido y debe tener al menos 2 caracteres');
  }

  if (!año || isNaN(año) || año < 2000 || año > 2030) {
    errores.push('El año es requerido y debe estar entre 2000 y 2030');
  }

  if (!precio || isNaN(precio) || precio < 0) {
    errores.push('El precio es requerido y debe ser mayor a 0');
  }

  if (!slug || slug.trim().length < 2) {
    errores.push('El slug es requerido');
  }

  if (slug && !/^[a-z0-9-]+$/.test(slug)) {
    errores.push('El slug solo puede contener letras minúsculas, números y guiones');
  }
*/
  if (errores.length > 0) {
    return res.status(400).json({
      error: 'Errores de validación',
      detalles: errores
    });
  }

  next();
};

/**
 * Valida datos de característica
 */
const validarCaracteristica = (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre || nombre.trim().length < 2) {
    return res.status(400).json({
      error: 'El nombre de la característica es requerido y debe tener al menos 2 caracteres'
    });
  }

  next();
};

/**
 * Valida ID numérico en params
 */
const validarId = (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id) || parseInt(id) < 1) {
    return res.status(400).json({
      error: 'ID inválido'
    });
  }

  next();
};

module.exports = {
  validarLogin,
  validarRegistro,
  validarMarca,
  validarVehiculo,
  validarCaracteristica,
  validarId
};