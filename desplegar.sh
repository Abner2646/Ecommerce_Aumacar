#!/bin/bash

echo "🚀 Iniciando despliegue automático..."

# 1. Bajar últimos cambios
echo "📥 Actualizando código desde GitHub..."
git pull origin main

# 2. Reconstruir y levantar contenedores
# Esto activará automáticamente el script init-db.sh dentro del contenedor
echo "🐳 Reconstruyendo contenedores Docker..."
docker compose up -d --build

echo "✅ Despliegue completado con éxito."
echo "📡 El sistema está aplicando migraciones y seeders en segundo plano..."
