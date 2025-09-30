import { Injectable } from '@nestjs/common';
import { CreateDeviceMetricDto } from './dto/create-device-metric.dto';
import { UpdateDeviceMetricDto } from './dto/update-device-metric.dto';
import { In, Repository } from 'typeorm';
import { DeviceMetric } from './entities/device-metric.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceGateway } from '../devices/device.gateway';

@Injectable()
export class DeviceMetricsService {
  constructor(
    @InjectRepository(DeviceMetric)
    private deviceMetricRepository: Repository<DeviceMetric>,
    private deviceGateway: DeviceGateway
  ) {}

  async create(createDeviceMetricDto: CreateDeviceMetricDto) {
    const deviceMetric = await this.deviceMetricRepository.save({
      DEVICE_ID: createDeviceMetricDto.DEVICE_ID,
      METRICS: createDeviceMetricDto.METRICS,
    });
  
    this.deviceGateway.server.emit('metric:new', {
      deviceId: createDeviceMetricDto.DEVICE_ID,
      metric: {
        DEVICE_METRIC_ID: deviceMetric.DEVICE_METRIC_ID,
        DEVICE_ID: deviceMetric.DEVICE_ID,
        METRIC_TIMESTAMP: deviceMetric.METRIC_TIMESTAMP,
        METRICS: deviceMetric.METRICS
      }
    });
  
    if (!deviceMetric) {
      throw new Error('Error creating device metric');
    }
    return deviceMetric;
  }
  async findByDeviceId(deviceId: number) {
    const deviceMetrics = await this.deviceMetricRepository.find({
      where: { DEVICE_ID: deviceId},
      order: { METRIC_TIMESTAMP: 'DESC' },
      take: 2,
    });
    if (deviceMetrics.length === 0) {
      throw new Error(`No device metrics found for device ID ${deviceId}`);
    }
    return deviceMetrics;
  }

  async findHistoricByDeviceId(deviceId: number) {
    const deviceMetrics = await this.deviceMetricRepository.find({
      where: { DEVICE_ID: In([deviceId]) },
      order: { METRIC_TIMESTAMP: 'DESC' },
      take: 20,
    });
    if (deviceMetrics.length === 0) {
      throw new Error(`No historic device metrics found for device ID ${deviceId}`);
    }
    return deviceMetrics;
  }
  findAll() {
    return `This action returns all deviceMetrics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deviceMetric`;
  }

  update(id: number, updateDeviceMetricDto: UpdateDeviceMetricDto) {
    return `This action updates a #${id} deviceMetric`;
  }

  remove(id: number) {
    return `This action removes a #${id} deviceMetric`;
  }
}
