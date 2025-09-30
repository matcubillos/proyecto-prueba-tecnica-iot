import { Module } from '@nestjs/common';
import { DeviceMetricsService } from './device-metrics.service';
import { DeviceMetricsController } from './device-metrics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceMetric } from './entities/device-metric.entity';
import { DeviceGateway } from '../devices/device.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceMetric])],
  controllers: [DeviceMetricsController],
  providers: [DeviceMetricsService, DeviceGateway],
  exports: [DeviceMetricsService]
})
export class DeviceMetricsModule {}
