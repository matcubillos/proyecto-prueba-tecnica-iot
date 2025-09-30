import { Injectable } from '@nestjs/common';
import { CreateDeviceLocationDto } from './dto/create-device_location.dto';
import { UpdateDeviceLocationDto } from './dto/update-device_location.dto';

@Injectable()
export class DeviceLocationService {
  create(createDeviceLocationDto: CreateDeviceLocationDto) {
    return 'This action adds a new deviceLocation';
  }

  findAll() {
    return `This action returns all deviceLocation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deviceLocation`;
  }

  update(id: number, updateDeviceLocationDto: UpdateDeviceLocationDto) {
    return `This action updates a #${id} deviceLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} deviceLocation`;
  }
}
