const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const marcaRoutes = require('./marcaRoutes');
const vehiculoRoutes = require('./vehiculoRoutes');
const caracteristicaRoutes = require('./caracteristicaRoutes');
const colorRoutes = require('./colorRoutes');
const clientesRoutes = require('./fotoClienteRegionRoutes');

// Rutas
router.use('/auth', authRoutes);
router.use('/marcas', marcaRoutes);
router.use('/vehiculos', vehiculoRoutes);
router.use('/caracteristicas', caracteristicaRoutes);
router.use('/colores', colorRoutes);
router.use('/fotos-clientes-region', clientesRoutes);

// Ruta de prueba
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    mensaje: 'API funcionando correctamente',
    timestamp: new Date()
  });
});

module.exports = router;
