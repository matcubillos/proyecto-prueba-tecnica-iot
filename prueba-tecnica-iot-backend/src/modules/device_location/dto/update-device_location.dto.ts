import { PartialType } from '@nestjs/mapped-types';
import { CreateDeviceLocationDto } from './create-device_location.dto';

export class UpdateDeviceLocationDto extends PartialType(CreateDeviceLocationDto) {}
