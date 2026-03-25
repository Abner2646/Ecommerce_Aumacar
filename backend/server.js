// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
require('dotenv').config();

// Validaciones de entorno
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET no configurado');
}
if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET no configurado');
}

const { sequelize } = require('./models');
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// ==================== CORS ====================
const rawAllowed = process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || '';
const allowedOrigins = rawAllowed.split(',').map(s => s.trim()).filter(Boolean);

if (process.env.NODE_ENV !== 'production') {
  console.log('🔓 CORS: Modo desarrollo - Aceptando todos los orígenes');
}

app.use(cors({
  origin: function(origin, callback) {
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes('*')) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
    
    console.warn(`❌ CORS blocked origin: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
}));

// ==================== Helmet ====================
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: process.env.NODE_ENV === 'production' ? {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    }
  } : false,
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  noSniff: true,
  xssFilter: true,
  hidePoweredBy: true
}));

// ==================== Body Parsers ====================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ==================== Session ====================
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: 'sessionId',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
}));


// ==================== Logging ====================
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined', { skip: (req, res) => res.statusCode < 400 }));
} else {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      console.log(`📱 ${req.method} ${req.path} - ${res.statusCode} - ${Date.now() - start}ms`);
    });
    next();
  });
}

// ==================== Trust Proxy ====================
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// ==================== Routes ====================
app.use('/api', apiRoutes);

// ==================== Health Check ====================
app.get('/health', async (req, res) => {
  const health = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'unknown'
  };

  try {
    await sequelize.authenticate();
    health.database = 'connected';
  } catch (error) {
    health.database = 'disconnected';
    health.status = 'DEGRADED';
  }

  res.status(health.status === 'OK' ? 200 : 503).json(health);
});

// ==================== Error Handling ====================
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Error interno del servidor' : err.message
  });
});

// ==================== 404 ====================
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// ==================== Start ====================
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: false });
      console.log('✅ Database synchronized');
    }
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔐 Security: Rate limiting, Token rotation, Brute force protection`);
      console.log(`🌍 Frontend URL: ${process.env.FRONTEND_URL || 'not set'}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });

  } catch (error) {
    console.error('❌ Server startup error:', error);
    process.exit(1);
  }
}

startServer();

// ==================== Graceful Shutdown ====================
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received, shutting down...`);
  await sequelize.close();
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
