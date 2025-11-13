# API Backend - Sistema de Concesionaria

Backend desarrollado con Node.js, Express, PostgreSQL y Sequelize para un sistema de gestión de concesionaria de autos.

## 🚀 Características

- ✅ Gestión completa de marcas de vehículos
- ✅ CRUD de vehículos con múltiples imágenes y videos
- ✅ Sistema de características asociadas a vehículos
- ✅ Upload de imágenes y videos a Cloudinary
- ✅ Autenticación JWT
- ✅ Filtros y búsqueda de vehículos
- ✅ API RESTful bien documentada
- ✅ Validaciones y manejo de errores

## 📋 Requisitos previos

- Node.js >= 16.x
- PostgreSQL >= 13.x
- Cuenta de Cloudinary (gratuita)

## 🔧 Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repo>
cd concesionaria-backend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copiar el archivo `.env.example` a `.env` y configurar las variables:

```bash
cp .env.example .env
```

Editar `.env` con tus valores:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=concesionaria_db
DB_USER=postgres
DB_PASSWORD=tu_password

# JWT
JWT_SECRET=tu_secret_super_secreto_cambialo_en_produccion
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Frontend URL (para CORS)
FRONTEND_URL=http://localhost:5173
```

### 4. Configurar Cloudinary

1. Crear cuenta gratuita en [Cloudinary](https://cloudinary.com/)
2. Ir al Dashboard y copiar:
   - Cloud Name
   - API Key
   - API Secret
3. Pegar los valores en el archivo `.env`

### 5. Crear base de datos

```bash
# Entrar a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE concesionaria_db;

# Salir
\q
```

### 6. Ejecutar migraciones

```bash
npm run migrate
```

### 7. Ejecutar seeders (opcional pero recomendado)

Esto creará:
- Usuario admin (email: admin@concesionaria.com, password: admin123)
- 50+ características comunes

```bash
npm run seed
```

### 8. Iniciar servidor

**Desarrollo:**
```bash
npm run dev
```

**Producción:**
```bash
npm start
```

El servidor estará corriendo en `http://localhost:3000`

## 📚 Estructura del proyecto

```
concesionaria-backend/
├── config/
│   └── database.js          # Configuración de Sequelize
├── controllers/             # Lógica de negocio
│   ├── authController.js
│   ├── marcaController.js
│   ├── vehiculoController.js
│   └── caracteristicaController.js
├── middlewares/             # Middlewares personalizados
│   ├── authMiddleware.js
│   └── validationMiddleware.js
├── migrations/              # Migraciones de base de datos
├── models/                  # Modelos de Sequelize
│   ├── index.js
│   ├── Usuario.js
│   ├── Marca.js
│   ├── Vehiculo.js
│   ├── ImagenVehiculo.js
│   ├── VideoVehiculo.js
│   ├── Caracteristica.js
│   └── VehiculoCaracteristica.js
├── routes/                  # Definición de rutas
│   ├── index.js
│   ├── authRoutes.js
│   ├── marcaRoutes.js
│   ├── vehiculoRoutes.js
│   └── caracteristicaRoutes.js
├── seeders/                 # Datos iniciales
├── utils/                   # Utilidades
│   ├── cloudinary.js
│   └── helpers.js
├── .env.example
├── .sequelizerc
├── package.json
├── server.js
└── README.md
```

## 🔌 API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/auth/login` | Login de usuario | No |
| GET | `/api/auth/perfil` | Obtener perfil | Sí |
| GET | `/api/auth/verificar` | Verificar token | Sí |

### Marcas

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/marcas` | Listar todas | No |
| GET | `/api/marcas/:id` | Obtener por ID | No |
| GET | `/api/marcas/slug/:slug` | Obtener por slug | No |
| POST | `/api/marcas` | Crear marca | Sí |
| PUT | `/api/marcas/:id` | Actualizar marca | Sí |
| DELETE | `/api/marcas/:id` | Eliminar marca | Sí |

### Vehículos

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/vehiculos` | Listar con filtros | No |
| GET | `/api/vehiculos/:id` | Obtener por ID | No |
| GET | `/api/vehiculos/slug/:slug` | Obtener por slug | No |
| POST | `/api/vehiculos` | Crear vehículo | Sí |
| PUT | `/api/vehiculos/:id` | Actualizar vehículo | Sí |
| DELETE | `/api/vehiculos/:id` | Eliminar vehículo | Sí |
| POST | `/api/vehiculos/:id/imagenes` | Agregar imágenes | Sí |
| DELETE | `/api/vehiculos/imagenes/:imagenId` | Eliminar imagen | Sí |
| POST | `/api/vehiculos/:id/videos` | Agregar video | Sí |
| DELETE | `/api/vehiculos/videos/:videoId` | Eliminar video | Sí |
| POST | `/api/vehiculos/:id/caracteristicas` | Asignar características | Sí |

### Características

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/caracteristicas` | Listar todas | No |
| GET | `/api/caracteristicas/:id` | Obtener por ID | No |
| POST | `/api/caracteristicas` | Crear característica | Sí |
| PUT | `/api/caracteristicas/:id` | Actualizar | Sí |
| DELETE | `/api/caracteristicas/:id` | Eliminar | Sí |

## 🔐 Autenticación

Para endpoints protegidos, incluir el token JWT en el header:

```
Authorization: Bearer <tu_token_jwt>
```

## 📝 Ejemplos de uso

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@concesionaria.com",
  "password": "admin123"
}
```

### Crear marca

```bash
POST /api/marcas
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "nombre": "Toyota",
  "slug": "toyota",
  "descripcion": "Marca japonesa de automóviles",
  "activa": true,
  "orden": 1,
  "colorPrimario": "#EB0A1E",
  "colorSecundario": "#000000",
  "logo": <archivo_imagen>
}
```

### Crear vehículo

```bash
POST /api/vehiculos
Authorization: Bearer <token>
Content-Type: application/json

{
  "marcaId": 1,
  "modelo": "Corolla",
  "version": "XEI 2.0",
  "año": 2024,
  "precio": 25000000.00,
  "categoria": "sedan",
  "stock": 5,
  "disponible": true,
  "destacado": false,
  "motor": "2.0L",
  "combustible": "nafta",
  "transmision": "automatica",
  "traccion": "delantera",
  "puertas": 4,
  "pasajeros": 5,
  "cilindrada": "2000cc",
  "potencia": "170 CV",
  "torque": "210 Nm",
  "descripcionCorta": "El sedán más vendido del mundo",
  "descripcionCompleta": "Descripción completa del vehículo...",
  "slug": "toyota-corolla-xei-2024"
}
```

### Agregar imágenes a vehículo

```bash
POST /api/vehiculos/1/imagenes
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "imagenes": [<archivo1>, <archivo2>, <archivo3>],
  "esPrincipal": true,
  "orden": 0
}
```

### Agregar video a vehículo

```bash
POST /api/vehiculos/1/videos
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "video": <archivo_video>,
  "titulo": "Test drive Toyota Corolla 2024",
  "descripcion": "Video de prueba del vehículo",
  "esPrincipal": true,
  "orden": 0
}
```

### Filtrar vehículos

```bash
GET /api/vehiculos?marcaId=1&categoria=sedan&combustible=nafta&precioMin=20000000&precioMax=30000000&disponible=true&ordenar=precio-asc
```

## 🗄️ Modelo de datos

### Relaciones

- **Marca** → hasMany → **Vehiculo**
- **Vehiculo** → belongsTo → **Marca**
- **Vehiculo** → hasMany → **ImagenVehiculo**
- **Vehiculo** → hasMany → **VideoVehiculo**
- **Vehiculo** ↔ belongsToMany ↔ **Caracteristica** (a través de VehiculoCaracteristica)

## 🛠️ Scripts disponibles

```bash
npm start          # Iniciar servidor en producción
npm run dev        # Iniciar servidor en desarrollo con nodemon
npm run migrate    # Ejecutar migraciones
npm run migrate:undo  # Revertir última migración
npm run seed       # Ejecutar seeders
npm run seed:undo  # Revertir seeders
```

## 📦 Dependencias principales

- **express**: Framework web
- **sequelize**: ORM para PostgreSQL
- **pg**: Driver de PostgreSQL
- **jsonwebtoken**: Autenticación JWT
- **bcryptjs**: Encriptación de passwords
- **cloudinary**: Almacenamiento de imágenes/videos
- **multer**: Upload de archivos
- **cors**: Cross-origin resource sharing
- **helmet**: Seguridad HTTP headers
- **morgan**: Logger HTTP

## 🔒 Seguridad

- Passwords hasheados con bcrypt
- Tokens JWT con expiración configurable
- Validación de datos en backend
- Headers de seguridad con Helmet
- Sanitización de inputs
- Rate limiting recomendado para producción

## 🚀 Deployment

### Variables de entorno en producción

Asegurarse de configurar todas las variables en el servidor de producción.

### PostgreSQL en producción

Recomendaciones:
- Render PostgreSQL
- Supabase
- Railway
- DigitalOcean Managed Database

### Hosting del backend

Recomendaciones:
- Render
- Railway
- Fly.io
- Heroku
- DigitalOcean App Platform

## 📞 Soporte

Si tienes problemas:
1. Verificar que PostgreSQL esté corriendo
2. Verificar credenciales de base de datos
3. Verificar credenciales de Cloudinary
4. Revisar logs del servidor
5. Verificar que todas las migraciones se ejecutaron

## 📄 Licencia

ISC

## 👨‍💻 Credenciales por defecto

**Email:** admin@concesionaria.com  
**Password:** admin123

⚠️ **IMPORTANTE:** Cambiar estas credenciales en producción.

---

Desarrollado con ❤️ para gestión de concesionarias
