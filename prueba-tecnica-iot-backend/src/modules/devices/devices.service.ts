import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
  ) {}

  create(createDeviceDto: CreateDeviceDto) {
    return 'This action adds a new device';
  }

  async findAll() {
    const findAllDevices = await this.deviceRepository.find({
      //validacion para solo traer dispositivos que esten en uso(ejemplo en caso que el dispotivo haya sido dado de baja, isActive debe ser false)
      where: { DEVICE_IS_ACTIVE: true },
    });
    if (findAllDevices.length === 0) {
      throw new Error('No devices found');
    }
    return findAllDevices;
  }

  async findOneById(id: number) {
    const foundDevice = await this.deviceRepository.findOne({
      where: { DEVICE_ID: id, DEVICE_IS_ACTIVE: true },
    });
    if (!foundDevice) {
      throw new Error(`Device with id ${id} not found`);
    }
    return foundDevice;
  }
  
  async findByType(type: string) {
    const devicesByType = await this.deviceRepository.find({
      where: { DEVICE_TYPE: type, DEVICE_IS_ACTIVE: true },
    });
    if (devicesByType.length === 0) {
      throw new Error(`No devices found for type ${type}`);
    }
    return devicesByType;
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
