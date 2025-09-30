import { Module } from '@nestjs/common';
import { DeviceLocationService } from './device_location.service';
import { DeviceLocationController } from './device_location.controller';

@Module({
  controllers: [DeviceLocationController],
  providers: [DeviceLocationService],
})
export class DeviceLocationModule {}
