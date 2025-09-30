import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeviceMetricsService } from './device-metrics.service';
import { CreateDeviceMetricDto } from './dto/create-device-metric.dto';
import { UpdateDeviceMetricDto } from './dto/update-device-metric.dto';

@Controller('device-metrics')
export class DeviceMetricsController {
  constructor(private readonly deviceMetricsService: DeviceMetricsService) {}

  @Post('/')
  async create(@Body() createDeviceMetricDto: CreateDeviceMetricDto) {
    try {
      const deviceMetric = await this.deviceMetricsService.create(createDeviceMetricDto);
      return ({
        message: 'Device metric created successfully',
        deviceMetric
      })
    } catch (error) {
      return({
        success: false,
        message: error.message,
        deviceMetric: null
      })
    }
  }

  @Get('device/:deviceId')
  async findByDeviceId(@Param('deviceId') deviceId: string) {
    try {
      const deviceMetrics = await this.deviceMetricsService.findByDeviceId(+deviceId);
      return ({
        message: 'Device metrics retrieved successfully',
        deviceMetrics
      })
    } catch (error) {
      return({
        success: false,
        message: error.message,
        deviceMetrics: []
      })
    }
  }
  @Get('/device/historic/:deviceId')
  async findHistoricByDeviceId(@Param('deviceId') deviceId: string) {
    try {
      const deviceMetrics = await this.deviceMetricsService.findHistoricByDeviceId(+deviceId);
      return ({
        message: 'Historic device metrics retrieved successfully',
        deviceMetrics
      })
    } catch (error) {
      return({
        success: false,
        message: error.message,
        deviceMetrics: []
      })
    }
  }

  @Get()
  findAll() {
    return this.deviceMetricsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceMetricsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceMetricDto: UpdateDeviceMetricDto) {
    return this.deviceMetricsService.update(+id, updateDeviceMetricDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceMetricsService.remove(+id);
  }
}
