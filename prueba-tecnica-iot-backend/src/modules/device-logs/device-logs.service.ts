import { Injectable } from '@nestjs/common';
import { CreateDeviceLogDto } from './dto/create-device-log.dto';
import { UpdateDeviceLogDto } from './dto/update-device-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceLog } from './entities/device-log.entity';
@Injectable()
export class DeviceLogsService {
  constructor(
    @InjectRepository(DeviceLog)
    private deviceLogRepository: Repository<DeviceLog>,
  ){

  }

  async create(createDeviceLogDto: CreateDeviceLogDto) {
    const deviceLog = this.deviceLogRepository.save(createDeviceLogDto);
    if (!deviceLog) {
      throw new Error('Error creating device log');
    }
    return deviceLog;
  }

  async findAll() {
    const deviceLogs = await this.deviceLogRepository.find({
      order: { LOG_TIMESTAMP: 'DESC' },
      take: 20,
    });
    if (deviceLogs.length === 0) {
      throw new Error('No device logs found');
    }
    return deviceLogs;
  }

  findOne(id: number) {
    return `This action returns a #${id} deviceLog`;
  }

  update(id: number, updateDeviceLogDto: UpdateDeviceLogDto) {
    return `This action updates a #${id} deviceLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} deviceLog`;
  }
}
