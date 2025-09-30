import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeviceLogsService } from './device-logs.service';
import { CreateDeviceLogDto } from './dto/create-device-log.dto';
import { UpdateDeviceLogDto } from './dto/update-device-log.dto';

@Controller('device-logs')
export class DeviceLogsController {
  constructor(private readonly deviceLogsService: DeviceLogsService) {}

  @Post('/')
  async create(@Body() createDeviceLogDto: CreateDeviceLogDto) {
    try {
      const deviceLog = await this.deviceLogsService.create(createDeviceLogDto);
      return ({
        message: 'Device log created successfully',
        deviceLog
      })
    } catch (error) {
      return({
        success: false,
        message: error.message,
        deviceLog: null
      })
    }
  }

  @Get('/')
  async findAll() {
    try {
      const deviceLogs = await this.deviceLogsService.findAll();
      return ({
        message: 'Device logs retrieved successfully',
        deviceLogs
      })
    } catch (error) {
      return({
        success: false,
        message: error.message,
        deviceLogs: []
      })
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceLogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceLogDto: UpdateDeviceLogDto) {
    return this.deviceLogsService.update(+id, updateDeviceLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceLogsService.remove(+id);
  }
}
