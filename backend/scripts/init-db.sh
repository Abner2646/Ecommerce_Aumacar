#!/bin/sh

echo "🚀 Iniciando proceso de configuración de Base de Datos..."

# 1. Ejecutar Migraciones
echo "📌 Ejecutando migraciones..."
npx sequelize-cli db:migrate

# 2. Ejecutar Seeders (Semillas)
# Usamos || true para que si los datos ya existen, el servidor inicie igual
echo "🌱 Intentando cargar datos iniciales (Seeders)..."
npx sequelize-cli db:seed:all || echo "⚠️ Algunos seeders ya fueron aplicados o hubo un conflicto menor. Continuando..."

echo "✅ Configuración de DB completada. Iniciando servidor..."

# 3. Iniciar la aplicación
exec node server.js
