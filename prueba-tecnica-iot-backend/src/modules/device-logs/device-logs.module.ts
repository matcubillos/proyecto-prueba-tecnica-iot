import { Module } from '@nestjs/common';
import { DeviceLogsService } from './device-logs.service';
import { DeviceLogsController } from './device-logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceLog } from './entities/device-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceLog])],
  controllers: [DeviceLogsController],
  providers: [DeviceLogsService],
  exports: [DeviceLogsService],
})
export class DeviceLogsModule {}
