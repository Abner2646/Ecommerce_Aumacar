'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    await queryInterface.bulkInsert('marcas', [
      {
        nombre: 'Toyota',
        slug: 'toyota',
        descripcion: 'Calidad japonesa con foco en confiabilidad y eficiencia para uso urbano y familiar.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg',
        activa: true,
        orden: 1,
        colorPrimario: '#EB0A1E',
        colorSecundario: '#111111',
        plantilla: 1,
        fotoPresentacion: 'https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?auto=format&fit=crop&w=1600&q=80',
        videoPresentacion: null,
        videoPortada: null,
        fotoDelMedio: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1600&q=80',
        createdAt: now,
        updatedAt: now
      },
      {
        nombre: 'Ford',
        slug: 'ford',
        descripcion: 'Potencia, tecnologia y versatilidad para trabajo, ruta y aventura.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg',
        activa: true,
        orden: 2,
        colorPrimario: '#003478',
        colorSecundario: '#1A1A1A',
        plantilla: 2,
        fotoPresentacion: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=80',
        videoPresentacion: null,
        videoPortada: null,
        fotoDelMedio: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=80',
        createdAt: now,
        updatedAt: now
      },
      {
        nombre: 'Chevrolet',
        slug: 'chevrolet',
        descripcion: 'Diseno moderno y rendimiento equilibrado para cada tipo de conductor.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Chevrolet_logo.svg',
        activa: true,
        orden: 3,
        colorPrimario: '#C7A008',
        colorSecundario: '#111111',
        plantilla: 3,
        fotoPresentacion: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
        videoPresentacion: null,
        videoPortada: null,
        fotoDelMedio: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1600&q=80',
        createdAt: now,
        updatedAt: now
      },
      {
        nombre: 'Volkswagen',
        slug: 'volkswagen',
        descripcion: 'Ingenieria alemana con confort, seguridad y experiencia de manejo superior.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Volkswagen_logo_2019.svg',
        activa: true,
        orden: 4,
        colorPrimario: '#001E50',
        colorSecundario: '#0D0D0D',
        plantilla: 1,
        fotoPresentacion: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1600&q=80',
        videoPresentacion: null,
        videoPortada: null,
        fotoDelMedio: 'https://images.unsplash.com/photo-1549399542-7e82138f4cf6?auto=format&fit=crop&w=1600&q=80',
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('marcas', {
      slug: ['toyota', 'ford', 'chevrolet', 'volkswagen']
    });
  }
};
