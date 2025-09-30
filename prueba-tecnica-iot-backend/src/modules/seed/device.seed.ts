import { DataSource } from 'typeorm';
import { Device } from '../devices/entities/device.entity';
import path from 'path';
import fs from 'fs';

export async function seedDevices(dataSource: DataSource) {
  const deviceRepository = dataSource.getRepository(Device);

  // verificar si ya hay datos para evitar duplicados
  if (await deviceRepository.count() > 0) {
    console.log('La tabla tbl_device ya tiene datos. Saltando seeding.');
    return;
  }

  const filePath = path.join(process.cwd(), 'seeds', 'devices.json');

  console.log('Leyendo archivo de seed:', filePath);

  const raw = fs.readFileSync(filePath, 'utf-8');
  const devices = JSON.parse(raw);

  await deviceRepository.save(devices);
  console.log('Seeding de tbl_device completado.');
}