import { DataSource } from 'typeorm';
import { seedDevices } from './device.seed';

export async function runSeed(dataSource: DataSource) {
  try {
    //esperar a que la conexion este lista
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
      console.log('Conexión a la base de datos establecida para seeding.');
    }

    await seedDevices(dataSource);

    console.log('Seeding completado exitosamente.');
  } catch (error) {
    console.error('Error durante el seeding:', error);
  }
}