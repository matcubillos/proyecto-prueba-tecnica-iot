import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post('/')
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    try {
      const device = await this.devicesService.create(createDeviceDto);
      return ({
        message: 'Device created successfully',
        device
      })
    } catch (error) {
      throw new BadRequestException({
        msg: 'Error creating device',
        error: error.message
      })
    }
  }

  @Get('/')
  async findAll() {
     try {
      const devices = await this.devicesService.findAll();
      return ({
        message: 'Devices retrieved successfully',
        devices
      })
     } catch (error) {
      return({
        success: false,
        message: error.message,
        devices: []
      })
     }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const device = await this.devicesService.findOneById(+id);
      return ({
        message: 'Device retrieved successfully',
        device
      })
    } catch (error) {
      return ({
        success: false,
        message: error.message,
        device: null
      })
    }
  }
  @Get('type/:type')
  async findByType(@Param('type') type: string) {
    try {
      const devices = await this.devicesService.findByType(type);
      return ({
        message: 'Devices retrieved successfully',
        devices
      })
    } catch (error) {
      return ({
        success: false,
        message: error.message,
        devices: []
      })
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(+id, updateDeviceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.remove(+id);
  }
}
