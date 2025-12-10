-- Migración para agregar columnas multimedia a la tabla marcas
ALTER TABLE marcas
ADD COLUMN fotoPresentacion VARCHAR(500),
ADD COLUMN videoPresentacion VARCHAR(500),
ADD COLUMN videoPortada VARCHAR(500),
ADD COLUMN fotoDelMedio VARCHAR(500);
