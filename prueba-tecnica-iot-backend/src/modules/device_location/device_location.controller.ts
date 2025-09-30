import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeviceLocationService } from './device_location.service';
import { CreateDeviceLocationDto } from './dto/create-device_location.dto';
import { UpdateDeviceLocationDto } from './dto/update-device_location.dto';

@Controller('device-location')
export class DeviceLocationController {
  constructor(private readonly deviceLocationService: DeviceLocationService) {}

  @Post()
  create(@Body() createDeviceLocationDto: CreateDeviceLocationDto) {
    return this.deviceLocationService.create(createDeviceLocationDto);
  }

  @Get()
  findAll() {
    return this.deviceLocationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceLocationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceLocationDto: UpdateDeviceLocationDto) {
    return this.deviceLocationService.update(+id, updateDeviceLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceLocationService.remove(+id);
  }
}
