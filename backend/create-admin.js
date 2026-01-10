// Script temporal para crear usuario administrador
const db = require('./models');

async function createAdmin() {
  try {
    // Conectar a la base de datos
    await db.sequelize.authenticate();
    console.log('Conexión establecida');

    // Eliminar usuario si existe
    await db.Usuario.destroy({ where: { email: 'aumacar@gmail.com' } });
    console.log('Usuario anterior eliminado (si existía)');

    // Crear nuevo usuario (los hooks se ejecutarán automáticamente)
    const usuario = await db.Usuario.create({
      email: 'aumacar@gmail.com',
      password: 'aumacar123',
      nombre: 'Administrador',
      apellido: 'Aumacar',
      activo: true
    });

    console.log('✅ Usuario administrador creado exitosamente');
    console.log('Email: aumacar@gmail.com');
    console.log('Password: aumacar123');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAdmin();
