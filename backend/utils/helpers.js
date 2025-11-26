// utils/helpers.js

/**
 * Genera un slug a partir de un texto
 * @param {String} text - Texto a convertir en slug
 * @returns {String} - Slug generado
 */
const generarSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Reemplaza espacios por -
    .replace(/[^\w\-]+/g, '')       // Elimina caracteres no válidos
    .replace(/\-\-+/g, '-')         // Reemplaza múltiples - por uno solo
    .replace(/^-+/, '')             // Elimina - del inicio
    .replace(/-+$/, '');            // Elimina - del final
};

/**
 * Extrae el public_id de una URL de Cloudinary
 * @param {String} url - URL de Cloudinary
 * @returns {String} - Public ID
 */
const extraerPublicId = (url) => {
  if (!url) return null;
  
  const regex = /\/v\d+\/(.+)\./;
  const match = url.match(regex);
  
  return match ? match[1] : null;
};

/**
 * Valida formato de email
 * @param {String} email - Email a validar
 * @returns {Boolean} - true si es válido
 */
const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Construye objeto de filtros para Sequelize
 * @param {Object} query - Query params de la request
 * @returns {Object} - Objeto de filtros
 */
const construirFiltros = (query) => {
  const filtros = {};
  
  if (query.marcaId) filtros.marcaId = query.marcaId;
  if (query.categoria) filtros.categoria = query.categoria;
  if (query.combustible) filtros.combustible = query.combustible;
  if (query.transmision) filtros.transmision = query.transmision;
  if (query.disponible !== undefined) filtros.disponible = query.disponible === 'true';
  if (query.destacado !== undefined) filtros.destacado = query.destacado === 'true';
  
  // Rango de precios
  if (query.precioMin || query.precioMax) {
    filtros.precio = {};
    if (query.precioMin) filtros.precio.$gte = parseFloat(query.precioMin);
    if (query.precioMax) filtros.precio.$lte = parseFloat(query.precioMax);
  }
  
  // Rango de años
  if (query.añoMin || query.añoMax) {
    filtros.año = {};
    if (query.añoMin) filtros.año.$gte = parseInt(query.añoMin);
    if (query.añoMax) filtros.año.$lte = parseInt(query.añoMax);
  }
  
  return filtros;
};

/**
 * Construye opciones de ordenamiento para Sequelize
 * @param {String} ordenar - Campo y dirección (ej: 'precio-asc', 'año-desc')
 * @returns {Array} - Array de ordenamiento
 */
const construirOrden = (ordenar = 'createdAt-desc') => {
  const [campo, direccion] = ordenar.split('-');
  const orden = direccion && direccion.toLowerCase() === 'asc' ? 'ASC' : 'DESC';
  
  const camposValidos = ['precio', 'año', 'modelo', 'createdAt'];
  const campoFinal = camposValidos.includes(campo) ? campo : 'createdAt';
  
  return [[campoFinal, orden]];
};

module.exports = {
  generarSlug,
  extraerPublicId,
  validarEmail,
  construirFiltros,
  construirOrden
};
